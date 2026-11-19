# AGENTS.md — Instruksi Wajib untuk AI

> Dokumen ini ditujukan untuk **agen AI / asisten AI** yang mengerjakan proyek
> `sedek_aget`. Baca ini sampai selesai sebelum melakukan apa pun.

---

## 1. Aturan utama (wajib)

**SEBELUM** menulis kode, mengubah file, menjalankan perintah, atau menjawab
pertanyaan teknis tentang proyek:

1. **Baca seluruh isi folder `konteks/`** terlebih dahulu.
2. Jangan mulai implementasi sebelum semua dokumen konteks dipahami.
3. Folder `konteks/` adalah **sumber kebenaran** proyek — lebih tinggi daripada
   asumsi atau kebiasaan umum.

Jika instruksi pengguna bertentangan dengan isi `konteks/` (khususnya
`konteks/rules.md`), **konfirmasi dulu** sebelum melangkah.

---

## 2. Urutan membaca folder `konteks/`

Baca berurutan, jangan dilewati:

| Urutan | File                         | Isi & kegunaan                                                       |
| ------ | ---------------------------- | -------------------------------------------------------------------- |
| 1      | `konteks/README.md`          | Gambaran proyek, fitur utama, tech stack, cara menjalankan.          |
| 2      | `konteks/konsep.md`          | Konsep bisnis, arsitektur, database, AI verification, roadmap 9 tahap. |
| 3      | `konteks/rules.md`           | Aturan lomba, stack final, standar clean code, keamanan, larangan.   |
| 4      | `konteks/STRUKTUR_CODE.md`   | Referensi struktur & konvensi kode (adaptasi ke React + Laravel).    |

Jika ada file baru di `konteks/`, baca juga sebelum bekerja.

---

## 3. Batasan keras proyek

Diambil dari `konteks/rules.md` — **tidak boleh dilanggar** tanpa kesepakatan
tim:

- **Frontend:** React.js + Vite, JavaScript/JSX (`.jsx`), Bootstrap 5.3 +
  Custom CSS, Bootstrap Icons, AOS.
- **Backend:** Laravel 13 + PHP 8.3+ (REST API, bukan Express/Node.js).
- **Database:** MySQL 8.4 + Eloquent ORM (nama database: `sedek_aget`).
- **Autentikasi:** Laravel Sanctum SPA cookie + CSRF.
- **Background job:** Laravel Queue + Redis (`predis/predis`).
- **Integrasi:** Midtrans Snap, Google Maps JavaScript API, Chart.js.
- **Deployment:** Docker + Nginx.
- **Dilarang:** Express.js, Node.js sebagai backend, TypeScript, Next.js, Vue,
  Nuxt, CodeIgniter, Tailwind CSS. Blade tidak dipakai sebagai frontend.
- Penamaan teknis konsisten memakai `sedek_aget` (repo, folder root, database).

> PERUBAHAN 19 November 2026: aturan lama yang melarang Laravel dan menetapkan
> Express/Prisma/BullMQ sudah diganti. Semua dokumen `konteks/` mengikuti
> stack Laravel di atas.

---

## 4. Alur kerja AI yang benar

1. **Pahami konteks** — baca seluruh `konteks/` (bagian 2).
2. **Rencanakan** — tentukan langkah sesuai roadmap di `konteks/konsep.md`
   bagian 17 dan batasan MVP bagian 21.
3. **Implementasi bertahap** — satu bagian selesai dan teruji sebelum lanjut.
4. **Jaga clean code** — komponen reusable, service layer, tanpa dead code,
   minim duplikasi (target JSCPD < 50%).
5. **Verifikasi sebelum selesai** — jalankan lint dan build; CI wajib hijau.

---

## 5. Larangan

- **Jangan** mengubah atau menghapus isi `konteks/` tanpa diminta eksplisit.
- **Jangan** commit `.env`, kredensial, atau secret apa pun (mis. Server Key
  Midtrans).
- **Jangan** menambahkan teknologi yang dilarang (lihat bagian 3).
- **Jangan** mengelabui linter dengan `eslint-disable` agresif.
- **Jangan** meninggalkan dead code, komentar kode lama, atau `console.log`
  debug.

---

## 6. Checklist sebelum menyelesaikan tugas

- [ ] Seluruh `konteks/` sudah dibaca.
- [ ] Stack dan larangan teknologi dipatuhi.
- [ ] Struktur folder sesuai `konteks/konsep.md` bagian 15.
- [ ] Tidak ada dead code / duplikasi berlebihan.
- [ ] Lint dan build lolos.
- [ ] Keamanan dijaga (harga dihitung backend, hak akses dicek backend,
      secret tidak terekspos).
- [ ] Dokumentasi dan `konteks/` sinkron dengan perubahan.

---

## 7. Sinkronisasi konteks (wajib)

Setiap perubahan kode, stack, struktur folder, API, fitur, atau proses bisnis
wajib dianalisis dampaknya terhadap folder `konteks/`.

1. Periksa apakah perubahan memengaruhi `konteks/README.md`,
   `konteks/konsep.md`, `konteks/rules.md`, atau
   `konteks/STRUKTUR_CODE.md`.
2. Perbarui dokumen konteks yang terdampak pada commit yang sama dengan
   perubahan kode.
3. Perbarui juga `README.md` dan `AGENTS.md` bila stack, cara menjalankan,
   struktur, atau aturan berubah.
4. Jika tidak ada perubahan konteks yang diperlukan, catat alasan singkat di
   catatan perubahan.
5. Jangan menyelesaikan tugas bila dokumentasi/konteks belum sinkron dengan
   perubahan, kecuali perubahan murni internal tanpa dampak.

> Ringkasnya: **baca `konteks/` dulu, baru kerjakan; setiap perubahan
> wajib menjaga `konteks/` tetap sinkron.**
