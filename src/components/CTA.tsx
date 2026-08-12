import { useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "./icons/WhatsAppIcon";


export default function CTA() {
  const t = useTranslations("CTA");
  const tWa = useTranslations("WhatsApp");

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box fade-in">
          <h2>{t("heading")}</h2>
          <p>
            {t("body")}
          </p>
          <div className="cta-actions">
            <a href={waLink(tWa("prefill.cta"))} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
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
