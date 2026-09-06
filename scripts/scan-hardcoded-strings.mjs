import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.astro') || (file.endsWith('.ts') && !file.endsWith('.d.ts') && !file.includes('ui.ts') && !file.includes('faqs.ts'))) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles(srcDir);
console.log(`🔍 Scanning ${files.length} source files for potential hardcoded text...`);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(srcDir, file);

  // Look for text inside elements like <span>Text</span>, <button>Text</button>, <h4>Text</h4> that don't have {t('...')} or data-i18n
  // Also check <script> tags for string literals like 'Requires Extra Credit', 'Comfortable', etc.
  const suspiciousPhrases = [
    'Default Course',
    'Weighted Average',
    'Standard algebraic formula',
    'Requires Extra Credit',
    'Challenging Push',
    'Realistic Target',
    'Comfortable',
    'Guaranteed',
    'Locked',
    'Invalid Weight',
    'To achieve',
    'Your current standing',
    'For an A',
    'To Pass',
    'First Class with Distinction',
    'First Class',
    'Second Class',
    'Pass Class',
    'Fail',
    'Course Name or Code',
    'Add Assignment',
    'Drop Lowest',
    'Points Max',
    'Weight (%)',
    'Letter Grade',
    'Calculators'
  ];

  for (const phrase of suspiciousPhrases) {
    if (content.includes(phrase)) {
      // Find line number
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes(phrase) && !line.includes('//') && !line.includes('/*')) {
          console.log(`  [${relPath}:${idx + 1}] contains "${phrase}": ${line.trim().slice(0, 80)}`);
        }
      });
    }
  }
}

console.log('✅ Scan complete.');
