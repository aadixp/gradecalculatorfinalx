import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function main() {
  const uiModulePath = path.join(rootDir, 'src', 'i18n', 'ui.ts');
  const uiContent = fs.readFileSync(uiModulePath, 'utf8');

  // Dynamically import or evaluate ui
  // We can extract languages and ui using TS/JS or regex/eval
  const langMatch = uiContent.match(/export const languages = (\{[\s\S]*?\}) as const;/);
  const uiMatch = uiContent.match(/export const ui = (\{[\s\S]*?\});?\s*$/);

  let uiObj = {};
  let languages = {};

  try {
    const mod = await import('../src/i18n/ui.ts');
    uiObj = mod.ui;
    languages = mod.languages;
  } catch (e) {
    console.error('Failed to import ui.ts directly:', e.message);
    // fallback eval
    if (uiMatch) {
      uiObj = JSON.parse(uiMatch[1]);
    }
  }

  const supportedLangs = Object.keys(languages || uiObj);
  console.log('Supported languages:', supportedLangs);

  // Scan all files in src/
  function getAllFiles(dir, exts = ['.astro', '.ts', '.js']) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getAllFiles(fullPath, exts));
      } else if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const srcFiles = getAllFiles(path.join(rootDir, 'src'));
  const referencedKeys = new Set();

  for (const f of srcFiles) {
    if (f.includes('ui.ts') || f.includes('audit-i18n.mjs')) continue;
    const content = fs.readFileSync(f, 'utf8');

    // Matches: t('key'), t("key"), t(`key`)
    const tMatches = content.matchAll(/\bt\(\s*['"`]([a-zA-Z0-9_.]+)['"`]\s*\)/g);
    for (const m of tMatches) {
      referencedKeys.add(m[1]);
    }

    // Matches: data-i18n="key", data-i18n-label="key", data-i18n-placeholder="key", data-i18n-title="key"
    const dataMatches = content.matchAll(/data-i18n(?:-[a-z]+)?=['"]([a-zA-Z0-9_.]+)['"]/g);
    for (const m of dataMatches) {
      referencedKeys.add(m[1]);
    }
  }

  console.log(`Found ${referencedKeys.size} unique keys referenced in src/ templates and components.`);

  const missingReport = {};
  for (const lang of supportedLangs) {
    missingReport[lang] = [];
    const dict = uiObj[lang] || {};
    for (const key of referencedKeys) {
      if (!(key in dict) || dict[key] === undefined || dict[key] === '') {
        missingReport[lang].push(key);
      }
    }
  }

  let hasMissing = false;
  for (const lang of supportedLangs) {
    if (missingReport[lang].length > 0) {
      hasMissing = true;
      console.log(`\n❌ Language [${lang}] is MISSING ${missingReport[lang].length} keys:`);
      console.log(missingReport[lang].join(', '));
    } else {
      console.log(`\n✅ Language [${lang}] has ALL ${referencedKeys.size} keys present.`);
    }
  }

  if (hasMissing) {
    fs.writeFileSync(path.join(__dirname, 'missing-keys.json'), JSON.stringify(missingReport, null, 2));
    console.log('\nWrote missing keys report to scripts/missing-keys.json');
  }
}

main().catch(console.error);
