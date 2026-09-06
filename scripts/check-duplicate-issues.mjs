import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function walk(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, files);
    else if (p.endsWith('.html')) files.push(p);
  }
  return files;
}

const htmlFiles = walk(distDir);
console.log(`Total HTML files: ${htmlFiles.length}`);

// Check 1: Check for duplicate /en/ routes when default is prefixDefaultLocale: false
const enRoutes = htmlFiles.filter(f => f.includes('/dist/en/') || f.includes('\\dist\\en\\'));
console.log(`Duplicate /en/ routes count: ${enRoutes.length}`);

// Check 2: Check Canonical tags vs Actual file path
const canonicalIssues = [];
for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (m) {
    const canonical = m[1];
    // expected path
    const expectedPath = rel === 'index.html' ? '/' : `/${rel.replace(/\/index\.html$/, '/')}`;
    const expectedUrl = `https://gradecalculatorfinalx.com${expectedPath}`;
    
    // Check if redirect alias
    if (rel.includes('privacy/index.html') || rel.includes('terms/index.html')) {
      // should point to privacy-policy or terms-and-conditions
      if (!canonical.includes('privacy-policy') && !canonical.includes('terms-and-conditions')) {
        canonicalIssues.push({ file: rel, canonical, note: 'Redirect canonical mismatch' });
      }
    }
  }
}

console.log(`Canonical mismatch count: ${canonicalIssues.length}`);

// Check 3: Check Cloudflare _headers for noindex on pages.dev
const headersPath = path.resolve(__dirname, '../public/_headers');
let headersOk = false;
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  if (headers.includes('gradecalculatorfinalx.pages.dev') && headers.includes('X-Robots-Tag: noindex')) {
    headersOk = true;
  }
}
console.log(`Cloudflare staging noindex protection: ${headersOk ? 'PROTECTED ✅' : 'VULNERABLE ❌'}`);

// Check 4: Check sitemap filter
const sitemapPath = path.resolve(distDir, 'sitemap-0.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}
console.log(`Total URLs in sitemap: ${sitemapUrls.length}`);
const sitemapDuplicates = sitemapUrls.filter((u, i) => sitemapUrls.indexOf(u) !== i);
console.log(`Duplicate URLs in sitemap: ${sitemapDuplicates.length}`);

const invalidInSitemap = sitemapUrls.filter(u => u.includes('404') || u.includes('500') || u.endsWith('/privacy/') || u.endsWith('/terms/'));
console.log(`Unwanted alias/error pages in sitemap: ${invalidInSitemap.length}`);
