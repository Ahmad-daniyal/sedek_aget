# Struktur Code — Edquest

> Dokumen referensi arsitektur dan konvensi kode proyek **Edquest**.
> Dipakai sebagai acuan untuk proyek lain bertema *clean code* — termasuk proyek
> yang memakai framework. Bahasa: Indonesia. Gaya: referensi lengkap & praktis.

---

## 1. Ringkasan Proyek

Edquest adalah **Static Single Page Application (SPA)** untuk komunitas belajar siswa.
Proyek ini sengaja dibangun tanpa framework JavaScript agar sesuai aturan lomba
(React/Vue/Angular dilarang; lihat `RULES.md`).

| Aspek | Keputusan | Konsekuensi struktur |
|---|---|---|
| Bahasa | JavaScript modern (ES Modules native) | Semua modul `import`/`export`, tanpa bundler |
| UI | HTML string + Tailwind CDN + CSS variables | View = fungsi yang mengembalikan string HTML |
| Routing | Hash routing (`#/`, `#/forum`, dst.) | Tidak butuh server rewrite; aman di static hosting |
| Data | JSON statis di-fetch sekali ke `dataStore` | Data layer terpisah dari view dan logika |
| State user | `localStorage` / `sessionStorage` | Persistensi browser, tanpa backend |
| Entry | `js/core/main.js` | Satu titik bootstrap yang eksplisit |
| Arsitektur | Layered: core → services → features/components | Tanggung jawab per folder jelas |

**Prinsip utama:** *view hanya merender, service memegang logika & state, data layer
memuat konten, core mengatur alur aplikasi.* Tidak ada lapisan yang melompati
tanggung jawab lapisan lain tanpa alasan.

---

## 2. Peta Folder

```text
adayuna/
├── index.html                  # Shell HTML: slot navbar/sidebar/auth/app/footer
├── css/
│   ├── global.css              # Design system: token warna, tipografi, komponen dasar
│   └── scroll-animation.css    # Animasi reveal, stagger, back-to-top, skeleton
├── js/
│   ├── core/                   # "Kernel" aplikasi (alur & infrastruktur)
│   │   ├── main.js             # Bootstrap: init theme, motion, preload data, router
│   │   ├── app.js              # Event global & handler lintas halaman
│   │   ├── router.js           # Hash router + registrasi rute
│   │   ├── config.js           # Satu sumber kebenaran: key storage, path data, limit
│   │   ├── theme.js            # Init dark mode
│   │   ├── motion.js           # Preferensi reduced-motion (sistem + override user)
│   │   ├── search.js           # Mesin pencarian global + autocomplete
│   │   ├── scrollAnimation.js  # IntersectionObserver reveal + counter
│   │   └── smoothScroll.js     # Scroll halus native + lock scroll modal
│   ├── services/               # Logika domain & state aplikasi
│   │   ├── auth.js             # Login, register, sesi, toast
│   │   ├── forum.js            # Thread, komentar, vote, filter
│   │   ├── buddy.js            # Study buddy matching & filter
│   │   ├── match.js            # Arena duel, kuis, rating, leaderboard
│   │   ├── profile.js          # Profil, badge, poin, statistik
│   │   ├── notes.js            # Jurnal belajar + orkestrasi AI
│   │   ├── ai.js               # Mesin AI demo (lokal, deterministik)
│   │   ├── notifications.js    # Notifikasi per user
│   │   └── settings.js         # Modal pengaturan & hapus akun
│   ├── data/
│   │   └── index.js            # preloadData() + dataStore (cache JSON)
│   └── utils/                  # Helper murni, tanpa state domain
│       ├── styleLoader.js      # injectStyle(): lazy-load CSS per fitur
│       ├── journalSamples.js   # Pembuat catatan contoh + ref catatan
│       └── url.js              # Helper hash path/navigate
├── components/
│   ├── layout/                 # Kerangka halaman (dirender sekali)
│   │   ├── navbar/{navbar.js,navbar.css}
│   │   ├── sidebar/{sidebar.js,sidebar.css}
│   │   └── footer/{footer.js,footer.css}
│   └── ui/                     # Komponen UI reusable
│       └── auth-modal/{auth-modal.js,auth-modal.css}
├── features/                   # Satu folder = satu halaman
│   ├── home/{home.js,home.json,css/home.css}
│   ├── forum/{forum.js,css/forum.css}
│   ├── friend/{friend.js,css/friend.css}
│   ├── match/{match.js,css/match.css}
│   ├── profile/{profile.js,css/profile.css}
│   ├── notes/{notes.js,notes.json,css/notes.css}
│   └── about/{about.js,css/about.css}
├── data/                       # Konten JSON statis lintas fitur
│   ├── forum.json, buddies.json, questions.json
│   ├── about.json, faq.json, leaderboard.json
│   └── journal-samples.json
├── assets/                     # Gambar/aset visual
├── testing/                    # (placeholder pengujian)
├── README.md
├── RULES.md
└── STRUKTUR_CODE.md
```

### Aturan penempatan file

| Jika kamu menulis... | Taruh di... |
|---|---|
| Alur bootstrap, router, event global | `js/core/` |
| Logika bisnis, baca/tulis state user | `js/services/` |
| Helper murni yang bisa dipakai siapa saja | `js/utils/` |
| Kerangka halaman (navbar/sidebar/footer) | `components/layout/` |
| Komponen UI yang bisa muncul di banyak halaman | `components/ui/` |
| Markup + init satu halaman | `features/<nama>/` |
| Konten statis yang dibaca banyak fitur | `data/` |
| Konten yang hanya milik satu fitur | `features/<nama>/<nama>.json` |
| Styling milik satu fitur/komponen | di samping file `.js`-nya |

---

## 3. Lapisan Arsitektur & Alur Data

```text
index.html
   │  (memuat CSS global + <script type="module" src="js/core/main.js">)
   ▼
js/core/main.js
   ├── initTheme()          → kelas .dark pada <html>
   ├── Motion.init()        → kelas .reduce-motion
   ├── preloadData()        → fetch semua JSON → dataStore
   ├── Router.init()        → render navbar/sidebar/footer/auth-modal + rute awal
   ├── App.init()           → pasang event global
   ├── Auth.init()          → pulihkan sesi + bind form auth
   └── Notifications.init()
   ▼
Router.handleRoute()
   ├── parse hash + query
   ├── pilih render function dari tabel `routes`
   ├── app.innerHTML = render(params)
   ├── update nav active + scroll ke atas
   └── dispatch event "pageChanged" { pageName, query, params }
   ▼
App (listener pageChanged)
   └── panggil init halaman yang sesuai:
         home    → initHookCards(), initHomeSearch()
         forum   → Forum.refresh(), initForumSearch()
         friend  → Matching.init()
         match   → Match.init()
         profile → Profile.init()
         catatan → Notes.init(params)
   ▼
Service (Forum/Match/Notes/…) membaca dataStore + user, mengisi DOM,
menyimpan perubahan ke localStorage, lalu memicu toast/notifikasi.
```

### Mengapa ada event `pageChanged`?

Router hanya bertanggung jawab **mengganti markup**. Semua perilaku halaman
(event listener, observer animasi, render data) dijalankan setelahnya lewat
event `pageChanged`. Ini membuat:

- Router tetap kecil dan tidak tahu detail tiap fitur.
- Fitur bisa di-init ulang setiap navigasi tanpa saling mengimpor router.
- Urutan aman: markup sudah ada di DOM saat `init` dijalankan.

> Catatan implementasi: dispatch dibungkus `setTimeout(..., 0)` dan init halaman
> memakai **double `requestAnimationFrame`** agar layout sudah selesai dihitung
> sebelum mengukur/memanipulasi DOM (`js/core/app.js:35-55`).

---

## 4. Pola per Layer

### 4.1 Core — konfigurasi terpusat

`js/core/config.js` adalah **single source of truth**. Jangan menyebar angka
ajaib, key storage, atau path data ke file lain.

```js
export const CONFIG = {
  STORAGE_KEYS: {
    USER: 'edquest_user',
    REGISTERED_USERS: 'edquest_registered',
    DARK: 'edquest_dark',
    // ...
  },
  DATA_PATHS: {
    FORUM: 'data/forum.json',
    NOTES: 'features/notes/notes.json',
    // ...
  },
  LIMITS: { MAX_PAGES: 7, SEARCH_MAX: 6, JOURNAL_POINTS: 5 },
  MAPELS: [ /* ... */ ]
};
```

**Aturan:** jika sebuah nilai dipakai di dua tempat atau lebih, pindahkan ke
`CONFIG`. Jika hanya dipakai satu file, biarkan lokal di file itu.

### 4.2 Core — router dengan tabel rute

```js
const routes = {
  '/': renderHome,
  'home': renderHome,
  'forum': renderForum,
  'friend': renderFriend,
  'match': renderMatch,
  'about': renderAbout,
  'profile': renderProfile,
  'catatan': renderNotes
};
```

- Rute = pemetaan **nama → fungsi render**, bukan kumpulan `if`.
- Halaman baru cukup menambah satu entri + satu file feature.
- Alias lama ditangani tanpa menulis ulang URL (`ALIASES`).
- Query string diteruskan ke render & init (`#/catatan?note=<ref>`).

### 4.3 Service — singleton IIFE

Semua service memakai pola **module singleton**: state privat di dalam closure,
API publik dikembalikan sebagai objek.

```js
export const Auth = (() => {
  let currentUser = null;          // state privat
  let pendingRegisterEmail = null;

  function init() { /* ... */ }
  function handleLogin(e) { /* ... */ }
  function getUser() { return currentUser; }

  return { init, openModal, closeModal, getUser, isLoggedIn, showToast };
})();
```

**Kenapa pola ini?**

| Keuntungan | Penjelasan |
|---|---|
| Enkapsulasi | State tidak bisa diubah dari luar kecuali lewat method |
| Satu instance | Tidak ada duplikasi state antar halaman |
| Mudah dites | API publik kecil dan eksplisit |
| Tanpa `this` | Tidak ada masalah binding saat dipanggil dari event |

**Konvensi penamaan method service:**

- `init()` — dipanggil saat halaman aktif.
- `render()` / `refresh()` — memperbarui DOM dari state.
- `getX()` / `isX()` — pembacaan murni.
- `openX()` / `closeX()` — buka/tutup modal.
- `handleX(e)` / `submitX(e)` — handler event.
- `persistX()` / `saveX()` / `loadX()` — akses storage.

### 4.4 Feature — view + init terpisah

Satu fitur mengekspor minimal dua hal: **markup** dan **perilaku**.

```js
// features/forum/forum.js
import { injectStyle } from '../../js/utils/styleLoader.js';

injectStyle('features/forum/css/forum.css');   // CSS dimuat hanya saat dibutuhkan

export function renderForum() {
  return `<section>...markup...</section><div id="forumRoot"></div>`;
}

export function initForumSearch() {
  // dipanggil setelah markup masuk DOM
}
```

Pembagian tanggung jawab:

| File | Boleh berisi | Tidak boleh berisi |
|---|---|---|
| `features/x/x.js` | Markup, helper tampilan, init event halaman | Logika bisnis berat, akses storage langsung |
| `js/services/x.js` | Logika bisnis, state, render komponen dinamis, storage | Markup shell halaman |
| `features/x/css/x.css` | Gaya khusus halaman | Token global (taruh di `global.css`) |

> Pengecualian yang disengaja: beberapa feature (mis. `home.js`, `about.js`)
> merender konten dari `dataStore`. Itu tetap "view" karena hanya memetakan
> data ke HTML, tanpa mengubah state.

### 4.5 Component — layout vs UI

```js
// components/layout/navbar/navbar.js
import { injectStyle } from '../../../js/utils/styleLoader.js';
injectStyle('components/layout/navbar/navbar.css');

export function renderNavbar() {
  return `<nav class="top-navbar">...</nav>`;
}
```

- **Layout** (`navbar`, `sidebar`, `footer`) dirender **sekali** oleh Router ke
  slot di `index.html`.
- **UI** (`auth-modal`) adalah komponen yang dirender sekali tapi dibuka/tutup
  berkali-kali; perilakunya dipegang service.
- Komponen **tidak menyimpan state sendiri**; state ada di service.

### 4.6 Data layer — preload + cache

```js
// js/data/index.js
export const dataStore = { forum: [], buddies: [], home: null, /* ... */ };

export async function preloadData() {
  if (loaded) return;                       // idempoten
  await Promise.all([
    load(CONFIG.DATA_PATHS.FORUM, 'forum'),
    load(CONFIG.DATA_PATHS.NOTES, 'notes')
  ]);
  loaded = true;
}
```

- Semua data statis dimuat **sekali** di awal, paralel (`Promise.all`).
- Service membaca dari `dataStore`, tidak `fetch` sendiri-sendiri.
- Untuk data dinamis/API nyata, cukup ganti isi `load()` / `preloadData()`.

### 4.7 Utils — fungsi murni & tanpa domain

`js/utils/styleLoader.js` adalah contoh helper yang ideal: kecil, satu tugas,
tanpa ketergantungan pada state aplikasi.

```js
const injected = new Set();

export function injectStyle(path) {
  if (injected.has(path)) return;   // idempoten
  injected.add(path);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = path;
  document.head.appendChild(link);
}
```

**Aturan utils:** tidak boleh mengimpor service. Jika sebuah helper butuh
service, ia bukan util — taruh di service terkait.

---

## 5. Konvensi Penulisan Kode

### 5.1 Penamaan

| Jenis | Konvensi | Contoh |
|---|---|---|
| File & folder | `kebab-case` / satu kata huruf kecil | `auth-modal.js`, `smoothScroll.js`* |
| Fungsi render | `render<Entity>` | `renderHome`, `renderNavbar` |
| Fungsi init | `init<Scope>` | `initHomeSearch`, `initTheme` |
| Service | `PascalCase` (objek singleton) | `Auth`, `Forum`, `Match` |
| Konstanta | `UPPER_SNAKE_CASE` | `CONFIG`, `MAX_ITEMS`, `STORAGE_KEYS` |
| Variabel/fungsi lokal | `camelCase` | `currentUser`, `handleLogin` |
| Kelas CSS | deskriptif + `kebab-case` | `.card-panel`, `.hero-hook-card` |

\*Sebagian file core memakai `camelCase` karena warisan; untuk proyek baru
disarankan konsisten `kebab-case` untuk nama file.

### 5.2 Escaping HTML — wajib untuk data dinamis

Setiap data yang berasal dari user/JSON dan dimasukkan ke `innerHTML` **harus**
di-escape.

```js
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g,
    c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
```

- `esc()` untuk teks.
- `escAttr()` / `escapeAttr()` untuk nilai atribut.
- Untuk teks murni, lebih aman `element.textContent = ...` (lihat `setText`
  di `js/services/notes.js`).

### 5.3 Event delegation & binding idempoten

Handler global dipasang **sekali** di `App`/service, lalu memakai `closest()`
agar elemen yang dirender belakangan tetap tertangani:

```js
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="login"]');
  if (btn) { e.preventDefault(); Auth.openModal('login'); }
});
```

Untuk listener yang menempel pada elemen, gunakan **guard idempoten** agar
tidak menumpuk saat halaman dirender ulang:

```js
if (input.dataset.searchBound) return;
input.dataset.searchBound = '1';
```

Contoh nyata: `js/core/search.js:182-199` (guard `kdBound` mencegah listener
keydown berlipat).

### 5.4 Komentar menjelaskan **kenapa**, bukan **apa**

Kode yang jelas tidak butuh komentar "apa". Komentar dipakai untuk keputusan
non-obvious:

```js
// Guard memakai key yang ikut query, bukan pageName saja: pindah dari
// `#/catatan?note=a` ke `#/catatan?note=b` tetap harus merender ulang,
// padahal pageName-nya sama.
const routeKey = pageName + (query ? '?' + query : '');
```

### 5.5 Performa & aksesibilitas

- Listener `scroll`/`pointermove` memakai `{ passive: true }` + `requestAnimationFrame`.
- Animasi menghormati `prefers-reduced-motion` lewat `Motion`.
- Elemen interaktif punya `aria-label`, `role`, `aria-selected`, `aria-expanded`.
- Modal memakai `role="dialog"` dan `aria-modal="true"`.
- Fokus & keyboard didukung (ArrowUp/Down/Enter/Tab pada autocomplete).

---

## 6. Manajemen State & Storage

### 6.1 Sumber state

| State | Tempat | Contoh |
|---|---|---|
| Konten statis | `dataStore` (memori) | forum, buddies, questions |
| Sesi user | `localStorage` (remember) / `sessionStorage` | `edquest_user` |
| Daftar akun | `localStorage` | `edquest_registered` |
| Preferensi | `localStorage` | `edquest_dark`, `edquest_reduce_motion` |
| Data per fitur | `localStorage` | `edquest_forum_threads`, `edquest_notifications` |
| State halaman sesaat | variabel closure service | `entry`, `ref`, `busy` di `notes.js` |

### 6.2 Aturan

1. **Key storage selalu lewat `CONFIG.STORAGE_KEYS`** bila dipakai lintas fitur.
2. Bungkus akses storage dengan `try/catch` — browser bisa memblokir storage.
3. Data user disimpan **per user id** bila memungkinkan (lihat `notifications.js`).
4. Jangan menyimpan DOM element di state; simpan data, render ulang dari data.
5. Setelah mengubah state user, panggil `persistUser()` lalu refresh UI terkait.

---

## 7. Arsitektur CSS

### 7.1 Design token terpusat

`css/global.css` mendefinisikan variabel untuk **light** dan **dark** sekaligus:

```css
:root {
  --primary: #2563EB;
  --text-primary: #0F172A;
  --bg-body: #F8FAFC;
  --border-color: #E2E8F0;
  --radius-lg: 12px;
  --font-sans: 'Inter', sans-serif;
  --transition: 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.dark {
  --primary: #38BDF8;
  --text-primary: #F8FAFC;
  --bg-body: #090D16;
  /* ... */
}
```

**Aturan:** komponen memakai `var(--token)`, bukan nilai warna hard-coded.
Dengan begitu dark mode bekerja tanpa menduplikasi selector.

### 7.2 CSS per fitur, dimuat lazy

- CSS fitur berada di `features/<nama>/css/<nama>.css`.
- Dimuat lewat `injectStyle()` saat modul fitur pertama kali diimpor.
- `injectStyle` idempoten, jadi aman dipanggil berkali-kali.
- CSS global & animasi dimuat langsung dari `index.html`.

### 7.3 Struktur file CSS

Disarankan urutan di dalam satu file CSS:

1. Komentar judul bagian (`/* ===== Hero ===== */`)
2. Variabel lokal (jika hanya dipakai fitur itu)
3. Layout/container
4. Elemen/komponen
5. State (`.active`, `.visible`, `.open`)
6. Dark mode (`.dark ...`)
7. Media query responsif
8. `@keyframes`

### 7.4 Sistem animasi reveal

- Kelas `reveal`, `reveal-left`, `reveal-right`, `reveal-scale`, `reveal-blur`.
- `reveal-stagger-1..8` memberi jeda bertingkat.
- `ScrollAnimation` menambah `.visible` saat elemen masuk viewport.
- `App`/service memanggil `ScrollAnimation.refresh()` setelah render dinamis.
- `Motion` menonaktifkan animasi saat user minta reduced motion.

---

## 8. Adaptasi ke Proyek Berbasis Framework

Struktur ini bisa dipetakan langsung ke framework apa pun. Inti yang dipertahankan:
**pemisahan core / domain / UI / data / utils**.

### 8.1 Tabel pemetaan konsep

| Konsep di proyek ini | Padanan di framework |
|---|---|
| `js/core/config.js` | `config/`, `env`, `constants` |
| `js/core/router.js` | Router framework (`react-router`, `vue-router`, `svelte-routing`) |
| `js/core/app.js` (event global) | Layout/root component, provider, global event bus |
| Service singleton (`Auth`, `Forum`) | Store (Pinia/Redux/Zustand) atau composable/hook + service API |
| `renderX()` string HTML | Component (`.jsx`, `.vue`, `.svelte`) |
| `initX()` setelah render | lifecycle (`onMounted`, `useEffect`) |
| `dataStore` + `preloadData()` | Store data / query layer (`fetch`, TanStack Query, RTK Query) |
| `injectStyle()` | CSS module / scoped style / import CSS di component |
| `CONFIG.STORAGE_KEYS` | constants/localStorage wrapper service |
| `components/layout` | Layout components (`AppLayout`, `Navbar`, `Sidebar`) |
| `components/ui` | Shared UI components (`Modal`, `Button`, `Input`) |
| `features/*` | Pages/routes/views |
| `css/global.css` token | Theme config (Tailwind `theme.extend`, CSS variables, design tokens) |
| Event `pageChanged` | Router hooks / `afterEach` / route watcher |

### 8.2 Usulan struktur folder versi framework

```text
src/
├── app/                    # bootstrap, router, providers, config
│   ├── router.*
│   ├── config.*
│   └── providers.*
├── pages/                  # padanan features/
│   ├── home/
│   │   ├── HomePage.*
│   │   └── home.css
│   ├── forum/
│   └── notes/
├── components/
│   ├── layout/             # Navbar, Sidebar, Footer
│   └── ui/                 # Modal, Button, Input, Toast
├── services/               # logika domain & panggilan API
│   ├── auth.*
│   ├── forum.*
│   └── notes.*
├── stores/                 # state global (jika memakai store)
│   ├── auth-store.*
│   └── match-store.*
├── data/                   # data statis / adapter API
├── lib/ atau utils/        # helper murni
├── styles/                 # token global & tema
└── assets/
```

### 8.3 Aturan migrasi yang aman

1. **Pindahkan `CONFIG` lebih dulu**, jangan port kode dengan angka/path hard-coded.
2. **Service dulu, UI belakangan.** Logika domain tidak perlu tahu framework.
3. **Satu halaman = satu feature/page.** Jangan gabungkan beberapa halaman di
   satu komponen besar.
4. **Pertahankan escaping.** Di framework, default sudah aman; tetap hindari
   `dangerouslySetInnerHTML` / `v-html` untuk data user.
5. **Ganti event `pageChanged`** dengan lifecycle/hook router framework.
6. **Pertahankan pemisahan CSS global vs scoped.**

### 8.4 Contoh pemetaan service → composable

```js
// Vanilla (proyek ini)
export const Auth = (() => {
  let currentUser = null;
  function init() { /* pulihkan sesi */ }
  function getUser() { return currentUser; }
  return { init, getUser };
})();

// Vue composable (contoh padanan)
export function useAuth() {
  const currentUser = ref(null);
  function init() { /* pulihkan sesi */ }
  return { currentUser: readonly(currentUser), init };
}
```

Bentuk berubah, **tanggung jawab tetap sama**: state privat, API kecil, satu
sumber kebenaran.

---

## 9. Checklist Clean Code

### Struktur

- [ ] Satu file punya satu tanggung jawab yang jelas.
- [ ] View tidak mengakses storage langsung; lewat service.
- [ ] Service tidak mengimpor feature (menghindari circular import).
- [ ] `utils` tidak mengimpor `services`.
- [ ] Nilai yang dipakai bersama ada di `CONFIG`.
- [ ] Data statis dimuat sekali dan di-cache.

### Keamanan & kualitas

- [ ] Semua data dinamis di-escape sebelum masuk `innerHTML`.
- [ ] Listener global dipasang sekali (delegation).
- [ ] Listener elemen memakai guard idempoten.
- [ ] Akses storage dibungkus `try/catch`.
- [ ] Tidak ada `console.log`/kode debug yang tertinggal.

### UX & aksesibilitas

- [ ] Elemen interaktif punya label/`aria-*` yang sesuai.
- [ ] Modal bisa ditutup (tombol, overlay, Escape).
- [ ] Animasi menghormati `prefers-reduced-motion`.
- [ ] Layout responsif (mobile-first, sidebar overlay di layar kecil).

### Performa

- [ ] Event scroll/pointer memakai `{ passive: true }` + `rAF`.
- [ ] CSS fitur dimuat lazy.
- [ ] IntersectionObserver/ResizeObserver di-disconnect saat tidak dipakai.
- [ ] Tidak ada query DOM berulang di dalam loop animasi.

---

## 10. Do / Don't

| Do | Don't |
|---|---|
| `export function renderX()` yang mengembalikan markup | Menyisipkan logika bisnis di dalam string HTML |
| `export const X = (() => { ... })()` untuk service | Objek global yang bisa dimutasi dari mana saja |
| `esc()` sebelum interpolasi data | Langsung menaruh `user.name` ke `innerHTML` |
| Event delegation + `data-action` | Memasang ulang listener setiap render tanpa guard |
| `var(--token)` untuk warna | Hard-code `#2563EB` di banyak file |
| `ScrollAnimation.refresh()` setelah render dinamis | Mengandalkan `setTimeout` acak untuk animasi |
| Komentar menjelaskan keputusan | Komentar mengulang isi kode |
| Query dari `Router` diteruskan ke `init(params)` | Membaca `window.location` di banyak tempat |

### Anti-pattern yang sengaja dihindari

- **God service:** satu service menangani auth, forum, dan profil sekaligus.
- **View↔service circular:** feature mengimpor service, service mengimpor feature.
- **Magic number tersebar:** batas poin, durasi, jumlah item ditulis ulang.
- **State di DOM:** membaca `dataset` sebagai sumber kebenaran bisnis.
- **Render ulang seluruh app** hanya untuk update kecil.

---

## 11. Referensi Cepat File Kunci

| File | Tanggung jawab |
|---|---|
| `index.html` | Shell HTML, slot layout, CDN, entry module |
| `js/core/main.js` | Bootstrap & urutan inisialisasi |
| `js/core/router.js` | Tabel rute, parse hash/query, dispatch `pageChanged` |
| `js/core/app.js` | Event global & init per halaman |
| `js/core/config.js` | Storage keys, path data, limit, daftar mapel/minat |
| `js/core/search.js` | Pencarian global, autocomplete, navigasi hasil |
| `js/core/scrollAnimation.js` | Reveal, counter, back-to-top, safety net |
| `js/core/smoothScroll.js` | Scroll halus native, lock/unlock scroll |
| `js/core/motion.js` | Preferensi reduced-motion |
| `js/core/theme.js` | Init dark mode |
| `js/data/index.js` | `preloadData()` + `dataStore` |
| `js/services/auth.js` | Sesi, login/register, toast |
| `js/services/forum.js` | Thread, komentar, vote, filter kategori |
| `js/services/buddy.js` | Filter & render study buddy |
| `js/services/match.js` | Arena: lobby, duel, timer, rating, leaderboard |
| `js/services/profile.js` | Sinkronisasi profil, badge, poin |
| `js/services/notes.js` | Mode daftar/detail catatan + aksi AI |
| `js/services/ai.js` | Ringkasan, poin penting, langkah, kuis (lokal) |
| `js/services/notifications.js` | Notifikasi per user |
| `js/services/settings.js` | Modal pengaturan & hapus akun |
| `js/utils/styleLoader.js` | Lazy-load CSS idempoten |
| `js/utils/journalSamples.js` | Catatan contoh & ref catatan |
| `components/layout/*` | Navbar, sidebar, footer |
| `components/ui/auth-modal/*` | Modal login/daftar |
| `features/*` | Markup + init tiap halaman |
| `css/global.css` | Design token & komponen dasar |
| `css/scroll-animation.css` | Kelas animasi reveal & stagger |

---

## 12. Alur Menambah Halaman Baru (Ringkas)

1. Buat `features/<nama>/<nama>.js` dengan `render<Nama>()` dan `init<Nama>()`.
2. Buat `features/<nama>/css/<nama>.css`, panggil `injectStyle(...)` di modul.
3. Tambahkan entri di `routes` pada `js/core/router.js`.
4. Tambahkan `case` init di listener `pageChanged` (`js/core/app.js`).
5. Bila perlu data statis: tambah path di `CONFIG.DATA_PATHS`, muat di
   `preloadData()`, baca lewat `dataStore`.
6. Bila perlu logika/state: buat service di `js/services/<nama>.js`.
7. Tambahkan link navigasi di `components/layout/navbar|sidebar|footer`.
8. Tambahkan entri `PAGE_ENTRIES` di `js/core/search.js` agar bisa dicari.
9. Uji: navigasi langsung, refresh halaman, dark mode, mobile, reduced motion.

---

*Dokumen ini adalah referensi struktur, bukan spesifikasi kaku. Yang wajib dijaga
adalah pemisahan tanggung jawab, konfigurasi terpusat, escaping data, dan
konsistensi konvensi.*
