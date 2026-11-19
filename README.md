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
- **Backend** — REST API Laravel 13 + Eloquent: autentikasi Sanctum SPA cookie
  (`HttpOnly` + CSRF), daftar UMKM & kategori, seed data contoh, dan fondasi
  queue Redis.
- **Fallback data** — halaman tetap tampil dengan data contoh saat API belum
  berjalan.

Fitur bertahap berikutnya (sesuai roadmap): dashboard pembeli/penjual/admin,
keranjang & checkout, pre-order, booking layanan, webhook Midtrans, pipeline AI
verifikasi penuh, dan laporan Chart.js. Fitur-fitur ini **belum** diimplementasikan
— lihat `konteks/konsep.md` untuk rencananya.

## Tech stack

| Layer           | Teknologi                                               |
| --------------- | ------------------------------------------------------- |
| Frontend        | React.js + Vite (JavaScript `.jsx`)                     |
| UI              | Bootstrap 5.3 + Custom CSS, Bootstrap Icons, AOS        |
| Backend         | Laravel 13 + PHP 8.3+ (REST API)                        |
| ORM             | Eloquent (MySQL 8.4, database `sedek_aget`)             |
| Autentikasi     | Laravel Sanctum — SPA cookie + CSRF                     |
| Background job  | Laravel Queue + Redis (`predis/predis`)                 |
| Pembayaran      | Midtrans Snap (konfigurasi placeholder, belum terhubung)|
| Peta            | Google Maps JavaScript API + @vis.gl/react-google-maps  |
| Grafik          | Chart.js (rencana)                                      |
| Deployment      | Docker + Nginx (tahap akhir)                            |

Tidak menggunakan Express.js, Node.js sebagai backend, TypeScript, Next.js,
Vue, Nuxt, CodeIgniter, maupun Tailwind CSS. Blade **tidak** dipakai sebagai
frontend — SPA React tetap dikirim oleh Vite/Nginx.

## Struktur repositori

```text
sedek_aget/
├── frontend/                 # React + Vite (.jsx)
│   └── src/
│       ├── assets/styles/    # design token & CSS
│       ├── components/       # layout & komponen UI reusable
│       ├── contexts/         # AuthContext
│       ├── data/             # fallback data demo
│       ├── hooks/            # useFetch
│       ├── pages/            # Home, Explore, Map, Login, Register, 404
│       ├── routes/           # AppRoutes
│       └── services/         # api, authService, storeService
├── backend/                  # Laravel 13 + PHP
│   ├── app/
│   │   ├── Contracts/        # antarmuka layanan AI (swappable)
│   │   ├── Http/             # Controllers/Api, Requests, Resources
│   │   ├── Jobs/             # ProcessAiVerification (mock/fallback)
│   │   ├── Models/           # 6 model Eloquent
│   │   ├── Policies/         # StorePolicy
│   │   ├── Services/         # Auth, Store, Category, Mock AI
│   │   └── Support/          # ApiResponse (envelope JSON)
│   ├── bootstrap/app.php     # routing, middleware, exception handler
│   ├── config/               # app, cors, database, sanctum, queue, services
│   ├── database/
│   │   ├── migrations/       # 6 tabel domain + cache/jobs/token
│   │   └── seeders/          # kategori, user, toko & produk
│   ├── routes/api.php        # 8 endpoint publik/auth
│   └── tests/Feature/        # health, auth, stores, categories
├── konteks/                  # dokumen acuan proyek
├── .github/workflows/        # CI lint + test + build
├── docker-compose.yml        # MySQL 8.4 + Redis (development)
├── AGENTS.md                 # instruksi wajib untuk agen AI
└── README.md
```

## Prasyarat

- PHP 8.3 atau lebih baru + Composer 2 (ekstensi `pdo_mysql`, `mbstring`)
- Node.js 20 atau lebih baru
- MySQL 8.4 (atau jalankan lewat Docker Compose)
- Redis (dibutuhkan queue worker; opsional untuk endpoint saat ini)
- Google Maps API key dengan **Maps JavaScript API** aktif (untuk fitur peta)

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
CREATE DATABASE sedek_aget_test;
```

### 2. Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve --port=5000
```

`VITE_API_URL` lama (`http://localhost:5000/api`) tetap dipakai, jadi frontend
tidak perlu diubah port-nya. Cek kesehatan:

```bash
curl http://localhost:5000/api/health
```

Jalankan worker antrean (untuk fondasi job AI) di terminal terpisah:

```bash
cd backend
php artisan queue:work redis
```

> Kredensial Midtrans dan AI API **tidak** disimpan di repositori. Isi
> `MIDTRANS_SERVER_KEY`, `MIDTRANS_IS_PRODUCTION`, `AI_API_KEY`, dan `AI_API_URL`
> manual di `backend/.env` hanya di lingkungan lokal/produksi.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# isi VITE_GOOGLE_MAPS_API_KEY dengan API key Maps JavaScript API
npm run dev
```

Frontend berjalan di `http://localhost:5173`. `VITE_APP_URL` dipakai untuk
mengambil cookie CSRF Sanctum di `${VITE_APP_URL}/sanctum/csrf-cookie`;
default-nya diturunkan dari `VITE_API_URL`. Batasi API key Google Maps dengan
HTTP referrer `http://localhost:5173/*` (dan domain produksi nanti).

## Akun demo (hasil seed)

| Peran    | Email                    | Password   |
| -------- | ------------------------ | ---------- |
| Admin    | `admin@sedekaget.id`     | `Admin123!` |
| Pembeli  | `pembeli@sedekaget.id`   | `Buyer123!` |

## Endpoint API

| Method | Endpoint              | Keterangan                          | Auth |
| ------ | --------------------- | ----------------------------------- | ---- |
| GET    | `/api/health`         | Status API                          | —    |
| POST   | `/api/auth/register`  | Registrasi akun                     | —    |
| POST   | `/api/auth/login`     | Login (set session cookie HttpOnly) | —    |
| POST   | `/api/auth/logout`    | Logout                              | Ya   |
| GET    | `/api/auth/me`        | Profil pengguna aktif               | Ya   |
| GET    | `/api/stores`         | Daftar UMKM aktif                   | —    |
| GET    | `/api/stores/:slug`   | Detail UMKM                         | —    |
| GET    | `/api/categories`     | Daftar kategori usaha               | —    |

Query opsional untuk `/api/stores`: `?search=` dan `?category=`.

Respons sukses dibungkus `{ "success": true, "data": ... }`; error
`{ "success": false, "message": "...", "details": [{ "path", "message" }] }`.

## Scripts

| Lokasi    | Perintah                     | Fungsi                              |
| --------- | ---------------------------- | ----------------------------------- |
| frontend  | `npm run dev`                | Jalankan Vite dev server            |
| frontend  | `npm run build`              | Build produksi                      |
| frontend  | `npm run lint`               | ESLint frontend                     |
| backend   | `composer lint`              | Pint `--test` (PHP style)           |
| backend   | `composer format`            | Pint (format otomatis)              |
| backend   | `php artisan route:list`     | Daftar route API                    |
| backend   | `php artisan migrate`        | Jalankan migrasi (non-destruktif)   |
| backend   | `php artisan db:seed`        | Isi data contoh (`updateOrCreate`)  |
| backend   | `php artisan test`           | PHPUnit feature tests               |
| backend   | `php artisan queue:work redis` | Jalankan worker antrean           |

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

## Catatan perubahan

### 19 November 2026

- Migrasi backend Express.js/Prisma → **Laravel 13 + Eloquent** untuk
  kepatuhan stack lomba. Kontrak API 8 endpoint, envelope JSON, dan port 5000
  dipertahankan agar frontend tidak di-redesign.
- Autentikasi JWT cookie diganti **Sanctum SPA cookie**; frontend menambah
  bootstrap CSRF di `src/services/api.js` dan `VITE_APP_URL`.
- Migrasi database dibuat non-destruktif (`Schema::hasTable()` guard), seeder
  memakai `updateOrCreate`; tidak ada `migrate:fresh`/truncate.
- Fondasi queue Redis (`predis/predis`), job `ProcessAiVerification` dengan
  mock AI, dan konfigurasi Midtrans tanpa secret. Webhook Midtrans dan pipeline
  AI nyata **belum** diimplementasikan.
- CI diperbarui: backend PHP 8.4 + Composer + Pint + PHPUnit (MySQL service),
  frontend ESLint + build, serta pemeriksaan duplikasi JSCPD < 50%.
- Dokumentasi stack (`README.md`, `AGENTS.md`, seluruh `konteks/`) disinkronkan;
  baris sampah `prankkk` dihapus.

### 12 November 2026

- Mengganti peta dari Leaflet + OpenStreetMap ke **Google Maps JavaScript
  API** dengan library `@vis.gl/react-google-maps`.
- Menambahkan `VITE_GOOGLE_MAPS_API_KEY` pada konfigurasi environment
  frontend; peta menampilkan pesan fallback jika key belum diisi.
