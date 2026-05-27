// Merge HE translation parts A+B+C into final file
const fs = require('fs');
const path = require('path');

const a = JSON.parse(fs.readFileSync(path.join(__dirname, 'he-part-a.json'), 'utf8'));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, 'he-part-b.json'), 'utf8'));
const c = JSON.parse(fs.readFileSync(path.join(__dirname, 'he-part-c.json'), 'utf8'));

const merged = { ...a, ...b, ...c };
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'locales', 'en', 'translation.json'), 'utf8'));

// Verify key parity
const enKeys = Object.keys(en).sort();
const heKeys = Object.keys(merged).sort();
const missing = enKeys.filter(k => !heKeys.includes(k));
const extra = heKeys.filter(k => !enKeys.includes(k));

if (missing.length) console.log('MISSING in HE:', missing.join(', '));
if (extra.length) console.log('EXTRA in HE:', extra.join(', '));

if (!missing.length && !extra.length) {
  console.log('✅ Top-level key parity OK:', enKeys.length, 'keys');
}

const outPath = path.join(__dirname, '..', 'public', 'locales', 'he', 'translation.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log('✅ Wrote', outPath, '(' + JSON.stringify(merged, null, 2).split('\n').length, 'lines)');
