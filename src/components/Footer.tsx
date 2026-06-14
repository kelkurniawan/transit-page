import LogoIcon from "./icons/LogoIcon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo" aria-label="Transit — Beranda">
              <LogoIcon className="logo-icon" />
              <div className="logo-text" style={{ color: "white" }}>TRANSIT</div>
            </a>
            <p>
              Jasa ekspedisi dan angkutan barang terpercaya rute Jakarta-Bandung via jalur darat.
              Berpengalaman sejak 2001 melayani kebutuhan logistik dan pengiriman cargo untuk
              bisnis Anda.
            </p>
          </div>
          <div>
            <h4>Navigasi</h4>
            <ul className="footer-links">
              <li><a href="/#tentang">Tentang Kami</a></li>
              <li><a href="/#layanan">Layanan</a></li>
              <li><a href="/#rute">Rute</a></li>
              <li><a href="/#faq">FAQ</a></li>
              <li><a href="/#kontak">Kontak</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <ul className="footer-links">
              <li>
                <a href="https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang." target="_blank" rel="noopener noreferrer">
                  Chat via WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:transitmegaraja@gmail.com">
                  transitmegaraja@gmail.com
                </a>
              </li>
              <li>Kantor Pusat: Jakarta Pusat, DKI Jakarta</li>
              <li>Cabang: Jl. Caringin No. 35-39, Kota Bandung</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2001 — 2026 Transit. All rights reserved.</p>
          <p className="footer-credit">
            <span className="footer-credit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            Created by <span className="footer-credit-name">kelkurniawan</span>
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="X / Twitter" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" aria-label="Threads" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017C1.5 8.418 2.35 5.564 3.995 3.514 5.845 1.21 8.598.03 12.179.006h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.346-.79-.98-1.416-1.836-1.803a8 8 0 0 1-.263 2.152c-.36 1.268-1.014 2.248-1.89 2.83-.868.577-1.884.8-2.934.642-1.474-.222-2.613-1.028-3.2-2.266-.516-1.087-.554-2.376-.107-3.63.655-1.84 2.175-3.095 4.05-3.352.885-.12 1.738-.023 2.534.29.05-.39.074-.796.074-1.217 0-.91-.152-1.712-.453-2.384-.58-1.296-1.645-1.985-3.169-2.047-1.044.034-1.912.396-2.58 1.075-.608.617-.993 1.45-1.145 2.476l-2.03-.327c.2-1.397.756-2.567 1.65-3.475 1.03-1.047 2.39-1.612 4.043-1.68h.107c1.981.054 3.548.939 4.415 2.492.433.775.716 1.696.84 2.736.413.144.808.315 1.182.515 1.273.683 2.22 1.677 2.734 2.872.787 1.833.851 4.563-1.264 6.636-1.842 1.806-4.106 2.575-7.119 2.599zM11.16 14.2c-.425 1.192-.133 2.072.188 2.749.377.793 1.069 1.286 1.897 1.41.618.093 1.19-.024 1.655-.339.519-.35.922-.936 1.165-1.693.209-.653.296-1.39.26-2.193-.758-.329-1.606-.472-2.522-.425-1.322.069-2.2.84-2.643 1.491z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
