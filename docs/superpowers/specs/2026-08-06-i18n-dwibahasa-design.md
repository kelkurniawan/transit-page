# Desain: Situs Dwibahasa Indonesia–Inggris (i18n)

**Tanggal:** 2026-08-06
**Proyek:** transit-page (PT Transit Mega Raja)
**Status:** Disetujui, siap masuk tahap perencanaan implementasi

---

## 1. Latar Belakang

Navbar situs memiliki tombol `ID` / `EN` yang tidak berfungsi. Investigasi menunjukkan tombol tersebut **tidak pernah dihubungkan** — bukan regresi:

- [`src/components/Navbar.tsx:37-38`](../../../src/components/Navbar.tsx) berisi dua `<button>` tanpa `onClick`, tanpa state, dengan `className="active"` dikunci pada `ID`
- Tidak ada library i18n di `package.json`
- Tidak ada routing locale (`app/[locale]/`)
- Tidak ada berkas terjemahan
- `<html lang="id">` dikunci di `layout.tsx:181`
- Seluruh teks hardcoded Bahasa Indonesia di dalam komponen

Tombol ini sekelas dengan section "Dipercaya Oleh" (sudah dihapus) dan tautan sosial `href="#"`: UI placeholder yang belum diimplementasi.

## 2. Tujuan

Versi Inggris melayani **empat tujuan sekaligus** (dikonfirmasi pemilik):

1. Procurement pabrik PMA / perusahaan asing yang sudah menghubungi Transit
2. Menjaring pencarian Google berbahasa Inggris (mis. *freight forwarder Jakarta Bandung*)
3. Kesan profesional / bonafide di mata klien besar
4. Menyasar freight forwarder & 3PL internasional yang butuh mitra angkutan darat lokal

Karena tujuan (2) termasuk, **blog wajib ikut diterjemahkan**. Versi Inggris harus selengkap versi Indonesia.

## 3. Volume Pekerjaan

| Bagian | Volume |
|---|---|
| 14 artikel blog | 11.197 kata |
| Teks UI (14 komponen + metadata + JSON-LD) | ~2.191 kata |
| **Total** | **~13.400 kata** |

Pemilik memilih mengerjakan **seluruhnya sekaligus**, bukan bertahap.

## 4. Keputusan Desain

| # | Keputusan | Alasan |
|---|---|---|
| D1 | Pakai **next-intl** | Standar App Router, dukungan SSG matang, ICU messages. Alternatif manual menambah beban pemeliharaan tanpa imbalan. |
| D2 | **Lepas `output: "export"`** | Static export memblokir middleware → deteksi bahasa otomatis mustahil. Vercel adalah satu-satunya target hosting (32 sebutan di dokumen repo; Niagahoster hanya disebut sebagai tempat beli domain), jadi tidak ada yang hilang. Halaman tetap di-*generate* statis. |
| D3 | **Indonesia di akar, Inggris di `/en`** (`localePrefix: 'as-needed'`) | Seluruh URL Indonesia yang ada tidak berubah — tidak ada ekuitas SEO yang hilang. Pasar utama tetap tanpa prefix. |
| D4 | **Slug artikel Inggris berbahasa Inggris** | `/en/blog/how-to-choose-a-jakarta-bandung-freight-service` jauh lebih kuat untuk SEO Inggris daripada slug Indonesia. |
| D5 | **`translationKey` = slug Indonesia** | Identitas stabil untuk memasangkan artikel ID↔EN tanpa tabel pemetaan terpisah. |
| D6 | **Lepas `images.unoptimized`** | Konsekuensi wajar dari D2. `hero-truck.jpg` (355KB) akan dikompres otomatis. |

## 5. Arsitektur

### 5.1 Struktur berkas

```
src/
├── i18n/
│   ├── routing.ts          # locales ['id','en'], defaultLocale 'id', localePrefix 'as-needed'
│   ├── navigation.ts       # Link, useRouter, usePathname yang sadar-locale
│   └── request.ts          # pemuat pesan per request
├── middleware.ts           # deteksi Accept-Language → arahkan pengunjung asing ke /en
├── app/
│   └── [locale]/
│       ├── layout.tsx      # <html lang={locale}>, metadata & JSON-LD per locale
│       ├── page.tsx        # beranda
│       └── blog/
│           ├── page.tsx    # daftar artikel
│           └── [slug]/page.tsx
├── components/             # tetap di tempat; string diganti useTranslations()
└── lib/
    └── blog.ts             # diperluas menjadi sadar-locale

messages/                   # akar proyek, bukan di dalam src/ (konvensi next-intl)
├── id.json                 # teks UI Bahasa Indonesia
└── en.json                 # teks UI Bahasa Inggris

content/blog/
├── id/                     # 14 artikel yang ada, dipindahkan ke sini
└── en/                     # 14 terjemahan baru
```

`sitemap.ts` dan `robots.txt` tetap di luar `[locale]` — keduanya melayani seluruh situs.

### 5.2 Konfigurasi locale

```ts
locales: ['id', 'en']
defaultLocale: 'id'
localePrefix: 'as-needed'
```

Peta URL:

| Halaman | Indonesia | Inggris |
|---|---|---|
| Beranda | `/` | `/en` |
| Daftar blog | `/blog` | `/en/blog` |
| Artikel | `/blog/<slug-id>` | `/en/blog/<slug-en>` |

**Perilaku deteksi & memori pilihan.** Middleware hanya mengarahkan berdasarkan `Accept-Language` pada kunjungan pertama. Begitu pengunjung menekan tombol bahasa, next-intl menyimpan cookie `NEXT_LOCALE`, dan pilihan itu mengalahkan deteksi otomatis pada kunjungan berikutnya. Ini mencegah pengguna Indonesia yang memakai peramban berbahasa Inggris terus-menerus dilempar ke `/en`.

### 5.3 Model data artikel

Frontmatter bertambah satu field:

```yaml
---
title: "..."
description: "..."
date: "2026-06-10"
tag: "Tips Logistik"
translationKey: "tips-memilih-jasa-ekspedisi-jakarta-bandung"
---
```

`translationKey` sama persis di kedua bahasa; nilainya adalah slug Indonesia.

### 5.4 API `blog.ts`

Fungsi lama diganti versi sadar-locale:

| Lama | Baru |
|---|---|
| `getAllPosts()` | `getAllPosts(locale)` |
| `getPostBySlug(slug)` | `getPostBySlug(locale, slug)` |
| `getAllPostSlugs()` | `getAllPostSlugs(locale)` |
| — | `getTranslatedSlug(translationKey, targetLocale)` — mengembalikan `string \| null` |

### 5.5 Pemetaan slug artikel

| `translationKey` (= slug ID) | Slug EN |
|---|---|
| `berapa-lama-pengiriman-barang-jakarta-ke-bandung` | `how-long-does-jakarta-to-bandung-shipping-take` |
| `biaya-pengiriman-barang-jakarta-bandung` | `jakarta-bandung-shipping-costs` |
| `cara-packing-barang-cargo-yang-aman` | `how-to-pack-cargo-safely` |
| `checklist-pengiriman-cargo-bulk-jakarta-bandung` | `bulk-cargo-shipping-checklist-jakarta-bandung` |
| `ftl-vs-ltl-memilih-muatan-truk-untuk-bisnis` | `ftl-vs-ltl-choosing-the-right-truckload` |
| `keuntungan-ekspedisi-darat-jakarta-bandung` | `benefits-of-land-freight-jakarta-bandung` |
| `logistik-b2b-jakarta-bandung-untuk-pabrik-distributor` | `b2b-logistics-jakarta-bandung-for-factories` |
| `panduan-ekspedisi-jakarta-bandung-untuk-pemula` | `jakarta-bandung-freight-guide-for-beginners` |
| `pengiriman-barang-bekasi-ke-bandung` | `bekasi-to-bandung-shipping` |
| `pengiriman-barang-tangerang-serpong-bsd-ke-bandung` | `tangerang-serpong-bsd-to-bandung-shipping` |
| `perbedaan-ekspedisi-reguler-ekspres-kontrak` | `regular-vs-express-vs-contract-freight` |
| `tips-hemat-angkutan-barang-jakarta-bandung` | `tips-to-cut-jakarta-bandung-freight-costs` |
| `tips-memilih-jasa-ekspedisi-jakarta-bandung` | `how-to-choose-a-jakarta-bandung-freight-service` |
| `transportasi-darat-jakarta-bandung` | `jakarta-bandung-land-transportation` |

### 5.6 Tombol bahasa

`div.lang-toggle` di Navbar diganti komponen klien `LanguageSwitcher`:

- Membaca `usePathname()` dari `@/i18n/navigation`
- Menukar locale sambil **mempertahankan halaman yang sedang dibuka**
- Menandai locale aktif dari nilai sebenarnya, bukan `className` hardcoded
- **Di halaman artikel:** memakai `getTranslatedSlug()` untuk lompat ke artikel pasangan. Bila pasangan tidak ada, jatuh ke daftar blog locale tujuan (`/en/blog` atau `/blog`).

### 5.7 SEO

- `hreflang` alternates di setiap halaman: `id`, `en`, dan `x-default` → `id`
- Sitemap menjadi **32 URL** (16 × 2 locale), masing-masing membawa alternates
- `<html lang>` mengikuti locale aktif
- `generateMetadata` per locale — judul, deskripsi, keyword, Open Graph
- JSON-LD (`MovingCompany`, `FAQPage`) diterjemahkan per locale
- Kata kunci Inggris difokuskan ke istilah yang dipakai pencari internasional: *freight forwarder*, *trucking*, *land transport*, *3PL Indonesia*

### 5.8 Perubahan konfigurasi

`next.config.ts`:
- Hapus `output: "export"`
- Hapus `images.unoptimized`
- Bungkus dengan plugin `next-intl`

`package.json`: tambah dependensi `next-intl`.

## 6. Di Luar Cakupan

- Bahasa ketiga (Mandarin, Jepang) — struktur sudah siap, tapi tidak dikerjakan sekarang
- Penerjemahan profesional oleh manusia — lihat Risiko R1
- Penulisan artikel Inggris baru yang tidak ada padanan Indonesianya
- Perubahan desain visual apa pun

## 7. Risiko

**R1 — Kualitas terjemahan mesin.** 13.400 kata akan diterjemahkan AI dengan perhatian pada istilah logistik B2B (bukan harfiah). Google tidak menghukum terjemahan mesin, tetapi menghukum konten berkualitas rendah. **Pemilik wajib meninjau sebelum dianggap final**, khususnya klaim tentang layanan, tarif, cakupan, dan asuransi — ini menjadi wajah perusahaan di mata klien asing.

**R2 — Konten duplikat.** 28 artikel dalam dua bahasa. Ditangani dengan `hreflang` yang benar; tanpa itu Google bisa menganggapnya duplikasi.

**R3 — Restrukturisasi besar.** Memindahkan seluruh `app/` ke `app/[locale]/` menyentuh setiap rute. Mitigasi: implementasi bertahap dengan build hijau di tiap langkah.

**R4 — Dokumen repo menjadi usang.** `README.md`, `CLAUDE.md`, dan `publishpreparation.md` menyebut static export. Harus disesuaikan sebagai bagian dari pekerjaan ini.

**R5 — Perilaku deployment berubah.** Vercel tidak lagi menerima output statis murni. Tidak ada tindakan khusus yang dibutuhkan di Vercel, tetapi deployment pertama setelah perubahan harus diverifikasi langsung.

## 8. Kriteria Verifikasi

Pekerjaan dianggap selesai bila seluruh butir berikut terbukti:

1. `npm run build` lolos tanpa error
2. Enam rute merespons HTTP 200: `/`, `/en`, `/blog`, `/en/blog`, satu artikel ID, satu artikel EN
3. Tombol `ID`/`EN` berpindah bahasa **dan mempertahankan halaman** — diuji di beranda dan di halaman artikel
4. Pengunjung dengan `Accept-Language: en` mendarat di `/en`; dengan `id` mendarat di `/`
5. `<html lang>` bernilai `id` di rute Indonesia dan `en` di rute Inggris
6. `hreflang` alternates hadir dan saling menunjuk dengan benar
7. `sitemap.xml` memuat 32 URL
8. Tidak ada string Bahasa Indonesia tersisa di rute `/en`, diperiksa dengan mencari kata penanda pada HTML terambil: `Layanan`, `Pengiriman`, `Hubungi`, `Tentang Kami`, `Minta Penawaran`, `Terpercaya`, `Rute`
9. Seluruh 14 artikel punya padanan Inggris dengan `translationKey` yang cocok
10. Situs live di `https://transitexpress.my.id` setelah deploy
