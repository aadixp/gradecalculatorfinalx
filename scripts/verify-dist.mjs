import fs from 'fs';
import path from 'path';

const pages = [
  'dist/index.html',
  'dist/fr/index.html',
  'dist/ja/index.html',
  'dist/es/index.html',
  'dist/de/index.html',
  'dist/pt/index.html',
  'dist/ko/index.html',
  'dist/it/index.html'
];

pages.forEach(p => {
  const content = fs.readFileSync(path.resolve(p), 'utf8');
  console.log(`\n=== Checking ${p} ===`);
  console.log('File size:', content.length);
  console.log('Contains trust-card:', content.includes('trust-card'));
  console.log('Contains site-footer:', content.includes('site-footer'));
  console.log('Contains geist.css link:', content.includes('.css'));
  console.log('Contains FAQ details tag:', content.includes('<details'));
  console.log('Contains <details ... open>:', content.includes('<details class="faq-item" open') || content.includes('<details open'));
});
