# Pre-Commit Verification Guide

## 🔧 How to Prevent Compilation Errors Before Git Commits

### Quick Verification Steps (Without Node.js)

#### 1. **Check Heroicons Imports**
```bash
# Verify all Heroicons imports are valid
grep -r "from '@heroicons/react" --include="*.tsx" --include="*.ts" .
```

**Valid Heroicons v2 Icons:**
- ✅ `MagnifyingGlassIcon` (not SearchIcon)
- ✅ `Bars3Icon` (not MenuIcon) 
- ✅ `FireIcon` (not TrendingUpIcon)
- ✅ `ArrowRightOnRectangleIcon` (not LogoutIcon)
- ✅ `EllipsisHorizontalIcon` (not DotsHorizontalIcon)

#### 2. **Check TypeScript Syntax**
```bash
# Look for common syntax errors
grep -r "import.*from.*@heroicons" --include="*.tsx" .
grep -r "React.FC.*=" --include="*.tsx" .
```

#### 3. **Verify Next.js Imports**
```bash
# Check Next.js specific imports are correct
grep -r "from 'next" --include="*.tsx" .
```

### Full Verification (With Node.js)

#### 1. **Install Dependencies**
```bash
npm install
```

#### 2. **Type Check**
```bash
npm run type-check
# or
npx tsc --noEmit
```

#### 3. **Build Test**
```bash
npm run build
```

#### 4. **Lint Check**
```bash
npm run lint
```

### Common Issues & Fixes

#### ❌ **TrendingUpIcon Error**
```typescript
// Wrong
import { TrendingUpIcon } from '@heroicons/react/24/outline';

// Fixed
import { FireIcon } from '@heroicons/react/24/outline';
```

#### ❌ **SearchIcon Error**
```typescript  
// Wrong
import { SearchIcon } from '@heroicons/react/24/outline';

// Fixed
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
```

#### ❌ **MenuIcon Error**
```typescript
// Wrong
import { MenuIcon } from '@heroicons/react/24/outline';

// Fixed  
import { Bars3Icon } from '@heroicons/react/24/outline';
```

### Automated Pre-Commit Hook (Optional)

Create `.husky/pre-commit`:
```bash
#!/bin/sh
echo "🔍 Running pre-commit checks..."

# Type check
npm run type-check

# Lint check  
npm run lint

echo "✅ Pre-commit checks passed!"
```

### Deployment Checklist

Before pushing to GitHub:
- [ ] All Heroicons imports use valid v2 names
- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] Next.js build succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Environment variables are properly configured
- [ ] All required dependencies are in package.json

### Emergency Fix Process

If deployment fails:
1. **Check Vercel build logs** for specific error
2. **Fix the error locally**
3. **Test with `npm run build`**
4. **Commit and push the fix**
5. **Redeploy automatically triggers**

This ensures your storefront deploys successfully every time! 🚀