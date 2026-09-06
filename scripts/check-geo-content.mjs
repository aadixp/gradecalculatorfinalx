import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

const sampleFiles = [
  'index.html',
  'final-exam-calculator/index.html',
  'gpa-calculator/index.html',
  'weighted-grade-calculator/index.html',
  'indian-cgpa-calculator/index.html',
  'semester-cgpa-calculator/index.html',
  'target-cgpa-calculator/index.html',
  'grade-converter/index.html',
  'es/index.html',
  'ja/index.html',
  'fr/index.html',
  'de/index.html'
];

console.log('--- Checking SSR/Static Content in dist/ HTML ---');

for (const relPath of sampleFiles) {
  const fullPath = path.join(distDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${relPath}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const sizeKb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
  const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(content);
  const tableRows = (content.match(/<tr/gi) || []).length;
  const hasJsonLd = content.includes('application/ld+json');
  const hasFaq = content.includes('faq-card') || content.includes('<details');
  const hasNumbers = /\b(88\.40%|106\.5%|3\.93|8\.94|3\.54|80\.75%)\b/.test(content);

  console.log(`[${relPath}] Size: ${sizeKb} KB | H1: ${hasH1} | Table Rows: ${tableRows} | JSON-LD: ${hasJsonLd} | FAQ: ${hasFaq} | Pre-rendered Numbers: ${hasNumbers}`);
}

console.log('\n--- Checking robots.txt ---');
const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
console.log(robots.slice(0, 400));
