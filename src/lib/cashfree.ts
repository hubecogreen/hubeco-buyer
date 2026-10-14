// Cashfree checkout helper.
// When the backend runs with PAYMENT_GATEWAY=cashfree, payment APIs return
// { gateway: 'cashfree', paymentSessionId, mode } instead of the PayU HTML form.

const CASHFREE_SDK_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";

export type CashfreeSession = {
  gateway: "cashfree";
  paymentSessionId: string;
  orderId: string;
  mode: "sandbox" | "production";
};

export function isCashfreeSession(data: any): data is CashfreeSession {
  return (
    !!data &&
    typeof data === "object" &&
    data.gateway === "cashfree" &&
    !!data.paymentSessionId
  );
}

let sdkPromise: Promise<any> | null = null;

function loadCashfreeSdk(): Promise<any> {
  const w = window as any;
  if (w.Cashfree) return Promise.resolve(w.Cashfree);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CASHFREE_SDK_URL;
    script.async = true;
    script.onload = () => resolve(w.Cashfree);
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error("Unable to load Cashfree checkout"));
    };
    document.body.appendChild(script);
  });

  return sdkPromise;
}

/** Redirects the current tab to Cashfree checkout */
export async function startCashfreeCheckout(session: CashfreeSession) {
  try {
    const CashfreeSdk = await loadCashfreeSdk();
    const cashfree = CashfreeSdk({ mode: session.mode });
    await cashfree.checkout({
      paymentSessionId: session.paymentSessionId,
      redirectTarget: "_self",
    });
  } catch (e) {
    console.error(e);
    window.alert("Unable to open the payment page. Please try again.");
  }
}
