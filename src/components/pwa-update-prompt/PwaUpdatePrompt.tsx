"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PwaUpdatePrompt() {
  const waitingWorker = useRef<ServiceWorker | null>(null);
  const refreshing = useRef(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isInstalledPwa =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      window.matchMedia("(display-mode: minimal-ui)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (!isInstalledPwa) return;

    const showUpdatePrompt = (worker: ServiceWorker | null) => {
      waitingWorker.current = worker;
      setShowPrompt(true);
    };

    if (!("serviceWorker" in navigator)) return;

    const hadController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.ready.then((registration) => {
      if (registration.waiting) {
        showUpdatePrompt(registration.waiting);
      }

      const handleUpdateFound = () => {
        const newWorker = registration.installing;

        newWorker?.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            showUpdatePrompt(newWorker);
          }
        });
      };

      registration.addEventListener("updatefound", handleUpdateFound);
      registration.update().catch(() => undefined);
    });

    const reloadApp = () => {
      if (!hadController) return;
      if (refreshing.current) return;
      refreshing.current = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", reloadApp);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", reloadApp);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !showPrompt) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showPrompt]);

  const handleUpdate = () => {
    setShowPrompt(false);

    if (waitingWorker.current) {
      waitingWorker.current.postMessage({ type: "SKIP_WAITING" });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4">
      <div className="relative flex w-full max-w-sm flex-col items-center justify-center rounded-[24px] bg-cream p-[24px] text-center shadow-2xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close update popup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-[#374151] transition hover:bg-black/5"
        >
          &times;
        </button>

        <div className="mb-5 flex items-center justify-center">
          <div className="mt-[15px] flex flex-col items-center justify-center gap-[9px] rounded-[20px]">
            <Image
              src="/images/Rlogo.png"
              alt="Hubeco app icon"
              width={255}
              height={50}
              className="h-[40px] w-[225px] object-contain md:h-[50px] md:w-[255px]"
              priority={false}
            />
            <h2 className="text-[23px] text-primary md:text-[32px]">
              Update Hubeco App
            </h2>
          </div>
        </div>

        <p className="mb-5 max-w-[280px] text-sm leading-6 text-[#374151]">
          A new version is available. Update now for the latest improvements.
        </p>

        <div className="flex w-[254px] flex-col justify-center gap-3">
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-[30px] bg-primary px-[24px] py-[16px] text-[18px] tracking-[2px] text-white transition hover:bg-[#019988]"
          >
            Update Now
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-[30px] border border-[#D1D5DB] px-[24px] py-[16px] text-[18px] font-medium text-[#374151] transition hover:bg-gray-50"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
