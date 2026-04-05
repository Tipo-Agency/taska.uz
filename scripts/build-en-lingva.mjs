/**
 * Builds locales/en.json from scripts/ru-keys-flat.json using Lingva.
 * Resumes: skips keys whose value has no Cyrillic (already translated).
 * Writes after each key so interruption preserves progress.
 *
 * Run: node scripts/build-en-lingva.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const ruPath = path.join(root, 'scripts', 'ru-keys-flat.json');
const outPath = path.join(root, 'locales', 'en.json');

const LINGVA = 'https://lingva.ml/api/v1/ru/en';
const CHUNK = 200;
const cyr = /[А-Яа-яЁё]/;

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function chunks(s) {
  const t = s.trim();
  if (t.length <= CHUNK) return [t];
  const parts = [];
  let rest = t;
  while (rest.length) {
    if (rest.length <= CHUNK) {
      parts.push(rest);
      break;
    }
    let cut = rest.lastIndexOf(' ', CHUNK);
    if (cut < CHUNK / 2) cut = CHUNK;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  return parts;
}

async function translatePart(text, attempt = 0) {
  const enc = encodeURIComponent(text);
  const res = await fetch(`${LINGVA}/${enc}`);
  if (!res.ok) {
    if (attempt < 4) {
      await delay(800 * (attempt + 1));
      return translatePart(text, attempt + 1);
    }
    throw new Error(String(res.status));
  }
  const data = await res.json();
  return data.translation ?? text;
}

async function translateFull(text) {
  const parts = chunks(text);
  const out = [];
  for (const p of parts) {
    out.push(await translatePart(p));
    await delay(220);
  }
  return out.join(' ').trim();
}

function loadEn() {
  try {
    return JSON.parse(fs.readFileSync(outPath, 'utf8'));
  } catch {
    return {};
  }
}

function saveEn(en) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(en, null, 2), 'utf8');
}

async function main() {
  const ru = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
  const keys = Object.keys(ru);
  const en = loadEn();
  let i = 0;
  for (const k of keys) {
    i += 1;
    const existing = en[k];
    if (typeof existing === 'string' && existing.length && !cyr.test(existing)) {
      process.stderr.write(`\r${i}/${keys.length} skip ${k.slice(0, 44)}…`);
      continue;
    }
    process.stderr.write(`\r${i}/${keys.length} ${k.slice(0, 48)}…`);
    try {
      en[k] = await translateFull(ru[k]);
    } catch {
      en[k] = ru[k];
    }
    saveEn(en);
    await delay(150);
  }
  process.stderr.write(`\nWrote ${outPath}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
