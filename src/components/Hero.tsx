import { useTranslations } from "next-intl";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0l2 5h5l-4 3.5 1.5 5L8 10.5 3.5 13.5 5 8.5 1 5h5z" />
            </svg>
            <span>{t("badge")}</span>
          </div>
          <h1>
            {t("titlePrefix")}{" "}
            <span className="highlight">{t("titleHighlight")}</span> {t("titleSuffix")}
          </h1>
          <p>
            {t("subtitle")}
          </p>
          <div className="hero-actions">
            <a href={WA_LINK} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>{t("whatsappCta")}</span>
            </a>
            <a href="#layanan" className="btn btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
              {t("servicesCta")}
            </a>
          </div>
          <ul className="hero-trust">
            <li>{t("trustConsultation")}</li>
            <li>{t("trustNoHiddenFees")}</li>
            <li>{t("trustFastResponse")}</li>
          </ul>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">25+</div>
              <p>{t("statYears")}</p>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">1000+</div>
              <p>{t("statClients")}</p>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">24/7</div>
              <p>{t("statSupport")}</p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/images/hero-truck.jpg"
              alt={t("imageAlt")}
              className="hero-image"
              width="520"
              height="620"
              loading="eager"
            />
            <div className="hero-float hero-float-route">
              <span className="hf-pin jkt" /> Jakarta
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={t("twoWayAriaLabel")}>
                <path d="M3 12h18M7 7l-4 5 4 5M17 7l4 5-4 5" />
              </svg>
              Bandung <span className="hf-pin bdg" />
            </div>
            <div className="hero-float hero-float-stat hero-float-dark">
              <div className="hf-icon hf-icon-check">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="hf-text">
                <strong>{t("onTimeStat")}</strong>
                <span>{t("onTimeCaption")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
