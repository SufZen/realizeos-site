// Merge PT translation parts A+B+C into final file
const fs = require('fs');
const path = require('path');

const a = JSON.parse(fs.readFileSync(path.join(__dirname, 'pt-part-a.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, 'pt-part-b.json'), 'utf8'));
const c = JSON.parse(fs.readFileSync(path.join(__dirname, 'pt-part-c.json'), 'utf8'));

const merged = { ...a, ...b, ...c };

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'locales', 'en', 'translation.json'), 'utf8'));
const enKeys = Object.keys(en).sort();
const ptKeys = Object.keys(merged).sort();

console.log(`EN keys (${enKeys.length}): ${enKeys.join(', ')}`);
console.log(`PT keys (${ptKeys.length}): ${ptKeys.join(', ')}`);

const missing = enKeys.filter(k => !ptKeys.includes(k));
const extra = ptKeys.filter(k => !enKeys.includes(k));

if (missing.length) console.log(`MISSING in PT: ${missing.join(', ')}`);
if (extra.length) console.log(`EXTRA in PT: ${extra.join(', ')}`);

if (missing.length === 0 && extra.length === 0) {
  console.log('✓ Perfect key parity!');
}

const outPath = path.join(__dirname, '..', 'public', 'locales', 'pt', 'translation.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Written to ${outPath} (${JSON.stringify(merged, null, 2).split('\n').length} lines)`);
