# Deploy WhatsApp Bot Gratis

## Opsi 1: Railway (Recommended)
**Keunggulan:** 500 jam/bulan gratis, auto-deploy dari GitHub

### Setup:
1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/whatsapp-bot.git
   git push -u origin main
   ```

2. **Deploy ke Railway**
   - Sign up di [railway.app](https://railway.app)
   - Connect GitHub repository
   - Set environment variables:
     ```
     OPENROUTER_API_KEY=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
     OPENROUTER_MODEL=minimax/minimax-m2.5
     NODE_ENV=production
     ```

3. **Tambahkan `railway.json`**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     }
   }
   ```

## Opsi 2: Render
**Keunggulan:** 750 jam/bulan gratis, support WebSocket

### Setup:
1. **Push ke GitHub** (sama seperti Railway)
2. **Deploy ke Render**
   - Sign up di [render.com](https://render.com)
   - Connect GitHub repository
   - Pilih "Web Service"
   - Set environment variables sama seperti Railway

## Opsi 3: Vercel
**Keunggulan:** Serverless functions, unlimited bandwidth

### Setup:
1. **Modifikasi untuk Vercel**
   - Buat folder `api`
   - Pindahkan logic ke `api/bot.js`

2. **Buat `vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/bot.js",
         "use": "@vercel/node"
       }
     ]
   }
   ```

## Opsi 4: Glitch
**Keunggulan:** Real-time collaboration, 1000 jam/bulan gratis

### Setup:
1. **Import ke Glitch**
   - Sign up di [glitch.com](https://glitch.com)
   - Import dari GitHub
   - Set environment variables di `.env`

## Opsi 5: Replit
**Keunggulan:** Always-on free tier, easy setup

### Setup:
1. **Buat Repl baru**
   - Sign up di [replit.com](https://replit.com)
   - Pilih "Node.js"
   - Upload semua file
   - Set secrets di Tools > Secrets

## Penting untuk WhatsApp Bot:

### 1. Persistent Storage
WhatsApp butuh session storage. Tambahkan ini:
```javascript
// Untuk Railway/Render
const fs = require('fs');
const path = require('path');

// Buat folder .wwebjs_auth jika tidak ada
if (!fs.existsSync('.wwebjs_auth')) {
    fs.mkdirSync('.wwebjs_auth');
}
```

### 2. Keep Alive
Tambahkan keep alive endpoint:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(process.env.PORT || 3000);
```

### 3. Environment Variables
Pastikan set:
- `NODE_ENV=production`
- `PORT` (jika diperlukan)
- API keys

## Rekomendasi Terbaik:
**Railway** - paling stabil untuk WhatsApp bot karena:
- Support persistent storage
- Auto-restart jika crash
- Mudah setup
- Cukup untuk 24/7 running

## Cara Test Deploy:
1. Deploy ke platform pilihan
2. Set webhook URL (jika perlu)
3. Test dengan kirim pesan ke WhatsApp
4. Monitor logs di dashboard platform

## Limitations Gratis:
- Railway: 500 jam/bulan (~21 hari 24/7)
- Render: 750 jam/bulan (~31 hari 24/7)
- Vercel: Function timeout 10 detik
- Glitch: 1000 jam/bulan
- Replit: Always-on dengan limitations

## Tips:
- Gunakan GitHub untuk version control
- Monitor usage di dashboard
- Setup alert untuk error
- Backup session files
- Gunakan health check endpoint
