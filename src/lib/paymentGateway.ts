// Which gateway an order was paid with, for display.
// Newer orders carry paymentDetails.gateway; orders paid before that field existed still
// record the gateway in their payment history (Cashfree sets payment_source / PG_TYPE).
// Anything older predates the Cashfree switch, so it was PayU.

export type PaymentGatewayName = "Cashfree" | "PayU";

const CASHFREE_ORDER_LABEL = "Cashfree payment gateway";

export function orderPaymentGateway(order: any): PaymentGatewayName {
  const gateway = order?.paymentDetails?.gateway;
  if (gateway) return gateway === "cashfree" ? "Cashfree" : "PayU";

  const paidWithCashfree = (order?.history ?? []).some(
    (entry: any) =>
      entry?.context?.payment_source === "cashfree" ||
      entry?.context?.PG_TYPE === "CASHFREE"
  );
  if (paidWithCashfree) return "Cashfree";

  return order?.orders?.[0]?.payment === CASHFREE_ORDER_LABEL ? "Cashfree" : "PayU";
}
