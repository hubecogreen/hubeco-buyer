"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePWAInstall from "@/components/hooks/usePWAInstall";

const POPUP_DELAY_MS = 5000;
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const DISMISSED_AT_STORAGE_KEY = "hubeco:install-popup:dismissed-at";

const wasDismissedRecently = () => {
  const dismissedAt = window.localStorage.getItem(DISMISSED_AT_STORAGE_KEY);

  if (!dismissedAt) {
    return false;
  }

  const dismissedAtMs = Number(dismissedAt);

  if (Number.isNaN(dismissedAtMs)) {
    window.localStorage.removeItem(DISMISSED_AT_STORAGE_KEY);
    return false;
  }

  return Date.now() - dismissedAtMs < DISMISS_COOLDOWN_MS;
};

const isIOSDevice = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  return (
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (platform === "MacIntel" && window.navigator.maxTouchPoints > 1)
  );
};

const IOSInstallContent = ({ onDismiss }: { onDismiss: () => void }) => (
  <>
    <div className="mb-5 flex items-center gap-2">
      <div>
        <Image
          src="/images/home/iphone-icon.png"
          alt="iPhone Icon"
          width={50}
          height={50}
        />
      </div>
      <div className="rounded-xl bg-cream py-2 pl-4 pr-1 text-left text-sm leading-6 text-[#374151]">
        <div className="mt-2 flex items-center gap-2">
          <Image src="/images/home/number-1-icon.png" width={27} height={27} alt="2-icon" />
          <p>
            Tap the <span className="font-medium text-[#1F2937]">Share</span> icon.
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 whitespace-nowrap">
          <Image src="/images/home/number-2-icon.png" width={27} height={27} alt="3-icon" />
          <p>
            Choose
            <span className="font-medium text-[#1F2937]"> Add to Home Screen</span>.
          </p>
        </div>
      </div>
    </div>
    <button
      type="button"
      onClick={onDismiss}
      className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm font-medium text-[#374151] transition hover:bg-gray-50"
    >
      Close
    </button>
  </>
);

const AppInstallPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hasDismissedThisSession, setHasDismissedThisSession] = useState(false);
  const {
    isInstalled,
    setMessage,
    promptInstall,
    shouldShowInstallButton,
    fallbackMessage,
  } = usePWAInstall();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsIOS(isIOSDevice());

    let timer: number | undefined;

    if (!isInstalled && !hasDismissedThisSession && !wasDismissedRecently()) {
      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, POPUP_DELAY_MS);
    }

    const handleManualOpen = () => {
      if (isInstalled) {
        setIsVisible(false);
        toast.success(fallbackMessage);
        return;
      }

      setHasDismissedThisSession(false);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsVisible(false);
    };

    window.addEventListener("hubeco:open-install-popup", handleManualOpen);
    window.addEventListener("hubeco:appinstalled", handleAppInstalled);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
      window.removeEventListener("hubeco:open-install-popup", handleManualOpen);
      window.removeEventListener("hubeco:appinstalled", handleAppInstalled);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [fallbackMessage, hasDismissedThisSession, isInstalled]);

  useEffect(() => {
    if (typeof document === "undefined" || !isVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISSED_AT_STORAGE_KEY, String(Date.now()));
    }

    setHasDismissedThisSession(true);
    setIsVisible(false);
    setMessage("");
  };

  const handleInstall = async () => {
    const result = await promptInstall();

    if (result.outcome === "fallback") {
      setIsVisible(false);
      setMessage("");
      toast.success(fallbackMessage);
      return;
    }

    if (result.outcome === "dismissed") {
      setIsVisible(false);
      setMessage("");
    }
  };

  if (!isVisible || !shouldShowInstallButton) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4">
      <div className="relative flex w-full max-w-sm flex-col items-center justify-center rounded-[24px] bg-cream p-[24px] shadow-2xl">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close install popup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-[#374151] transition hover:bg-black/5"
        >
          &times;
        </button>

        <div className="mb-2 flex items-center justify-center">
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
              {isIOS ? "Add to Home Screen" : "Install Hubeco App"}
            </h2>
          </div>
        </div>

        {isIOS ? (
          <IOSInstallContent onDismiss={handleDismiss} />
        ) : (
          <div className="flex w-[254px] flex-col justify-center gap-3">
            <button
              type="button"
              onClick={handleInstall}
              className="rounded-[30px] bg-primary px-[24px] py-[16px] text-[18px] tracking-[2px] text-white transition hover:bg-[#019988]"
            >
              Install Now
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-[30px] border border-[#D1D5DB] px-[24px] py-[16px] text-[18px] font-medium text-[#374151] transition hover:bg-gray-50"
            >
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppInstallPopup;
