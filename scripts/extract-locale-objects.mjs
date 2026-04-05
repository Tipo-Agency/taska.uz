/**
 * Извлекает объекты ru / uz из translations.ts (без учёта { } внутри строк — при сбое правьте вручную).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'translations.ts');
const text = fs.readFileSync(srcPath, 'utf8');

function extractBracedObject(label) {
  const needle = `${label}: {`;
  const start = text.indexOf(needle);
  if (start === -1) throw new Error(`Not found: ${needle}`);
  let i = start + needle.length - 1;
  let depth = 0;
  let inStr = false;
  let strQuote = null;
  let escaped = false;

  const objStart = i;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (c === '\\') {
        escaped = true;
        continue;
      }
      if (c === strQuote) inStr = false;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      inStr = true;
      strQuote = c;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return text.slice(objStart, i + 1);
    }
  }
  throw new Error(`Unclosed object for ${label}`);
}

function jsObjectToJson(jsObjText) {
  // eslint-disable-next-line no-new-func
  const obj = new Function(`return ${jsObjText}`)();
  return JSON.stringify(obj, null, 2);
}

const ruJs = extractBracedObject('ru');
const uzJs = extractBracedObject('uz');

fs.writeFileSync(path.join(root, 'locales/ru.json'), jsObjectToJson(ruJs), 'utf8');
fs.writeFileSync(path.join(root, 'locales/uz.json'), jsObjectToJson(uzJs), 'utf8');
console.log('Wrote locales/ru.json, locales/uz.json');
