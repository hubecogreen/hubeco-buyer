// Backstop against reload loops: any future code that triggers a
// router.refresh()/router.push() from a mount effect can repeat a failed
// navigation indefinitely while offline (Next.js falls back to a hard
// reload on a failed RSC fetch). The inline script in layout.tsx records
// each full page load; this just reads that record.
const LOOP_FLAG_KEY = "hubeco-reload-loop";

export function isReloadLoopActive(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(LOOP_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function canSafelyRefresh(): boolean {
  if (typeof navigator !== "undefined" && !navigator.onLine) return false;
  return !isReloadLoopActive();
}
