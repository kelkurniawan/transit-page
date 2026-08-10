import { useTranslations } from "next-intl";

const routeItemIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="pickup">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="ship">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="deliver">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
];

export default function Route() {
  const t = useTranslations("Route");
  const items = t.raw("items") as Array<{ title: string; desc: string }>;
  const jabodetabekChips = t.raw("jabodetabekChips") as string[];
  const bandungChips = t.raw("bandungChips") as string[];

  return (
    <section className="route" id="rute">
      <div className="container">
        <div className="route-content">
          <div>
            <div className="section-label">{t("label")}</div>
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-subtitle">
              {t("subtitle")}
            </p>
            <div className="route-info" style={{ marginTop: 32 }}>
              {items.map((item, i) => (
                <div className="route-item" key={i}>
                  <div className="route-item-icon">{routeItemIcons[i]}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="coverage-area">
              <div className="coverage-group">
                <span className="coverage-group-label">{t("jabodetabekLabel")}</span>
                <div className="coverage-chips">
                  {jabodetabekChips.map((chip) => (
                    <span className="coverage-chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
              <div className="coverage-group">
                <span className="coverage-group-label">{t("bandungLabel")}</span>
                <div className="coverage-chips">
                  {bandungChips.map((chip) => (
                    <span className="coverage-chip" key={chip}>{chip}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="route-visual">
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={t("mapAriaLabel")}>
              <rect x="20" y="20" width="360" height="260" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="120" cy="130" r="30" fill="rgba(245,158,11,0.2)" />
              <circle cx="120" cy="130" r="12" fill="#f59e0b" />
              <text x="120" y="134" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">JKT</text>
              <text x="120" y="175" fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="600" textAnchor="middle">Jakarta</text>
              <path d="M152 130 Q200 100 240 120 Q260 128 280 140" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeDasharray="8 6" />
              <circle cx="300" cy="150" r="30" fill="rgba(37,99,235,0.2)" />
              <circle cx="300" cy="150" r="12" fill="#2563eb" />
              <text x="300" y="154" fill="white" fontSize="10" fontWeight="700" textAnchor="middle">BDG</text>
              <text x="300" y="195" fill="rgba(255,255,255,0.8)" fontSize="13" fontWeight="600" textAnchor="middle">Bandung</text>
              <rect x="150" y="210" width="100" height="36" rx="8" fill="rgba(245,158,11,0.2)" />
              <text x="200" y="225" fill="#f59e0b" fontSize="11" fontWeight="700" textAnchor="middle">~150 KM</text>
              <text x="200" y="240" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">{t("mapCaption")}</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
