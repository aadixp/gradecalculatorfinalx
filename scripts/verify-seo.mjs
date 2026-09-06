import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('🔍 Running Detailed SEO Quality Audit...');

// 1. Check Homepage English
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Title Check
const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/);
console.log(`📌 Homepage Title: "${titleMatch ? titleMatch[1] : 'NOT FOUND'}"`);
if (!titleMatch || !titleMatch[1].includes('Grade Calculator')) {
  console.error('❌ Homepage title does not match SEO requirements!');
}

// Meta Description Check
const descMatch = indexHtml.match(/<meta name="description" content="(.*?)"/);
console.log(`📌 Homepage Description: "${descMatch ? descMatch[1] : 'NOT FOUND'}"`);

// H1 Check
const h1Match = indexHtml.match(/<h1[^>]*>(.*?)<\/h1>/s);
const h1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : 'NOT FOUND';
console.log(`📌 Homepage H1: "${h1Text}"`);
if (h1Text !== 'Grade Calculator') {
  console.error(`❌ Expected H1 to be "Grade Calculator", got "${h1Text}"`);
}

// Hreflang Check
const hreflangs = [...indexHtml.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
console.log(`📌 Found ${hreflangs.length} hreflang annotations on Homepage.`);
const expectedLangs = ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'x-default'];
for (const lang of expectedLangs) {
  if (!hreflangs.some(h => h[1] === lang)) {
    console.error(`❌ Missing hreflang for "${lang}"!`);
  }
}

// 2. Check Other Key Pages
const pagesToCheck = [
  { file: 'final-exam-calculator/index.html', titleContains: 'Final Grade Calculator' },
  { file: 'weighted-grade-calculator/index.html', titleContains: 'Weighted Grade Calculator' },
  { file: 'gpa-calculator/index.html', titleContains: 'GPA Calculator' },
  { file: 'semester-gpa-calculator/index.html', titleContains: 'Semester GPA Calculator' },
  { file: 'indian-cgpa-calculator/index.html', titleContains: 'Indian CGPA Calculator' },
  { file: 'indian-sgpa-calculator/index.html', titleContains: 'SGPA Calculator' },
  { file: 'cgpa-to-percentage/index.html', titleContains: 'CGPA to Percentage Calculator' },
  { file: 'percentage-to-cgpa/index.html', titleContains: 'Percentage to CGPA Calculator' },
  { file: 'target-gpa-calculator/index.html', titleContains: 'Target GPA Calculator' },
  { file: 'target-cgpa-calculator/index.html', titleContains: 'Target CGPA Calculator' },
  { file: 'grade-converter/index.html', titleContains: 'Grade Conversion Calculator' }
];

for (const p of pagesToCheck) {
  const filePath = path.join(distDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Page file not found: ${p.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const tMatch = content.match(/<title>(.*?)<\/title>/);
  const pTitle = tMatch ? tMatch[1] : '';
  const hasTitle = pTitle.includes(p.titleContains);
  console.log(`  ${hasTitle ? '✅' : '❌'} [${p.file}] Title: "${pTitle}"`);
}

// 3. Check robots.txt & sitemap
const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
if (robots.includes('Disallow: /404.html') && robots.includes('sitemap-index.xml')) {
  console.log('✅ robots.txt verified (clean, indexable, valid sitemap directives).');
} else {
  console.error('❌ robots.txt issue detected!');
}

console.log('🎉 SEO Quality Audit Complete!');
