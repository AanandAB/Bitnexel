# Bitnexel - Restaurant POS Website

<div align="center">

![Bitnexel](https://img.shields.io/badge/Bitnexel-Systems-14B8A6?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Modern, minimalistic restaurant POS system showcase website**

[Live Demo](https://ux5x4svx0zz3.space.minimax.io) · [Documentation](./COMPLETE_DOCUMENTATION.md) · [Quick Start](./QUICK_START.md)

</div>

---

## 📖 Overview

**Bitnexel** is a comprehensive single-page application (SPA) showcasing **CafePOSPro**, a modern restaurant management system designed specifically for Indian restaurants and cafes.

### ✨ Key Features

- 🎨 **Modern Minimalism Design** - Clean, professional B2B aesthetic
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **Conversion Optimized** - Strategic CTAs and user flow
- ♿ **Accessible** - WCAG AA compliant with semantic HTML
- 🔍 **SEO Ready** - Optimized for search engines

### 🎥 Live Demo

Visit the live website: **[https://ux5x4svx0zz3.space.minimax.io](https://ux5x4svx0zz3.space.minimax.io)**

---

## 🚀 Quick Start

### Run Locally

```bash
# Clone the repository
cd forkpoint-systems

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173 in your browser
```

### Deploy to Vercel

```bash
# Build production version
pnpm build

# Deploy via Vercel CLI
vercel --prod
```

**Or** connect your GitHub repository to Vercel for automatic deployments.

For detailed setup instructions, see **[QUICK_START.md](./QUICK_START.md)**

---

## 📂 Project Structure

```
forkpoint-systems/
├── public/
│   └── images/              # Restaurant showcase images
├── src/
│   ├── components/          # React components
│   │   ├── HeroSection.tsx
│   │   ├── KeyFeatures.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CTASection.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main application
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## 🛠️ Technology Stack

### Core
- **React 18.3** - Modern React with hooks
- **TypeScript 5.6** - Type-safe development
- **Vite 6.0** - Next-gen frontend tooling
- **pnpm** - Fast, efficient package manager

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.23** - Smooth animations
- **Lucide React** - Modern icon library

### Forms & Validation
- **React Hook Form 7.55** - Performant forms
- **Zod 3.24** - TypeScript-first validation

### Additional
- **Recharts** - Data visualization
- **React Router DOM** - Client-side routing
- **date-fns** - Modern date utilities

---

## 🎯 Features Showcase

### 1. Hero Section
- Interactive 3D analytics dashboard image
- Floating metric cards with live data
- Trust indicators and CTAs
- Smooth scroll navigation

### 2. Key Features (6 Major Features)
- ✅ **QR Code Ordering** - Contactless ordering system
- ✅ **Real-time Inventory** - Stock tracking and alerts
- ✅ **Kitchen Display System** - Digital order management
- ✅ **Digital Payments** - UPI, cards, wallets support
- ✅ **Staff Management** - Scheduling and attendance
- ✅ **Business Analytics** - Sales insights and reports

### 3. Pricing
- Three-tier structure (₹749 - ₹2,999/month)
- Monthly/Yearly toggle
- Feature comparison matrix
- Free trial CTAs

### 4. Demo Request Form
- Full contact form with validation
- Real-time field validation
- Success/error handling
- Mobile-optimized layout

### 5. Responsive Design
- Mobile-first approach
- Tablet breakpoints
- Desktop optimization
- Touch-friendly interactions

---

## 📋 Available Scripts

```bash
# Development
pnpm dev                    # Start dev server (http://localhost:5173)
pnpm build                  # Build for production
pnpm preview                # Preview production build
pnpm lint                   # Lint code with ESLint

# Production Build
pnpm build:prod             # Optimized production build
                            # (removes console logs, source maps)

# Utilities
pnpm install-deps           # Install dependencies only
pnpm clean                  # Clean node_modules and reinstall
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Framework: **Vite**
   - Build Command: `pnpm build`
   - Output Directory: `dist`

2. **Automatic Deployments**:
   - Every push to `main` → Production
   - Every PR → Preview deployment

### Build Settings
```bash
Framework: Vite
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
Node.js Version: 20.x
```

For other platforms (Netlify, AWS, etc.), see **[COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md)**

---

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local` for custom configuration:

```bash
# API Configuration (if adding backend)
VITE_API_URL=https://api.yourdomain.com

# Email Service (if adding email integration)
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your_key

# Analytics (if adding tracking)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Note**: All client-side env vars must be prefixed with `VITE_`

---

## 🎨 Customization

### Update Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#F0FDFA',
        500: '#14B8A6',  // Main brand color
        600: '#0D9488',
      }
    }
  }
}
```

### Update Content

Edit component files in `src/components/`:
- `HeroSection.tsx` - Hero content
- `KeyFeatures.tsx` - Feature descriptions
- `PricingSection.tsx` - Pricing tiers
- `Footer.tsx` - Footer links and info

### Add Images

Place images in `public/images/` and reference:
```tsx
<img src="/images/your-image.jpg" alt="Description" />
```

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md)** - Full documentation
  - Detailed features guide
  - Integration guidelines
  - Step-by-step local setup
  - Vercel deployment guide
  - Troubleshooting
  - Best practices

---

## 🔍 SEO & Performance

### Lighthouse Scores (Target)
- ⚡ Performance: 95+
- ♿ Accessibility: 100
- 🎯 Best Practices: 100
- 🔍 SEO: 100

### Optimizations
- Code splitting with Vite
- Image optimization
- Lazy loading
- Minification with Terser
- Tree shaking
- Gzip compression

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use?**
```bash
# Vite auto-selects next available port (5174, 5175, etc.)
```

**Build fails?**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

**Images not loading?**
- Check path: `/images/filename.jpg` (not `./images/`)
- Verify file exists in `public/images/`

See **[COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md)** for detailed troubleshooting.

---

## 📞 Contact & Support

- **Email**: aanandab44@gmail.com
- **Phone**: +91 7034026295
- **Location**: Kochi, Kerala

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

**Made with ❤️ by MiniMax Agent**

[Live Demo](https://ux5x4svx0zz3.space.minimax.io) · [Documentation](./COMPLETE_DOCUMENTATION.md) · [Quick Start](./QUICK_START.md)

</div>
# Bitnexel
