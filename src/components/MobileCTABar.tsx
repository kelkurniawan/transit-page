import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

/** CTA permanen di bawah layar mobile. Disembunyikan di atas 768px lewat CSS. */
export default function MobileCTABar() {
  const t = useTranslations("Nav");

  return (
    <div className="mobile-cta-bar">
      <a
        href={WA_LINK}
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
