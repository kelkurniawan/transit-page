# Cara Publish Artikel Blog — Transit Website

Panduan lengkap cara menambahkan dan mempublish artikel blog baru ke website Transit.

---

## Overview Cara Kerja Blog

Blog Transit menggunakan file Markdown (`.md`) yang disimpan di folder `content/blog/`. Tidak ada database, tidak ada CMS, tidak ada dashboard admin.

**Alurnya sederhana:**
1. Buat file `.md` baru di `content/blog/`
2. Deploy ulang website (otomatis via Vercel, atau manual)
3. Artikel langsung live di `transitmr.com/blog/nama-artikel`

---

## Cara Membuat Artikel Baru

### Langkah 1: Buat File Markdown

Buat file baru di folder `content/blog/` dengan nama file sesuai judul artikel menggunakan format **slug** (huruf kecil, kata dipisah tanda hubung, tanpa spasi).

**Contoh nama file:**
- `tips-kirim-barang-elektronik-jakarta-bandung.md`
- `panduan-pengiriman-barang-pabrik.md`
- `cara-memilih-ekspedisi-murah.md`

### Langkah 2: Isi Frontmatter

Setiap artikel harus dimulai dengan **frontmatter** — blok informasi di antara tanda `---`.

```markdown
---
title: "Judul Artikel yang Menarik dan Mengandung Keyword"
description: "Deskripsi singkat artikel, 150–160 karakter, ini yang muncul di Google."
date: "2026-07-07"
tag: "Tips Logistik"
---

Isi artikel dimulai di sini...
```

**Penjelasan tiap field:**

| Field | Keterangan |
|---|---|
| `title` | Judul artikel — tampil di browser tab dan Google |
| `description` | Ringkasan 150–160 karakter — tampil sebagai deskripsi di hasil Google |
| `date` | Format `YYYY-MM-DD` — tanggal publish |
| `tag` | Kategori artikel — tampil sebagai badge di halaman blog |

**Tag yang sudah dipakai:**
- `Tips Logistik`
- `Panduan Harga`
- `Ekspedisi`
- `Transportasi Darat`
- `Area Layanan`
- `B2B Logistik`
- `Panduan`
- `Tips Packing`

Bisa tambah tag baru sesuai kebutuhan — cukup tulis nama tag baru di field `tag`.

### Langkah 3: Tulis Isi Artikel

Gunakan format Markdown standar:

```markdown
## Heading 2 (untuk sub-judul utama)

### Heading 3 (untuk sub-judul di dalam sub-judul)

Paragraf biasa ditulis langsung.

**Teks tebal** dan *teks miring* menggunakan tanda bintang.

- Item list satu
- Item list dua
- Item list tiga

| Kolom 1 | Kolom 2 |
|---|---|
| Isi | Isi |
```

**Aturan wajib:**
- **Jangan tampilkan nomor WhatsApp** di dalam artikel — selalu gunakan link:
  ```markdown
  [Hubungi kami via WhatsApp](https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.)
  ```
- Setiap artikel harus diakhiri dengan **CTA (Call to Action)** yang mengarahkan pembaca ke WhatsApp

---

## Template Artikel Siap Pakai

Copy template ini dan isi sesuai topik:

```markdown
---
title: "Judul Artikel Anda di Sini"
description: "Deskripsi singkat 150-160 karakter. Mengandung keyword utama dan nama kota."
date: "2026-07-07"
tag: "Tips Logistik"
---

## Pendahuluan (Masalah yang Dihadapi Pembaca)

Jelaskan masalah atau pertanyaan yang ingin dijawab artikel ini.
Tulis 2-3 paragraf yang relevan dengan pengalaman target pembaca (pabrik, distributor, B2B).

## Sub-Judul Pertama

Isi konten...

## Sub-Judul Kedua

Isi konten...

## Sub-Judul Ketiga

Isi konten...

## Kesimpulan

Rangkum poin utama artikel.

---

[Hubungi Transit via WhatsApp](https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.) untuk konsultasi gratis mengenai kebutuhan pengiriman barang Anda.
```

---

## Cara Deploy: Vercel + GitHub (Otomatis)

Ini cara yang direkomendasikan. Setelah setup awal (lihat `publishpreparation.md`), publish artikel cukup 3 perintah.

### Setup Awal (Satu Kali)

Pastikan project sudah terhubung ke GitHub dan GitHub sudah terhubung ke Vercel. Lihat panduan lengkap di `publishpreparation.md`.

### Publish Artikel Baru (Setiap Kali)

Buka terminal di folder project, lalu jalankan:

```powershell
git add content/blog/nama-file-artikel-baru.md
git commit -m "tambah artikel: judul artikel di sini"
git push
```

**Selesai.** Vercel otomatis mendeteksi push baru, rebuild website dalam 1–3 menit, dan artikel langsung live di `transitmr.com/blog/nama-file-artikel`.

### Verifikasi Artikel Sudah Live

Setelah push, buka Vercel dashboard → lihat status deploy. Setelah status berubah jadi **Ready**, buka:

```
https://transitmr.com/blog/nama-file-artikel
```

Artikel juga otomatis muncul di halaman listing blog: `transitmr.com/blog`

---

## Cara Deploy: Manual (Tanpa Vercel)

Jika tidak menggunakan Vercel, lakukan ini setiap kali menambah artikel:

```powershell
# 1. Masuk ke folder project
cd C:\Users\michael\Documents\transit

# 2. Build ulang website
npm run build

# 3. Upload folder "out/" ke hosting Anda via FTP atau panel hosting
```

Folder `out/` berisi seluruh website dalam bentuk file statis siap upload.

---

## Kalender Konten yang Sudah Dibuat

Artikel berikut sudah ada di `content/blog/` dan siap publish sesuai jadwal:

### Juni 2026
| Jadwal | Judul | File |
|---|---|---|
| 8 Jun | Panduan Biaya Pengiriman Jakarta Bandung | `biaya-pengiriman-barang-jakarta-bandung.md` |
| 10 Jun | 7 Tips Memilih Jasa Ekspedisi | `tips-memilih-jasa-ekspedisi-jakarta-bandung.md` |
| 12 Jun | 5 Keuntungan Ekspedisi Darat | `keuntungan-ekspedisi-darat-jakarta-bandung.md` |
| 17 Jun | Transportasi Darat Jakarta-Bandung | `transportasi-darat-jakarta-bandung.md` |
| 24 Jun | Panduan Ekspedisi untuk Pemula | `panduan-ekspedisi-jakarta-bandung-untuk-pemula.md` |

### Juli 2026
| Jadwal | Judul | File |
|---|---|---|
| 7 Jul | Pengiriman dari Tangerang, Serpong, BSD | `pengiriman-barang-tangerang-serpong-bsd-ke-bandung.md` |
| 14 Jul | FTL vs LTL: Memilih Muatan Truk | `ftl-vs-ltl-memilih-muatan-truk-untuk-bisnis.md` |
| 21 Jul | Logistik B2B untuk Pabrik & Distributor | `logistik-b2b-jakarta-bandung-untuk-pabrik-distributor.md` |

### Agustus 2026
| Jadwal | Judul | File |
|---|---|---|
| 4 Agu | Berapa Lama Pengiriman Jakarta ke Bandung? | `berapa-lama-pengiriman-barang-jakarta-ke-bandung.md` |
| 11 Agu | Cara Packing Barang Cargo yang Aman | `cara-packing-barang-cargo-yang-aman.md` |
| 18 Agu | 8 Tips Hemat Angkutan Barang | `tips-hemat-angkutan-barang-jakarta-bandung.md` |

### September 2026
| Jadwal | Judul | File |
|---|---|---|
| 1 Sep | Pengiriman Barang dari Bekasi ke Bandung | `pengiriman-barang-bekasi-ke-bandung.md` |
| 8 Sep | Perbedaan Layanan Reguler, Ekspres, Kontrak | `perbedaan-ekspedisi-reguler-ekspres-kontrak.md` |
| 15 Sep | Checklist Cargo Bulk Jakarta-Bandung | `checklist-pengiriman-cargo-bulk-jakarta-bandung.md` |

**Catatan:** Semua file sudah ada di komputer. Yang perlu Anda lakukan adalah push ke GitHub sesuai jadwal — jangan push semua sekaligus agar Google melihat website aktif dan konsisten mengupdate konten.

---

## Tips SEO saat Publish

**Publish sesuai jadwal, jangan sekaligus.** Google menilai website yang rutin update lebih baik daripada yang upload semua artikel sekaligus lalu diam berbulan-bulan.

**Setelah publish, share di WhatsApp/sosmed.** Traffic awal dari share sosmed membantu Google mendeteksi artikel lebih cepat.

**Setelah domain live, submit sitemap.** Buka Google Search Console → Sitemaps → submit `https://transitmr.com/sitemap.xml`. Sitemap sudah otomatis berisi semua artikel.

---

## Troubleshooting

**Artikel tidak muncul setelah push?**
- Cek status deploy di Vercel dashboard — tunggu sampai status "Ready"
- Pastikan frontmatter tidak ada typo (semua `---` dan field lengkap)
- Pastikan format tanggal benar: `"2026-07-07"` bukan `"7 Juli 2026"`

**URL artikel berbeda dari yang diharapkan?**
- URL artikel = nama file tanpa `.md`
- `pengiriman-bekasi.md` → `transitmr.com/blog/pengiriman-bekasi`

**Build error setelah tambah artikel?**
- Jalankan `npm run build` di lokal dulu sebelum push untuk mendeteksi error lebih awal
- Pastikan tidak ada karakter khusus di frontmatter yang tidak di-quote dengan benar
