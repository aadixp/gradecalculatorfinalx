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
let missingCanonical = 0;
let missingHreflang = 0;
let missingSchema = 0;
let missingOg = 0;
let missingH1 = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('rel="canonical"')) missingCanonical++;
  if (!html.includes('hreflang="x-default"')) missingHreflang++;
  if (!html.includes('application/ld+json')) missingSchema++;
  if (!html.includes('property="og:image"')) missingOg++;
  if (!html.includes('<h1')) missingH1++;
}

console.log({
  totalHtml: htmlFiles.length,
  missingCanonical,
  missingHreflang,
  missingSchema,
  missingOg,
  missingH1
});
