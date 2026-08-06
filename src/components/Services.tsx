import { useTranslations } from "next-intl";

const serviceIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="regular">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="express">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="industrial">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
];

export default function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as Array<{ title: string; desc: string; features: string[] }>;

  return (
    <section className="services" id="layanan">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>
        <div className="services-grid">
          {items.map((item, i) => (
            <div className="service-card fade-in" key={i}>
              <div className="service-icon">{serviceIcons[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul className="service-features">
                {item.features.map((feature, j) => (
                  <li key={j}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
