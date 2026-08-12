import { useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./icons/WhatsAppIcon";


const benefitIcons = [
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="ontime">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="safe">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="price">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9a2.5 2 0 0 1 2.5-1.5c1.4 0 2.3.8 2.3 1.8 0 2.4-4.6 1.4-4.6 3.8 0 1 .9 1.9 2.3 1.9a2.6 2 0 0 0 2.5-1.5" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="responsive">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="longterm">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4M9 14l2 2 4-4" />
    </svg>
  ),
  (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" key="fleet">
      <path d="M1 5h14v11H1zM15 8h4l4 4v4h-8z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="18.5" cy="18.5" r="2" />
    </svg>
  ),
];

export default function PainGain() {
  const t = useTranslations("PainGain");
  const tWa = useTranslations("WhatsApp");
  const items = t.raw("items") as Array<{ problem: string; title: string; desc: string }>;

  return (
    <section className="solusi" id="solusi">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>
        <div className="solusi-grid">
          {items.map((item, i) => (
            <div className="solusi-card fade-in" key={i}>
              <div className="solusi-icon">{benefitIcons[i]}</div>
              <span className="solusi-problem">{item.problem}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="solusi-cta fade-in">
          <a href={waLink(tWa("prefill.painGain"))} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={22} />
            <span>{t("ctaLabel")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
