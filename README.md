# Transit — Landing Page

Website landing page untuk **PT Transit Mega Raja**, jasa ekspedisi dan angkutan barang rute Jakarta-Bandung via jalur darat. Berdiri sejak 2001.

🌐 **Domain:** [transitmr.com](https://transitmr.com) *(coming soon)*

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Custom CSS — tidak menggunakan Tailwind
- **Blog:** Markdown files via `gray-matter` + `remark` + `remark-html`
- **Deployment:** Static export (`output: "export"`) via Vercel

## Fitur

- Landing page B2B untuk jasa ekspedisi cargo
- Blog system dengan 14 artikel SEO-optimized
- JSON-LD structured data (MovingCompany, FAQPage, BlogPosting, BreadcrumbList, WebSite)
- Dynamic sitemap yang auto-include semua artikel blog
- OG image untuk social sharing
- Google Maps embed (Jakarta HQ + Cabang Bandung)
- Responsive: desktop · tablet · mobile · small mobile
- Floating WhatsApp CTA button

## Struktur Project

```
transit/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + SEO metadata + JSON-LD
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # All styles (single file)
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── blog/
│   │       ├── page.tsx        # Blog listing
│   │       └── [slug]/page.tsx # Individual blog post
│   ├── components/             # React components per section
│   └── lib/
│       └── blog.ts             # Blog utilities
├── content/
│   └── blog/                   # Markdown blog articles
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

Output static ada di folder `out/`.

## Menambah Artikel Blog

1. Buat file `.md` baru di `content/blog/`
2. Tambahkan frontmatter:

```markdown
---
title: "Judul Artikel"
description: "Deskripsi 150-160 karakter."
date: "2026-07-07"
tag: "Tips Logistik"
---

Isi artikel...
```

3. Commit dan push — Vercel otomatis deploy.

Lihat panduan lengkap di [artikeldeployment.md](artikeldeployment.md).

## Deploy

Project ini di-deploy via **Vercel** dengan konfigurasi:
- Build Command: `npm run build`
- Output Directory: `out`

Panduan lengkap di [publishpreparation.md](publishpreparation.md).

---

&copy; 2001 — 2026 PT Transit Mega Raja. Created by [kelkurniawan](https://github.com/kelkurniawan).
