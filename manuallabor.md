# Manual Labor — Hal yang Perlu Dilakukan Sendiri

Daftar semua hal yang tidak bisa dikerjakan oleh AI dan harus dilakukan secara manual oleh owner.

---

## SEGERA — Sebelum Launch

### 1. Update Google Maps Embed

**File:** `src/components/Contact.tsx`

Google Maps iframe saat ini menggunakan koordinat placeholder. Perlu diganti dengan embed yang menunjuk tepat ke lokasi kantor Anda.

**Langkah:**
1. Buka https://maps.google.com
2. Cari **"Jl. Krekot Bunder IV No.61, Jakarta Pusat"**
3. Klik pin lokasi → klik **Share** → tab **Embed a map**
4. Copy URL dari `src="..."` dalam kode iframe
5. Buka file `src/components/Contact.tsx`, ganti URL di baris iframe `src`

---

### 1b. Verifikasi Koordinat GPS di Schema

**File:** `src/app/layout.tsx` (bagian `geo`)

Koordinat lokasi (`latitude: -6.1656, longitude: 106.834`) saat ini perkiraan area
Pasar Baru. Untuk local SEO yang akurat:

1. Buka https://maps.google.com, cari lokasi kantor persis
2. Klik kanan pin → angka koordinat muncul di atas → klik untuk copy
3. Minta Claude update nilai `latitude`/`longitude` di `layout.tsx`

Pastikan alamat di website **identik** dengan alamat di Google Business Profile
(konsistensi NAP — Name, Address, Phone — penting untuk ranking lokal).

---

### 2. Update Social Media Links di Footer

**File:** `src/components/Footer.tsx`

Footer saat ini punya ikon Instagram, X, dan Threads dengan `href="#"` (link kosong).

**Langkah:**
1. Buat akun media sosial:
   - Instagram: https://instagram.com — buat akun `@transitmegaraja` atau nama pilihan
   - X (Twitter): https://x.com — buat akun `@transitmegaraja`
   - Threads: https://threads.net — login pakai akun Instagram, otomatis terhubung
2. Setelah akun dibuat, minta bantuan Claude untuk update URL di `Footer.tsx`

---

### 3. Daftarkan Domain

Beli domain untuk website (contoh: `transitmr.com`).

**Tempat beli:**
- https://niagahoster.co.id
- https://domainesia.com
- https://namecheap.com

**Yang perlu disiapkan:**
- Nama domain pilihan (cek ketersediaan dulu)
- Kartu kredit atau rekening bank untuk pembayaran
- Alamat email aktif

Setelah domain dibeli, minta bantuan Claude untuk update URL di kode.

---

## SETELAH DOMAIN SIAP

### 4. Buat Akun Vercel untuk Hosting

1. Buka https://vercel.com
2. Sign up dengan akun GitHub (perlu buat akun GitHub dulu jika belum punya)
3. Import project dari GitHub
4. Deploy dan hubungkan domain

Detail langkah ada di `publishpreparation.md`.

---

### 5. Buat Akun GitHub dan Upload Kode

Hosting di Vercel memerlukan kode tersimpan di GitHub.

1. Buat akun di https://github.com
2. Instal Git di komputer: https://git-scm.com/downloads
3. Upload folder project Transit ke GitHub

Minta bantuan Claude untuk menjalankan perintah Git.

---

## SETELAH WEBSITE LIVE

### 6. Setup Google Business Profile

Wajib untuk ranking di Google Maps dan pencarian lokal.

1. Buka https://business.google.com
2. Login dengan akun Google Anda
3. Tambahkan bisnis dengan info:
   - Nama: **Transit** (PT Transit Mega Raja)
   - Kategori: Jasa Pengiriman Barang
   - Alamat: Jl. Krekot Bunder IV No.61, RT.6/RW.6, Ps. Baru, Jakarta Pusat 10710
   - Telepon: +62 821-2406-4792 (untuk GBP saja — aman)
   - Website: URL domain Anda
   - Jam: Senin–Sabtu 08:00–17:00
4. Verifikasi kepemilikan bisnis (biasanya via surat pos, perlu 1–2 minggu)
5. Upload foto kantor, armada truk, tim kerja
6. Minta pelanggan lama untuk meninggalkan review

---

### 7. Submit Sitemap ke Google Search Console

1. Buka https://search.google.com/search-console
2. Tambahkan domain website Anda
3. Verifikasi kepemilikan
4. Submit sitemap: `https://[domain-anda]/sitemap.xml`

Detail langkah ada di `publishpreparation.md`.

---

### 8. Pasang Google Analytics (Opsional tapi Direkomendasikan)

Untuk memantau berapa pengunjung, dari mana datangnya, dan halaman apa yang paling populer.

1. Buka https://analytics.google.com
2. Buat property baru untuk website Transit
3. Dapatkan **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Minta Claude untuk menambahkan tracking code ke `layout.tsx`

---

## RUTIN — Setelah Live

### 9. Publikasi Artikel Blog Secara Rutin

Blog adalah strategi SEO jangka panjang paling efektif. Konsistensi sangat penting.

**Target:** minimal 2–4 artikel per bulan

**Topik ide artikel:**
- Tips packing barang untuk ekspedisi
- Perbedaan LCL vs FCL untuk pengiriman
- Cara menghitung berat volumetrik
- Daftar industri yang butuh jasa ekspedisi Jakarta-Bandung
- Tips negosiasi kontrak logistik untuk bisnis
- Perbandingan ekspedisi darat vs kereta cargo
- Panduan memilih asuransi pengiriman barang

Minta Claude untuk menulis artikel — cukup berikan topik dan poin-poin penting.

---

### 10. Aktif di Media Sosial

Konten yang bisa diposting secara rutin di Instagram / Threads / X:

- Foto armada truk dengan caption informatif
- Testimoni pelanggan (dengan izin)
- Tips logistik singkat
- Promo atau penawaran khusus
- Behind-the-scenes operasional pengiriman
- Infografis rute dan coverage area

---

### 11. Kumpulkan dan Pasang Testimoni

Review dan testimoni nyata dari pelanggan meningkatkan kepercayaan calon customer.

**Cara:**
- Minta pelanggan lama untuk memberikan review di Google Business Profile
- Kumpulkan testimoni via WhatsApp, minta izin untuk dipasang di website
- Minta Claude untuk menambahkan section Testimoni di landing page

---

## Ringkasan Prioritas

| Prioritas | Task | Kapan |
|---|---|---|
| 🔴 Urgent | Update Google Maps embed | Sebelum launch |
| 🔴 Urgent | Buat akun sosmed + update link | Sebelum launch |
| 🔴 Urgent | Beli domain | Sebelum launch |
| 🟠 Penting | Setup hosting Vercel + deploy | Saat launch |
| 🟠 Penting | Google Business Profile | Sesegera mungkin setelah launch |
| 🟠 Penting | Google Search Console | Sesegera mungkin setelah launch |
| 🟡 Direkomendasikan | Google Analytics | 1–2 minggu setelah launch |
| 🟡 Direkomendasikan | Rutin posting blog | Ongoing |
| 🟢 Opsional | Kumpulkan testimoni untuk website | Setelah ada pelanggan dari website |
