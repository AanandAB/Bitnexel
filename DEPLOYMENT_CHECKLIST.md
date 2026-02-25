# Deployment Checklist

Use this checklist before deploying to production to ensure everything is configured correctly.

## 📋 Pre-Deployment Checklist

### 1. Code Quality
- [ ] All TypeScript errors resolved (`pnpm build` runs without errors)
- [ ] ESLint warnings addressed (`pnpm lint` passes)
- [ ] No console.log statements in production code (or using `BUILD_MODE=prod`)
- [ ] All unused imports removed
- [ ] Code is properly formatted

### 2. Content Review
- [ ] All placeholder text replaced with actual content
- [ ] Contact information updated (email, phone, address)
- [ ] Pricing information accurate and current
- [ ] All links tested and functional
- [ ] Forms tested and working
- [ ] Newsletter signup functional (if enabled)

### 3. Images & Assets
- [ ] All images optimized (compressed, appropriate format)
- [ ] Image alt text added for accessibility
- [ ] Favicon added (`public/favicon.ico`)
- [ ] Open Graph images for social sharing
- [ ] All images loading correctly locally
- [ ] No broken image links

### 4. SEO Optimization
- [ ] Page title updated in `index.html`
- [ ] Meta description added
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Robots.txt configured (if needed)
- [ ] Sitemap.xml generated (if needed)

### 5. Performance
- [ ] Build size optimized (`pnpm build` completes successfully)
- [ ] Lighthouse score checked (target: 90+ for all metrics)
- [ ] Images lazy loaded where appropriate
- [ ] Code splitting implemented
- [ ] Unused dependencies removed

### 6. Accessibility
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (basic check)
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Form labels properly associated
- [ ] Focus indicators visible

### 7. Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 8. Responsive Testing
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] Large desktop (1920px+)

### 9. Functionality Testing
- [ ] All navigation links work
- [ ] Smooth scroll to sections functional
- [ ] Forms submit correctly
- [ ] Form validation works
- [ ] Mobile menu opens/closes
- [ ] All buttons clickable and functional

### 10. Security
- [ ] No sensitive data in code or commits
- [ ] Environment variables configured correctly
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured in `vercel.json`

## 🚀 Deployment Steps

### Step 1: Local Build Test
```bash
# Clean build
rm -rf dist node_modules/.vite
pnpm install
pnpm build

# Preview locally
pnpm preview
```

**Verify**:
- [ ] Build completes without errors
- [ ] Preview site works correctly
- [ ] All features functional

### Step 2: Git Preparation
```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Production build ready for deployment"

# Push to GitHub
git push origin main
```

**Verify**:
- [ ] All changes committed
- [ ] Pushed to correct branch
- [ ] No uncommitted changes

### Step 3: Vercel Configuration
- [ ] Project imported to Vercel
- [ ] Build settings configured:
  - Framework: Vite
  - Build Command: `pnpm build`
  - Output Directory: `dist`
  - Install Command: `pnpm install`
  - Node.js Version: 20.x
- [ ] Environment variables added (if any)
- [ ] Custom domain configured (if applicable)

### Step 4: Deploy
```bash
# Via Vercel Dashboard
# Click "Deploy" button

# Or via CLI
vercel --prod
```

**Verify**:
- [ ] Build succeeds
- [ ] Deployment completes
- [ ] Production URL accessible

### Step 5: Post-Deployment Testing
- [ ] Visit production URL
- [ ] Test all pages/sections
- [ ] Test forms
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Check console for errors
- [ ] Verify analytics tracking (if enabled)

### Step 6: Performance Check
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify page load speed
- [ ] Check mobile performance

### Step 7: SEO Verification
- [ ] Google Search Console verification
- [ ] Submit sitemap (if applicable)
- [ ] Check meta tags with Facebook Debugger
- [ ] Check Twitter Card validator

## 📊 Vercel Dashboard Checklist

### General Settings
- [ ] Project name set
- [ ] Description added
- [ ] GitHub repository connected

### Build & Development
- [ ] Framework preset: Vite
- [ ] Build Command: `pnpm build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `pnpm install`
- [ ] Development Command: `pnpm dev`

### Environment Variables
- [ ] All required variables added
- [ ] Correct environment scope (Production/Preview/Development)
- [ ] Sensitive values secured

### Domains
- [ ] Production domain configured
- [ ] SSL certificate active
- [ ] DNS configured correctly
- [ ] HTTPS enforced

### Analytics (Optional)
- [ ] Vercel Analytics enabled
- [ ] Web Vitals tracking active

## 🔍 Post-Launch Monitoring

### Week 1
- [ ] Monitor error logs daily
- [ ] Check analytics for traffic
- [ ] Test forms daily
- [ ] Monitor Core Web Vitals
- [ ] Address any user-reported issues

### Ongoing
- [ ] Weekly analytics review
- [ ] Monthly dependency updates
- [ ] Quarterly performance audit
- [ ] Regular content updates

## ⚠️ Rollback Plan

If issues occur after deployment:

1. **Quick Rollback via Vercel**:
   - Dashboard → Deployments
   - Find previous working deployment
   - Click "Promote to Production"

2. **Via CLI**:
   ```bash
   vercel rollback
   ```

3. **Via Git**:
   ```bash
   git revert HEAD
   git push origin main
   ```

## 📞 Emergency Contacts

- **Developer**: aanandab44@gmail.com
- **Vercel Support**: https://vercel.com/support
- **Domain Registrar**: [Your registrar]

## ✅ Sign-off

- [ ] Developer approval
- [ ] Client approval (if applicable)
- [ ] All checklist items completed
- [ ] Backup of previous version taken
- [ ] Deployment documented

**Deployment Date**: _______________
**Deployed By**: _______________
**Production URL**: _______________
**Notes**: 

---

**Remember**: Always test thoroughly before deploying to production!
