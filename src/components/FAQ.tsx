"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("FAQ");
  const faqs = t.raw("items") as Array<{ q: string; a: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? " active" : ""}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="faq-answer"
                style={{ maxHeight: openIndex === i ? "300px" : "0" }}
              >
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
