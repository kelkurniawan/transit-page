"use client";

import { useEffect, useState } from "react";
import LogoIcon from "./icons/LogoIcon";
import LanguageSwitcher from "./LanguageSwitcher";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <a href="/" className="logo" aria-label="Transit — Beranda">
            <LogoIcon className="logo-icon" />
            <div className="logo-text">TRANSIT</div>
          </a>
          <ul className="nav-links">
            <li><a href="/#tentang">Tentang Kami</a></li>
            <li><a href="/#layanan">Layanan</a></li>
            <li><a href="/#rute">Rute</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="/#kontak">Kontak</a></li>
          </ul>
          <div className="nav-right">
            <LanguageSwitcher />
            <a href={WA_LINK} className="btn btn-primary btn-sm nav-cta" target="_blank" rel="noopener noreferrer">
              Minta Penawaran
            </a>
            <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " active" : ""}`}>
        <a href="/#tentang" onClick={() => setMenuOpen(false)}>Tentang Kami</a>
        <a href="/#layanan" onClick={() => setMenuOpen(false)}>Layanan</a>
        <a href="/#rute" onClick={() => setMenuOpen(false)}>Rute</a>
        <a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a>
        <a href="/#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        <a href="/#kontak" onClick={() => setMenuOpen(false)}>Kontak</a>
        <a href={WA_LINK} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
          Minta Penawaran
        </a>
      </div>
    </>
  );
}
