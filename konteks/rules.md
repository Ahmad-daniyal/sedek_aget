# Rules — Clean Code Web Programming

Aturan pengembangan proyek **sedek_aget** yang diturunkan dari
*Guidebook Lomba Clean Code Web Programming — INFORMIND FEST VOL. II*
dan dokumen konsep [konsep.md](./konsep.md).

Semua kontributor wajib membaca dan mematuhi dokumen ini sebelum menulis kode.

---

## 1. Ketentuan Umum Lomba

1. Karya harus **orisinal**, belum pernah dipublikasikan atau diikutsertakan di
   kompetisi lain.
2. Karya dikumpulkan **sebelum batas waktu berakhir** (H-1 Review, pukul 23:59).
3. Kode tidak boleh mengandung unsur SARA, pornografi, perjudian, maupun hal
   yang melanggar hukum di Indonesia.
4. Proyek wajib disimpan di **repositori GitHub publik** milik tim dan
   menyertakan `README.md` berisi **cara menjalankan proyek**.
5. Hak kepemilikan karya tetap milik peserta; panitia hanya berhak
   mendokumentasikan karya untuk publikasi kegiatan.
6. Keputusan panitia dan dewan juri bersifat mutlak.

## 2. Spesifikasi Teknis Wajib Lomba

1. Stack teknologi bebas; panitia merekomendasikan Vanilla HTML/CSS/JS,
   React.js, Next.js, Vue.js, atau TypeScript. Keputusan internal proyek
   `sedek_aget` mengikuti bagian 3 di bawah (React + Laravel).
2. CSS framework yang diperbolehkan: Tailwind CSS atau Bootstrap. Proyek ini
   memakai Bootstrap 5.3 + custom CSS.
3. Kode harus lolos penyaringan otomatis (System Automated):
   - **CI/CD GitHub Actions Build Check** — build harus sukses.
   - **Linter ESLint** — tanpa error/warning yang diabaikan.
   - **Plagiarism Detector JSCPD** — skor duplikasi **< 50%**.

## 3. Stack Final Proyek sedek_aget

Keputusan stack proyek (selaras ketentuan lomba — lihat
[konsep.md](./konsep.md)):

| Layer           | Teknologi                                                    |
| --------------- | ------------------------------------------------------------ |
| Frontend        | React.js + Vite — JavaScript/JSX (`.jsx`)                      |
| UI              | Bootstrap 5.3 + Custom CSS, Bootstrap Icons, AOS               |
| Backend         | Laravel 13 + PHP 8.3+ (REST API)                              |
| Database        | MySQL 8.4 + Eloquent ORM (database: `sedek_aget`)             |
| Autentikasi     | Laravel Sanctum — SPA cookie + CSRF                           |
| Background job  | Laravel Queue + Redis (`predis/predis`)                       |
| Pembayaran      | Midtrans Snap                                                 |
| Peta            | Google Maps JavaScript API                                    |
| Grafik          | Chart.js                                                     |
| Deployment      | Docker + Nginx                                                |

Aturan tambahan:

1. **Dilarang** menggunakan Express.js, Node.js sebagai backend, TypeScript,
   Next.js, Vue, Nuxt, CodeIgniter, maupun Tailwind CSS. Blade tidak dipakai
   sebagai frontend (SPA tetap React).
2. Ekstensi file frontend `.jsx`, backend `.php` — konsisten di seluruh proyek.
3. Penamaan teknis konsisten memakai `sedek_aget` (repo, folder root,
   database) sampai nama produk final ditetapkan.
4. Perubahan stack hanya boleh dilakukan lewat kesepakatan tim dan dicatat di
   `README.md` (changelog).

## 4. Standar Clean Code & Arsitektur (bobot penilaian 35%)

1. **Kerapihan struktur folder**
   - Ikuti struktur monorepo di `konteks/konsep.md` (bagian 15): `frontend/` dan
     `backend/` terpisah, backend Laravel layered (`Http/Controllers/Api`,
     `Http/Requests`, `Http/Resources`, `Services`, `Models`, `Policies`,
     `Jobs`).
   - Konsisten di seluruh proyek; jangan mencampur kode frontend dan backend.
2. **Keterbacaan kode**
   - Penamaan variabel, fungsi, dan file harus deskriptif dan konsisten
     (mis. `getUserProfile()`, `map-container.css`).
   - Satu fungsi = satu tanggung jawab; pecah fungsi panjang menjadi kecil.
3. **Tidak ada dead code**
   - Hapus variabel, fungsi, CSS selector, dan import yang tidak terpakai.
   - Jangan menyimpan kode lama dalam komentar.
4. **Minim duplikasi — khususnya halaman CRUD**
   - Dashboard pembeli/penjual/admin punya banyak halaman serupa: buat
     **komponen reusable** untuk tabel, form, kartu, dan modal; jangan
     copy-paste antar halaman.
   - Gunakan **custom hooks** (mis. `useFetch`, `useAuth`) untuk logika data
     yang berulang.
   - Semua panggilan API lewat **service layer** (`src/services/`); jangan
     duplikasi `fetch` di dalam komponen.
   - Backend: pisahkan route, handler/service, dan validasi agar pola seragam
     antar modul (skor JSCPD jauh di bawah 50%).
5. **Kepatuhan linter**
   - Dilarang memanipulasi file konfigurasi linter atau memakai
     `// eslint-disable` secara agresif untuk mengelabui auto-grading.
   - Perbaiki akar masalah yang dilaporkan ESLint/Pint, jangan sembunyikan.
6. **CI wajib hijau**
   - `.github/workflows` menjalankan **ESLint + build frontend, Pint + PHPUnit backend, dan JSCPD < 50%**; push/PR terakhir harus
     status hijau sebelum submit (syarat System Automated Tahap 2).
7. **Dokumentasi**
   - `README.md` harus selalu mutakhir: cara install, menjalankan, dan
     membangun proyek.

## 5. Inovasi & Kesesuaian Subtema (bobot 25%)

1. Proyek sedek_aget memilih subtema **EKRAF (Ekonomi Kreatif)** —
   digitalisasi UMKM lokal dan marketplace jasa/karya independen.
2. Gagasan harus menjawab masalah nyata (urgensi) dan solutif, bukan sekadar
   tampilan. Pembeda utama: **AI-Powered UMKM Verification** inklusif
   berbasis bukti (evidence-based) untuk semua skala usaha.
3. Referensi subtema lain (jangan berpindah tanpa kesepakatan tim):
   - STEM — edu-tech, simulasi sains/matematika, portal kuis koding.
   - SOCIOTECH — pemberdayaan masyarakat, transparansi sosial.
   - FINTECH — pencatatan keuangan UMKM/komunitas, POS, pelacak anggaran.

## 6. Kualitas UI/UX & Responsivitas (bobot 20%)

1. Antarmuka responsif pada berbagai ukuran layar (mobile, tablet, desktop).
2. Navigasi nyaman dan konsisten; elemen interaktif terlihat seperti elemen
   interaktif.
3. Visual rapi: spasi, tipografi, dan warna konsisten — komponen Bootstrap 5.3
   dipakai seragam, tidak campur gaya per halaman.
4. Prototipe tampilan dirancang dulu (Google Stitch) sebelum implementasi.

## 7. Fungsionalitas & Performa (bobot 20%)

1. Fitur utama harus berjalan **tanpa error/bugs** — fitur yang rusak lebih
   buruk daripada fitur yang belum ada.
2. Optimalkan kecepatan akses: kompresi aset, hindari payload berlebih,
   muat pustaka pihak ketiga secara efisien.
3. Uji manual setiap alur utama sebelum commit/push.

## 8. Integrasi & Keamanan Proyek

Prinsip tetap dari konsep (konteks/konsep.md bagian 16):

1. Password pengguna harus di-hash.
2. Autentikasi memakai session/JWT dengan cookie `HttpOnly` yang aman.
3. Hak akses diperiksa di **backend**, bukan hanya menyembunyikan menu di
   frontend.
4. **Server Key Midtrans hanya di `.env` backend** — tidak boleh dikirim ke
   browser dan tidak boleh di-commit ke repositori.
5. Webhook pembayaran diverifikasi dan idempotent.
6. Harga dihitung ulang oleh backend (jangan percaya harga dari frontend).
7. Update stok secara transaksional agar tidak minus.
8. Foto/dokumen verifikasi disimpan di penyimpanan privat; akses hanya untuk
   pihak berwenang.
9. Proses AI punya log dan audit; kegagalan layanan AI bukan indikasi penipuan.
10. Data pribadi dikelola sesuai prinsip perlindungan data dan kebijakan
    retensi yang jelas.

## 9. Prioritas MVP & Kesiapan Demo

1. **Urutan fitur inti**: marketplace (katalog, keranjang, checkout) → profil
   & peta UMKM → pre-order → verifikasi AI. Fitur tambahan hanya setelah inti
   stabil.
2. Layanan eksternal (**Midtrans Snap**, API AI) wajib punya **fallback/mock**
   agar demo tetap berjalan saat layanan gagal atau tidak tersedia.
3. Sebelum submit: CI lint+build hijau, ESLint zero error, semua alur utama
   teruji ulang end-to-end.
4. Sesuaikan roadmap 9 tahap (konteks/konsep.md bagian 17) dengan jadwal lomba —
   batas pengumpulan H-1 Review pukul 23:59.

## 10. Larangan & Diskualifikasi

Tim **didiskualifikasi** jika:

1. Terbukti plagiarisme atau memakai karya milik orang lain (skor JSCPD > 50%).
2. Tidak memenuhi persyaratan administrasi atau pengumpulan abstrak/laporan
   ide.
3. Sengaja memanipulasi file linter atau memakai `// eslint-disable` secara
   agresif untuk mengelabui auto-grading.
4. Mengumpulkan karya melebihi batas waktu.
5. Melanggar ketentuan, spesifikasi teknis, atau regulasi umum
   INFORMIND FEST VOL. II.

## 11. Formula Nilai Akhir

```
Nilai Akhir = (20% x Nilai Tahap 1: Abstrak Ide)
             + (40% x Nilai Tahap 2: System Automated)
             + (40% x Nilai Tahap 3: Wawancara & Juri Cek Code)
```

## 12. Checklist Sebelum Submit

- [ ] Repositori GitHub publik dan up-to-date.
- [ ] `README.md` berisi deskripsi, cara menjalankan, dan tech stack.
- [ ] Build CI/CD GitHub Actions sukses (lint + build hijau).
- [ ] ESLint lolos di frontend dan Pint (`composer lint`) lolos di backend.
- [ ] Skor JSCPD < 50%.
- [ ] Tidak ada dead code dan duplikasi berlebihan.
- [ ] Tidak ada `eslint-disable` agresif.
- [ ] Semua fitur utama teruji tanpa bug.
- [ ] Tampilan responsif di mobile, tablet, dan desktop.
- [ ] Karya orisinil dan sesuai subtema EKRAF.
- [ ] Demo tetap berjalan tanpa layanan eksternal (fallback/mock siap).
- [ ] Tidak ada kredensial/`.env` yang ter-commit.
- [ ] Penamaan konsisten `sedek_aget` (repo, folder, database).
