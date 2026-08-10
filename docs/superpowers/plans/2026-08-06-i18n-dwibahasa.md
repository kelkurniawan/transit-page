# Situs Dwibahasa ID/EN — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membuat situs Transit tersedia penuh dalam Bahasa Indonesia dan Inggris, dengan tombol bahasa yang berfungsi, deteksi bahasa otomatis, dan SEO dua bahasa.

**Architecture:** Seluruh rute dipindah ke `src/app/[locale]/` dengan next-intl. Bahasa Indonesia tetap di akar tanpa prefix (`localePrefix: 'as-needed'`), Inggris di `/en`. Teks UI dipindah dari string hardcoded ke `messages/{id,en}.json`. Artikel blog dipisah ke `content/blog/id/` dan `content/blog/en/`, dipasangkan lewat `translationKey`.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19.2.7, TypeScript, next-intl 4.13.5, gray-matter + remark (blog markdown), CSS kustom di `globals.css`.

**Spec:** [`docs/superpowers/specs/2026-08-06-i18n-dwibahasa-design.md`](../specs/2026-08-06-i18n-dwibahasa-design.md)

## Global Constraints

- **next-intl versi `^4.13.5`** — peer deps mendukung Next `^16.0.0` dan React `^19.0.0`.
- **Locales:** `['id', 'en']`, `defaultLocale: 'id'`, `localePrefix: 'as-needed'`.
- **URL Bahasa Indonesia tidak boleh berubah.** `/`, `/blog`, `/blog/<slug>` harus tetap merespons 200 dengan slug yang sama persis seperti sekarang.
- **`translationKey`** selalu bernilai slug Bahasa Indonesia artikel tersebut.
- **Domain produksi:** `https://transitexpress.my.id` (jangan pernah menulis ulang jadi `transitmr.com`).
- **Tanpa Tailwind.** Seluruh gaya ada di `src/app/globals.css` memakai variabel CSS. Jangan menambah framework CSS.
- **Nomor telepon tidak pernah ditampilkan sebagai teks.** Selalu pakai tautan WhatsApp persis: `https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.`
- **Nama merek** dalam teks tampak selalu "Transit". "PT Transit Mega Raja" hanya boleh muncul di field `legalName` pada JSON-LD.
- **Rute dua arah.** Seluruh salinan teks (kedua bahasa) harus mencerminkan layanan Jakarta⇄Bandung dua arah, bukan satu arah.
- **`"use client"`** hanya ditambahkan bila komponen memakai hook React atau API peramban.

## Catatan Pengujian

Proyek ini **tidak memiliki framework test** (tidak ada Jest/Vitest/Playwright di `package.json`), dan seluruh 10 kriteria verifikasi di spec dapat diamati lewat HTTP. Menambah framework test bukan bagian dari pekerjaan ini.

Karena itu siklus test tiap task adalah:

1. Jalankan dev server: `npm run dev` (port 3000)
2. Jalankan perintah `curl`/`grep` yang tertulis di task — inilah assertion-nya
3. `npm run build` harus lolos sebelum commit

**Sebelum Task 1**, catat kondisi awal sebagai pembanding:

```bash
npm run build 2>&1 | tail -3   # harus lolos
curl -s localhost:3000 | grep -c "lang-toggle"   # 1 (tombol mati)
```

---

### Task 1: Fondasi next-intl & pemindahan rute

Menyiapkan seluruh infrastruktur i18n dan memindahkan rute ke `[locale]`. Setelah task ini, `/` dan `/en` **sama-sama merespons 200** tetapi keduanya masih berbahasa Indonesia — terjemahan belum dikerjakan. Ini disengaja: memisahkan risiko restrukturisasi routing dari risiko terjemahan.

**Files:**
- Modify: `package.json` (tambah `next-intl`)
- Modify: `next.config.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `messages/id.json`, `messages/en.json`
- Move: `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- Move: `src/app/blog/` → `src/app/[locale]/blog/`
- Keep in place: `src/app/globals.css`, `src/app/sitemap.ts`

**Interfaces:**
- Produces: `routing` (dari `@/i18n/routing`) — objek `defineRouting` berisi `locales`, `defaultLocale`, `localePrefix`
- Produces: `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` (dari `@/i18n/navigation`)
- Produces: berkas pesan `messages/id.json` & `messages/en.json` (task berikutnya mengisinya)

- [ ] **Step 1: Pasang dependensi**

```bash
npm install next-intl@^4.13.5
```

- [ ] **Step 2: Buat konfigurasi routing**

`src/i18n/routing.ts`:

```ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed'
});
```

- [ ] **Step 3: Buat helper navigasi**

`src/i18n/navigation.ts`:

```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

- [ ] **Step 4: Buat pemuat pesan**

`src/i18n/request.ts`:

```ts
import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 5: Buat middleware**

`src/middleware.ts`:

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};
```

- [ ] **Step 6: Perbarui `next.config.ts`**

Hapus `output: "export"` (memblokir middleware) dan `images.unoptimized`, lalu bungkus dengan plugin next-intl:

```ts
import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Buat berkas pesan awal**

`messages/id.json` dan `messages/en.json` — keduanya diisi objek kosong dulu, agar `request.ts` punya sesuatu untuk dimuat:

```json
{}
```

- [ ] **Step 8: Pindahkan rute ke `[locale]`**

```bash
mkdir -p src/app/\[locale\]
git mv src/app/layout.tsx src/app/\[locale\]/layout.tsx
git mv src/app/page.tsx src/app/\[locale\]/page.tsx
git mv src/app/blog src/app/\[locale\]/blog
```

`globals.css` dan `sitemap.ts` **tetap** di `src/app/`.

- [ ] **Step 9: Sesuaikan `[locale]/layout.tsx`**

Tambahkan `generateStaticParams`, validasi locale, `setRequestLocale`, `<html lang={locale}>` dinamis, dan bungkus dengan provider. Impor `./globals.css` menjadi `../globals.css`.

```tsx
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Pertahankan seluruh isi `<head>`/metadata/JSON-LD yang sudah ada apa adanya — penerjemahannya dikerjakan di Task 5.

- [ ] **Step 10: Tambahkan `setRequestLocale` di tiap page**

Di `[locale]/page.tsx`, `[locale]/blog/page.tsx`, dan `[locale]/blog/[slug]/page.tsx`, ambil `locale` dari params lalu panggil `setRequestLocale(locale)` sebelum apa pun. Tanpa ini rendering statis tidak aktif. Contoh untuk `[locale]/page.tsx`:

```tsx
import {setRequestLocale} from 'next-intl/server';

export default async function Home({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (/* isi yang sudah ada */);
}
```

`[locale]/blog/[slug]/page.tsx` sudah punya `generateStaticParams` — pertahankan, tapi kembalikan kombinasi locale × slug:

```tsx
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs().map((slug) => ({locale, slug}))
  );
}
```

⚠️ `getAllPostSlugs()` di sini sengaja dipanggil **tanpa argumen** — pada Task 1 `blog.ts` masih memakai tanda tangan lama. Task 6 mengubahnya menjadi `getAllPostSlugs(locale)` dan memperbarui pemanggilan ini. Jangan mengubahnya lebih awal; `content/blog/id/` belum ada sampai Task 6.

- [ ] **Step 11: Jalankan verifikasi**

```bash
npm run build 2>&1 | tail -5
npm run dev &
sleep 4
for u in / /en /blog /en/blog; do
  printf "%-12s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' localhost:3000$u)"
done
curl -s localhost:3000/en | grep -o '<html lang="[a-z]*"'
curl -s localhost:3000/  | grep -o '<html lang="[a-z]*"'
```

Expected: keempat rute `200`; `/en` → `<html lang="en"`; `/` → `<html lang="id"`.

- [ ] **Step 12: Verifikasi deteksi bahasa otomatis**

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" -H "Accept-Language: en-US" localhost:3000/
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" -H "Accept-Language: id-ID" localhost:3000/
```

Expected: `Accept-Language: en-US` menghasilkan redirect ke `/en`; `id-ID` tetap `200` di `/`.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat(i18n): fondasi next-intl dan pemindahan rute ke [locale]"
```

---

### Task 2: Tombol bahasa yang berfungsi (bug yang dilaporkan)

Mengganti `div.lang-toggle` mati di Navbar dengan komponen sungguhan. Dikerjakan lebih awal karena inilah keluhan asli pemilik, dan karena task-task berikutnya butuh cara untuk berpindah bahasa saat pengujian manual.

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Navbar.tsx:35-39`
- Modify: `messages/id.json`, `messages/en.json`

**Interfaces:**
- Consumes: `usePathname`, `useRouter` dari `@/i18n/navigation` (Task 1)
- Produces: komponen `<LanguageSwitcher />`

- [ ] **Step 1: Buat komponen**

`src/components/LanguageSwitcher.tsx`. `usePathname()` dari next-intl mengembalikan path **tanpa** prefix locale, sehingga halaman yang sedang dibuka otomatis dipertahankan saat berpindah:

```tsx
"use client";

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="lang-toggle">
      {(['id', 'en'] as const).map((lang) => (
        <button
          key={lang}
          className={locale === lang ? 'active' : undefined}
          aria-current={locale === lang ? 'true' : undefined}
          aria-label={lang === 'id' ? 'Bahasa Indonesia' : 'English'}
          onClick={() => router.replace(pathname, {locale: lang})}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Pasang di Navbar**

Di `src/components/Navbar.tsx`, ganti blok `<div className="lang-toggle">…</div>` (baris 36–39) dengan `<LanguageSwitcher />` dan tambahkan impornya. Kelas CSS `.lang-toggle` dan `.lang-toggle button.active` di `globals.css` sudah ada — jangan diubah.

- [ ] **Step 3: Verifikasi berpindah dan mempertahankan halaman**

```bash
npm run dev &
sleep 4
curl -s localhost:3000/blog | grep -o 'class="active"' | head -1
curl -s localhost:3000/en/blog | grep -c 'lang-toggle'
```

Expected: keduanya menemukan elemen. Lalu uji manual di peramban: buka `/blog`, klik `EN` → URL menjadi `/en/blog` (**bukan** `/en`). Klik `ID` → kembali ke `/blog`.

- [ ] **Step 4: Verifikasi locale aktif ditandai dari nilai sebenarnya**

```bash
curl -s localhost:3000/    | grep -oE '<button[^>]*class="active"[^>]*>[A-Z]{2}'
curl -s localhost:3000/en  | grep -oE '<button[^>]*class="active"[^>]*>[A-Z]{2}'
```

Expected: `/` menandai `ID`, `/en` menandai `EN`. Kalau keduanya menandai `ID`, komponen masih hardcoded.

- [ ] **Step 5: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "fix(i18n): tombol bahasa ID/EN kini berfungsi dan mempertahankan halaman"
```

---

### Task 3: Terjemahkan Navbar, Footer, CTA, Contact, WhatsAppFloat

Memulai ekstraksi teks. Lima komponen kerangka situs ini dikerjakan bersama karena saling terkait (navigasi + ajakan bertindak) dan totalnya kecil.

**Files:**
- Modify: `src/components/Navbar.tsx`, `Footer.tsx`, `CTA.tsx`, `Contact.tsx`, `WhatsAppFloat.tsx`
- Modify: `messages/id.json`, `messages/en.json`

**Interfaces:**
- Consumes: `NextIntlClientProvider` (Task 1)
- Produces: namespace pesan `Nav`, `Footer`, `CTA`, `Contact`

- [ ] **Step 1: Inventaris kunci pesan**

Tambahkan ke `messages/id.json` (nilai = teks Indonesia yang **sudah ada di komponen**, salin persis):

```json
{
  "Nav": {
    "about": "Tentang Kami",
    "services": "Layanan",
    "route": "Rute",
    "blog": "Blog",
    "faq": "FAQ",
    "contact": "Kontak",
    "quote": "Minta Penawaran",
    "menu": "Menu",
    "home": "Transit — Beranda"
  },
  "CTA": {
    "heading": "Siap Mengirim Barang via Ekspedisi Jakarta-Bandung?"
  },
  "Contact": {
    "intro": "lebih lanjut mengenai jasa ekspedisi dan angkutan barang Jakarta-Bandung."
  },
  "Footer": {
    "tagline": "Jasa ekspedisi dan angkutan barang terpercaya rute Jakarta-Bandung via jalur darat."
  },
  "WhatsApp": {
    "label": "Chat via WhatsApp"
  }
}
```

Lengkapi dengan **seluruh** string sisanya yang muncul di kelima berkas tersebut — baca tiap berkas dan pindahkan setiap teks yang terlihat pengguna.

- [ ] **Step 2: Terjemahkan ke `messages/en.json`**

Struktur kunci identik. Pedoman istilah (dipakai konsisten di seluruh plan):

| Indonesia | Inggris |
|---|---|
| jasa ekspedisi | freight service |
| angkutan barang | goods transport / freight |
| pengiriman | shipping / delivery |
| cargo / kargo | cargo |
| jalur darat | land route / overland |
| tepat waktu | on-time |
| Minta Penawaran | Request a Quote |
| Tentang Kami | About Us |
| Rute | Routes |
| dua arah | two-way / bidirectional |

Contoh:

```json
{
  "Nav": {
    "about": "About Us",
    "services": "Services",
    "route": "Routes",
    "blog": "Blog",
    "faq": "FAQ",
    "contact": "Contact",
    "quote": "Request a Quote",
    "menu": "Menu",
    "home": "Transit — Home"
  },
  "CTA": {
    "heading": "Ready to Ship Your Goods Between Jakarta and Bandung?"
  }
}
```

- [ ] **Step 3: Ubah komponen memakai `useTranslations`**

Pola untuk komponen server (tanpa hook lain):

```tsx
import {useTranslations} from 'next-intl';

export default function CTA() {
  const t = useTranslations('CTA');
  return <h2>{t('heading')}</h2>;
}
```

`Navbar.tsx` sudah `"use client"` — `useTranslations` bekerja sama saja di sana.

- [ ] **Step 4: Verifikasi**

```bash
npm run dev &
sleep 4
echo "--- EN tidak boleh mengandung teks Indonesia ---"
curl -s localhost:3000/en | grep -oE "Minta Penawaran|Tentang Kami|Kontak" || echo "✓ bersih"
echo "--- EN harus memuat terjemahan ---"
curl -s localhost:3000/en | grep -o "Request a Quote" | head -1
echo "--- ID harus tetap Indonesia ---"
curl -s localhost:3000/ | grep -o "Minta Penawaran" | head -1
```

Expected: baris pertama mencetak `✓ bersih`; dua berikutnya menemukan teks.

- [ ] **Step 5: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "feat(i18n): terjemahkan Navbar, Footer, CTA, Contact, WhatsAppFloat"
```

---

### Task 4: Terjemahkan komponen isi halaman

Sembilan komponen sisanya: `Hero`, `About`, `Services`, `WhyUs`, `PainGain`, `Process`, `Route`, `FAQ`, `TrustedBy` sudah dihapus sehingga tidak termasuk.

**Files:**
- Modify: `src/components/Hero.tsx`, `About.tsx`, `Services.tsx`, `WhyUs.tsx`, `PainGain.tsx`, `Process.tsx`, `Route.tsx`, `FAQ.tsx`
- Modify: `messages/id.json`, `messages/en.json`

**Interfaces:**
- Produces: namespace `Hero`, `About`, `Services`, `WhyUs`, `PainGain`, `Process`, `Route`, `FAQ`

- [ ] **Step 1: Ekstrak per komponen ke `messages/id.json`**

Kerjakan satu komponen pada satu waktu. Untuk daftar berulang (kartu layanan, langkah proses, butir FAQ) pakai array pesan, contoh untuk `FAQ.tsx` yang berisi 6 tanya-jawab:

```json
{
  "FAQ": {
    "title": "Pertanyaan yang Sering Diajukan",
    "items": [
      {
        "q": "Berapa biaya pengiriman barang Jakarta-Bandung?",
        "a": "Biaya pengiriman barang dari Jakarta ke Bandung bervariasi tergantung jenis barang, volume, dan berat…"
      }
    ]
  }
}
```

Baca isi array dengan `t.raw('items')` agar mendapat array objek:

```tsx
const t = useTranslations('FAQ');
const items = t.raw('items') as Array<{q: string; a: string}>;
```

- [ ] **Step 2: Perhatikan teks yang wajib tetap dua arah**

Saat menerjemahkan `Hero` dan `Route`, pertahankan makna dua arah yang baru saja ditetapkan:

- Hero: "pengiriman barang dua arah — Jakarta–Bandung maupun Bandung–Jakarta" → *"two-way shipping — Jakarta–Bandung and Bandung–Jakarta"*
- Route: "Pickup dari Jabodetabek & Bandung" → *"Pickup from Greater Jakarta & Bandung"*
- Route: label chip "Area Jabodetabek" / "Area Bandung Raya" → *"Greater Jakarta Area"* / *"Greater Bandung Area"*
- Hero `alt` gambar dan `aria-label` peta di Route juga ikut diterjemahkan

- [ ] **Step 3: Terjemahkan ke `messages/en.json`** memakai tabel istilah di Task 3 Step 2.

- [ ] **Step 4: Verifikasi tidak ada sisa Bahasa Indonesia**

```bash
npm run dev &
sleep 4
curl -s localhost:3000/en | grep -oE "Layanan|Pengiriman|Hubungi|Tentang Kami|Minta Penawaran|Terpercaya|Rute|Mengapa|Proses" \
  && echo "✗ MASIH ADA teks Indonesia di /en" || echo "✓ bersih"
```

Expected: `✓ bersih`. Bila ada yang tersisa, komponen tersebut belum diubah.

- [ ] **Step 5: Verifikasi versi Indonesia tidak rusak**

```bash
curl -s localhost:3000/ | grep -oE "Minta Penawaran|Tentang Kami|Rute" | sort -u
```

Expected: ketiganya muncul.

- [ ] **Step 6: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "feat(i18n): terjemahkan seluruh komponen isi halaman"
```

---

### Task 5: Metadata, Open Graph, dan JSON-LD per locale

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `messages/id.json`, `messages/en.json`

**Interfaces:**
- Consumes: `getTranslations` dari `next-intl/server`
- Produces: namespace `Meta`, `Schema`

- [ ] **Step 1: Pindahkan metadata ke pesan**

Tambahkan namespace `Meta` berisi `title`, `description`, `ogTitle`, `ogDescription`, `ogImageAlt`, dan `keywords` (array). Untuk `en`, gunakan kata kunci yang benar-benar dipakai pencari internasional — **bukan** terjemahan harfiah kata kunci Indonesia:

```json
{
  "Meta": {
    "keywords": [
      "freight forwarder jakarta bandung",
      "trucking service indonesia",
      "land transport jakarta bandung",
      "cargo delivery indonesia",
      "b2b logistics indonesia",
      "3pl partner indonesia",
      "factory logistics jakarta",
      "overland freight java",
      "ftl ltl indonesia",
      "bandung jakarta trucking"
    ]
  }
}
```

- [ ] **Step 2: Ubah `generateMetadata` menjadi sadar-locale**

```tsx
import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});

  return {
    metadataBase: new URL('https://transitexpress.my.id'),
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    alternates: {
      canonical: locale === 'id' ? '/' : '/en',
      languages: {
        id: '/',
        en: '/en',
        'x-default': '/'
      }
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: locale === 'id' ? '/' : '/en'
    }
  };
}
```

- [ ] **Step 3: Terjemahkan JSON-LD**

`layout.tsx` memuat schema `MovingCompany` dan `page.tsx` memuat `FAQPage`. Pindahkan seluruh field teksnya (`description`, `name`, dan tiap `question`/`answer`) ke namespace `Schema`, lalu bangun objek JSON-LD dari `getTranslations`. **`legalName` tetap `"PT Transit Mega Raja"` di kedua bahasa** — itu nama badan hukum, bukan teks yang diterjemahkan. Alamat, koordinat, jam operasional, dan tautan WhatsApp juga tidak diterjemahkan.

- [ ] **Step 4: Verifikasi hreflang & metadata**

```bash
npm run dev &
sleep 4
echo "--- hreflang di / ---"
curl -s localhost:3000/ | grep -oE '<link rel="alternate" hreflang="[^"]*" href="[^"]*"'
echo "--- hreflang di /en ---"
curl -s localhost:3000/en | grep -oE '<link rel="alternate" hreflang="[^"]*" href="[^"]*"'
echo "--- description ---"
curl -s localhost:3000/en | grep -o '<meta name="description" content="[^"]*"'
```

Expected: kedua halaman memuat `hreflang="id"`, `hreflang="en"`, dan `hreflang="x-default"` yang saling menunjuk; description `/en` berbahasa Inggris.

- [ ] **Step 5: Verifikasi JSON-LD**

```bash
curl -s localhost:3000/en | grep -o '"legalName":"[^"]*"'
curl -s localhost:3000/en | grep -o '"@type":"FAQPage"'
```

Expected: `legalName` bernilai `PT Transit Mega Raja`; schema FAQPage ada.

- [ ] **Step 6: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "feat(i18n): metadata, Open Graph, hreflang, dan JSON-LD per locale"
```

---

### Task 6: Struktur blog dwibahasa

Memisahkan artikel per bahasa dan membuat `blog.ts` sadar-locale. Terjemahan artikelnya sendiri menyusul di Task 7–10; setelah task ini `/en/blog` sah menampilkan daftar kosong.

**Files:**
- Move: `content/blog/*.md` → `content/blog/id/`
- Create: `content/blog/en/` (kosong)
- Modify: seluruh 14 berkas di `content/blog/id/` (tambah `translationKey`)
- Modify: `src/lib/blog.ts`
- Modify: `src/app/[locale]/blog/page.tsx`, `src/app/[locale]/blog/[slug]/page.tsx`

**Interfaces:**
- Produces: `getAllPosts(locale: string): BlogPost[]`
- Produces: `getPostBySlug(locale: string, slug: string): Promise<BlogPost | null>`
- Produces: `getAllPostSlugs(locale: string): string[]`
- Produces: `getTranslatedSlug(translationKey: string, targetLocale: string): string | null`
- Produces: `BlogPost` bertambah field `translationKey: string`

- [ ] **Step 1: Pindahkan artikel**

```bash
mkdir -p content/blog/id content/blog/en
git mv content/blog/*.md content/blog/id/
ls content/blog/id/*.md | wc -l   # harus 14
```

- [ ] **Step 2: Tambahkan `translationKey` ke tiap artikel**

Nilainya = nama berkas tanpa `.md`:

```bash
for f in content/blog/id/*.md; do
  key=$(basename "$f" .md)
  grep -q '^translationKey:' "$f" || \
    perl -0pi -e "s/^(---\n)/\$1translationKey: \"$key\"\n/" "$f"
done
grep -c '^translationKey:' content/blog/id/*.md | grep -c ':1'   # harus 14
```

- [ ] **Step 3: Tulis ulang `src/lib/blog.ts`**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentRoot = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  translationKey: string;
  content?: string;
}

function dirFor(locale: string) {
  return path.join(contentRoot, locale);
}

export function getAllPosts(locale: string): BlogPost[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, fileName), "utf8"));
      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        tag: data.tag ?? "Artikel",
        translationKey: data.translationKey ?? slug,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const fullPath = path.join(dirFor(locale), `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content: mdContent } = matter(
    fs.readFileSync(fullPath, "utf8")
  );
  const processed = await remark().use(html).process(mdContent);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tag: data.tag ?? "Artikel",
    translationKey: data.translationKey ?? slug,
    content: processed.toString(),
  };
}

export function getAllPostSlugs(locale: string): string[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getTranslatedSlug(
  translationKey: string,
  targetLocale: string
): string | null {
  const match = getAllPosts(targetLocale).find(
    (p) => p.translationKey === translationKey
  );
  return match ? match.slug : null;
}
```

- [ ] **Step 4: Perbarui halaman blog**

Kedua halaman menerima `locale` dari params dan meneruskannya. `generateStaticParams` di `[slug]/page.tsx` menjadi:

```tsx
import {routing} from '@/i18n/routing';
import {getAllPostSlugs} from '@/lib/blog';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({locale, slug}))
  );
}
```

- [ ] **Step 5: Verifikasi**

```bash
npm run build 2>&1 | tail -3
npm run dev &
sleep 4
curl -s -o /dev/null -w "blog ID: %{http_code}\n" localhost:3000/blog
curl -s -o /dev/null -w "blog EN: %{http_code}\n" localhost:3000/en/blog
curl -s -o /dev/null -w "artikel ID: %{http_code}\n" localhost:3000/blog/tips-memilih-jasa-ekspedisi-jakarta-bandung
curl -s localhost:3000/blog | grep -c '/blog/'
```

Expected: `/blog` = 200 dengan 14 tautan artikel; `/en/blog` = 200 (daftar kosong, wajar); artikel Indonesia = 200 dengan **slug tidak berubah**.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(blog): struktur dwibahasa dan API blog.ts sadar-locale"
```

---

### Task 7–10: Terjemahkan 14 artikel blog

Empat task dengan bentuk identik, masing-masing menerjemahkan sekelompok artikel. Dipecah agar tiap kelompok bisa ditinjau terpisah — 11.197 kata terlalu besar untuk satu gerbang tinjauan.

**Pembagian:**

| Task | Artikel (`translationKey`) | Slug Inggris |
|---|---|---|
| **7** | `tips-memilih-jasa-ekspedisi-jakarta-bandung` | `how-to-choose-a-jakarta-bandung-freight-service` |
| | `biaya-pengiriman-barang-jakarta-bandung` | `jakarta-bandung-shipping-costs` |
| | `berapa-lama-pengiriman-barang-jakarta-ke-bandung` | `how-long-does-jakarta-to-bandung-shipping-take` |
| | `keuntungan-ekspedisi-darat-jakarta-bandung` | `benefits-of-land-freight-jakarta-bandung` |
| **8** | `transportasi-darat-jakarta-bandung` | `jakarta-bandung-land-transportation` |
| | `panduan-ekspedisi-jakarta-bandung-untuk-pemula` | `jakarta-bandung-freight-guide-for-beginners` |
| | `ftl-vs-ltl-memilih-muatan-truk-untuk-bisnis` | `ftl-vs-ltl-choosing-the-right-truckload` |
| | `logistik-b2b-jakarta-bandung-untuk-pabrik-distributor` | `b2b-logistics-jakarta-bandung-for-factories` |
| **9** | `pengiriman-barang-tangerang-serpong-bsd-ke-bandung` | `tangerang-serpong-bsd-to-bandung-shipping` |
| | `pengiriman-barang-bekasi-ke-bandung` | `bekasi-to-bandung-shipping` |
| | `cara-packing-barang-cargo-yang-aman` | `how-to-pack-cargo-safely` |
| **10** | `tips-hemat-angkutan-barang-jakarta-bandung` | `tips-to-cut-jakarta-bandung-freight-costs` |
| | `perbedaan-ekspedisi-reguler-ekspres-kontrak` | `regular-vs-express-vs-contract-freight` |
| | `checklist-pengiriman-cargo-bulk-jakarta-bandung` | `bulk-cargo-shipping-checklist-jakarta-bandung` |

**Files (tiap task):**
- Create: `content/blog/en/<slug-inggris>.md` untuk tiap artikel di kelompoknya

**Interfaces:**
- Consumes: `getTranslatedSlug` (Task 6) — mencocokkan lewat `translationKey`

Langkah berikut berlaku untuk **masing-masing** Task 7, 8, 9, dan 10.

- [ ] **Step 1: Buat berkas terjemahan**

Untuk tiap artikel di kelompok, buat `content/blog/en/<slug-inggris>.md` dengan frontmatter:

```yaml
---
title: "How to Choose the Right Jakarta–Bandung Freight Service"
description: "A practical guide to selecting a Jakarta-Bandung freight partner: safety, on-time performance, and competitive pricing for your business."
date: "2026-06-10"
tag: "Logistics Tips"
translationKey: "tips-memilih-jasa-ekspedisi-jakarta-bandung"
---
```

Aturan wajib:
- `date` **identik** dengan versi Indonesia (jangan diubah)
- `translationKey` **identik** dengan versi Indonesia — inilah yang memasangkan keduanya
- `tag` diterjemahkan: `Tips Logistik`→`Logistics Tips`, `Panduan`→`Guide`, `Panduan Harga`→`Pricing Guide`, `Tips Packing`→`Packing Tips`, `Ekspedisi`→`Freight`, `Area Layanan`→`Service Areas`, `B2B Logistik`→`B2B Logistics`, `Transportasi Darat`→`Land Transport`

- [ ] **Step 2: Terjemahkan isi artikel**

Terjemahkan idiomatik, bukan harfiah. Pertahankan struktur heading dan panjang yang setara. Pedoman:

- Nama tempat tetap: *Jakarta, Bandung, Tangerang, Serpong, BSD, Bekasi, Jabodetabek* (boleh diberi keterangan "Greater Jakarta" saat pertama muncul)
- Rupiah tetap dalam Rupiah — **jangan konversi ke Dolar**
- Istilah dagang tetap: *FTL, LTL, 3PL, door-to-door*
- Nama merek selalu "Transit"
- Nomor telepon tidak pernah muncul sebagai teks; tautan WhatsApp memakai URL yang sama persis
- Rute digambarkan **dua arah**, konsisten dengan situs

- [ ] **Step 3: Verifikasi pemasangan dan rendering**

```bash
npm run dev &
sleep 4
# ganti <slug-inggris> dengan tiap slug di kelompok ini
curl -s -o /dev/null -w "%{http_code}\n" localhost:3000/en/blog/<slug-inggris>
curl -s localhost:3000/en/blog | grep -c '/en/blog/'
```

Expected: tiap artikel 200; jumlah tautan di daftar bertambah sesuai kelompok (Task 7→4, Task 8→8, Task 9→11, Task 10→14).

- [ ] **Step 4: Verifikasi `translationKey` berpasangan**

```bash
diff <(grep -h '^translationKey:' content/blog/id/*.md | sort) \
     <(grep -h '^translationKey:' content/blog/en/*.md | sort) \
  && echo "✓ semua berpasangan" || echo "→ masih ada yang belum diterjemahkan (wajar sebelum Task 10 selesai)"
```

Expected: setelah Task 10, mencetak `✓ semua berpasangan`.

- [ ] **Step 5: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "feat(blog): terjemahkan artikel kelompok N ke Bahasa Inggris"
```

---

### Task 11: Tombol bahasa pada halaman artikel

`LanguageSwitcher` dari Task 2 memakai path apa adanya. Di halaman artikel itu salah: `/blog/tips-memilih-jasa-ekspedisi-jakarta-bandung` tidak punya padanan di `/en/blog/…` karena slug Inggrisnya berbeda. Task ini memasang pemetaan slug.

**Files:**
- Create: `src/components/ArticleLanguageSwitcher.tsx`
- Modify: `src/app/[locale]/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getTranslatedSlug` (Task 6)
- Produces: `<ArticleLanguageSwitcher currentLocale slugMap />`

- [ ] **Step 1: Hitung slug pasangan di server**

Di `[locale]/blog/[slug]/page.tsx`, setelah memuat artikel:

```tsx
import {routing} from '@/i18n/routing';
import {getTranslatedSlug} from '@/lib/blog';

const slugMap = Object.fromEntries(
  routing.locales.map((l) => [
    l,
    l === locale ? slug : getTranslatedSlug(post.translationKey, l)
  ])
) as Record<string, string | null>;
```

- [ ] **Step 2: Buat komponen**

```tsx
"use client";

import {useRouter} from '@/i18n/navigation';

export default function ArticleLanguageSwitcher({
  currentLocale,
  slugMap
}: {
  currentLocale: string;
  slugMap: Record<string, string | null>;
}) {
  const router = useRouter();

  return (
    <div className="lang-toggle">
      {(['id', 'en'] as const).map((lang) => (
        <button
          key={lang}
          className={currentLocale === lang ? 'active' : undefined}
          aria-label={lang === 'id' ? 'Bahasa Indonesia' : 'English'}
          onClick={() => {
            const target = slugMap[lang];
            router.replace(target ? `/blog/${target}` : '/blog', {locale: lang});
          }}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

Saat padanan tidak ada, pengguna diarahkan ke daftar blog bahasa tujuan — bukan halaman 404.

- [ ] **Step 3: Verifikasi manual**

Buka `/blog/tips-memilih-jasa-ekspedisi-jakarta-bandung`, klik `EN`. Expected: mendarat di `/en/blog/how-to-choose-a-jakarta-bandung-freight-service`, bukan 404 dan bukan `/en/blog`.

- [ ] **Step 4: Verifikasi jalur fallback**

Buat artikel Indonesia sementara tanpa padanan Inggris, buka, klik `EN`. Expected: mendarat di `/en/blog`. Hapus lagi artikel sementara itu setelah diuji.

- [ ] **Step 5: Build & commit**

```bash
npm run build 2>&1 | tail -3
git add -A
git commit -m "feat(i18n): tombol bahasa memetakan slug artikel antarbahasa"
```

---

### Task 12: Sitemap 32 URL dan robots

**Files:**
- Modify: `src/app/sitemap.ts`
- Verify: `public/robots.txt`

**Interfaces:**
- Consumes: `getAllPosts(locale)` (Task 6), `routing` (Task 1)

- [ ] **Step 1: Tulis ulang sitemap**

```ts
import type {MetadataRoute} from "next";
import {getAllPosts} from "@/lib/blog";
import {routing} from "@/i18n/routing";

export const dynamic = "force-static";

const baseUrl = "https://transitexpress.my.id";

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      {
        url: urlFor(locale, ""),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: urlFor(locale, "/blog"),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }
    );

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: urlFor(locale, `/blog/${post.slug}`),
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
```

- [ ] **Step 2: Verifikasi jumlah dan isi**

```bash
npm run build 2>&1 | tail -3
npm run dev &
sleep 4
echo "total URL: $(curl -s localhost:3000/sitemap.xml | grep -c '<loc>')"
echo "URL /en:   $(curl -s localhost:3000/sitemap.xml | grep -c '<loc>https://transitexpress.my.id/en')"
curl -s localhost:3000/sitemap.xml | grep -c 'transitmr' 
```

Expected: total `32`; URL `/en` sebanyak `16`; hitungan `transitmr` = `0`.

- [ ] **Step 3: Periksa robots.txt**

```bash
grep Sitemap public/robots.txt
```

Expected: menunjuk `https://transitexpress.my.id/sitemap.xml`. Sudah benar sejak pekerjaan domain — jangan diubah kecuali salah.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): sitemap dua bahasa berisi 32 URL"
```

---

### Task 13: Perbarui dokumentasi & deploy

**Files:**
- Modify: `CLAUDE.md`, `README.md`, `publishpreparation.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Perbaiki keterangan static export**

Ketiga dokumen menyebut `output: "export"` yang sudah dihapus di Task 1. Cari dan perbarui:

```bash
grep -rn 'output.*export\|static export' CLAUDE.md README.md publishpreparation.md
```

Ganti menjadi keterangan bahwa situs berjalan sebagai aplikasi Next.js di Vercel dengan halaman ter-*generate* statis, dan bahwa middleware next-intl menangani pemilihan bahasa.

- [ ] **Step 2: Tambahkan bagian i18n di `CLAUDE.md`**

Dokumentasikan: daftar locale, `localePrefix: 'as-needed'`, lokasi `messages/`, struktur `content/blog/{id,en}/`, aturan `translationKey`, dan keharusan menambah artikel dalam dua bahasa.

- [ ] **Step 3: Perbarui struktur proyek di `CLAUDE.md`**

Pohon direktori di dokumen itu masih menampilkan `src/app/layout.tsx` dan `src/app/page.tsx` di akar. Sesuaikan dengan `src/app/[locale]/`, dan tambahkan `src/i18n/`, `messages/`, serta `src/middleware.ts`.

- [ ] **Step 4: Catat di CHANGELOG**

- [ ] **Step 5: Verifikasi seluruh kriteria spec**

Jalankan pemeriksaan penuh terhadap 10 kriteria di spec §8:

```bash
npm run build 2>&1 | tail -3
npm run dev &
sleep 4
for u in / /en /blog /en/blog; do
  printf "%-12s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' localhost:3000$u)"
done
curl -s -o /dev/null -w "artikel ID: %{http_code}\n" localhost:3000/blog/tips-memilih-jasa-ekspedisi-jakarta-bandung
curl -s -o /dev/null -w "artikel EN: %{http_code}\n" localhost:3000/en/blog/how-to-choose-a-jakarta-bandung-freight-service
curl -s localhost:3000/en | grep -oE "Layanan|Pengiriman|Hubungi|Tentang Kami|Minta Penawaran|Terpercaya|Rute" && echo "✗ sisa Indonesia" || echo "✓ /en bersih"
echo "sitemap: $(curl -s localhost:3000/sitemap.xml | grep -c '<loc>') URL"
```

Expected: seluruh rute 200, `/en` bersih, sitemap 32 URL.

- [ ] **Step 6: Commit & push**

```bash
git add -A
git commit -m "docs: perbarui dokumentasi untuk arsitektur dwibahasa"
git push origin main
```

- [ ] **Step 7: Deploy dan verifikasi produksi**

```bash
vercel --prod --yes 2>&1 | grep -E '"(status|readyState)"'
for u in / /en /blog /en/blog; do
  printf "%-12s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' https://transitexpress.my.id$u)"
done
curl -s https://transitexpress.my.id/sitemap.xml | grep -c '<loc>'
curl -s https://transitexpress.my.id/en | grep -o '<html lang="[a-z]*"'
```

Expected: seluruh rute 200 di produksi, sitemap 32 URL, `/en` menghasilkan `<html lang="en"`.

**Catatan deployment:** ini deploy pertama tanpa `output: "export"`. Bila Vercel project settings memuat override "Output Directory" ke `out` (disebut di `publishpreparation.md`), override itu **harus dihapus** agar build berhasil. Periksa lebih dulu di Vercel → Settings → Build & Output Settings.

---

## Kriteria Selesai

Pekerjaan selesai bila seluruh 10 kriteria di spec §8 terbukti di **produksi**, bukan hanya lokal:

1. `npm run build` lolos
2. `/`, `/en`, `/blog`, `/en/blog`, satu artikel ID, satu artikel EN → semuanya 200
3. Tombol ID/EN berpindah bahasa dan mempertahankan halaman (diuji di beranda **dan** halaman artikel)
4. `Accept-Language: en` mendarat di `/en`; `id` mendarat di `/`
5. `<html lang>` sesuai locale
6. `hreflang` alternates saling menunjuk
7. `sitemap.xml` memuat 32 URL
8. Tidak ada kata penanda Bahasa Indonesia di `/en`
9. 14 artikel punya padanan Inggris dengan `translationKey` cocok
10. Live di `https://transitexpress.my.id`

## Tinjauan Pemilik

Setelah seluruh task selesai, pemilik **wajib meninjau terjemahan** sebelum menganggapnya final — khususnya klaim tentang layanan, tarif, cakupan area, dan asuransi (Risiko R1 di spec). Terjemahan mesin bisa halus secara bahasa namun keliru secara komersial, dan halaman-halaman ini menjadi wajah perusahaan di mata klien asing.
