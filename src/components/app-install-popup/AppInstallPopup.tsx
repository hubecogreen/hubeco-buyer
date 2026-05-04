"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type DeviceType = "android" | "ios" | "desktop";

type InstallPromptWindow = Window & {
  __hubecoInstallPrompt?: BeforeInstallPromptEvent | null;
};

const POPUP_DELAY_MS = 5000;
const DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const DISMISSED_AT_STORAGE_KEY = "hubeco:install-popup:dismissed-at";
const INSTALLED_STORAGE_KEY = "hubeco:install-popup:installed";

const isDismissedRecently = () => {
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

const isAppRunningStandalone = () => {
  const iosStandalone =
    "standalone" in window.navigator &&
    Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone);

  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;

  return iosStandalone || displayModeStandalone;
};

const getDeviceType = (): DeviceType => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const isIOS =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (platform === "MacIntel" && window.navigator.maxTouchPoints > 1);

  if (isIOS) {
    return "ios";
  }

  if (/Android/i.test(userAgent)) {
    return "android";
  }

  return "desktop";
};

const InstallPromptContent = ({
  canInstall,
  onInstall,
  onDismiss,
}: {
  canInstall: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}) => (
  <>
    {/* <p className="mb-4 text-sm leading-6 text-gray-600">
      Add Hubeco to your Android home screen for a faster, app-like shopping
      experience.
    </p> */}
    {/* {!canInstall ? (
      <p className="mb-4 rounded-xl bg-[#F4F7F7] px-4 py-3 text-left text-sm leading-6 text-[#4B5563]">
        If the install button is unavailable, open your browser menu and choose
        <span className="font-medium text-[#1F2937]"> Install app </span>
        or
        <span className="font-medium text-[#1F2937]"> Add to Home screen</span>.
      </p>
    ) : null} */}
    <div className="flex flex-col gap-3 w-[254px] justify-center ">
      {/* {canInstall ? ( */}
      <button
        type="button"
        onClick={onInstall}
        className=" rounded-[30px] tracking-[2px] bg-primary px-[24px] py-[16px] text-[18px]  text-white transition hover:bg-[#019988]"
      >
        👉 Install Now
      </button>
      {/* ) : null} */}
      <button
        type="button"
        onClick={onDismiss}
        className=" rounded-[30px] border border-[#D1D5DB] px-[24px] py-[16px] text-[18px] font-medium text-[#374151] transition hover:bg-gray-50"
      >
        👉 Maybe Later
      </button>

    </div>
  </>
);

const IOSInstallContent = ({ onDismiss }: { onDismiss: () => void }) => (
  <>
    {/* <h2 className="mb-2 text-xl font-semibold text-[#1F2937]">Add Hubeco to Home Screen</h2> */}
    {/* <p className="mb-4 text-sm leading-6 text-gray-600">
      On iPhone and iPad, install works through Safari. Follow these quick steps.
    </p> */}
    <div className="flex items-center gap-2 mb-5">
      <div>
        <Image
          src="/images/home/iphone-icon.png"
          alt="iPhone Icon"
          width={50}
          height={50}
        />
      </div>
      <div className=" rounded-xl bg-cream pl-4 pr-1 py-2 text-left text-sm leading-6 text-[#374151]">
        {/* <div className="flex gap-2 items-center">
        <Image src="/images/home/number-1-icon.png" width={27} height={27} alt="1-icon"/>
        <p> Open this website in <span className="font-medium text-[#1F2937]">Safari</span>.</p>
      </div> */}
        <div className="flex gap-2 mt-2 items-center">
          <Image src="/images/home/number-1-icon.png" width={27} height={27} alt="2-icon" />
          <p>
            Tap the <span className="font-medium text-[#1F2937]">Share</span> icon.
          </p>
        </div>
        <div className="flex gap-2 mt-2 items-center whitespace-nowrap">
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
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const isAndroid = deviceType === "android";
  const isIOS = deviceType === "ios";
  const isDesktop = deviceType === "desktop";
  const canUseInstallPrompt = (isAndroid || isDesktop) && Boolean(installPrompt);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentDeviceType = getDeviceType();
    const promptWindow = window as InstallPromptWindow;
    let timer: number | null = null;

    // if (
    //   isAppRunningStandalone() ||
    //   window.localStorage.getItem(INSTALLED_STORAGE_KEY) === "true" ||
    //   isDismissedRecently()
    // ) {
    //   return;
    // }

    setDeviceType(currentDeviceType);

    const startPopupTimer = () => {
      if (timer !== null) {
        return;
      }

      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, POPUP_DELAY_MS);
    };

    const syncInstallPrompt = () => {
      const storedPrompt = promptWindow.__hubecoInstallPrompt ?? null;

      setInstallPrompt(storedPrompt);

      if (storedPrompt && currentDeviceType !== "ios") {
        startPopupTimer();
      }
    };

    const handleManualOpen = () => {
      console.log("POPUP EVENT RECEIVED");
      setIsVisible(true);
    };

    window.addEventListener("hubeco:open-install-popup", handleManualOpen);

    const handleAppInstalled = () => {
      window.localStorage.setItem(INSTALLED_STORAGE_KEY, "true");
      setInstallPrompt(null);
      setIsVisible(false);
    };

    syncInstallPrompt();

    if (currentDeviceType === "ios") {
      startPopupTimer();
    }

    window.addEventListener("hubeco:installpromptavailable", syncInstallPrompt);
    window.addEventListener("hubeco:appinstalled", handleAppInstalled);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      if (timer !== null) {
        window.clearTimeout(timer);
      }
      window.removeEventListener("hubeco:open-install-popup", handleManualOpen);
      window.removeEventListener("hubeco:installpromptavailable", syncInstallPrompt);
      window.removeEventListener("hubeco:appinstalled", handleAppInstalled);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

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

    setIsVisible(false);
  };

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setIsVisible(false);
    } else {
      window.localStorage.setItem(DISMISSED_AT_STORAGE_KEY, String(Date.now()));
      setIsVisible(false);
    }

    setInstallPrompt(null);
    (window as InstallPromptWindow).__hubecoInstallPrompt = null;
  };

  if (!isVisible || (!isAndroid && !isIOS && !isDesktop)) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4">
      <div className="relative w-full max-w-sm rounded-[24px] bg-cream p-[24px] shadow-2xl flex justify-center items-center flex-col">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close install popup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-[#374151] transition hover:bg-black/5"
        >
          &times;
        </button>

        <div className="mb-2 flex justify-center items-center">
          <div className="rounded-[20px]  flex flex-col justify-center items-center gap-[9px] mt-[15px]">
            <Image
              src="/images/Rlogo.png"
              alt="Hubeco app icon"
              width={255}
              height={50}
              className=" md:w-[255px] w-[225px] md:h-[50px] h-[40px] object-contain"
              priority={false}
            />
            <h2 className=" md:text-[32px] text-[23px]  text-primary  ">{isAndroid || isDesktop ? "Install Hubeco App" : "Add to Home Screen"}</h2>

          </div>
        </div>

        {isAndroid || isDesktop ? (
          <InstallPromptContent
            canInstall={canUseInstallPrompt}
            onInstall={handleInstall}
            onDismiss={handleDismiss}
          />
        ) : (
          <IOSInstallContent onDismiss={handleDismiss} />
        )}
      </div>
    </div>
  );
};

export default AppInstallPopup;
