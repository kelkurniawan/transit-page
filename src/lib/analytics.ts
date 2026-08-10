import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      target: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

type EventProps = Record<string, string | number | boolean>;

/**
 * Kirim satu event ke Vercel Analytics DAN Google Analytics sekaligus.
 * Keduanya sistem terpisah — helper ini yang menjaga nama event tetap sama
 * di dua dashboard, jadi angkanya bisa dibandingkan.
 */
export function trackEvent(name: string, props?: EventProps) {
  track(name, props);
  window.gtag?.("event", name, props);
}
