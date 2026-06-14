export default function About() {
  return (
    <section className="about" id="tentang">
      <div className="container">
        <div className="about-image">
          <img
            src="/images/about-warehouse.jpg"
            alt="Gudang penyimpanan cargo dan barang logistik Transit untuk pengiriman Jakarta-Bandung"
            className="about-photo"
            width="600"
            height="450"
            loading="lazy"
          />
          <div className="about-year-badge">
            Berdiri Sejak<br />2001
          </div>
        </div>
        <div>
          <div className="section-label">Tentang Kami</div>
          <h2 className="section-title">Mitra Logistik Terpercaya untuk Bisnis Anda</h2>
          <p className="section-subtitle">
            Transit adalah perusahaan jasa ekspedisi dan angkutan barang yang telah berpengalaman
            melayani pengiriman rute Jakarta-Bandung sejak tahun 2001. Dengan lebih dari dua dekade
            pengalaman di industri transportasi dan logistik darat, kami memahami betul kebutuhan
            bisnis Anda akan pengiriman barang yang cepat, aman, dan dapat diandalkan. Kami
            melayani berbagai jenis cargo mulai dari bahan baku industri, produk manufaktur, hingga
            barang dagangan umum — semua dikirim dengan standar keamanan dan ketepatan waktu
            tertinggi.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h3>Aman &amp; Terjamin</h3>
                <p>Barang Anda dalam perlindungan terbaik selama proses pengiriman</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3>Tepat Waktu</h3>
                <p>Konsisten on-time delivery dengan jadwal pengiriman yang teratur</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3>Tim Profesional</h3>
                <p>Pengemudi berpengalaman dan terlatih dalam penanganan barang</p>
              </div>
            </div>
            <div className="about-feature">
              <div className="about-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3>Layanan Fleksibel</h3>
                <p>Disesuaikan dengan kebutuhan logistik dan jadwal operasional Anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
