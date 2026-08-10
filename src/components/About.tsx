import { useTranslations } from "next-intl";

const featureIcons = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="shield">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="clock">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="team">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" key="star">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
];

export default function About() {
  const t = useTranslations("About");
  const features = t.raw("features") as Array<{ title: string; desc: string }>;

  return (
    <section className="about" id="tentang">
      <div className="container">
        <div className="about-image">
          <img
            src="/images/about-warehouse.jpg"
            alt={t("imageAlt")}
            className="about-photo"
            width="600"
            height="450"
            loading="lazy"
          />
          <div className="about-year-badge">
            {t("yearBadge")}<br />2001
          </div>
        </div>
        <div>
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
          <div className="about-features">
            {features.map((feature, i) => (
              <div className="about-feature" key={i}>
                <div className="about-feature-icon">{featureIcons[i]}</div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
