# Transit — Project Guide for Claude

## Project Overview

**Company:** PT Transit Mega Raja (brand name: **Transit**)
**Industry:** B2B Freight / Logistics
**Route:** Two-way / bidirectional — Jakarta, Tangerang, Serpong (BSD), Bekasi ⇄ Bandung Raya (land transport only)
**Coverage:** Bidirectional. Jabodetabek side — Jakarta, Tangerang, Serpong, BSD, Bekasi · Bandung side — Kota Bandung, Kab. Bandung, Bandung Barat. **Both regions serve as pickup AND delivery.**
**Operating since:** 2001
**Target customers:** Factories, distributors, B2B businesses

### Business model: hub-and-spoke (read this before writing any copy)

The operation is **hub-and-spoke**, not a mesh of point-to-point routes:

- **Line-haul (trunk):** Jakarta ⇄ Bandung, genuinely **two-way**. Both directions are real freight movements, run daily. This is the only long-distance leg.
- **Spokes:** the surrounding areas are served as **pickup and delivery from the pools/warehouses** in Jakarta and Bandung — Jabodetabek side: Tangerang, Serpong, BSD, Bekasi · Bandung side: Kota Bandung, Kabupaten Bandung, Bandung Barat.

**Copy constraint:** never imply direct point-to-point trucking between a spoke and the far city (e.g. a dedicated Bandung → Bekasi truck). The accurate framing is *line-haul between the two cities, plus local pickup/delivery around each pool*. A shipment from Bandung to Bekasi rides the Bandung → Jakarta line-haul and is delivered on to Bekasi from the Jakarta side. Two-way claims about the **Jakarta ⇄ Bandung route itself** are always true and must appear in **both** languages; two-way claims about a **spoke** must be phrased so they resolve back to the line-haul. Do not invent capability beyond this when writing new articles.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **i18n:** [next-intl](https://next-intl.dev) — middleware-based locale routing (Indonesian + English)
- **Styling:** Custom CSS in `src/app/globals.css` (no Tailwind)
- **Blog:** Markdown files via gray-matter + remark + remark-html, split per locale
- **Deployment:** Vercel — standard Next.js app with statically generated pages. There is **no** `output: "export"` (it was removed): static export cannot run middleware, and next-intl's middleware is what selects/redirects the locale on every request.
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
| Domain (live) | https://transitexpress.my.id — registrar Domainesia, DNS → Vercel |

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
│   │   ├── [locale]/
│   │   │   ├── layout.tsx      # Root layout + SEO metadata + JSON-LD (per locale)
│   │   │   ├── page.tsx        # Homepage (composes all sections)
│   │   │   └── blog/
│   │   │       ├── page.tsx        # Blog listing (locale-aware)
│   │   │       └── [slug]/page.tsx # Individual blog post + cross-locale slug redirect
│   │   ├── globals.css         # All CSS (single file, no Tailwind) — stays at app root
│   │   └── sitemap.ts          # Dynamic sitemap, both locales — stays at app root
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav + mobile hamburger (client)
│   │   ├── Hero.tsx            # Hero section
│   │   ├── About.tsx           # About section
│   │   ├── Services.tsx        # 3 service cards
│   │   ├── WhyUs.tsx           # 4 stats cards
│   │   ├── PainGain.tsx        # Pain/gain comparison (problems vs Transit)
│   │   ├── Process.tsx         # 4-step process
│   │   ├── Route.tsx           # Two-way Jakarta⇄Bandung route info
│   │   ├── FAQ.tsx             # Accordion FAQ (client)
│   │   ├── CTA.tsx             # Call to action
│   │   ├── Contact.tsx         # Contact + Google Maps
│   │   ├── Footer.tsx          # Footer with social links
│   │   ├── WhatsAppFloat.tsx   # Floating WA button (bottom-right)
│   │   ├── LanguageSwitcher.tsx # ID/EN toggle (optional slugMap on article pages)
│   │   ├── FadeInObserver.tsx  # IntersectionObserver fade-in (client)
│   │   └── icons/
│   │       ├── LogoIcon.tsx    # SVG truck logo
│   │       └── WhatsAppIcon.tsx
│   ├── i18n/
│   │   ├── routing.ts          # Locale list, default locale, localePrefix
│   │   ├── navigation.ts       # Locale-aware Link / useRouter / redirect
│   │   └── request.ts          # Resolves the request locale + loads its messages
│   ├── middleware.ts           # next-intl middleware — locale detection & redirects
│   └── lib/
│       └── blog.ts             # Locale-aware getAllPosts/getPostBySlug/getAllPostSlugs,
│                                # + getTranslatedSlug, findLocaleForSlug
├── messages/
│   ├── id.json                 # Indonesian UI strings (repo root, not under src/)
│   └── en.json                 # English UI strings
├── content/
│   └── blog/
│       ├── id/                 # Indonesian articles (.md) — 14 files
│       └── en/                 # English articles (.md) — 14 files, paired via translationKey
├── public/
│   ├── images/                 # Self-hosted photos (Unsplash, free license)
│   │   ├── hero-truck.jpg
│   │   ├── about-warehouse.jpg
│   │   └── og-image.jpg
│   ├── robots.txt
│   └── favicon.svg
├── CLAUDE.md                   # This file
├── CHANGELOG.md
├── deploylocal.md
├── publishpreparation.md
├── artikeldeployment.md
└── manuallabor.md
```

## Internationalization (i18n)

The site is bilingual (Indonesian + English), powered by **next-intl**.

- **Locales:** `id` (Indonesian) and `en` (English), declared in `src/i18n/routing.ts`. `id` is the `defaultLocale`.
- **URL scheme — `localePrefix: 'as-needed'`:** because `id` is the default locale, Indonesian URLs carry **no locale prefix** (`/`, `/blog`, `/blog/<slug>`). English URLs are always prefixed with `/en` (`/en`, `/en/blog`, `/en/blog/<slug>`).
- **Routing internals:** `src/i18n/routing.ts` (locale list/default/prefix policy), `src/i18n/navigation.ts` (locale-aware `Link`, `useRouter`, `redirect`, `usePathname`), `src/i18n/request.ts` (resolves the active locale per request and loads its messages), `src/middleware.ts` (runs next-intl's middleware).
- **Indonesian is primary, English is opt-in — `localeDetection: false`.** Automatic locale detection is deliberately **off** in `routing.ts`, so neither the `Accept-Language` header nor the `NEXT_LOCALE` cookie influences which language a visitor gets. Every unprefixed URL always serves Indonesian; `/en` is reached only when the visitor presses the EN toggle. This is intentional: English-configured phones are very common in Indonesia, and with detection on, local factory/distributor prospects were being sent to the English site they never asked for. Consequence to keep in mind: the choice is **not remembered between visits** — a visitor who picks EN and returns later to the bare URL gets Indonesian again.
- **UI strings:** all component-facing text lives in `messages/id.json` and `messages/en.json` at the **repo root** (not under `src/`) — do not hardcode UI text in components; add a message key and read it via `next-intl`.
- **Blog content — `content/blog/{id,en}/`:** each locale has its own directory of 14 `.md` files. Every article's frontmatter has a `translationKey` field, and its value is **always the Indonesian slug** of the pair — `src/lib/blog.ts` (`getTranslatedSlug`, `findLocaleForSlug`) uses it to look up the sibling article in the other locale. English slugs are deliberately different strings from the Indonesian ones (translated, not transliterated), so slugs cannot be compared directly across locales — only `translationKey` can.
- **Adding a new article — always add BOTH language versions**, one `.md` file in `content/blog/id/` and its paired `.md` file in `content/blog/en/`, with **matching `translationKey` values** (the Indonesian slug). Skipping one side breaks things silently:
  - The article won't appear in that locale's blog listing or in `sitemap.ts`'s output.
  - The `LanguageSwitcher` on that article has no pair to link to and falls back to the blog listing instead of the sibling article.
  - A visitor who lands on `/en/blog/<indonesian-slug>` — e.g. by editing the URL, or from a stale link — would 404, because ID and EN slugs are different strings. `src/app/[locale]/blog/[slug]/page.tsx` detects this cross-locale mismatch and redirects to the real paired URL, but only when a pair exists. With only one side published there is no pair, so the visitor is sent to the blog listing for that locale instead — a working page they can browse, but the article itself is unreachable in their language. (Before `localeDetection` was turned off this happened automatically to every `Accept-Language: en` visitor; it is now an edge case, but the guard is still needed.)

## Coding Conventions

- **No Tailwind** — all styles go in `globals.css` using CSS variables
- **Client components** — add `"use client"` only when using hooks or browser APIs
- **No phone number as text** — always use the `wa.me` link, never display the number
- **Brand name in text** — use "Transit" (not "PT Transit Mega Raja") in all visible text
- **Legal name** — "PT Transit Mega Raja" is only used in JSON-LD `legalName` field
- **Blog posts** — add `.md` files to **both** `content/blog/id/` and `content/blog/en/`, with frontmatter: `title`, `description`, `date`, `tag`, `translationKey` (see Internationalization section above)
- **Responsive breakpoints:** desktop (1024px+), tablet (769px–1024px), mobile (≤768px), small mobile (≤480px)

## SEO Notes

- Structured data (JSON-LD): `MovingCompany` schema in `[locale]/layout.tsx`, `FAQPage` schema in `[locale]/page.tsx`
- Target keywords: "jasa ekspedisi jakarta bandung", "angkutan barang jakarta bandung", "jasa angkutan barang" — plus reverse-direction variants ("ekspedisi bandung jakarta", "cargo bandung jakarta")
- Blog is the primary long-term SEO strategy — publish new articles regularly, in both locales (see Internationalization above)
- Sitemap base URL is `https://transitexpress.my.id` (set in `sitemap.ts`, `[locale]/layout.tsx`, `[locale]/blog/[slug]/page.tsx`, `robots.txt`); `sitemap.ts` emits both locales, 32 URLs total
- `hreflang` alternates (`id`/`en`/`x-default`) are set per page via `alternates.languages` in each route's `generateMetadata`, so ID and EN pages point at each other

## Social Media (Placeholder — needs real URLs)

Footer.tsx currently has `href="#"` for Instagram, X, and Threads.
Update these when accounts are created.
