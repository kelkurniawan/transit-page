import { useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";

export default function Contact() {
  const t = useTranslations("Contact");
  const tWa = useTranslations("WhatsApp");

  return (
    <section className="contact" id="kontak">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">{t("label")}</div>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">
            {t("intro")}
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>{t("headOfficeTitle")}</h3>
                <p>
                  Jl. Krekot Bunder IV No.61<br />
                  RT.6/RW.6, Ps. Baru<br />
                  Jakarta Pusat, DKI Jakarta 10710
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>{t("branchTitle")}</h3>
                <p>
                  Jl. Caringin No. 35-39<br />
                  Kota Bandung, Jawa Barat<br />
                  <a href="https://maps.app.goo.gl/iWfVQZmWnhBN67Ka7" target="_blank" rel="noopener noreferrer">
                    {t("mapsLink")}
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3>{t("whatsappTitle")}</h3>
                <p>
                  <a href={waLink(tWa("prefill.contact"))} target="_blank" rel="noopener noreferrer">
                    {tWa("label")}
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3>{t("emailTitle")}</h3>
                <p>
                  <a href="mailto:transitmegaraja@gmail.com">
                    transitmegaraja@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3>{t("hoursTitle")}</h3>
                <p>{t("hoursValue")}</p>
              </div>
            </div>
          </div>
          <div className="contact-maps">
            <div className="map-wrap">
              <span className="map-label">{t("headOfficeTitle")}</span>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=-6.1656,106.834&z=16&hl=id&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("mapIframeTitleHQ")}
                />
              </div>
            </div>
            <div className="map-wrap">
              <span className="map-label">{t("branchTitle")}</span>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=-6.946533,107.586784&z=16&hl=id&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("mapIframeTitleBranch")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
