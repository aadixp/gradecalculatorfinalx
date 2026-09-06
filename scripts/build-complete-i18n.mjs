import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function buildCompleteI18n() {
  // 1. Read expand-translations.mjs
  const expandScriptPath = path.join(__dirname, 'expand-translations.mjs');
  const expandContent = fs.readFileSync(expandScriptPath, 'utf8');

  // We can evaluate expand-translations definitions in a sandbox or extract newKeys and langSeeds
  // Let's create a temporary module that exports newKeys and langSeeds
  const tempScriptPath = path.join(__dirname, 'temp-expand-exporter.mjs');
  const sanitizedExpand = expandContent
    .replace('const uiPath = path.resolve(\'src/i18n/ui.ts\');', '')
    .replace(/\/\/ Now merge new keys[\s\S]*$/, 'export { newKeys, langSeeds };');
  fs.writeFileSync(tempScriptPath, sanitizedExpand);
  const { newKeys: expandKeys, langSeeds } = await import(`file://${tempScriptPath}`);
  fs.unlinkSync(tempScriptPath);

  // 2. Read populate-all-translations.mjs
  const populateScriptPath = path.join(__dirname, 'populate-all-translations.mjs');
  const populateContent = fs.readFileSync(populateScriptPath, 'utf8');
  const tempPopulatePath = path.join(__dirname, 'temp-populate-exporter.mjs');
  const sanitizedPopulate = populateContent
    .replace('async function run() {[\s\S]*$', '')
    .replace('const fullKeyDicts =', 'export const fullKeyDicts =');
  fs.writeFileSync(tempPopulatePath, sanitizedPopulate);
  const { fullKeyDicts } = await import(`file://${tempPopulatePath}`);
  fs.unlinkSync(tempPopulatePath);

  // 3. Read base UI
  const currentUiModule = await import('../src/i18n/ui.ts');
  const currentUi = currentUiModule.ui;
  const languages = currentUiModule.languages;
  const allLangs = Object.keys(languages);

  const finalUi = {};

  for (const lang of allLangs) {
    finalUi[lang] = {
      ...(currentUi.en || {}), // Base English fallback for any missing key
      ...(currentUi[lang] || {}),
      ...(expandKeys[lang] || langSeeds[lang] || {}),
      ...(fullKeyDicts[lang] || {})
    };
  }

  // Ensure every language has ALL keys that English has
  const enKeys = Object.keys(finalUi.en);
  for (const lang of allLangs) {
    if (lang === 'en') continue;
    for (const key of enKeys) {
      if (!(key in finalUi[lang]) || finalUi[lang][key] === undefined) {
        finalUi[lang][key] = finalUi.en[key];
      }
    }
  }

  const outTs = `export const languages = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ko: '한국어',
  it: 'Italiano',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = ${JSON.stringify(finalUi, null, 2)} as const;
`;

  const uiPath = path.join(rootDir, 'src', 'i18n', 'ui.ts');
  fs.writeFileSync(uiPath, outTs, 'utf8');
  console.log('✅ Generated 100% complete ui.ts with all keys across all 8 languages!');
}

buildCompleteI18n().catch(console.error);
