"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Delegated click listener — menangkap semua link WhatsApp & email di seluruh
 * situs tanpa perlu mengubah tiap komponen. Link WA adalah konversi utama,
 * jadi ini yang dikirim ke Vercel Analytics + GA4.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const location =
        link.closest("section[id]")?.id ??
        link.closest("nav, footer, header")?.tagName.toLowerCase() ??
        "unknown";

      if (href.startsWith("https://wa.me/")) {
        trackEvent("whatsapp_click", { location });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { location });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
