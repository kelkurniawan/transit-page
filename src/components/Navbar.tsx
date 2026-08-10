"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LogoIcon from "./icons/LogoIcon";
import LanguageSwitcher from "./LanguageSwitcher";

const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export default function Navbar({
  slugMap,
}: {
  /** Forwarded to LanguageSwitcher. See its doc comment for details. */
  slugMap?: Record<string, string | null>;
}) {
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
          <Link href="/" className="logo" aria-label={t("home")}>
            <LogoIcon className="logo-icon" />
            <div className="logo-text">TRANSIT</div>
          </Link>
          <ul className="nav-links">
            <li><Link href="/#tentang">{t("about")}</Link></li>
            <li><Link href="/#layanan">{t("services")}</Link></li>
            <li><Link href="/#rute">{t("route")}</Link></li>
            <li><Link href="/blog">{t("blog")}</Link></li>
            <li><Link href="/#faq">{t("faq")}</Link></li>
            <li><Link href="/#kontak">{t("contact")}</Link></li>
          </ul>
          <div className="nav-right">
            <LanguageSwitcher slugMap={slugMap} />
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
        <Link href="/#tentang" onClick={() => setMenuOpen(false)}>{t("about")}</Link>
        <Link href="/#layanan" onClick={() => setMenuOpen(false)}>{t("services")}</Link>
        <Link href="/#rute" onClick={() => setMenuOpen(false)}>{t("route")}</Link>
        <Link href="/blog" onClick={() => setMenuOpen(false)}>{t("blog")}</Link>
        <Link href="/#faq" onClick={() => setMenuOpen(false)}>{t("faq")}</Link>
        <Link href="/#kontak" onClick={() => setMenuOpen(false)}>{t("contact")}</Link>
        <a href={WA_LINK} className="btn btn-wa" target="_blank" rel="noopener noreferrer">
          {t("quote")}
        </a>
      </div>
    </>
  );
}
