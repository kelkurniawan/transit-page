# Publish Preparation — Transit Website

Panduan lengkap mempersiapkan website Transit untuk go-live di internet.

---

## Checklist Overview

- [ ] 1. Pilih dan daftarkan domain
- [ ] 2. Update URL di kode
- [ ] 3. Buat akun hosting (Vercel — recommended)
- [ ] 4. Update Google Maps embed
- [ ] 5. Update social media links
- [ ] 6. Test production build lokal
- [ ] 7. Deploy ke Vercel
- [ ] 8. Hubungkan domain ke Vercel
- [ ] 9. Submit sitemap ke Google Search Console
- [ ] 10. Setup Google Business Profile

---

## 1. Pilih dan Daftarkan Domain

Domain yang direncanakan: **transitmr.com**

Rekomendasi tempat beli domain:
- **Niagahoster** (niagahoster.co.id) — support lokal, bayar via transfer
- **Domainesia** (domainesia.com) — support lokal
- **Namecheap** (namecheap.com) — harga murah, bayar kartu kredit

Pilih ekstensi `.com` untuk kredibilitas bisnis B2B.

---

## 2. Update URL di Kode

Setelah domain pasti, update file berikut:

### `src/app/layout.tsx`

```typescript
metadataBase: new URL("https://transitmr.com"),  // ← ganti dengan domain Anda
alternates: {
  canonical: "/",
},
openGraph: {
  url: "https://transitmr.com",  // ← sama
  siteName: "Transit",
},
```

Juga update JSON-LD:
```typescript
url: "https://transitmr.com",  // ← ganti
```

### `src/app/sitemap.ts`

```typescript
// Pastikan URL base sudah benar
const baseUrl = "https://transitmr.com";  // ← ganti
```

### `public/robots.txt`

```
Sitemap: https://transitmr.com/sitemap.xml  // ← ganti
```

---

## 3. Update Google Maps Embed

Di `src/components/Contact.tsx`, ganti iframe `src` dengan embed URL dari Google Maps yang menunjuk ke lokasi kantor Anda yang tepat.

**Cara mendapatkan embed URL:**
1. Buka Google Maps → cari alamat kantor
2. Klik lokasi → klik **Share** → tab **Embed a map**
3. Copy URL dari atribut `src` di kode iframe yang diberikan

---

## 4. Update Social Media Links

Di `src/components/Footer.tsx`, ganti `href="#"` dengan URL akun yang sudah dibuat:

```tsx
// Instagram
<a href="https://instagram.com/transitmegaraja" ...>

// X (Twitter)  
<a href="https://x.com/transitmegaraja" ...>

// Threads
<a href="https://threads.net/@transitmegaraja" ...>
```

---

## 5. Test Production Build Lokal

Sebelum deploy, selalu test build production:

```powershell
cd C:\Users\michael\Documents\transit
npm run build
```

Pastikan:
- Build selesai tanpa error
- Folder `out/` terbentuk berisi file HTML, CSS, JS

---

## 6. Deploy ke Vercel (Recommended)

Vercel adalah pilihan terbaik untuk Next.js — gratis untuk website kecil, deploy otomatis.

### Persiapan: Upload ke GitHub dulu

1. Buat akun di https://github.com
2. Buat repository baru (private atau public)
3. Upload folder project:

```powershell
cd C:\Users\michael\Documents\transit
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/transit.git
git push -u origin main
```

### Deploy ke Vercel

1. Buka https://vercel.com → Sign up dengan akun GitHub
2. Klik **Add New Project** → Import repository GitHub Anda
3. Vercel otomatis deteksi Next.js
4. Klik **Deploy**

Setiap kali Anda push ke GitHub, Vercel otomatis deploy ulang.

### Konfigurasi penting di Vercel

Karena kita pakai `output: "export"` (static), tambahkan di Vercel project settings:

**Build & Output Settings:**
- Build Command: `npm run build`
- Output Directory: `out`

---

## 7. Hubungkan Domain ke Vercel

1. Di Vercel dashboard → project → **Settings** → **Domains**
2. Tambahkan domain Anda (mis. `transitmr.com`)
3. Vercel akan berikan 2 DNS records untuk dikonfigurasi di tempat beli domain:
   - **A Record:** `@` → IP yang diberikan Vercel
   - **CNAME:** `www` → `cname.vercel-dns.com`
4. Masuk ke panel domain Anda → DNS Settings → tambahkan kedua record tersebut
5. Tunggu 1–24 jam untuk propagasi DNS
6. Vercel otomatis issue SSL certificate (HTTPS gratis)

---

## 8. Submit Sitemap ke Google Search Console

1. Buka https://search.google.com/search-console
2. Tambahkan property → masukkan domain Anda
3. Verifikasi kepemilikan (biasanya via DNS TXT record atau file HTML)
4. Setelah terverifikasi → klik **Sitemaps** di sidebar
5. Submit: `https://transitmr.com/sitemap.xml`

Google akan mulai crawl dan index website dalam 1–7 hari.

---

## 9. Setup Google Business Profile

1. Buka https://business.google.com
2. Tambahkan bisnis: **Transit** (PT Transit Mega Raja)
3. Isi semua informasi:
   - Kategori: "Jasa Pengiriman Barang" / "Freight Forwarding Service"
   - Alamat: Jl. Krekot Bunder IV No.61, RT.6/RW.6, Ps. Baru, Jakarta Pusat
   - Jam operasional: Senin–Sabtu 08:00–17:00
   - Website: `https://transitmr.com`
   - Nomor telepon (untuk GBP saja — tidak tampil di website)
4. Verifikasi kepemilikan (biasanya via surat pos atau video call)

Google Business Profile sangat penting untuk ranking lokal di Google Maps.

---

## 10. Pasca-Launch: Monitoring

| Tool | Fungsi | URL |
|---|---|---|
| Google Search Console | Monitor ranking, indexing, error | search.google.com/search-console |
| Google Analytics (opsional) | Monitor traffic pengunjung | analytics.google.com |
| Vercel Analytics | Uptime dan performance | vercel.com/dashboard |

---

## Timeline Estimasi

| Task | Waktu |
|---|---|
| Daftar domain | 30 menit |
| Update kode + test build | 1–2 jam |
| Setup Vercel + deploy | 1 jam |
| Hubungkan domain | Setup 30 menit + tunggu DNS 1–24 jam |
| Google Search Console | 30 menit setup + 1–7 hari indexing |
| Google Business Profile | 1 jam setup + 1–2 minggu verifikasi |
