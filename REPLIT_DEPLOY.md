# Deploy WhatsApp Bot ke Replit

## Cara Deploy ke Replit

### Langkah 1: Buat Repl Baru
1. Sign up/login ke [replit.com](https://replit.com)
2. Click **"+ Create Repl"**
3. Pilih **"Node.js"**
4. Beri nama: `whatsapp-bot`

### Langkah 2: Upload Files
1. **Copy semua file dari folder bot kamu**
2. **Paste ke Replit editor**
3. Atau drag & drop file-file ini:
   - `package.json`
   - `index.js`
   - `keep_alive.js`
   - `railway.json` (opsional)
   - `README.md`
   - `DEPLOYMENT.md`

### Langkah 3: Setup Environment Variables
1. Klik **"Tools"** di sidebar kiri
2. Pilih **"Secrets"**
3. Tambahkan secrets:
   ```
   OPENROUTER_API_KEY = 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
   OPENROUTER_MODEL = minimax/minimax-m2.5
   NODE_ENV = production
   ```

### Langkah 4: Install Dependencies
1. Di **Shell** (terminal Replit), jalankan:
   ```bash
   npm install
   ```

### Langkah 5: Run Bot
1. Klik **"Run"** button (▶️)
2. Akan muncul QR code di console
3. Scan QR code dengan WhatsApp Web
4. Bot siap digunakan!

### Langkah 6: Keep Alive (Always-On)
1. Klik **"Tools"** → **"Cron Jobs"**
2. Tambahkan cron job:
   - **Expression:** `*/15 * * * *`
   - **Command:** `curl https://your-repl-name.username.repl.co`
3. Ini akan keep Repl awake setiap 15 menit

## File yang Diperlukan di Replit

### 1. package.json (sudah ada)
```json
{
  "name": "whatsapp-openrouter-bot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "whatsapp-web.js": "^1.22.1",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "qrcode-terminal": "^0.12.0"
  }
}
```

### 2. index.js (sudah ada)
File utama bot sudah siap

### 3. keep_alive.js (sudah ada)
Untuk health check endpoint

## Tips untuk Replit

### Auto-Start
Replit akan otomatis restart jika crash, tapi:
- Gunakan **Always-On** (Pro) untuk 24/7
- Gratis version akan sleep setelah 15 menit tidak aktif

### Session Persistence
Session WhatsApp akan tersimpan di Replit storage

### Monitor Logs
- Lihat **Console** untuk debug
- **Logs** tab untuk full history

## Troubleshooting

### QR Code tidak muncul
- Restart Repl (Stop → Run)
- Clear browser cache
- Pastikan dependencies terinstall

### Bot sleep
- Setup cron job (langkah 6)
- Atau upgrade ke Always-On

### Error 404 OpenRouter
- Pastikan API key benar
- Cek model name: `minimax/minimax-m2.5`

## Keunggulan Replit
- ✅ **Instant setup** - no Git needed
- ✅ **Free storage** untuk session
- ✅ **Built-in terminal**
- ✅ **Auto dependencies install**
- ✅ **Shareable link**

## Limitations Gratis
- Sleep setelah 15 menit tidak aktif
- Limited CPU time
- No custom domain

## Cara Test Deploy
1. Run bot di Replit
2. Scan QR code
3. Kirim pesan ke WhatsApp
4. Cek response di console

**Selesai!** Bot kamu sekarang running di Replit 🎉
