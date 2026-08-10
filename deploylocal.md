# Deploy Lokal — Transit Website

Panduan untuk menjalankan website Transit di komputer lokal (development mode).

---

## Prerequisites

Pastikan sudah terinstall:

- **Node.js** v18 atau lebih baru — cek dengan: `node -v`
- **npm** v9 atau lebih baru — cek dengan: `npm -v`

Download Node.js di: https://nodejs.org

---

## Langkah-langkah

### 1. Buka terminal di folder project

```powershell
cd C:\Users\michael\Documents\transit
```

### 2. Install dependencies (hanya perlu sekali, atau setelah ada package baru)

```powershell
npm install
```

### 3. Jalankan development server

```powershell
npm run dev
```

### 4. Buka di browser

Setelah terminal menampilkan `✓ Ready`, buka:

```
http://localhost:3000
```

Jika port 3000 sudah dipakai, Next.js otomatis pakai port berikutnya (3001, 3002, dst). Lihat output terminal untuk URL yang tepat.

---

## Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan development server (hot reload aktif) |
| `npm run build` | Build untuk production (aplikasi Next.js standar, bukan static export — output ke folder `.next/`) |
| `npm run start` | Jalankan production build secara lokal |
| `npm run lint` | Cek error kode dengan ESLint |

---

## Development Mode vs Production Build

| | Development (`npm run dev`) | Production (`npm run build`) |
|---|---|---|
| Kecepatan start | Cepat | Lebih lama (compile semua halaman) |
| Hot reload | ✓ Otomatis reload saat file berubah | ✗ |
| Error messages | Detail (untuk debugging) | Minimal |
| Folder output | `.next/` | `.next/` (bukan static export, tidak ada folder `out/`) |

---

## Menambah Artikel Blog

1. Buat file `.md` baru di folder `content/blog/`
2. Gunakan format frontmatter berikut:

```markdown
---
title: "Judul Artikel Anda"
description: "Deskripsi singkat untuk SEO (150-160 karakter)"
date: "2026-06-12"
tag: "Nama Kategori"
---

## Konten artikel di sini...
```

3. Simpan file — artikel langsung muncul di `/blog` tanpa restart server

**Nama file** = URL slug artikel. Contoh:
- `tips-hemat-ongkir.md` → `localhost:3000/blog/tips-hemat-ongkir`

---

## Troubleshooting

**Port sudah dipakai:**
```powershell
# Cari PID yang pakai port 3000
netstat -ano | findstr :3000
# Matikan prosesnya (ganti 1234 dengan PID yang ditemukan)
taskkill /PID 1234 /F
```

**Error "Cannot find module":**
```powershell
npm install
```

**Halaman tidak update setelah edit:**
- Coba hard refresh browser: `Ctrl + Shift + R`
- Atau restart dev server: `Ctrl + C` lalu `npm run dev` lagi

**TypeScript error saat build:**
```powershell
npx tsc --noEmit
```
Perintah ini menampilkan semua TypeScript error tanpa perlu build penuh.

---

## Struktur Folder Penting

```
transit/
├── src/app/globals.css      ← Semua CSS (edit di sini untuk styling)
├── src/components/          ← Semua section website
├── content/blog/            ← Artikel blog (.md files)
├── public/                  ← File statis (favicon, robots.txt)
└── .next/                   ← Output build production (bukan static export, jangan edit manual)
```
