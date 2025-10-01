const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE ERROR DETECTION');
console.log('='.repeat(50));

// 1. Check for React Query issues
console.log('\n1. 📦 React Query Configuration Check:');
const appFile = './pages/_app.tsx';
if (fs.existsSync(appFile)) {
  const content = fs.readFileSync(appFile, 'utf8');
  
  if (content.includes('cacheTime')) {
    console.log('❌ Found cacheTime in _app.tsx');
    console.log('   This will cause compilation error in React Query v5');
  } else if (content.includes('gcTime')) {
    console.log('✅ Using gcTime (correct for React Query v5)');
  } else {
    console.log('ℹ️  No cache time configuration found');
  }
  
  // Check for other potential v5 issues
  const v5Issues = [
    { old: 'useErrorBoundary', new: 'throwOnError' },
    { old: 'cacheTime', new: 'gcTime' },
    { old: 'isIdle', new: 'isPending' },
    { old: 'status: "idle"', new: 'status: "pending"' }
  ];
  
  v5Issues.forEach(issue => {
    if (content.includes(issue.old)) {
      console.log(`❌ Found deprecated '${issue.old}' - should be '${issue.new}'`);
    }
  });
} else {
  console.log('❌ _app.tsx not found');
}

// 2. Check package.json for conflicting dependencies
console.log('\n2. 📋 Package Dependencies Check:');
const packageFile = './package.json';
if (fs.existsSync(packageFile)) {
  const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  
  // Check for old react-query
  if (deps['react-query']) {
    console.log('❌ Old react-query found - conflicts with @tanstack/react-query');
    console.log('   Remove: npm uninstall react-query');
  }
  
  // Check TanStack Query version
  if (deps['@tanstack/react-query']) {
    console.log(`✅ @tanstack/react-query: ${deps['@tanstack/react-query']}`);
  }
  
  // Check for other potential conflicts
  const conflicts = [
    'react-query',
    '@types/react-query'
  ];
  
  conflicts.forEach(pkg => {
    if (deps[pkg]) {
      console.log(`⚠️  Potential conflict: ${pkg} ${deps[pkg]}`);
    }
  });
} else {
  console.log('❌ package.json not found');
}

// 3. Check all TypeScript files for React Query usage
console.log('\n3. 🔍 Scanning TypeScript Files:');
function scanDirectory(dir) {
  const issues = [];
  
  function scan(currentDir) {
    try {
      const files = fs.readdirSync(currentDir);
      
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          scan(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Check for React Query v5 incompatible code
          const checks = [
            { pattern: /cacheTime\s*:/, msg: 'cacheTime should be gcTime' },
            { pattern: /useErrorBoundary\s*:/, msg: 'useErrorBoundary should be throwOnError' },
            { pattern: /from\s+['"]react-query['"]/, msg: 'Should import from @tanstack/react-query' },
            { pattern: /status\s*===\s*['"]idle['"]/, msg: 'status "idle" is now "pending"' },
            { pattern: /isIdle/, msg: 'isIdle is now isPending' }
          ];
          
          checks.forEach(check => {
            if (check.pattern.test(content)) {
              issues.push({
                file: fullPath,
                issue: check.msg,
                line: content.split('\n').findIndex(line => check.pattern.test(line)) + 1
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(`Warning: Could not scan ${currentDir}`);
    }
  }
  
  scan(dir);
  return issues;
}

const issues = scanDirectory('.');
if (issues.length === 0) {
  console.log('✅ No React Query v5 compatibility issues found');
} else {
  console.log(`❌ Found ${issues.length} issues:`);
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue.file}:${issue.line} - ${issue.issue}`);
  });
}

// 4. Check for potential compilation issues
console.log('\n4. 🔧 TypeScript Compilation Issues:');

// Check for common TS errors
const commonIssues = [
  { file: 'tsconfig.json', check: () => fs.existsSync('tsconfig.json') },
  { file: 'next.config.js', check: () => fs.existsSync('next.config.js') }
];

commonIssues.forEach(item => {
  if (item.check()) {
    console.log(`✅ ${item.file} exists`);
  } else {
    console.log(`❌ ${item.file} missing`);
  }
});

// 5. Solution recommendations
console.log('\n5. 💡 SOLUTIONS:');
console.log('');
console.log('If still getting cacheTime error:');
console.log('1. Clear Vercel cache: Go to Vercel Dashboard → Settings → Clear Cache');
console.log('2. Force rebuild: Delete .next folder locally and rebuild');
console.log('3. Temporarily remove React Query:');
console.log('   - Use _app-simple.tsx (no React Query)');
console.log('   - Test if error persists'); 
console.log('4. Check for cached node_modules on Vercel');
console.log('');
console.log('Alternative package.json for testing:');
console.log('Replace @tanstack/react-query version with: "^4.29.0"');
console.log('Or remove React Query entirely for initial deployment');

console.log('\n' + '='.repeat(50));
console.log('🎯 NEXT STEPS:');
console.log('1. Try deploying with _app-simple.tsx (rename files)');
console.log('2. If that works, the issue is React Query specific');
console.log('3. Clear Vercel cache and retry');
console.log('4. Consider downgrading to React Query v4 temporarily');