import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box fade-in">
          <h2>Siap Mengirim Barang via Ekspedisi Jakarta-Bandung?</h2>
          <p>
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran harga terbaik
            untuk kebutuhan jasa angkutan barang dan logistik bisnis Anda.
          </p>
          <div className="cta-actions">
            <a href={WA_LINK} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} />
              <span>Chat WhatsApp Sekarang</span>
            </a>
            <a href="#layanan" className="btn btn-outline-white btn-lg">
              Lihat Layanan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
