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

const getStandaloneState = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};

const getStoredPrompt = () => {
  return ((window as InstallPromptWindow).__hubecoInstallPrompt ?? null);
};

const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const standaloneMedia = window.matchMedia("(display-mode: standalone)");

    const syncInstallState = () => {
      setIsInstalled(getStandaloneState());
      setDeferredPrompt(getStoredPrompt());
    };

    const handlePromptAvailable = () => {
      setDeferredPrompt(getStoredPrompt());
      setMessage("");
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setMessage("");
    };

    syncInstallState();

    standaloneMedia.addEventListener("change", syncInstallState);
    window.addEventListener("hubeco:installpromptavailable", handlePromptAvailable);
    window.addEventListener("hubeco:appinstalled", handleAppInstalled);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      standaloneMedia.removeEventListener("change", syncInstallState);
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

      setMessage(FALLBACK_MESSAGE);
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
    shouldShowInstallButton: !isInstalled,
    message,
    setMessage,
    promptInstall,
    fallbackMessage: FALLBACK_MESSAGE,
  };
};

export default usePWAInstall;
