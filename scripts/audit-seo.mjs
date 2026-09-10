import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');

const TARGET_URLS = [
  // 4 Crawled - currently not indexed
  '/gpa-calculator/',
  '/semester-gpa-calculator/',
  '/indian-sgpa-calculator/',
  '/percentage-to-cgpa/',
  // 9 Discovered - currently not indexed
  '/cgpa-to-percentage/',
  '/final-exam-calculator/',
  '/grade-converter/',
  '/indian-cgpa-calculator/',
  '/privacy-policy/',
  '/semester-cgpa-calculator/',
  '/target-cgpa-calculator/',
  '/target-gpa-calculator/',
  '/weighted-grade-calculator/',
];

console.log('=== RUNNING COMPREHENSIVE SEO & INDEXABILITY AUDIT ===\n');

// 1. Audit robots.txt
const robotsPath = path.join(distDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  console.error('FAIL: dist/robots.txt does not exist!');
} else {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  console.log('--- robots.txt content ---');
  console.log(robotsContent.trim());
  if (robotsContent.includes('Disallow: /') && !robotsContent.includes('Disallow: /404')) {
    console.warn('WARNING: robots.txt might be disallowing too much!');
  }
}

// 2. Audit sitemaps
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
let sitemapUrls = [];

if (fs.existsSync(sitemapIndexPath)) {
  console.log('\nSUCCESS: dist/sitemap-index.xml generated.');
}
if (fs.existsSync(sitemap0Path)) {
  const sitemap0Content = fs.readFileSync(sitemap0Path, 'utf8');
  const matches = sitemap0Content.match(/<loc>(.*?)<\/loc>/g) || [];
  sitemapUrls = matches.map(m => m.replace(/<\/?loc>/g, ''));
  console.log(`SUCCESS: dist/sitemap-0.xml contains ${sitemapUrls.length} URLs.`);
}

// 3. Homepage internal crawlability check
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// 4. Audit each of the 13 target URLs
console.log('\n--- Auditing 13 Target URLs ---');
let allPassed = true;

for (const targetUrl of TARGET_URLS) {
  const relativeFile = path.join(distDir, targetUrl.replace(/^\//, ''), 'index.html');
  const exists = fs.existsSync(relativeFile);
  if (!exists) {
    console.error(`FAIL: ${targetUrl} does NOT exist on disk!`);
    allPassed = false;
    continue;
  }

  const html = fs.readFileSync(relativeFile, 'utf8');

  // Check noindex
  const hasNoindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  // Canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;
  const expectedCanonical = `https://gradecalculatorfinalx.com${targetUrl}`;
  const canonicalCorrect = canonical === expectedCanonical;

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;

  // Description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1] : null;

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : null;

  // In sitemap?
  const inSitemap = sitemapUrls.includes(expectedCanonical);

  // Linked from homepage?
  const linkedFromHome = homeHtml.includes(`href="${targetUrl}"`) || homeHtml.includes(`href='${targetUrl}'`);

  // Schema LD+JSON
  const hasSchema = html.includes('application/ld+json');

  console.log(`\nURL: ${targetUrl}`);
  console.log(`  File exists: YES (200 OK)`);
  console.log(`  Noindex present: ${hasNoindex ? 'FAIL (YES)' : 'PASS (NO)'}`);
  console.log(`  Canonical: ${canonical} [${canonicalCorrect ? 'PASS' : 'FAIL - expected ' + expectedCanonical}]`);
  console.log(`  Title: "${title}"`);
  console.log(`  H1: "${h1}"`);
  console.log(`  Meta Desc length: ${description ? description.length : 0} chars`);
  console.log(`  In XML Sitemap: ${inSitemap ? 'PASS' : 'FAIL'}`);
  console.log(`  Linked from Homepage: ${linkedFromHome ? 'PASS' : 'FAIL'}`);
  console.log(`  Structured Data (JSON-LD): ${hasSchema ? 'PASS' : 'NONE'}`);

  if (hasNoindex || !canonicalCorrect || !title || !h1 || !inSitemap || !linkedFromHome) {
    allPassed = false;
  }
}

// 5. Check duplicate alias routes don't exist
console.log('\n--- Checking Stale / Duplicate Aliases ---');
const staleFiles = [
  'public/sitemap.xml',
  'dist/privacy/index.html',
  'dist/terms/index.html',
  'dist/es/privacy/index.html',
  'dist/es/terms/index.html'
];
staleFiles.forEach(f => {
  const ex = fs.existsSync(path.resolve(f));
  console.log(`  ${f}: ${ex ? 'FAIL (STILL EXISTS!)' : 'PASS (REMOVED)'}`);
  if (ex) allPassed = false;
});

console.log('\n=== AUDIT COMPLETE. OVERALL STATUS:', allPassed ? 'ALL CHECKS PASSED ✅' : 'SOME CHECKS FAILED ❌', '===');
