# Deployment Guide - Retail Storefront

## Fixed Issues for Vercel Deployment

### Issues Resolved:
1. ✅ **Package.json Syntax Error** - Fixed malformed JSON structure
2. ✅ **Deprecated npm Version** - Added engines field specifying npm >= 9.0.0
3. ✅ **Node.js Version** - Specified Node.js >= 18.17.0 in engines and .nvmrc
4. ✅ **Outdated next-pwa** - Updated from v5.6.0 to @ducanh2912/next-pwa v10.2.7
5. ✅ **PWA Configuration** - Updated next.config.js for new PWA package
6. ✅ **Vercel Configuration** - Added vercel.json with proper settings
7. ✅ **Dependencies Update** - Updated all packages to latest compatible versions

## Deployment Steps

### 1. Pre-deployment Checklist
```bash
# Install updated dependencies
npm install

# Check for any type errors
npm run type-check

# Test build locally
npm run build

# Test the built application
npm run start
```

### 2. Environment Variables for Vercel
Set these in your Vercel dashboard:
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 3. Deploy to Vercel
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Alternative: Deploy via Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Vercel will automatically deploy using the configurations

## Configuration Files Added/Updated

### 1. .nvmrc
```
18.17.0
```
Specifies exact Node.js version for Vercel.

### 2. package.json - engines field
```json
"engines": {
  "node": ">=18.17.0",
  "npm": ">=9.0.0"
}
```
Ensures compatible runtime versions.

### 3. vercel.json
- Specifies Node.js 18.x runtime
- Configures PWA service worker headers
- Sets proper caching for workbox files

### 4. next.config.js
- Updated to use @ducanh2912/next-pwa
- Improved PWA configuration
- Better caching strategies

## PWA Features After Deployment

### Service Worker
- Automatic caching of static assets
- Offline functionality
- Background sync capabilities

### Installation
- Add to home screen on mobile
- Desktop PWA installation
- App-like experience

## Performance Optimizations

### Build Optimizations
- SWC minification enabled
- Image optimization configured
- Automatic code splitting

### Runtime Optimizations
- Aggressive front-end caching
- Service worker precaching
- Optimized bundle sizes

## Monitoring & Debugging

### Vercel Analytics
Enable in Vercel dashboard for:
- Performance metrics
- Error tracking
- User analytics

### PWA Debugging
- Use Chrome DevTools → Application tab
- Check service worker registration
- Verify cache strategies

## Troubleshooting Common Issues

### Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

### PWA Issues
```bash
# Verify PWA configuration
npm run build
# Check public folder for sw.js and workbox files
```

### Version Conflicts
```bash
# Check for peer dependency warnings
npm ls

# Update specific package
npm update package-name
```

## Post-Deployment Verification

### 1. Functionality Tests
- [ ] Homepage loads correctly
- [ ] Authentication pages work
- [ ] Shopping cart functionality
- [ ] Mobile responsiveness
- [ ] PWA installation

### 2. Performance Tests
- [ ] Lighthouse score > 90
- [ ] Fast loading times
- [ ] Proper caching headers
- [ ] Service worker registration

### 3. PWA Tests
- [ ] Manifest.json accessible
- [ ] Service worker active
- [ ] Offline functionality
- [ ] Install prompt appears

## Next Steps After Deployment

1. **Domain Configuration**: Set up custom domain in Vercel
2. **SSL Certificate**: Ensure HTTPS is enabled
3. **Analytics**: Set up Google Analytics or Vercel Analytics
4. **Error Monitoring**: Configure Sentry or similar service
5. **Performance Monitoring**: Set up Core Web Vitals tracking

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [PWA Configuration](https://github.com/DuCanhGH/next-pwa)
- [Node.js Version Management](https://nodejs.org/en/download/releases/)