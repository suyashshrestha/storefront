# Deployment Guide - StoreFront Application

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free & Fast)

**Why Vercel?**
- Made by Next.js creators
- Zero configuration needed
- Free tier with custom domain
- Automatic HTTPS
- Global CDN
- Perfect for Next.js apps

**Steps:**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial StoreFront application"
   git branch -M main
   git remote add origin https://github.com/yourusername/storefront.git
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" (that's it!)

3. **Your app will be live at:** `https://your-repo-name.vercel.app`

**Custom Domain (Optional):**
- In Vercel dashboard → Settings → Domains
- Add your custom domain
- Follow DNS instructions

---

### Option 2: Netlify (Great Alternative)

**Steps:**
1. **Build the app:**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder
   - Your site is live instantly!

**Or connect GitHub:**
- Connect your GitHub repo
- Set build command: `npm run build && npm run export`
- Set publish directory: `out`

---

### Option 3: GitHub Pages (Free but Static Only)

**Steps:**
1. **Update next.config.js:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   module.exports = nextConfig
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   # Push the out folder to gh-pages branch
   ```

3. **Enable GitHub Pages in repository settings**

---

### Option 4: Railway (Full-Stack Ready)

**Perfect for future backend integration:**

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Your app will be live with a railway.app domain**

---

## 🛠 Pre-Deployment Checklist

### 1. Environment Variables
Create `.env.local` for any API keys:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
# Add other environment variables as needed
```

### 2. Update Configurations

**next.config.js** - Add your domain:
```javascript
const nextConfig = {
  // ... existing config
  images: {
    domains: [
      'images.unsplash.com', 
      'via.placeholder.com',
      'your-domain.com'  // Add your domain
    ],
  },
}
```

**package.json** - Ensure scripts are correct:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  }
}
```

### 3. PWA Manifest Update
Update `public/manifest.json` with your domain:
```json
{
  "start_url": "https://your-domain.com/",
  "scope": "https://your-domain.com/"
}
```

---

## 🌐 Custom Domain Setup

### Free Domain Options:
- **Freenom** - Free .tk, .ml, .ga domains
- **GitHub Student Pack** - Free .me domain
- **Netlify** - Free subdomain included

### Paid Domain Options:
- **Namecheap** - Affordable domains
- **Google Domains** - Easy DNS management
- **Cloudflare** - Domain + CDN

### DNS Configuration:
1. **For Vercel:**
   - A record: `@` → `76.76.19.61`
   - CNAME: `www` → `cname.vercel-dns.com`

2. **For Netlify:**
   - CNAME: `www` → `your-site.netlify.app`
   - A record: `@` → `75.2.60.5`

---

## 📱 Mobile Testing

Once deployed, test on:
- **Mobile browsers** (Safari, Chrome, Firefox)
- **Different screen sizes**
- **PWA installation:**
  - Android: Chrome → Menu → "Add to Home Screen"
  - iOS: Safari → Share → "Add to Home Screen"

---

## 🔧 Post-Deployment

### Performance Testing:
1. **Lighthouse audit** - Check Core Web Vitals
2. **Mobile-friendly test** - Google's mobile test
3. **PWA audit** - Ensure PWA features work

### Analytics Setup:
1. **Google Analytics** - Track user behavior
2. **Vercel Analytics** - Performance monitoring
3. **Hotjar** - User session recordings

### SEO Optimization:
1. **robots.txt** - Add to public folder
2. **sitemap.xml** - Generate for search engines
3. **Open Graph images** - Social media sharing

---

## 🚨 Troubleshooting

### Common Issues:

1. **Images not loading:**
   - Update next.config.js with image domains
   - Ensure images are optimized

2. **PWA not installing:**
   - Check manifest.json paths
   - Ensure HTTPS is enabled

3. **Build failures:**
   - Check TypeScript errors
   - Verify all dependencies are installed

4. **Routing issues:**
   - Ensure all pages are properly exported
   - Check dynamic route configurations

---

## 🎯 Recommended Flow

For the **fastest deployment**:
1. ✅ Push code to GitHub
2. ✅ Deploy with Vercel (2 minutes)
3. ✅ Test the live site
4. ✅ Add custom domain (optional)
5. ✅ Set up analytics

**Your StoreFront will be live and accessible worldwide!**

---

## 📞 Need Help?

If you encounter any issues:
1. Check the deployment platform's documentation
2. Review build logs for errors
3. Test locally first with `npm run build && npm run start`
4. Ensure all environment variables are set

**Happy Deploying! 🚀**