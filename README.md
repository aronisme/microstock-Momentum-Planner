# Content Momentum Planner 🚀

AI-Powered Content Planner dengan database ide konten evergreen & musiman. Menggunakan **Gemini 2.5 Flash** sebagai AI utama dan **Groq (Llama 3.3 70B)** sebagai fallback otomatis.

## ✨ Features

- 📚 **8 Kategori Konten**: Finance, Health, Tech, Social, Education, Marketing, Home, Micro-Moments
- 🤖 **Dual AI Integration**: Gemini 2.5 Flash (primary) + Groq AI (fallback)
- ✍️ **AI Content Drafter**: Generate caption Instagram/LinkedIn otomatis
- 💡 **AI Brainstorming**: Tambah 5 ide baru per kategori dengan AI
- 🔍 **Smart Search & Filter**: Cari ide dengan mudah
- ✅ **Progress Tracking**: Tandai ide yang sudah digunakan
- 📋 **Copy to Clipboard**: Copy semua ide dalam satu kategori
- 📱 **Responsive Design**: Mobile-friendly

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Lucide React** - Icons
- **Google Gemini 2.5 Flash** - Primary AI
- **Groq (Llama 3.3 70B)** - Fallback AI

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ dan npm
- API keys untuk:
  - [Google Gemini API](https://aistudio.google.com/app/apikey)
  - [Groq API](https://console.groq.com/keys) (gratis)

### Installation

1. **Clone atau download project ini**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Copy file `.env.example` menjadi `.env`:
   ```bash
   copy .env.example .env
   ```
   
   Lalu edit file `.env` dan masukkan API keys Anda:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key
   VITE_GROQ_API_KEY=your_actual_groq_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   App akan terbuka di `http://localhost:3000`

5. **Build untuk production**
   ```bash
   npm run build
   ```

## 🌐 Deploy ke Netlify

### Option 1: Manual Deploy via Netlify UI

1. **Build project locally**
   ```bash
   npm run build
   ```

2. **Login ke [Netlify](https://netlify.com)**

3. **Drag & drop folder `dist/` ke Netlify**

4. **Set environment variables di Netlify**:
   - Go to: Site settings → Environment variables
   - Add:
     - `VITE_GEMINI_API_KEY` = your Gemini API key
     - `VITE_GROQ_API_KEY` = your Groq API key

5. **Redeploy** untuk apply environment variables

### Option 2: Deploy via Git (Recommended)

1. **Push ke GitHub/GitLab**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect ke Netlify**:
   - Login ke Netlify
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider dan repository
   - Build settings akan otomatis terbaca dari `netlify.toml`

3. **Set environment variables**:
   - Go to: Site settings → Environment variables
   - Add `VITE_GEMINI_API_KEY` dan `VITE_GROQ_API_KEY`

4. **Deploy!** Netlify akan otomatis build dan deploy

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Set environment variables via CLI
netlify env:set VITE_GEMINI_API_KEY "your_key"
netlify env:set VITE_GROQ_API_KEY "your_key"
```

## 🔑 Mendapatkan API Keys

### Google Gemini API Key
1. Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Login dengan Google account
3. Click "Create API Key"
4. Copy API key

### Groq API Key
1. Kunjungi [Groq Console](https://console.groq.com/keys)
2. Sign up / Login
3. Click "Create API Key"
4. Copy API key
5. **Gratis** dengan rate limit yang cukup untuk personal use

## 🎨 Cara Pakai

1. **Browse Ideas**: Lihat kategori atau gunakan search
2. **Filter by Category**: Click kategori tab untuk filter
3. **Check Progress**: Click item untuk mark as done
4. **AI Brainstorm**: Click ✨ di header kategori untuk generate 5 ide baru
5. **Draft Content**: Hover item → click 🪄 untuk generate caption
6. **Copy List**: Click "Copy List" untuk copy semua ide dalam kategori

## 🔄 AI Fallback System

App menggunakan **smart failover**:
1. Pertama coba **Gemini 2.5 Flash** (lebih cepat & murah)
2. Jika Gemini gagal → otomatis switch ke **Groq** (Llama 3.3 70B)
3. Error message jelas jika kedua AI gagal

## 📝 Project Structure

```
microstock-season/
├── public/               # Static assets
├── src/
│   ├── components/
│   │   └── ContentPlanner.jsx   # Main component
│   ├── utils/
│   │   └── aiService.js         # AI integration layer
│   ├── App.jsx                  # App wrapper
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment template
├── .gitignore
├── index.html                   # Root HTML
├── netlify.toml                 # Netlify config
├── package.json
├── vite.config.js
└── README.md
```

## 🐛 Troubleshooting

### AI tidak berfungsi
- Pastikan `.env` file ada dan berisi API keys yang valid
- Check console browser untuk error messages
- Verify API keys belum expired atau exceed quota

### Build error
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Netlify deployment gagal
- Check build logs di Netlify dashboard
- Pastikan environment variables sudah di-set
- Verify `netlify.toml` ada di root project

## 📄 License

MIT License - bebas digunakan untuk personal maupun commercial

## 🙋 Support

Jika ada pertanyaan atau issue, silakan buat GitHub issue atau hubungi developer.

---

Made with ❤️ using React, Vite, Gemini AI, and Groq
"# microstock-Momentum-Planner" 
