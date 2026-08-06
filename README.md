# Transit — Landing Page

Website landing page untuk **PT Transit Mega Raja**, jasa ekspedisi dan angkutan barang rute Jakarta-Bandung via jalur darat. Berdiri sejak 2001.

🌐 **Domain:** [transitexpress.my.id](https://transitexpress.my.id)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **i18n:** [next-intl](https://next-intl.dev) — Bahasa Indonesia (default, tanpa prefix) + English (prefix `/en`)
- **Styling:** Custom CSS — tidak menggunakan Tailwind
- **Blog:** Markdown files via `gray-matter` + `remark` + `remark-html`, terpisah per locale
- **Deployment:** Aplikasi Next.js standar di Vercel dengan halaman ter-*generate* statis. Bukan static export — middleware next-intl yang menangani pemilihan bahasa di setiap request.

## Fitur

- Landing page B2B untuk jasa ekspedisi cargo, dwibahasa (Indonesia/Inggris)
- Blog system dengan 14 artikel SEO-optimized per locale (28 total), dipasangkan lewat `translationKey`
- JSON-LD structured data (MovingCompany, FAQPage, BlogPosting, BreadcrumbList, WebSite)
- Dynamic sitemap dwibahasa yang auto-include semua artikel blog (32 URL)
- `hreflang` alternates antar locale
- OG image untuk social sharing
- Google Maps embed (Jakarta HQ + Cabang Bandung)
- Responsive: desktop · tablet · mobile · small mobile
- Floating WhatsApp CTA button

## Struktur Project

```
transit/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx      # Root layout + SEO metadata + JSON-LD (per locale)
│   │   │   ├── page.tsx        # Homepage
│   │   │   └── blog/
│   │   │       ├── page.tsx        # Blog listing
│   │   │       └── [slug]/page.tsx # Individual blog post
│   │   ├── globals.css         # All styles (single file) — app root
│   │   └── sitemap.ts          # Dynamic sitemap, dwibahasa — app root
│   ├── components/             # React components per section
│   ├── i18n/                   # routing.ts, navigation.ts, request.ts (next-intl)
│   ├── middleware.ts           # next-intl middleware (locale detection)
│   └── lib/
│       └── blog.ts             # Blog utilities, locale-aware
├── messages/
│   ├── id.json                 # UI strings Bahasa Indonesia
│   └── en.json                 # UI strings English
├── content/
│   └── blog/
│       ├── id/                 # Artikel Bahasa Indonesia (14 file)
│       └── en/                 # Artikel English (14 file), pasangan via translationKey
├── public/
│   └── images/                 # Self-hosted photos
├── CLAUDE.md                   # Project guide for AI assistant
├── CHANGELOG.md                # Version history
├── artikeldeployment.md        # Panduan publish artikel blog
├── publishpreparation.md       # Panduan deploy ke internet
├── deploylocal.md              # Panduan dev lokal
└── manuallabor.md              # Task manual (owner)
```

## Menjalankan Secara Lokal

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Build Production

```bash
npm run build
```

Ini adalah build Next.js standar (bukan static export) — output ada di `.next/`, dan
Vercel yang menjalankannya sebagai aplikasi Next.js, termasuk middleware next-intl.

## Menambah Artikel Blog

Setiap artikel **wajib dibuat dalam dua bahasa**, dipasangkan lewat `translationKey`:

1. Buat file `.md` baru di `content/blog/id/` (Bahasa Indonesia):

```markdown
---
title: "Judul Artikel"
description: "Deskripsi 150-160 karakter."
date: "2026-07-07"
tag: "Tips Logistik"
translationKey: "nama-file-ini"
---

Isi artikel...
```

`translationKey` **selalu berisi slug Bahasa Indonesia** — inilah yang menjadi field itu
di kedua file.

2. Buat pasangannya di `content/blog/en/` dengan slug file berbeda (terjemahan, bukan
   transliterasi) tapi `translationKey` yang **sama** (slug Indonesia di atas).
3. Commit dan push — Vercel otomatis deploy.

Jika hanya salah satu bahasa yang dibuat: artikel itu hilang dari listing & sitemap
locale yang lain, tombol ganti bahasa di artikel itu tidak punya tujuan, dan pengunjung
`Accept-Language: en` yang membuka URL Indonesia artikel tersebut bisa berakhir di
halaman blog umum alih-alih artikel pasangannya. Lihat bagian "Internationalization
(i18n)" di [CLAUDE.md](CLAUDE.md) untuk detail mekanismenya, dan panduan lengkap di
[artikeldeployment.md](artikeldeployment.md).

## Deploy

Project ini di-deploy via **Vercel** sebagai aplikasi Next.js standar (Build Command:
`npm run build`, Output Directory: default Next.js — **bukan** `out`). Jika project
settings di Vercel masih menyimpan override Output Directory ke `out` dari versi static
export sebelumnya, override itu harus dihapus dulu, atau build akan gagal.

Panduan lengkap di [publishpreparation.md](publishpreparation.md).

---

&copy; 2001 — 2026 PT Transit Mega Raja. Created by [kelkurniawan](https://github.com/kelkurniawan).
