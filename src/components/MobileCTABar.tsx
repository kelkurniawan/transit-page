import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

/** CTA permanen di bawah layar mobile. Disembunyikan di atas 768px lewat CSS. */
export default function MobileCTABar() {
  return (
    <div className="mobile-cta-bar">
      <a
        href={WA_LINK}
        className="btn btn-wa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={20} />
        <span>Minta Penawaran</span>
      </a>
      {/* "/#kontak" bukan "#kontak" — bar ini juga dipakai di halaman blog */}
      <a href="/#kontak" className="btn btn-outline">
        Kontak
      </a>
    </div>
  );
}
