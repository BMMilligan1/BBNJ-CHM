#!/usr/bin/env node

import { readFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load quality check results
const resultsPath = join(__dirname, 'sources', 'quality-results.json');
const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));

console.log('🧹 Cleaning up problematic files...\n');

let deleted = 0;
let kept = [];

// Delete corrupted files
results.corrupted.forEach(file => {
  if (existsSync(file.path)) {
    console.log(`❌ Deleting corrupted: ${file.name}`);
    unlinkSync(file.path);
    deleted++;
  }
});

// Delete empty files
results.empty.forEach(file => {
  if (existsSync(file.path)) {
    console.log(`📭 Deleting empty: ${file.name}`);
    unlinkSync(file.path);
    deleted++;
  }
});

// Delete binary markdown files
results.binary.forEach(file => {
  if (existsSync(file.path)) {
    console.log(`🔤 Deleting binary: ${file.name}`);
    unlinkSync(file.path);
    deleted++;
  }
});

// Handle suspicious files (keep for now, but note them)
results.suspicious.forEach(file => {
  console.log(`⚠️ Keeping suspicious (needs conversion): ${file.name}`);
  kept.push(file);
});

console.log(`\n✅ Cleanup complete!`);
console.log(`   Deleted: ${deleted} files`);
console.log(`   Kept for conversion: ${kept.length} files`);

// Create a list of files that need re-downloading
const toRedownload = [
  ...results.corrupted,
  ...results.empty,
  ...results.binary
].map(f => ({
  name: f.name,
  dir: f.dir,
  reason: f.reason || 'Corrupted/Binary'
}));

const redownloadPath = join(__dirname, 'sources', 'files-to-redownload.json');
import { writeFileSync } from 'fs';
writeFileSync(redownloadPath, JSON.stringify(toRedownload, null, 2));

console.log(`\n📝 List of files to re-download saved to:`);
console.log(`   ${redownloadPath}`);