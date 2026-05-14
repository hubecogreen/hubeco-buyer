"use client";

import { Wifi, WifiOff, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NetworkStatus = "online" | "offline";

export default function NetworkStatusToast() {
  const onlineTimer = useRef<number | null>(null);
  const [status, setStatus] = useState<NetworkStatus>("online");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const clearOnlineTimer = () => {
      if (onlineTimer.current) {
        window.clearTimeout(onlineTimer.current);
        onlineTimer.current = null;
      }
    };

    const syncStatus = () => {
      const isOnline = navigator.onLine;
      setStatus(isOnline ? "online" : "offline");
      setVisible(!isOnline);
    };

    const handleOnline = () => {
      clearOnlineTimer();
      setStatus("online");
      setVisible(true);

      onlineTimer.current = window.setTimeout(() => {
        setVisible(false);
        onlineTimer.current = null;
      }, 4000);
    };

    const handleOffline = () => {
      clearOnlineTimer();
      setStatus("offline");
      setVisible(true);
    };

    syncStatus();
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearOnlineTimer();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!visible) return null;

  const isOffline = status === "offline";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`sticky md:top-[79px] top-[120px] z-40 border-b px-4 py-2 shadow-sm ${
        isOffline
          ? "border-[#F2C94C]/50 bg-cream text-[#5F4300]"
          : "border-[#A7E8D8]/60 bg-cream text-[#045B50]"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              isOffline ? "bg-secondary/20" : "bg-[#01B6A3]/15"
            }`}
          >
            {isOffline ? <WifiOff  size={18} className="text-secondary" /> : <Wifi size={18} />}
          </span>
          <p className={`text-sm font-medium leading-5 md:text-base ${isOffline ? "text-secondary" : "text-primary"}`}>
            {isOffline
              ? "You are currently offline."
              : "You’re back online."}
          </p>
        </div>

        {!isOffline ? (
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss network status"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
