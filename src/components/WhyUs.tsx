import { useTranslations } from "next-intl";

export default function WhyUs() {
  const t = useTranslations("WhyUs");
  const items = t.raw("items") as Array<{ number: string; title: string; desc: string }>;

  return (
    <section className="why-us">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>
        <div className="why-grid">
          {items.map((item, i) => (
            <div className="why-card fade-in" key={i}>
              <div className="why-number">{item.number}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
