export default function Contact() {
  return (
    <section className="contact" id="kontak">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">Hubungi Kami</div>
          <h2 className="section-title">Kantor Transit</h2>
          <p className="section-subtitle">
            Kunjungi kantor kami di Jakarta Pusat atau hubungi via WhatsApp untuk informasi
            lebih lanjut mengenai jasa ekspedisi dan angkutan barang Jakarta-Bandung.
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
                <h3>Kantor Pusat — Jakarta</h3>
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
                <h3>Cabang — Bandung</h3>
                <p>
                  Jl. Caringin No. 35-39<br />
                  Kota Bandung, Jawa Barat<br />
                  <a href="https://maps.app.goo.gl/iWfVQZmWnhBN67Ka7" target="_blank" rel="noopener noreferrer">
                    Lihat di Google Maps →
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
                <h3>WhatsApp</h3>
                <p>
                  <a href="https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang." target="_blank" rel="noopener noreferrer">
                    Chat via WhatsApp
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
                <h3>Email</h3>
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
                <h3>Jam Operasional</h3>
                <p>Senin — Sabtu: 08:00 — 17:00 WIB</p>
              </div>
            </div>
          </div>
          <div className="contact-maps">
            <div className="map-wrap">
              <span className="map-label">Kantor Pusat — Jakarta</span>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=-6.1656,106.834&z=16&hl=id&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor Pusat Transit di Jakarta Pusat"
                />
              </div>
            </div>
            <div className="map-wrap">
              <span className="map-label">Cabang — Bandung</span>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=-6.946533,107.586784&z=16&hl=id&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Cabang Transit di Jl. Caringin, Kota Bandung"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
