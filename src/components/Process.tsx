import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Array<{ title: string; desc: string }>;

  return (
    <section className="process" id="proses">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("subtitle")}
          </p>
        </div>
        <div className="process-steps">
          {steps.map((step, i) => (
            <div className="process-step fade-in" key={i}>
              <div className="step-number">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
