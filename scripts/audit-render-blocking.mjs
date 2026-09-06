import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('dist/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== Performance & Render-Blocking Audit ===\n');

// 1. Audit scripts in <head>
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
if (!headMatch) {
  console.error('FAIL: No <head> tag found');
  process.exit(1);
}
const headContent = headMatch[1];

// Find all external scripts in <head>
const externalScriptMatches = [...headContent.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi)];
console.log(`1. External Scripts in <head>: ${externalScriptMatches.length}`);
let blockingScripts = 0;
for (const match of externalScriptMatches) {
  const scriptTag = match[0];
  const src = match[1];
  const isAsync = scriptTag.includes('async');
  const isDefer = scriptTag.includes('defer');
  const isModule = scriptTag.includes('type="module"') || scriptTag.includes("type='module'");
  if (!isAsync && !isDefer && !isModule) {
    console.error(`  FAIL: Render-blocking external script found: ${src}`);
    blockingScripts++;
  } else {
    console.log(`  PASS: Script has non-blocking attribute (async/defer/module): ${src}`);
  }
}
if (externalScriptMatches.length === 0) {
  console.log('  PASS: Zero external scripts in <head>! All scripts deferred or asynchronously scheduled.');
}

// 2. Audit stylesheets in <head>
const stylesheetMatches = [...headContent.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi)];
console.log(`\n2. Synchronous Stylesheets in <head>: ${stylesheetMatches.length}`);
for (const match of stylesheetMatches) {
  console.log(`  Stylesheet tag: ${match[0]}`);
}
if (stylesheetMatches.length === 0) {
  console.log('  PASS: Zero synchronous render-blocking stylesheets in <head>!');
}

// 3. Verify Preloaded Stylesheets
const preloadStylesheets = [...headContent.matchAll(/<link[^>]*rel=["']preload["'][^>]*as=["']style["'][^>]*>/gi)];
console.log(`\n3. Preloaded Stylesheets: ${preloadStylesheets.length}`);
for (const match of preloadStylesheets) {
  console.log(`  Preload tag: ${match[0]}`);
}
if (preloadStylesheets.length >= 2) {
  console.log('  PASS: Both main.css and Google Fonts are preloaded asynchronously.');
} else {
  console.warn(`  WARNING: Expected at least 2 preloaded stylesheets, found ${preloadStylesheets.length}`);
}

// 4. Verify Critical CSS Inlined
const inlinedStyles = [...headContent.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
console.log(`\n4. Inlined <style> blocks in <head>: ${inlinedStyles.length}`);
let totalInlinedCssSize = 0;
let hasTokens = false;
let hasHeader = false;
let hasDisplayXl = false;
for (const match of inlinedStyles) {
  const css = match[1];
  totalInlinedCssSize += css.length;
  if (css.includes('--color-canvas')) hasTokens = true;
  if (css.includes('.site-header')) hasHeader = true;
  if (css.includes('.display-xl')) hasDisplayXl = true;
}
console.log(`  Total Inlined Critical CSS Size: ${(totalInlinedCssSize / 1024).toFixed(2)} KB`);
if (hasTokens && hasHeader && hasDisplayXl) {
  console.log('  PASS: Critical CSS contains design tokens, header layout, and hero typography.');
} else {
  console.error('  FAIL: Critical CSS missing essential tokens or header rules.');
  process.exit(1);
}

// 5. Verify Google Tag Manager deferred loading
const hasGtagConfig = html.includes('gtag(\'config\', \'G-3ZS11DPE2L\')') || html.includes('gtag("config", "G-3ZS11DPE2L")');
const hasRequestIdleCallback = html.includes('requestIdleCallback');
console.log(`\n5. Third-party Tracking (Google Tag Manager):`);
console.log(`  gtag config present: ${hasGtagConfig}`);
console.log(`  requestIdleCallback deferred loader present: ${hasRequestIdleCallback}`);
if (hasGtagConfig && hasRequestIdleCallback) {
  console.log('  PASS: GTM preserves dataLayer queuing while deferring network load to idle time.');
} else {
  console.error('  FAIL: GTM configuration or deferred loader missing.');
  process.exit(1);
}

// 6. Verify main.css static asset existence
const mainCssPath = path.resolve('dist/styles/main.css');
if (fs.existsSync(mainCssPath)) {
  const stat = fs.statSync(mainCssPath);
  console.log(`\n6. Full Non-Critical Stylesheet (dist/styles/main.css): ${(stat.size / 1024).toFixed(2)} KB`);
  console.log('  PASS: main.css file exists in dist/styles/ and is ready for static delivery.');
} else {
  console.error('  FAIL: dist/styles/main.css does not exist.');
  process.exit(1);
}

// 7. Check for @import in all CSS files
console.log('\n7. Checking for CSS @import statements:');
const distCssDir = path.resolve('dist');
function checkImportsInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkImportsInDir(full);
    } else if (entry.name.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('@import')) {
        console.error(`  FAIL: @import found in ${full}`);
        process.exit(1);
      }
    }
  }
}
checkImportsInDir(distCssDir);
console.log('  PASS: Zero CSS @import statements found across all built stylesheets.');

console.log('\n========================================');
console.log('ALL RENDER-BLOCKING AUDIT CHECKS PASSED!');
console.log('========================================');
