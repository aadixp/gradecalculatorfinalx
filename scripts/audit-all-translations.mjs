import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

console.log('🔍 Starting Deep Multi-Language Audit across all 8 languages...');

const uiPath = path.resolve(srcDir, 'i18n/ui.ts');
const { ui, languages } = await import(pathToFileURL(uiPath).href);

const langList = Object.keys(languages);
const enKeys = Object.keys(ui.en);

console.log(`📊 English Dictionary Key Count: ${enKeys.length}`);

let missingKeysCount = 0;
for (const lang of langList) {
  if (lang === 'en') continue;
  const currentKeys = new Set(Object.keys(ui[lang] || {}));
  const missing = enKeys.filter(k => !currentKeys.has(k));
  if (missing.length > 0) {
    console.warn(`⚠️ [${lang}] Missing ${missing.length} translation keys! First 5:`, missing.slice(0, 5));
    missingKeysCount += missing.length;
  } else {
    console.log(`✅ [${lang}] Has all ${enKeys.length} translation keys.`);
  }
}

// Check if any translated string is still identical to English for long text (potential untranslated fallback)
console.log('\n🔍 Checking for untranslated English strings across non-English dictionaries...');
for (const lang of langList) {
  if (lang === 'en') continue;
  let exactMatchCount = 0;
  for (const k of enKeys) {
    // Ignore short brand strings or formulas or numbers or proper nouns
    if (
      k.includes('brand') || 
      k.includes('formula') || 
      k.includes('equivGpa') || 
      k.includes('col') || 
      k.includes('formulaCode') ||
      k.includes('scale') ||
      k.startsWith('status.') ||
      ui.en[k].length < 15
    ) continue;

    if (ui[lang][k] === ui.en[k]) {
      console.log(`  [${lang}] Untranslated key "${k}": "${ui.en[k].slice(0, 60)}..."`);
      exactMatchCount++;
    }
  }
  console.log(`📊 [${lang}] Total potentially untranslated content keys: ${exactMatchCount}`);
}

import { pathToFileURL } from 'url';
