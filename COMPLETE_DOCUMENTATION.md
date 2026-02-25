# ForkPoint Systems - Complete Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features & Capabilities](#features--capabilities)
3. [Technology Stack](#technology-stack)
4. [Integrations](#integrations)
5. [Prerequisites](#prerequisites)
6. [Local Development Setup](#local-development-setup)
7. [Vercel Deployment Guide](#vercel-deployment-guide)
8. [Configuration & Environment Variables](#configuration--environment-variables)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## 🎯 Project Overview

**ForkPoint Systems** is a comprehensive restaurant POS (Point of Sale) website showcasing **CafePOSPro** - a modern restaurant management system designed for Indian restaurants and cafes.

### Key Information
- **Product**: CafePOSPro Restaurant Management System
- **Target Market**: Indian restaurants, cafes, QSR, cloud kitchens
- **Website Type**: Single Page Application (SPA)
- **Framework**: React 18 + TypeScript + Vite
- **Design Style**: Modern Minimalism Premium
- **Current Live URL**: https://ux5x4svx0zz3.space.minimax.io

---

## 🚀 Features & Capabilities

### 1. **Hero Section**
- **3D Analytics Dashboard Image**: Interactive restaurant analytics visualization
- **Floating Metric Cards**: Live analytics and revenue displays
- **Trust Indicators**: Security badges, customer count, uptime stats
- **Dual CTAs**: "Request Demo" and "Learn More" buttons with smooth scrolling

### 2. **Key Features Showcase** (6 Major Features)

#### a) QR Code Ordering
- Contactless table QR code ordering
- Mobile menu browsing
- Direct smartphone ordering
- **Benefits**:
  - 40% reduction in waiting times
  - Increased order accuracy
  - Seamless mobile experience
  - Payment system integration

#### b) Real-time Inventory
- Live inventory tracking
- Automatic low-stock alerts
- Waste reduction analytics
- Supplier integration

#### c) Kitchen Display System (KDS)
- Digital kitchen screens
- Real-time order display
- Priority management
- Wireless printing integration

#### d) Digital Payments
- Multi-payment support (UPI, cards, wallets, cash)
- Secure transaction processing
- Digital receipt generation
- Settlement tracking

#### e) Staff Management
- Automated scheduling
- Attendance tracking
- Tip and commission management
- Performance analytics

#### f) Business Analytics
- Sales performance tracking
- Menu optimization insights
- Customer behavior analysis
- Predictive analytics

### 3. **Pricing Section**
- **Three-tier pricing structure**:
  - **Starter Plan**: ₹749/month
  - **Professional Plan**: ₹1,999/month (Most Popular)
  - **Enterprise Plan**: ₹2,999/month
- Monthly/Yearly toggle
- Feature comparison matrix
- Free trial CTAs

### 4. **Demo Request Form**
- **Form Fields**:
  - Full Name
  - Email Address
  - Phone Number
  - Restaurant Name
  - Message/Requirements
- Real-time form validation
- Submit functionality with user feedback
- **Note**: Currently logs to console (no backend integration)

### 5. **Additional Sections**
- **Value Proposition**: Key benefits and USPs
- **Benefits Section**: Detailed advantage breakdown
- **Target Audience**: Restaurant manager profiles
- **Social Proof**: Customer testimonials and trust metrics
- **Footer**: 
  - Navigation links
  - Newsletter subscription
  - Legal links (Privacy Policy, Terms of Service)
  - Social media links
  - Contact information

### 6. **Interactive Components**
- **Smooth Scroll Navigation**: Click menu items to jump to sections
- **Scroll Progress Indicator**: Visual progress bar at top
- **Live Visitor Counter**: Real-time visitor count simulation
- **Responsive Design**: Mobile, tablet, desktop optimized
- **Hover Effects**: Subtle animations on buttons and cards
- **Mobile Menu**: Hamburger menu for small screens

---

## 🛠️ Technology Stack

### Core Technologies
- **React 18.3.1**: Modern React with hooks
- **TypeScript 5.6**: Type-safe development
- **Vite 6.0**: Lightning-fast build tool and dev server
- **pnpm**: Fast, disk space efficient package manager

### UI Framework & Components
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
  - Accordion, Dialog, Dropdown, Navigation, Tabs, Toast, Tooltip
  - Form components: Checkbox, Radio, Select, Slider, Switch
- **Framer Motion 12.23**: Animation library for smooth transitions
- **Lucide React**: Modern icon library (600+ icons)

### Form Handling
- **React Hook Form 7.55**: Performant form library
- **Zod 3.24**: TypeScript-first schema validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form

### Charts & Visualization
- **Recharts 2.15**: Composable charting library
- **Embla Carousel**: Lightweight carousel library

### Additional Libraries
- **clsx + tailwind-merge**: Conditional className handling
- **date-fns**: Modern date utility library
- **React Router DOM 6**: Client-side routing
- **Sonner**: Toast notifications

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript-specific linting
- **Autoprefixer**: CSS vendor prefixing
- **Terser**: JavaScript minification
- **vite-plugin-source-identifier**: Source mapping plugin

---

## 🔗 Integrations

### Current Integrations

#### 1. **No Backend Integration (Simplified Version)**
The current minimalistic version does **not** have active backend integrations. The demo request form currently:
- Logs submissions to browser console
- Shows a browser alert on submission
- Does not send data to any backend service

#### 2. **Potential Integrations** (From Previous Versions)

##### **Salesforce CRM Integration**
The project previously had Salesforce integration configured for:
- **Lead Creation**: Demo requests → Salesforce Leads
- **Task Creation**: Follow-up tasks for sales team
- **Event Scheduling**: Meeting calendar integration
- **Case Management**: Support ticket creation

**Previous Configuration**:
```javascript
{
  consumerKey: 'YOUR_CONSUMER_KEY_HERE',
  consumerSecret: 'YOUR_CONSUMER_SECRET_HERE',
  username: 'your-email@domain.com',
  instanceUrl: 'https://your-instance.lightning.force.com'
}
```
**Note**: Store sensitive credentials in environment variables (.env file), never in code.

**Note**: This integration is currently **NOT active** in the minimalistic version. To re-enable, you would need to:
1. Add backend API (Flask/Node.js/Convex)
2. Configure environment variables
3. Restore Salesforce service files

### Integration Guidelines

#### To Add Email Integration
1. **EmailJS** (Recommended for simple contact forms):
   ```bash
   npm install @emailjs/browser
   ```
   - Create account at emailjs.com
   - Configure email template
   - Add public key to environment variables

2. **Resend** (Modern transactional email):
   ```bash
   npm install resend
   ```
   - Sign up at resend.com
   - Get API key
   - Create email templates

#### To Add Analytics
1. **Google Analytics 4**:
   ```bash
   npm install react-ga4
   ```

2. **Plausible Analytics** (Privacy-focused):
   ```html
   <!-- Add to index.html -->
   <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
   ```

#### To Add CRM Integration
1. Set up backend API (Vercel Functions, AWS Lambda, etc.)
2. Configure webhook endpoints
3. Add environment variables for API keys
4. Implement form submission handlers

---

## ✅ Prerequisites

### Required Software

1. **Node.js** (v18.0.0 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`
   - Recommended: Use Node 20 LTS

2. **pnpm** (v8.0.0 or higher)
   - Install globally: `npm install -g pnpm`
   - Check version: `pnpm --version`
   - Alternative: Use npm or yarn, but you'll need to modify package.json scripts

3. **Git** (for version control)
   - Download: https://git-scm.com/
   - Check version: `git --version`

4. **Code Editor** (Recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - Recommended Extensions:
     - ESLint
     - Prettier
     - Tailwind CSS IntelliSense
     - TypeScript Vue Plugin (Volar)

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB+ recommended)
- **Disk Space**: Minimum 500MB for project + dependencies
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

---

## 💻 Local Development Setup

### Step 1: Clone or Download the Project

#### Option A: Using Git (Recommended)
```bash
# Clone the repository (if hosted on Git)
git clone <your-repository-url>
cd forkpoint-systems

# Or if you have the files locally
cd /path/to/forkpoint-systems
```

#### Option B: Using Downloaded Files
1. Extract the ZIP file to your desired location
2. Open terminal/command prompt
3. Navigate to the project folder:
   ```bash
   cd /path/to/forkpoint-systems
   ```

### Step 2: Install Dependencies

```bash
# Install all project dependencies using pnpm
pnpm install

# Alternative: If you prefer npm
# First, remove pnpm references from package.json scripts
# Then run: npm install

# Alternative: If you prefer yarn
# yarn install
```

**What this does**:
- Downloads all required packages from npm registry
- Creates `node_modules` folder with dependencies
- Generates `pnpm-lock.yaml` lockfile
- Should take 1-3 minutes depending on internet speed

**Expected Output**:
```
Packages: +429
+++++++++++++++++++++++++++++++++++++++
Done in 2m 15s
```

### Step 3: Start Development Server

```bash
# Start the development server
pnpm dev

# Alternative commands
npm run dev    # if using npm
yarn dev       # if using yarn
```

**What this does**:
- Installs any missing dependencies
- Starts Vite development server
- Opens browser automatically (or manually go to URL shown)
- Enables hot module replacement (HMR) for instant updates

**Expected Output**:
```bash
VITE v6.0.1  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### Step 4: Access the Website

1. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

2. **If port 5173 is busy**, Vite will automatically use the next available port:
   ```
   http://localhost:5174
   http://localhost:5175
   etc.
   ```

3. The website should load immediately with full functionality

### Step 5: Making Changes (Development Workflow)

1. **Edit files** in your code editor:
   ```
   src/
   ├── components/      # Edit React components
   ├── hooks/          # Custom React hooks
   ├── lib/            # Utility functions
   └── App.tsx         # Main app component
   ```

2. **Save the file** - Changes will automatically appear in browser (Hot Module Replacement)

3. **Check console** for any errors:
   - Open Browser DevTools: `F12` or `Cmd+Option+I` (Mac)
   - Look at Console tab for errors

4. **Common files to edit**:
   - **Content**: `src/components/*.tsx` files
   - **Styling**: Tailwind classes in components, or `src/index.css`
   - **Images**: Place in `public/images/` folder
   - **Colors/Theme**: `tailwind.config.js`

### Step 6: Testing the Form

1. Scroll to "Request Demo" section
2. Fill out the form:
   - Full Name
   - Email
   - Phone Number
   - Restaurant Name
   - Message
3. Click "Submit"
4. **Open Browser Console** (F12 → Console tab) to see the logged data
5. You should see: `Demo request submitted: { name: '...', email: '...' }`

### Step 7: Building for Production (Local Test)

```bash
# Build the production-ready version
pnpm build

# Preview the production build locally
pnpm preview
```

**What this does**:
- Compiles TypeScript to JavaScript
- Bundles all code with Vite
- Minifies JavaScript and CSS
- Optimizes images and assets
- Creates `dist` folder with production files
- Preview server runs on `http://localhost:4173`

**Expected Output**:
```bash
vite v6.0.1 building for production...
✓ 429 modules transformed.
dist/index.html                  0.67 kB
dist/assets/index-abc123.css    23.45 kB
dist/assets/index-xyz789.js    341.82 kB

✓ built in 12.34s
```

### Step 8: Stopping the Development Server

Press `Ctrl+C` in the terminal where the server is running.

---

## 🚀 Vercel Deployment Guide

Vercel is the recommended platform for deploying this React + Vite application. It offers:
- ✅ Zero-configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic builds from Git
- ✅ Preview deployments for branches
- ✅ Free tier for personal projects

### Prerequisites for Vercel Deployment

1. **Vercel Account** (Free)
   - Sign up: https://vercel.com/signup
   - Can use GitHub, GitLab, or Bitbucket account

2. **Git Repository** (Recommended but optional)
   - GitHub: https://github.com/
   - GitLab: https://gitlab.com/
   - Bitbucket: https://bitbucket.org/

### Method 1: Deploy via Git (Recommended)

#### Step 1: Push Code to Git Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - ForkPoint Systems website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/forkpoint-systems.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Import to Vercel

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard

2. **Click "Add New"** → **"Project"**

3. **Import Git Repository**:
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub/GitLab/Bitbucket
   - Select your repository: `forkpoint-systems`

4. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: pnpm build
   Output Directory: dist
   Install Command: pnpm install
   ```

5. **Environment Variables** (Optional):
   - Click "Environment Variables"
   - Add any required variables (currently none needed)
   - Example for future use:
     ```
     VITE_API_URL=https://api.yourdomain.com
     VITE_EMAILJS_PUBLIC_KEY=your_key_here
     ```

6. **Click "Deploy"**

#### Step 3: Wait for Build

- Build process takes 1-3 minutes
- You'll see real-time build logs
- Once complete, you'll get a production URL like:
  ```
  https://forkpoint-systems-abc123.vercel.app
  ```

#### Step 4: Configure Custom Domain (Optional)

1. **Go to Project Settings** → **Domains**
2. **Add Domain**:
   - Enter your custom domain: `forkpoint.com`
3. **Configure DNS**:
   - Add CNAME record in your domain registrar:
     ```
     CNAME  @  cname.vercel-dns.com
     ```
   - Or use Vercel nameservers for full DNS management

4. **Wait for DNS propagation** (5-60 minutes)

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
# Install globally
npm install -g vercel

# Or use pnpm
pnpm add -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

- Follow prompts to authenticate
- Opens browser for login confirmation

#### Step 3: Deploy

```bash
# Navigate to project directory
cd /path/to/forkpoint-systems

# Deploy
vercel

# Or deploy to production directly
vercel --prod
```

**Follow the prompts**:
```
? Set up and deploy "~/forkpoint-systems"? [Y/n] y
? Which scope do you want to deploy to? Your Username
? Link to existing project? [y/N] n
? What's your project's name? forkpoint-systems
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

**Expected Output**:
```bash
🔗  Deployed to production:
https://forkpoint-systems.vercel.app
```

#### Step 4: Subsequent Deployments

```bash
# Development preview
vercel

# Production deployment
vercel --prod
```

### Method 3: Deploy via Drag & Drop (Simplest)

#### Step 1: Build Locally

```bash
cd /path/to/forkpoint-systems
pnpm build
```

This creates the `dist` folder with production files.

#### Step 2: Deploy to Vercel

1. **Go to**: https://vercel.com/new
2. **Click**: "Browse" or drag-and-drop
3. **Select**: The `dist` folder from your project
4. **Click**: "Deploy"

**Pros**: 
- Fastest method
- No Git required

**Cons**:
- No automatic deployments
- Need to manually upload for each change
- No preview deployments

### Post-Deployment Steps

#### 1. Verify Deployment

✅ **Test the live website**:
```
https://your-project.vercel.app
```

✅ **Check all sections**:
- Hero section loads correctly
- Images display properly
- Forms work (check console)
- Navigation links function
- Mobile responsive design works

#### 2. Set Up Automatic Deployments

Once connected via Git, Vercel automatically:
- ✅ Deploys `main` branch → Production
- ✅ Deploys feature branches → Preview URLs
- ✅ Runs builds on every push
- ✅ Comments on PRs with preview links

#### 3. Configure Build Settings (If Needed)

**In Vercel Dashboard** → **Project Settings** → **Build & Development Settings**:

```bash
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install
Development Command: pnpm dev
```

**For production builds**:
```bash
Build Command: BUILD_MODE=prod pnpm build:prod
```

This enables:
- Console statement removal
- Source map removal
- Additional optimizations

#### 4. Enable Analytics (Optional)

1. **Vercel Dashboard** → **Analytics** tab
2. **Enable Vercel Analytics**
3. Install package:
   ```bash
   pnpm add @vercel/analytics
   ```

4. Add to `src/main.tsx`:
   ```typescript
   import { inject } from '@vercel/analytics';
   inject();
   ```

#### 5. Set Up Custom Headers (Optional)

Create `vercel.json` in project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## ⚙️ Configuration & Environment Variables

### Current Configuration

The current minimalistic version has **no environment variables** required for basic functionality.

### Future Environment Variables (If Adding Integrations)

Create `.env.local` file in project root:

```bash
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# Email Service (EmailJS)
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Salesforce (if re-enabling)
VITE_SALESFORCE_CONSUMER_KEY=your_consumer_key
VITE_SALESFORCE_CONSUMER_SECRET=your_consumer_secret
VITE_SALESFORCE_INSTANCE_URL=https://yourinstance.salesforce.com

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LIVE_CHAT=false
```

### Using Environment Variables in Code

```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL;
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Example usage
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

### Environment Variable Rules

1. **Prefix with `VITE_`**: All variables must start with `VITE_` to be exposed to client
2. **Don't commit secrets**: Add `.env.local` to `.gitignore`
3. **Use `.env.example`**: Create template for team members:

```bash
# .env.example
VITE_API_URL=
VITE_EMAILJS_PUBLIC_KEY=
VITE_GA_TRACKING_ID=
```

### Vercel Environment Variables

Add in Vercel Dashboard → **Settings** → **Environment Variables**:

1. **Variable Name**: `VITE_API_URL`
2. **Value**: `https://api.yourdomain.com`
3. **Environments**: Select Production, Preview, Development

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use

**Error**:
```
Port 5173 is already in use
```

**Solution**:
```bash
# Find process using port 5173
lsof -ti:5173  # Mac/Linux
netstat -ano | findstr :5173  # Windows

# Kill the process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows

# Or just let Vite use next available port (5174, 5175, etc.)
```

#### 2. Module Not Found Errors

**Error**:
```
Cannot find module 'xxx' or its corresponding type declarations
```

**Solution**:
```bash
# Delete node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall dependencies
pnpm install

# If still failing, clear pnpm cache
pnpm store prune
pnpm install
```

#### 3. Build Fails on Vercel

**Error**:
```
Error: Build failed
```

**Solutions**:

a) **Check build locally first**:
```bash
pnpm build
```

b) **Verify package.json**:
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Check Node.js version compatibility

c) **Set Node.js version** in `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

d) **In Vercel Settings**, set Node.js version:
- Dashboard → Settings → General → Node.js Version: `20.x`

#### 4. Images Not Loading

**Error**: Broken image icons on deployed site

**Solutions**:

a) **Check image paths**:
```typescript
// ✅ Correct (public folder)
<img src="/images/photo.jpg" alt="Photo" />

// ❌ Wrong
<img src="images/photo.jpg" alt="Photo" />
<img src="./images/photo.jpg" alt="Photo" />
```

b) **Verify images exist**:
```bash
ls public/images/
```

c) **Image file extensions**: Ensure correct case
```bash
# Rename if needed
mv photo.JPG photo.jpg
```

#### 5. Styles Not Applying

**Error**: Website looks broken, no Tailwind styles

**Solutions**:

a) **Check `tailwind.config.js` content paths**:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

b) **Verify `index.css` imports**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

c) **Rebuild**:
```bash
rm -rf node_modules/.vite
pnpm build
```

#### 6. TypeScript Errors

**Error**:
```
Type 'xxx' is not assignable to type 'yyy'
```

**Solutions**:

a) **Check `tsconfig.json`**:
```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true
  }
}
```

b) **Clear TypeScript cache**:
```bash
rm -rf node_modules/.vite
pnpm build
```

c) **Ignore specific errors** (temporary):
```typescript
// @ts-ignore
const value = someValue;
```

#### 7. Form Submission Not Working

**Issue**: Form submits but nothing happens

**Solutions**:

a) **Check browser console**:
- Open DevTools (F12)
- Look for console.log messages
- Check for JavaScript errors

b) **Verify form handler**:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Prevents page reload
  console.log('Form submitted:', formData);
  // Add your logic here
};
```

c) **Add backend integration** (if needed):
- See [Integrations](#integrations) section

#### 8. Slow Build Times

**Issue**: Build takes >5 minutes

**Solutions**:

a) **Use production build**:
```bash
BUILD_MODE=prod pnpm build:prod
```

b) **Clear cache**:
```bash
rm -rf node_modules/.vite
rm -rf dist
pnpm build
```

c) **Check dependencies**:
- Remove unused packages
- Update to latest versions

### Getting Help

1. **Check Browser Console**: F12 → Console tab
2. **Check Terminal Output**: Look for error messages
3. **Vercel Logs**: Dashboard → Deployments → View logs
4. **Common Resources**:
   - Vite Docs: https://vitejs.dev/
   - React Docs: https://react.dev/
   - Tailwind Docs: https://tailwindcss.com/
   - Vercel Docs: https://vercel.com/docs

---

## ✨ Best Practices

### Development Best Practices

1. **Use TypeScript**: Leverage type safety for fewer runtime errors

2. **Component Structure**:
   ```
   src/components/
   ├── ComponentName.tsx       # Component logic
   └── ComponentName.test.tsx  # Tests (optional)
   ```

3. **Props Interface**:
   ```typescript
   interface ComponentProps {
     title: string;
     onSubmit: (data: FormData) => void;
   }
   
   const Component: React.FC<ComponentProps> = ({ title, onSubmit }) => {
     // ...
   };
   ```

4. **Environment Variables**: Never commit secrets, use `.env.local`

5. **Git Workflow**:
   ```bash
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes and commit
   git add .
   git commit -m "Add new feature"
   
   # Push to remote
   git push origin feature/new-feature
   
   # Create Pull Request on GitHub
   ```

### Performance Best Practices

1. **Image Optimization**:
   - Use WebP format when possible
   - Compress images before adding
   - Use appropriate sizes (don't serve 4K images for thumbnails)

2. **Code Splitting**:
   ```typescript
   // Lazy load components
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   ```

3. **Memoization**:
   ```typescript
   const MemoizedComponent = React.memo(({ data }) => {
     // Component that only re-renders when data changes
   });
   ```

### Deployment Best Practices

1. **Test locally before deploying**:
   ```bash
   pnpm build
   pnpm preview
   ```

2. **Use preview deployments**: Test on Vercel preview URL before merging to main

3. **Monitor performance**: Use Vercel Analytics or Google Lighthouse

4. **Set up error tracking**: Use Sentry or similar service

5. **Version control**: Tag releases
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Security Best Practices

1. **Keep dependencies updated**:
   ```bash
   pnpm update
   ```

2. **Audit for vulnerabilities**:
   ```bash
   pnpm audit
   ```

3. **Use environment variables** for all secrets

4. **Enable security headers** in `vercel.json`

5. **Implement HTTPS**: Automatic on Vercel

### Maintenance Best Practices

1. **Regular updates**: Update dependencies monthly
2. **Backup code**: Use Git + remote repository
3. **Document changes**: Update README and CHANGELOG
4. **Monitor analytics**: Track user behavior
5. **Collect feedback**: Add feedback forms or analytics

---

## 📞 Support & Resources

### Project Resources

- **Current Live Site**: https://ux5x4svx0zz3.space.minimax.io
- **Contact Email**: aanandab44@gmail.com
- **Contact Phone**: +91 7034026295
- **Location**: Kochi, Kerala

### Learning Resources

- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

### Community

- **React Community**: https://react.dev/community
- **Vite Discord**: https://chat.vitejs.dev/
- **Stack Overflow**: Tag questions with `reactjs`, `vite`, `tailwindcss`

---

## 📝 Quick Reference Commands

### Local Development
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Clean install
pnpm run clean && pnpm install
```

### Git Commands
```bash
# Initialize repository
git init

# Add files
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main

# Create new branch
git checkout -b feature-name

# Merge branch
git merge feature-name
```

### Vercel Commands
```bash
# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

---

## 🎉 Conclusion

You now have a complete guide to:
- ✅ Understanding all features of ForkPoint Systems website
- ✅ Running the project locally on your machine
- ✅ Deploying to Vercel for production
- ✅ Troubleshooting common issues
- ✅ Following best practices for development

For additional help, refer to the [Support & Resources](#support--resources) section or contact the development team.

**Happy Coding! 🚀**
