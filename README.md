# sedek_aget

Marketplace digital UMKM lokal — menghubungkan masyarakat dengan pedagang,
warung, usaha rumahan, hingga penyedia jasa di sekitarnya. Proyek untuk
**Lomba Clean Code Web Programming — INFORMIND FEST VOL. II**, subtema
**EKRAF (Ekonomi Kreatif)**.

> **Wajib dibaca:** sebelum mengerjakan proyek, baca seluruh isi
> [`konteks/`](./konteks/) dan [`AGENTS.md`](./AGENTS.md). Folder `konteks/`
> adalah sumber kebenaran proyek.

## Status base web

Base web fullstack sudah tersedia:

- **Frontend** — React + Vite dengan desain modern minimalis emerald: landing
  page, jelajah UMKM, peta UMKM, halaman masuk & daftar, responsif.
- **Backend** — REST API Express dengan Prisma: autentikasi JWT (cookie
  `HttpOnly`), daftar UMKM & kategori, seed data contoh.
- **Fallback data** — halaman tetap tampil dengan data contoh saat API belum
  berjalan.

Fitur bertahap berikutnya (sesuai roadmap): dashboard pembeli/penjual/admin,
keranjang & checkout, pre-order, booking layanan, Midtrans, verifikasi AI
(BullMQ), dan laporan Chart.js.

## Tech stack

| Layer           | Teknologi                                             |
| --------------- | ----------------------------------------------------- |
| Frontend        | React.js + Vite (JavaScript `.jsx`)                   |
| UI              | Bootstrap 5.3 + Custom CSS, Bootstrap Icons, AOS      |
| Backend         | Node.js + Express.js (JavaScript `.js`)               |
| Database        | MySQL 8.4 + Prisma ORM (database: `sedek_aget`)       |
| Background job  | Redis + BullMQ (disiapkan untuk tahap berikutnya)     |
| Peta            | Leaflet + OpenStreetMap                               |
| Deployment      | Docker + Nginx (tahap akhir)                          |

Tidak menggunakan TypeScript, Next.js, Laravel, Blade, maupun Tailwind CSS.

## Struktur repositori

```text
sedek_aget/
├── frontend/                 # React + Vite
│   └── src/
│       ├── assets/styles/    # design token & CSS
│       ├── components/       # layout & komponen UI reusable
│       ├── contexts/         # AuthContext
│       ├── data/             # fallback data demo
│       ├── hooks/            # useFetch
│       ├── pages/            # Home, Explore, Map, Login, Register, 404
│       ├── routes/           # AppRoutes
│       └── services/         # api, authService, storeService
├── backend/                  # Express + Prisma
│   ├── prisma/               # schema & seed
│   └── src/
│       ├── config/           # env & Prisma client
│       ├── middleware/       # auth, validasi, error handler
│       ├── modules/          # auth, stores, categories
│       └── utils/
├── konteks/                  # dokumen acuan proyek
├── .github/workflows/        # CI lint + build
├── docker-compose.yml        # MySQL 8.4 + Redis (development)
├── AGENTS.md                 # instruksi wajib untuk agen AI
└── README.md
```

## Prasyarat

- Node.js 20 atau lebih baru
- MySQL 8.4 (atau jalankan lewat Docker Compose)
- Docker + Docker Compose (opsional, untuk database & Redis lokal)
- Redis (opsional untuk base web; dibutuhkan saat background job ditambahkan)

## Menjalankan proyek

### 1. Database & Redis (opsional lewat Docker)

```bash
docker compose up -d mysql redis
```

Ini menyiapkan MySQL di `localhost:3306` dengan database `sedek_aget`
(user `root`, password `password`) dan Redis di `localhost:6379`.

Jika memakai MySQL lokal, buat database berikut:

```sql
CREATE DATABASE sedek_aget;
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# sesuaikan DATABASE_URL, JWT_SECRET, dan CLIENT_URL pada .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

API berjalan di `http://localhost:5000`. Cek kesehatan:

```bash
curl http://localhost:5000/api/health
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend berjalan di `http://localhost:5173`.

## Akun demo (hasil seed)

| Peran    | Email                    | Password   |
| -------- | ------------------------ | ---------- |
| Admin    | `admin@sedekaget.id`     | `Admin123!` |
| Pembeli  | `pembeli@sedekaget.id`   | `Buyer123!` |

## Endpoint API

| Method | Endpoint              | Keterangan                     |
| ------ | --------------------- | ------------------------------ |
| GET    | `/api/health`         | Status API                     |
| POST   | `/api/auth/register`  | Registrasi akun                |
| POST   | `/api/auth/login`     | Login (set cookie HttpOnly)    |
| POST   | `/api/auth/logout`    | Logout                         |
| GET    | `/api/auth/me`        | Profil pengguna aktif          |
| GET    | `/api/stores`         | Daftar UMKM aktif              |
| GET    | `/api/stores/:slug`   | Detail UMKM                    |
| GET    | `/api/categories`     | Daftar kategori usaha          |

Query opsional untuk `/api/stores`: `?search=` dan `?category=`.

## Scripts

| Lokasi    | Perintah                 | Fungsi                          |
| --------- | ------------------------ | ------------------------------- |
| frontend  | `npm run dev`            | Jalankan Vite dev server        |
| frontend  | `npm run build`          | Build produksi                  |
| frontend  | `npm run lint`           | ESLint frontend                 |
| backend   | `npm run dev`            | Jalankan API (watch mode)       |
| backend   | `npm start`              | Jalankan API produksi           |
| backend   | `npm run lint`           | ESLint backend                  |
| backend   | `npm run prisma:migrate` | Prisma migrate (development)    |
| backend   | `npm run prisma:seed`    | Isi data contoh                 |

## Desain

- Palet **emerald + netral** (`#059669`, `#fafaf9`, `#1c1917`).
- Tipografi **Plus Jakarta Sans**, sudut membulat 12–24px, shadow halus.
- Fokus pada whitespace, hierarki jelas, dan komponen Bootstrap yang
  disesuaikan lewat design token di `frontend/src/assets/styles/`.

## Dokumentasi & aturan

- [`AGENTS.md`](./AGENTS.md) — instruksi wajib untuk agen AI.
- [`konteks/README.md`](./konteks/README.md) — gambaran proyek.
- [`konteks/konsep.md`](./konteks/konsep.md) — konsep, arsitektur, database,
  verifikasi AI, roadmap.
- [`konteks/rules.md`](./konteks/rules.md) — aturan lomba, stack final, clean
  code, keamanan.
- [`konteks/STRUKTUR_CODE.md`](./konteks/STRUKTUR_CODE.md) — referensi
  struktur & konvensi kode.
