"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LogoIcon from "./icons/LogoIcon";
import LanguageSwitcher from "./LanguageSwitcher";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function Navbar() {
  const t = useTranslations("Nav");
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
          <a href="/" className="logo" aria-label={t("home")}>
            <LogoIcon className="logo-icon" />
            <div className="logo-text">TRANSIT</div>
          </a>
          <ul className="nav-links">
            <li><a href="/#tentang">{t("about")}</a></li>
            <li><a href="/#layanan">{t("services")}</a></li>
            <li><a href="/#rute">{t("route")}</a></li>
            <li><a href="/blog">{t("blog")}</a></li>
            <li><a href="/#faq">{t("faq")}</a></li>
            <li><a href="/#kontak">{t("contact")}</a></li>
          </ul>
          <div className="nav-right">
            <LanguageSwitcher />
            <a href={WA_LINK} className="btn btn-primary btn-sm nav-cta" target="_blank" rel="noopener noreferrer">
              {t("quote")}
            </a>
            <button className="hamburger" aria-label={t("menu")} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " active" : ""}`}>
        <a href="/#tentang" onClick={() => setMenuOpen(false)}>{t("about")}</a>
        <a href="/#layanan" onClick={() => setMenuOpen(false)}>{t("services")}</a>
        <a href="/#rute" onClick={() => setMenuOpen(false)}>{t("route")}</a>
        <a href="/blog" onClick={() => setMenuOpen(false)}>{t("blog")}</a>
        <a href="/#faq" onClick={() => setMenuOpen(false)}>{t("faq")}</a>
        <a href="/#kontak" onClick={() => setMenuOpen(false)}>{t("contact")}</a>
        <a href={WA_LINK} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
          {t("quote")}
        </a>
      </div>
    </>
  );
}
