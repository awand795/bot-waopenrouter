# WhatsApp Bot dengan OpenRouter Minimax

Bot WhatsApp yang merespons semua pesan pengguna menggunakan model AI dari OpenRouter (Minimax M2.5).

## Fitur

- ✅ Merespons semua pesan teks dari pengguna
- ✅ Menggunakan model AI Minimax M2.5 gratis dari OpenRouter
- ✅ Auto-reconnect dengan session persistence
- ✅ Error handling yang baik
- ✅ React emoji saat memproses pesan

## Instalasi

1. Clone atau download repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan bot:
   ```bash
   npm start
   ```

## Cara Penggunaan

1. Jalankan bot dengan `npm start`
2. Scan QR code yang muncul di terminal dengan WhatsApp Web
3. Setelah terhubung, bot akan otomatis merespons semua pesan yang masuk

## Konfigurasi

API key dan model sudah dikonfigurasi di file `.env`:
- `OPENROUTER_API_KEY`: API key dari OpenRouter
- `OPENROUTER_MODEL`: Model AI yang digunakan (minimax/minimax-m2.5:free)

## Commands

- `npm start`: Menjalankan bot
- `npm run dev`: Menjalankan bot dengan nodemon (auto-restart)

## Catatan

- Bot akan merespons semua pesan teks kecuali dari broadcast
- Bot tidak akan merespons pesan yang mengandung media (gambar, video, dll)
- Pastikan koneksi internet stabil
- Session akan tersimpan secara lokal untuk auto-reconnect

## Troubleshooting

Jika QR code tidak muncul:
- Pastikan Chrome/Chromium terinstall
- Coba restart bot

Jika bot tidak merespons:
- Periksa koneksi internet
- Pastikan API key valid
- Cek log error di terminal
