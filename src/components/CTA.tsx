import { useTranslations } from "next-intl";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box fade-in">
          <h2>{t("heading")}</h2>
          <p>
            {t("body")}
          </p>
          <div className="cta-actions">
            <a href={WA_LINK} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} />
              <span>{t("whatsappCta")}</span>
            </a>
            <a href="#layanan" className="btn btn-outline-white btn-lg">
              {t("servicesCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
