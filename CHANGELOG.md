# Changelog

All notable changes to the Transit website project.

---

## [Unreleased]

Perubahan yang sudah diimplementasikan tapi belum di-deploy ke production.

### Added
- **Website dwibahasa (Bahasa Indonesia + English)** via `next-intl`:
  - Seluruh rute dipindah ke `src/app/[locale]/`; `globals.css` dan `sitemap.ts` tetap
    di root `src/app/`.
  - `src/i18n/routing.ts`, `src/i18n/navigation.ts`, `src/i18n/request.ts`, dan
    `src/middleware.ts` baru — locale `id` (default) dan `en`, `localePrefix: 'as-needed'`
    (URL Indonesia tanpa prefix, URL Inggris berprefix `/en`).
  - Teks UI dipindah dari komponen ke `messages/id.json` & `messages/en.json` di root repo.
  - `LanguageSwitcher` (dulu toggle ID/EN statis) kini locale-aware, dengan prop opsional
    `slugMap` khusus halaman artikel untuk menautkan ke slug pasangannya.
- **Blog dwibahasa**: `content/blog/` dipecah jadi `content/blog/id/` dan
  `content/blog/en/`, 14 artikel per locale, dipasangkan lewat field frontmatter
  `translationKey` (selalu berisi slug Indonesia). `src/lib/blog.ts` kini locale-aware
  (`getAllPosts(locale)`, `getPostBySlug(locale, slug)`, `getAllPostSlugs(locale)`) plus
  `getTranslatedSlug()` dan `findLocaleForSlug()` untuk pencarian pasangan lintas locale.
- **Metadata & SEO per locale**: title/description/OG/Twitter per locale, `hreflang`
  alternates (`id`/`en`/`x-default`) saling menunjuk, JSON-LD `inLanguage` sesuai locale.
- **Sitemap dwibahasa**: `sitemap.ts` kini menghasilkan 32 URL (2 locale × (home + blog +
  14 artikel)).

### Fixed
- **🔴 Cross-locale slug 404** — next-intl mendeteksi `Accept-Language: en` dan meredirect
  URL Indonesia tanpa prefix ke `/en/...`; untuk artikel ini menghasilkan
  `/en/blog/<slug-indonesia>` yang 404 karena slug ID dan EN sengaja berbeda.
  `src/app/[locale]/blog/[slug]/page.tsx` sekarang mendeteksi slug yang sebenarnya milik
  locale lain dan meredirect ke URL pasangannya yang benar, alih-alih 404.

### Changed
- **`output: "export"` dihapus** dari `next.config.ts` — static export tidak bisa
  menjalankan middleware, dan middleware next-intl yang menangani pemilihan bahasa di
  setiap request. Situs sekarang berjalan sebagai aplikasi Next.js standar di Vercel
  dengan halaman ter-*generate* statis, bukan static export.
- `CLAUDE.md`, `README.md`, `publishpreparation.md` diperbarui agar sesuai arsitektur
  dwibahasa: bagian Internationalization (i18n) baru di `CLAUDE.md`, pohon struktur
  proyek diperbarui, dan seluruh keterangan static export yang sudah usang diganti.

### Notes
- **Deploy pertama tanpa `output: "export"`.** Jika Vercel project settings masih
  menyimpan override "Output Directory" ke `out` dari konfigurasi static-export
  sebelumnya, override itu harus dihapus di Vercel → Settings → Build & Output Settings
  sebelum deploy, atau build akan gagal.
- Pemilik wajib meninjau seluruh terjemahan (klaim layanan, tarif, cakupan area,
  asuransi) sebelum menganggapnya final — terjemahan mesin bisa halus secara bahasa
  namun keliru secara komersial.

---

## [0.7.0] — 2026-06-13 — Cabang Bandung

### Added
- **Alamat cabang Bandung** — Jl. Caringin No. 35-39, Kota Bandung, Jawa Barat
  (koordinat -6.946533, 107.586784, dari Google Maps yang diberikan owner).
  - Section Kontak kini menampilkan dua alamat: "Kantor Pusat — Jakarta" &
    "Cabang — Bandung", masing-masing dengan peta Google Maps tersendiri.
  - Peta kini pakai embed `?q=lat,lng&output=embed` (berfungsi tanpa API key) —
    peta Jakarta juga sekarang menunjuk lokasi yang benar (sebelumnya placeholder).
  - JSON-LD: entitas `MovingCompany` baru untuk cabang Bandung (`parentOrganization`,
    `geo`, `areaServed` Bandung Raya) — sinyal local SEO di sisi kota tujuan.
  - Footer & CLAUDE.md diupdate dengan alamat cabang.

### Notes
- Kode pos / RT-RW cabang Bandung belum dicantumkan (hanya jalan + kota). Lengkapi
  saat daftar Google Business Profile cabang agar NAP konsisten.

---

## [0.6.0] — 2026-06-12 — SEO Technical Overhaul

### Fixed
- **🔴 Sitemap tidak memuat artikel blog** — `sitemap.ts` kini generate URL semua post
  secara dinamis dari `getAllPosts()` (sebelumnya hanya `/` dan `/blog`). Verified:
  3 artikel kini muncul di `sitemap.xml` dengan tanggal asli.
- **🔴 Link navigasi rusak di halaman blog** — anchor `#tentang` dll. di Navbar & Footer
  diubah jadi absolut `/#tentang` agar berfungsi dari halaman mana pun (sebelumnya
  mengarah ke `/blog#tentang` yang tidak ada). Logo kini selalu link ke `/`.
- **Broken hreflang** — alternates `en-US: /en` dihapus (halaman EN belum ada).

### Added
- **OG/social share image** (`public/images/og-image.jpg`, 1200×630, branded) +
  referensi `openGraph.images` & `twitter.images` di layout dan tiap artikel blog.
- **Structured data artikel blog**: `BlogPosting` + `BreadcrumbList` JSON-LD,
  canonical per-post, OG `type: article`, author/publisher.
- **`WebSite` JSON-LD** sitewide + `geo` (koordinat) & `hasMap` di schema `MovingCompany`
  untuk sinyal local SEO / Google Maps.
- **Internal linking**: link "Blog" di Navbar & breadcrumb, blok "Artikel Lainnya"
  (related posts) + CTA WhatsApp di tiap artikel blog.
- Keyword tambahan: "jasa antar barang", "transportasi darat", "jasa kirim barang"
  (rute Jakarta-Bandung).

### Notes
- Koordinat `geo` di `layout.tsx` masih perkiraan (Pasar Baru) — verifikasi dengan
  lokasi asli via Google Business Profile.

---

## [0.5.0] — 2026-06-12

### Added
- **Foto asli (self-hosted)** menggantikan ilustrasi SVG di landing page
  - `public/images/hero-truck.jpg` — truk freight di jalan (Unsplash, lisensi gratis)
  - `public/images/about-warehouse.jpg` — gudang cargo & pallet (Unsplash, lisensi gratis)
  - Gambar di-download & host sendiri (bukan hotlink) agar andal di static export
- **Hero interaktif** dengan kartu melayang (floating cards) beranimasi:
  - Kartu rute "Jakarta → Bandung" (kiri atas)
  - Kartu stat "99% Tepat Waktu — Ribuan pengiriman sukses" (kanan bawah)
  - Animasi `floatY` halus + bayangan untuk kesan depth/modern
- Atribut `width`/`height`/`loading` pada semua `<img>` (cegah layout shift)

### Changed
- Copy paragraf Hero dipadatkan agar lebih ringkas & profesional (tetap informatif)
- Section About: ilustrasi SVG → foto gudang asli dengan badge "Berdiri Sejak 2001"

### Removed
- Ilustrasi SVG truk di Hero dan SVG abstrak di About (diganti foto asli)

---

## [0.4.0] — 2026-06-12

### Added
- **Section Pain Point / Gain Point baru** (`PainGain.tsx`, id `#solusi`)
  - Perbandingan dua kolom: "Tanpa Mitra Ekspedisi Terpercaya" (6 pain points) vs "Dengan Transit" (6 gain points)
  - CTA WhatsApp "Konsultasi Gratis Sekarang" di kartu solusi
  - Ditempatkan setelah Why Us, sebelum Process
- **Detail cakupan area pengiriman** di section Rute
  - Coverage chips "Area Penjemputan": Jakarta, Tangerang, Serpong, BSD, Bekasi, Depok, Bogor
  - Coverage chips "Area Tujuan": Kota Bandung, Cimahi, Kab. Bandung, Bandung Barat
- FAQ baru: "Apakah Transit melayani pengiriman dari Tangerang dan Serpong (BSD) ke Bandung?" (di komponen FAQ + JSON-LD schema)
- CSS variables baru: `--red`, `--red-light`, `--green`, `--green-light`

### Changed
- **Cakupan rute diperluas** ke Tangerang & Serpong (BSD): judul section Rute, subtitle, item pickup & delivery diupdate
- **SEO keywords diperluas** (+8 keyword): ekspedisi tangerang/serpong/bsd bandung, cargo serpong bandung, ekspedisi B2B, jasa pengiriman pabrik
- **`areaServed` JSON-LD diperluas**: ditambah Tangerang, Serpong, BSD, Bekasi, Depok, Bogor, Cimahi
- Homepage meta description diupdate menyebut Tangerang & Serpong + brand "Transit"
- FAQ existing diupdate menyebut Tangerang/Serpong/Kota Bandung dan brand "Transit" (sebelumnya "PT Transit Mega Raja")

---

## [0.3.0] — 2026-06-12

### Added
- Email perusahaan `transitmegaraja@gmail.com` ditambahkan di section Contact dan Footer
- Breakpoint **tablet** (769px–1024px) untuk semua section: hero, services (2-col), why-us (2-col), process (2-col), footer layout
- Breakpoint **small mobile** (≤480px): hero actions stack vertikal, font sizes scale down, hero stats wrap
- `CLAUDE.md` — project guide untuk AI assistant
- `CHANGELOG.md` — dokumen ini
- `deploylocal.md` — panduan deploy lokal
- `publishpreparation.md` — panduan persiapan publish ke internet
- `manuallabor.md` — daftar task manual yang perlu dilakukan owner

### Changed
- **Brand rename:** "PT Transit Mega Raja" / "TRANSIT MEGA RAJA" → **"TRANSIT"** di seluruh website
  - Navbar logo, Footer logo, copyright
  - Hero description, About description, Contact heading
  - Semua 3 artikel blog
  - SEO metadata (title, OpenGraph, Twitter)
  - JSON-LD schema: `name: "Transit"`, ditambah `legalName: "PT Transit Mega Raja"`
- **Nomor WhatsApp disembunyikan** dari tampilan website
  - Contact section: nomor diganti dengan link "Chat via WhatsApp"
  - Footer: nomor diganti dengan link "Chat via WhatsApp"
  - `telephone` dihapus dari JSON-LD schema
- Section padding dikurangi di mobile (80px → 60px → 48px)
- `section-title` font size responsif di semua breakpoint
- CTA box: padding dikurangi dan button full-width di mobile
- Blog grid: 3-col (desktop) → 2-col (tablet) → 1-col (mobile)
- Hero actions: stack vertikal + full-width button di small mobile (≤480px)

### Fixed
- `mobile-menu` top offset disesuaikan dengan height navbar mobile (64px)
- About features grid: 2-col di desktop → 1-col di mobile

---

## [0.2.0] — 2026-06-11

### Added
- **Blog system** lengkap dengan static generation
  - `src/lib/blog.ts` — utilities: `getAllPosts()`, `getPostBySlug()`, `getAllPostSlugs()`
  - `src/app/blog/page.tsx` — halaman listing blog
  - `src/app/blog/[slug]/page.tsx` — halaman detail artikel dengan `generateStaticParams`
  - CSS untuk blog grid, blog card, dan blog post content
- **3 artikel blog SEO-optimized:**
  1. *7 Tips Memilih Jasa Ekspedisi Jakarta Bandung* (tag: Tips Logistik)
  2. *Panduan Biaya Pengiriman Barang Jakarta Bandung 2026* (tag: Panduan Harga)
  3. *5 Keuntungan Ekspedisi Darat Jakarta-Bandung* (tag: Ekspedisi)
- `src/app/sitemap.ts` — dynamic sitemap generator
- `public/robots.txt` — allow all crawlers, reference sitemap
- Blog link ditambahkan ke Footer navigasi

### Changed
- `package.json`: ditambahkan `gray-matter`, `remark`, `remark-html` dependencies

---

## [0.1.0] — 2026-06-10

### Added
- **Next.js 16 project** setup manual (tanpa create-next-app karena konflik direktori)
  - `package.json`, `tsconfig.json`, `next.config.ts` dibuat manual
- **Landing page** dengan sections:
  - `Navbar` — fixed, scroll detection, mobile hamburger menu
  - `Hero` — headline, description, CTA buttons, truck illustration SVG, stats
  - `About` — company description, 4 feature icons, year badge
  - `Services` — 3 service cards (Reguler, Ekspres, Kontrak)
  - `WhyUs` — 4 stats (25+ tahun, 99% on-time, 1000+ klien, 0% kerusakan)
  - `Process` — 4-step process flow
  - `Route` — Jakarta-Bandung route info + coverage areas
  - `FAQ` — 8 accordion FAQ items (target Google "People Also Ask")
  - `CTA` — WhatsApp CTA section
  - `Contact` — address, contact info, Google Maps embed
  - `Footer` — navigation, contact, social media links
  - `WhatsAppFloat` — floating WhatsApp button (bottom-right)
  - `FadeInObserver` — IntersectionObserver fade-in animations
- **SEO features:**
  - JSON-LD structured data: `MovingCompany` (layout.tsx) + `FAQPage` (page.tsx)
  - Meta tags: title, description, keywords, Open Graph, Twitter Cards
  - `hreflang` alternates (id-ID, en-US)
  - Favicon SVG + ICO
- **Logo:** SVG truck icon (navy + orange brand colors)
- **CSS:** Custom CSS dengan CSS variables, responsive grid, mobile-first
- Mobile breakpoints (≤768px) untuk semua major sections
- `public/favicon.svg` — SVG favicon
- `.claude/launch.json` — dev server config

### Removed
- `index.html` — file standalone lama dihapus setelah Next.js migration selesai

---

## Legend

- **Added** — fitur baru
- **Changed** — perubahan pada fitur yang sudah ada
- **Fixed** — bug fix
- **Removed** — fitur yang dihapus
- **Security** — perubahan terkait keamanan
