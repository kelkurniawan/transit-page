import { useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import WhatsAppIcon from "./icons/WhatsAppIcon";


/** CTA permanen di bawah layar mobile. Disembunyikan di atas 768px lewat CSS. */
export default function MobileCTABar() {
  const t = useTranslations("Nav");
  const tWa = useTranslations("WhatsApp");

  return (
    <div className="mobile-cta-bar">
      <a
        href={waLink(tWa("prefill.mobileBar"))}
        className="btn btn-wa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={20} />
        <span>{t("quote")}</span>
      </a>
      {/* Link locale-aware — bar ini juga dipakai di halaman blog */}
      <Link href="/#kontak" className="btn btn-outline">
        {t("contact")}
      </Link>
    </div>
  );
}
