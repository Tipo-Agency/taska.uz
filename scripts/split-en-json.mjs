/**
 * Делит locales/en.json на locales/en/<prefix>.json по первому сегменту ключа.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'locales/en.json');
const outDir = path.join(root, 'locales/en');

const raw = JSON.parse(fs.readFileSync(src, 'utf8'));
const byPrefix = {};

for (const [key, value] of Object.entries(raw)) {
  const prefix = key.split('.')[0] || '_';
  if (!byPrefix[prefix]) byPrefix[prefix] = {};
  byPrefix[prefix][key] = value;
}

fs.mkdirSync(outDir, { recursive: true });
for (const [prefix, obj] of Object.entries(byPrefix)) {
  const safe = prefix.replace(/[^a-zA-Z0-9_-]/g, '_') || 'misc';
  fs.writeFileSync(path.join(outDir, `${safe}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

console.log(`Wrote ${Object.keys(byPrefix).length} files to locales/en/`);
