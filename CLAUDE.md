# Transit — Project Guide for Claude

## Project Overview

**Company:** PT Transit Mega Raja (brand name: **Transit**)
**Industry:** B2B Freight / Logistics
**Route:** Jakarta, Tangerang, Serpong (BSD) — Kota Bandung (land transport only)
**Coverage:** Pickup — Jakarta, Tangerang, Serpong, BSD, Bekasi · Delivery — Kota Bandung, Kab. Bandung, Bandung Barat
**Operating since:** 2001
**Target customers:** Factories, distributors, B2B businesses

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Custom CSS in `src/app/globals.css` (no Tailwind)
- **Blog:** Markdown files via gray-matter + remark + remark-html
- **Deployment target:** Static export (`output: "export"` in next.config.ts)
- **Font:** Plus Jakarta Sans (Google Fonts)

## Key Business Info

| Field | Value |
|---|---|
| Brand | Transit |
| Legal Name | PT Transit Mega Raja |
| WhatsApp | +62 821-2406-4792 (link only, never display number) |
| Email | transitmegaraja@gmail.com |
| Address (HQ) | Jl. Krekot Bunder IV No.61, RT.6/RW.6, Ps. Baru, Jakarta Pusat, DKI Jakarta 10710 |
| Branch (Bandung) | Jl. Caringin No. 35-39, Kota Bandung, Jawa Barat (coords -6.946533, 107.586784) |
| Hours | Senin — Sabtu: 08:00 — 17:00 WIB |
| Domain (planned) | https://transitmr.com |

## WhatsApp Link

Always use this full link — never show the phone number as visible text:
```
https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.
```

## Brand Colors

| Variable | Hex | Usage |
|---|---|---|
| `--navy` | `#0f2a4a` | Primary background, headings |
| `--navy-light` | `#1a3d6b` | Gradients |
| `--orange` | `#f59e0b` | Accent, CTA, highlights |
| `--blue` | `#2563eb` | Links, section labels |
| `--green-wa` | `#25d366` | WhatsApp button |

## Project Structure

```
transit/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + SEO metadata + JSON-LD
│   │   ├── page.tsx            # Homepage (composes all sections)
│   │   ├── globals.css         # All CSS (single file, no Tailwind)
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── blog/
│   │       ├── page.tsx        # Blog listing
│   │       └── [slug]/page.tsx # Individual blog post
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav + mobile hamburger (client)
│   │   ├── Hero.tsx            # Hero section
│   │   ├── About.tsx           # About section
│   │   ├── Services.tsx        # 3 service cards
│   │   ├── WhyUs.tsx           # 4 stats cards
│   │   ├── PainGain.tsx        # Pain/gain comparison (problems vs Transit)
│   │   ├── Process.tsx         # 4-step process
│   │   ├── Route.tsx           # Jakarta-Bandung route info
│   │   ├── FAQ.tsx             # Accordion FAQ (client)
│   │   ├── CTA.tsx             # Call to action
│   │   ├── Contact.tsx         # Contact + Google Maps
│   │   ├── Footer.tsx          # Footer with social links
│   │   ├── WhatsAppFloat.tsx   # Floating WA button (bottom-right)
│   │   ├── FadeInObserver.tsx  # IntersectionObserver fade-in (client)
│   │   └── icons/
│   │       ├── LogoIcon.tsx    # SVG truck logo
│   │       └── WhatsAppIcon.tsx
│   └── lib/
│       └── blog.ts             # getAllPosts, getPostBySlug, getAllPostSlugs
├── content/
│   └── blog/                   # Markdown blog articles (.md files)
├── public/
│   ├── images/             # Self-hosted photos (Unsplash, free license)
│   │   ├── hero-truck.jpg
│   │   └── about-warehouse.jpg
│   ├── robots.txt
│   ├── favicon.ico
│   └── favicon.svg
├── CLAUDE.md                   # This file
├── CHANGELOG.md
├── deploylocal.md
├── publishpreparation.md
└── manuallabor.md
```

## Coding Conventions

- **No Tailwind** — all styles go in `globals.css` using CSS variables
- **Client components** — add `"use client"` only when using hooks or browser APIs
- **No phone number as text** — always use the `wa.me` link, never display the number
- **Brand name in text** — use "Transit" (not "PT Transit Mega Raja") in all visible text
- **Legal name** — "PT Transit Mega Raja" is only used in JSON-LD `legalName` field
- **Blog posts** — add `.md` files to `content/blog/` with frontmatter: `title`, `description`, `date`, `tag`
- **Responsive breakpoints:** desktop (1024px+), tablet (769px–1024px), mobile (≤768px), small mobile (≤480px)

## SEO Notes

- Structured data (JSON-LD): `MovingCompany` schema in `layout.tsx`, `FAQPage` schema in `page.tsx`
- Target keywords: "jasa ekspedisi jakarta bandung", "angkutan barang jakarta bandung", "jasa angkutan barang"
- Blog is the primary long-term SEO strategy — publish new articles regularly
- Sitemap URL must be updated once real domain is live

## Social Media (Placeholder — needs real URLs)

Footer.tsx currently has `href="#"` for Instagram, X, and Threads.
Update these when accounts are created.
