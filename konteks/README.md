# sedek_aget

Marketplace digital UMKM lokal — proyek **Lomba Clean Code Web Programming —
INFORMIND FEST VOL. II** (HIMAIF UNIBI), subtema **EKRAF (Ekonomi Kreatif)**.

> Nama produk final menyusul. `sedek_aget` dipakai sebagai nama teknis yang
> konsisten untuk repo, folder root, dan database.

## Deskripsi

Platform marketplace digital yang mengintegrasikan berbagai UMKM lokal dalam
satu ekosistem — menerima semua skala usaha, dari pedagang gerobak, usaha
rumahan, warung, toko, hingga penyedia jasa. Pembeli dapat menemukan UMKM di
sekitarnya lewat peta, berbelanja produk, melakukan pre-order, dan booking
layanan. Pendaftaran usaha diverifikasi secara inklusif berbasis bukti
(evidence-based) menggunakan AI.

## Fitur Utama

- Marketplace produk & jasa multi-vendor UMKM.
- Direktori & peta UMKM lokal (Leaflet + OpenStreetMap).
- Pre-order / pesanan khusus dan booking layanan (pickup / delivery).
- Pembayaran online (Midtrans Snap) dan pembayaran langsung di toko.
- AI-Powered UMKM Verification — inklusif, berbasis bukti usaha.
- Dashboard pembeli, penjual, dan admin + laporan & grafik (Chart.js).

## Tech Stack

| Layer          | Teknologi                                               |
| -------------- | ------------------------------------------------------- |
| Frontend       | React.js + Vite (JavaScript `.jsx`)                     |
| UI             | Bootstrap 5.3 + Custom CSS, Bootstrap Icons, AOS        |
| Backend        | Node.js + Express.js (JavaScript `.js`)                |
| Database       | MySQL 8.4 + Prisma ORM                                  |
| Background job | Redis + BullMQ                                          |
| Pembayaran     | Midtrans Snap                                           |
| Peta           | Leaflet + OpenStreetMap                                 |
| Grafik         | Chart.js                                                |
| Deployment     | Docker + Nginx                                         |

Aturan proyek: **tidak menggunakan** TypeScript, Next.js, Laravel, Blade,
maupun Tailwind CSS. Selengkapnya di [rules.md](./rules.md).

## Struktur Proyek

Struktur monorepo (detail lengkap di
[konteks/konsep.md](./konsep.md)):

```
sedek_aget/
├── frontend/            # React + Vite (.jsx)
├── backend/             # Express + Prisma (.js)
├── konteks/             # Dokumen acuan proyek & aturan AI
│   ├── README.md
│   ├── konsep.md
│   ├── rules.md
│   └── STRUKTUR_CODE.md
├── .github/workflows/   # CI: lint + build check (syarat lomba)
├── docker-compose.yml   # MySQL 8.4 + Redis untuk development
├── AGENTS.md            # Instruksi wajib untuk agen AI
└── README.md
```

## Cara Menjalankan Proyek

Prasyarat: [Node.js](https://nodejs.org/) LTS, MySQL 8.4, dan Redis.

```bash
# 1. Clone repositori
git clone <URL-REPO-TIM>
cd sedek_aget

# 2. Frontend
cd frontend
npm install
npm run dev

# 3. Backend (terminal terpisah)
cd backend
npm install
cp .env.example .env    # isi kredensial: database, Redis, Midtrans, API AI
npm run dev
```

> Gunakan `docker compose up -d mysql redis` untuk menjalankan database dan
> Redis development. Detail lengkap ada di `README.md` root.

## Dokumentasi

- [rules.md](./rules.md) — aturan pengembangan clean code & ketentuan lomba.
- [konsep.md](./konsep.md) — konsep, arsitektur, database, dan sistem
  verifikasi.
- `Guidebook_CleanCode_informindfest.pdf` — panduan resmi lomba.

## Catatan Perubahan

### 11 November 2026

- Menambahkan `rules.md` — aturan pengembangan clean code dan ketentuan
  lomba hasil analisis *Guidebook Clean Code INFORMIND FEST VOL. II*
  (mencakup spesifikasi teknis, bobot penilaian, larangan diskualifikasi,
  dan checklist sebelum submit).
- Melengkapi `README.md` — menambahkan deskripsi proyek, cara menjalankan,
  tech stack, struktur proyek, dan tautan aturan pengembangan (sesuai
  ketentuan guidebook bahwa README wajib memuat cara menjalankan proyek).
- Menambahkan `konteks/konsep.md` — dokumen konsep lengkap marketplace digital
  UMKM (arsitektur, fitur, proses bisnis, database, sistem verifikasi AI,
  roadmap, dan batasan MVP untuk lomba), dengan penamaan diseragamkan ke
  `sedek_aget` (nama produk final menyusul).
- Memperbarui `rules.md` — menambahkan stack final proyek (React+Vite,
  Bootstrap 5.3, Express, MySQL+Prisma, Redis+BullMQ, Midtrans, Leaflet,
  Chart.js, Docker+Nginx) beserta larangan teknologi (TypeScript, Next.js,
  Laravel, Blade, Tailwind), aturan anti-duplikasi CRUD, integrasi &
  keamanan proyek, prioritas MVP & kesiapan demo, serta checklist yang
  diperluas.
- Memperbarui `README.md` — mendeklarasikan subtema **EKRAF**, deskripsi
  marketplace digital UMKM, fitur utama, tech stack nyata, struktur target
  monorepo, cara menjalankan, dan tautan `konteks/konsep.md`.
