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
| 4      | `konteks/STRUKTUR_CODE.md`   | Referensi struktur & konvensi kode (adaptasi ke React + Express).    |

Jika ada file baru di `konteks/`, baca juga sebelum bekerja.

---

## 3. Batasan keras proyek

Diambil dari `konteks/rules.md` — **tidak boleh dilanggar** tanpa kesepakatan
tim:

- **Frontend:** React.js + Vite, JavaScript/JSX (`.jsx`), Bootstrap 5.3 +
  Custom CSS, Bootstrap Icons, AOS.
- **Backend:** Node.js + Express.js, JavaScript (`.js`).
- **Database:** MySQL 8.4 + Prisma ORM (nama database: `sedek_aget`).
- **Background job:** Redis + BullMQ.
- **Integrasi:** Midtrans Snap, Google Maps JavaScript API, Chart.js.
- **Deployment:** Docker + Nginx.
- **Dilarang:** TypeScript, Next.js, Laravel, Blade, Tailwind CSS.
- Penamaan teknis konsisten memakai `sedek_aget` (repo, folder root, database).

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

> Ringkasnya: **baca `konteks/` dulu, baru kerjakan.**
