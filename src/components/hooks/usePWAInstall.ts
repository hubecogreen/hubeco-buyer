"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type InstallPromptWindow = Window & {
  __hubecoInstallPrompt?: BeforeInstallPromptEvent | null;
};

const FALLBACK_MESSAGE = "App is already installed. Open it from your device home screen";
const INSTALL_CONFIRMED_STORAGE_KEY = "hubeco:pwa-install-confirmed";

const getStandaloneState = () => {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches ||
    navigatorWithStandalone.standalone === true ||
    document.referrer.startsWith("android-app://")
  );
};

const getStoredPrompt = () => {
  return ((window as InstallPromptWindow).__hubecoInstallPrompt ?? null);
};

const getConfirmedInstallState = () => {
  return window.localStorage.getItem(INSTALL_CONFIRMED_STORAGE_KEY) === "true";
};

const setConfirmedInstallState = () => {
  window.localStorage.setItem(INSTALL_CONFIRMED_STORAGE_KEY, "true");
};

const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasCheckedInstallState, setHasCheckedInstallState] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const standaloneMedia = window.matchMedia("(display-mode: standalone)");
    const fullscreenMedia = window.matchMedia("(display-mode: fullscreen)");
    const minimalUiMedia = window.matchMedia("(display-mode: minimal-ui)");

    const syncInstallState = () => {
      setIsInstalled(getStandaloneState() || getConfirmedInstallState());
      setDeferredPrompt(getStoredPrompt());
      setHasCheckedInstallState(true);
    };

    const handlePromptAvailable = () => {
      setDeferredPrompt(getStoredPrompt());
      setMessage("");
    };

    const handleAppInstalled = () => {
      setConfirmedInstallState();
      setIsInstalled(true);
      setDeferredPrompt(null);
      setHasCheckedInstallState(true);
      setMessage("");
    };

    syncInstallState();

    standaloneMedia.addEventListener("change", syncInstallState);
    fullscreenMedia.addEventListener("change", syncInstallState);
    minimalUiMedia.addEventListener("change", syncInstallState);
    window.addEventListener("hubeco:installpromptavailable", handlePromptAvailable);
    window.addEventListener("hubeco:appinstalled", handleAppInstalled);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      standaloneMedia.removeEventListener("change", syncInstallState);
      fullscreenMedia.removeEventListener("change", syncInstallState);
      minimalUiMedia.removeEventListener("change", syncInstallState);
      window.removeEventListener("hubeco:installpromptavailable", handlePromptAvailable);
      window.removeEventListener("hubeco:appinstalled", handleAppInstalled);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (isInstalled) {
      setMessage("");
      return { outcome: "installed" as const };
    }

    if (!deferredPrompt) {
      setMessage(FALLBACK_MESSAGE);
      return { outcome: "fallback" as const };
    }

    try {
      setMessage("");
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      (window as InstallPromptWindow).__hubecoInstallPrompt = null;

      if (choice.outcome === "accepted") {
        setMessage("");
        return { outcome: "accepted" as const };
      }

      setMessage("");
      return { outcome: "dismissed" as const };
    } catch {
      setDeferredPrompt(null);
      (window as InstallPromptWindow).__hubecoInstallPrompt = null;
      setMessage(FALLBACK_MESSAGE);
      return { outcome: "fallback" as const };
    }
  };

  return {
    deferredPrompt,
    isInstalled,
    isInstallAvailable: Boolean(deferredPrompt),
    shouldShowInstallButton: hasCheckedInstallState && !isInstalled,
    message,
    setMessage,
    promptInstall,
    fallbackMessage: FALLBACK_MESSAGE,
  };
};

export default usePWAInstall;
