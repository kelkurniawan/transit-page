export default function Services() {
  return (
    <section className="services" id="layanan">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">Layanan Kami</div>
          <h2 className="section-title">Solusi Jasa Angkutan Barang untuk Setiap Kebutuhan Bisnis</h2>
          <p className="section-subtitle">
            Kami menyediakan berbagai layanan ekspedisi dan angkutan barang via darat rute
            Jakarta-Bandung yang dapat disesuaikan dengan kebutuhan logistik bisnis Anda.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card fade-in">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h3>Angkutan Barang Reguler</h3>
            <p>Layanan pengiriman barang reguler rute Jakarta-Bandung dengan jadwal tetap setiap hari dan harga kompetitif. Cocok untuk kebutuhan pengiriman rutin bisnis Anda.</p>
            <ul className="service-features">
              <li>Jadwal pengiriman harian</li>
              <li>Estimasi 1–2 hari kerja</li>
              <li>Harga kompetitif</li>
            </ul>
          </div>
          <div className="service-card fade-in">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>Pengiriman Ekspres (Same-Day)</h3>
            <p>Butuh pengiriman cepat? Layanan ekspres kami memastikan barang Anda tiba di tujuan di hari yang sama. Ideal untuk pengiriman mendesak.</p>
            <ul className="service-features">
              <li>Tiba di hari yang sama</li>
              <li>Prioritas penanganan</li>
              <li>Untuk kiriman mendesak</li>
            </ul>
          </div>
          <div className="service-card fade-in">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
              </svg>
            </div>
            <h3>Kargo Industri &amp; Manufaktur</h3>
            <p>Layanan khusus untuk pengiriman cargo dan barang industri skala besar — bahan baku pabrik, produk manufaktur, mesin, tekstil, dan elektronik.</p>
            <ul className="service-features">
              <li>Volume &amp; berat besar</li>
              <li>Penanganan profesional</li>
              <li>Kontrak jangka panjang B2B</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
