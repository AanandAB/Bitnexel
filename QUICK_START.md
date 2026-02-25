# ForkPoint Systems - Quick Start Guide

## 🚀 Run Locally (5 Minutes)

### 1. Prerequisites
- Install **Node.js 18+**: https://nodejs.org/
- Install **pnpm**: `npm install -g pnpm`

### 2. Setup & Run
```bash
# Navigate to project folder
cd forkpoint-systems

# Install dependencies (takes 2-3 minutes)
pnpm install

# Start development server
pnpm dev

# Open browser to: http://localhost:5173
```

**That's it!** The website is now running locally. 🎉

---

## ☁️ Deploy to Vercel (2 Minutes)

### Method 1: Via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/forkpoint-systems.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to: https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Click "Deploy"
   - Done! 🚀

### Method 2: Drag & Drop (Fastest)

```bash
# Build locally
pnpm build

# Go to: https://vercel.com/new
# Drag the 'dist' folder
# Click Deploy
```

**Your website is live in 2 minutes!** 🎉

---

## 📋 Common Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

---

## 🔧 Troubleshooting

**Port already in use?**
- Vite will automatically use next available port (5174, 5175, etc.)

**Build fails?**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Images not loading?**
- Make sure images are in `public/images/` folder
- Use path: `/images/your-image.jpg`

---

For detailed documentation, see **COMPLETE_DOCUMENTATION.md**
