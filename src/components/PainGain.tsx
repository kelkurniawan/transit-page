import WhatsAppIcon from "./icons/WhatsAppIcon";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

const benefits = [
  {
    problem: "Sering telat?",
    title: "Tepat Waktu",
    desc: "Jadwal tetap setiap hari. Produksi bisnis Anda tidak terganggu.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    problem: "Barang rusak?",
    title: "Aman Sampai Tujuan",
    desc: "Ditangani tim profesional. Track record aman 25+ tahun.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    problem: "Biaya tersembunyi?",
    title: "Harga Transparan",
    desc: "Tarif jelas di awal, tanpa biaya kejutan. Hemat untuk volume besar.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9a2.5 2 0 0 1 2.5-1.5c1.4 0 2.3.8 2.3 1.8 0 2.4-4.6 1.4-4.6 3.8 0 1 .9 1.9 2.3 1.9a2.6 2 0 0 0 2.5-1.5" />
      </svg>
    ),
  },
  {
    problem: "Susah dihubungi?",
    title: "Selalu Responsif",
    desc: "Update real-time langsung via WhatsApp. Mudah dikoordinasikan.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
      </svg>
    ),
  },
  {
    problem: "Tak bisa diandalkan?",
    title: "Siap Jangka Panjang",
    desc: "Kontrak pengiriman reguler untuk rantai pasok bisnis Anda.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    problem: "Volume besar?",
    title: "Armada Lengkap",
    desc: "Dari paket kecil hingga full truck load (FTL). Semua terlayani.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 5h14v11H1zM15 8h4l4 4v4h-8z" />
        <circle cx="5.5" cy="18.5" r="2" />
        <circle cx="18.5" cy="18.5" r="2" />
      </svg>
    ),
  },
];

export default function PainGain() {
  return (
    <section className="solusi" id="solusi">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">Kenapa Memilih Transit</div>
          <h2 className="section-title">Masalah Pengiriman Anda, Kami Selesaikan</h2>
          <p className="section-subtitle">
            Pengiriman Jakarta-Bandung yang andal tanpa drama. Inilah yang Anda dapatkan
            saat mempercayakan barang Anda kepada Transit.
          </p>
        </div>
        <div className="solusi-grid">
          {benefits.map((b, i) => (
            <div className="solusi-card fade-in" key={i}>
              <div className="solusi-icon">{b.icon}</div>
              <span className="solusi-problem">{b.problem}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="solusi-cta fade-in">
          <a href={WA_LINK} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={22} />
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
