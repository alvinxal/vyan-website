# 🎬 ANIMASI WEBSITE: “Meet Your Guide — A Local Journey With Me”

## 📌 Tujuan
Membuat animasi halaman web yang responsif terhadap scroll pengguna. Setiap scroll vertikal (dengan jarak minimal 100px) akan memicu tampilan elemen baru secara bertahap, menciptakan narasi visual yang mengalir dan personal.

---

## 🧭 STRUKTUR HALAMAN & ELEMEN

Halaman dibagi menjadi 3 bagian utama, masing-masing dipicu oleh scroll:

### ➤ Bagian 1: Intro + Foto Pemandu
- **Judul Utama:** `A Local Journey With Me`
- **Subjudul:** `Meet Your Guide`
- **Paragraf Deskripsi 1:** Tentang latar belakang pemandu dan filosofi tur.
- **Foto Utama:** Pemandu di depan candi Bali (Gambar 1).

### ➤ Bagian 2: Pengalaman di GWK + Foto Klien
- **Lokasi Tag:** `📍 Garuda Wisnu Kencana`
- **Paragraf Deskripsi 2:** Tentang momen bersama klien di GWK.
- **Foto Kedua:** Grup klien di depan patung GWK (Gambar 2).

### ➤ Bagian 3: Foto Klien Lanjutan
- **Foto Ketiga:** Versi lain dari foto klien di GWK (Gambar 3), bisa juga sebagai carousel mini.

---

## ⚙️ ANIMASI DETAIL (Trigger: Scroll)

> **Catatan Umum:**
> - Semua animasi menggunakan easing `ease-out`.
> - Trigger scroll dihitung per “section” (bukan per pixel). Jika user scroll >100px ke bawah, maka animasi bagian berikutnya dimulai.
> - Animasi hanya berjalan sekali per sesi (setelah user scroll melewati elemen, tidak akan berulang jika scroll naik-turun).

---

### ✅ BAGIAN 1 — ON FIRST SCROLL (Setelah user scroll turun >100px)

#### 1. Judul Utama (`A Local Journey With Me`)
- **Efek:** Fade In + Slide Up (dari Y+20px)
- **Durasi:** 1s
- **Delay:** 0s (langsung saat trigger)

#### 2. Subjudul (`Meet Your Guide`)
- **Efek:** Fade In + Scale Up (dari 95% → 100%)
- **Durasi:** 0.8s
- **Delay:** 0.1s setelah judul mulai

#### 3. Paragraf Deskripsi 1
- **Efek:** Fade In + Slide Left (dari X-30px)
- **Durasi:** 0.8s
- **Delay:** 0.5s setelah subjudul mulai

#### 4. Foto Pemandu (Gambar 1)
- **Efek:** Fade In + Zoom In (dari 90% → 100%) + Subtle Bounce (Y+5px lalu turun)
- **Durasi:** 1s
- **Delay:** 0.7s setelah paragraf mulai
- **Bonus Interaktif:** Saat hover → scale to 102%, dengan shadow ring halus.

---

### ✅ BAGIAN 2 — ON SECOND SCROLL (Setelah user scroll turun >100px lagi)

#### 1. Lokasi Tag (`📍 Garuda Wisnu Kencana`)
- **Efek:** Fade In + Slide Down (dari Y-10px)
- **Durasi:** 0.6s
- **Delay:** 0s

#### 2. Paragraf Deskripsi 2
- **Efek:** Fade In + Slide Right (dari X+30px)
- **Durasi:** 0.8s
- **Delay:** 0.2s setelah lokasi tag

#### 3. Foto Kedua (Grup di GWK)
- **Efek:** Fade In + Scale Up (dari 95% → 100%) + Tilt Slight (rotasi +2° saat muncul, lalu kembali ke 0°)
- **Durasi:** 1s
- **Delay:** 0.5s setelah paragraf mulai
- **Bonus Interaktif:** Hover → zoom 105% + glow effect lembut.

---

### ✅ BAGIAN 3 — ON THIRD SCROLL (Setelah user scroll turun >100px lagi)

#### 1. Foto Ketiga (Alternatif/Carousel Mini)
- **Efek:** Fade In + Slide Up (dari Y+20px)
- **Durasi:** 0.8s
- **Delay:** 0s
- **Bonus Interaktif:** Jika ada lebih dari 3 foto → buat carousel otomatis berputar tiap 3 detik, dengan panah navigasi.

---

## 🎨 STYLING & INTERAKSI TAMBAHAN

- **Background:** Putih bersih (`#FFFFFF`) dengan padding 80px di atas dan bawah tiap section.
- **Font:** Gunakan sans-serif modern (contoh: Inter, SF Pro Display).
- **Hover Effect Global:** Semua gambar memiliki `transition: transform 0.3s ease, box-shadow 0.3s ease`.
- **Mobile Optimization:** Untuk layar <768px, gunakan `slide up` saja tanpa slide horizontal, dan kurangi durasi menjadi 0.6s.

---

## 📱 RESPONSIF & PERFORMANCE

- Pastikan animasi tidak membebani performa (gunakan `will-change: transform, opacity` pada elemen yang bergerak).
- Untuk perangkat mobile, nonaktifkan efek tilt/bounce jika mendeteksi touch device.
- Gunakan `Intersection Observer API` untuk mendeteksi scroll trigger agar lebih akurat dan hemat resource.

---

## 🧪 TEST CASES

1. User scroll cepat → semua animasi tetap berjalan urut, tidak skip.
2. User scroll lambat → animasi muncul satu per satu dengan delay yang pas.
3. User scroll naik → animasi tidak reset, hanya tetap di posisi akhir.
4. Di mobile → animasi tetap lancar dan tidak lag.

---

✅ **Output Akhir:** Halaman yang interaktif, emosional, dan menceritakan perjalanan bersama pemandu lokal melalui scroll. Setiap scroll membuka bab baru dari cerita.