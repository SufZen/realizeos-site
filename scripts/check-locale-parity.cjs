#!/usr/bin/env node
/**
 * check-locale-parity.cjs
 * 
 * CI script that validates all locale translation files have
 * identical key trees. Compares HE and PT against EN (source of truth).
 * 
 * Usage:  node scripts/check-locale-parity.cjs
 * Exit:   0 = all locales match EN, 1 = mismatch found
 */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['he', 'pt'];

/**
 * Recursively collect all dot-path keys from an object.
 * E.g. { a: { b: "x" } } → ["a.b"]
 */
function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function loadJson(locale) {
  const filePath = path.join(LOCALES_DIR, locale, 'translation.json');
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`✗ Failed to read ${locale}/translation.json: ${err.message}`);
    process.exit(1);
  }
}

// ── Main ──
const source = loadJson(SOURCE_LOCALE);
const sourceKeys = collectKeys(source);
let hasErrors = false;

console.log(`Source: ${SOURCE_LOCALE} (${sourceKeys.length} leaf keys)\n`);

for (const locale of TARGET_LOCALES) {
  const target = loadJson(locale);
  const targetKeys = collectKeys(target);

  const missing = sourceKeys.filter(k => !targetKeys.includes(k));
  const extra = targetKeys.filter(k => !sourceKeys.includes(k));

  if (missing.length === 0 && extra.length === 0) {
    console.log(`✓ ${locale.toUpperCase()}: ${targetKeys.length} keys — perfect parity`);
  } else {
    hasErrors = true;
    console.log(`✗ ${locale.toUpperCase()}: MISMATCH`);
    if (missing.length) {
      console.log(`  Missing (${missing.length}):`);
      missing.forEach(k => console.log(`    - ${k}`));
    }
    if (extra.length) {
      console.log(`  Extra (${extra.length}):`);
      extra.forEach(k => console.log(`    + ${k}`));
    }
  }
  console.log();
}

if (hasErrors) {
  console.log('FAIL: Locale parity check failed.');
  process.exit(1);
} else {
  console.log('PASS: All locales have perfect key parity with EN.');
  process.exit(0);
}
