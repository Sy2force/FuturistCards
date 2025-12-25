#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const results = {
  empty: [],
  duplicates: {},
  smallFiles: [],
  testFiles: [],
  tempFiles: []
};

function getFileHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

function scanDir(dir, baseDir = dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.includes('node_modules') && !file.startsWith('.')) {
      scanDir(fullPath, baseDir);
    } else if (stat.isFile() && !file.startsWith('.')) {
      const relativePath = path.relative(baseDir, fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      const trimmedContent = content.trim();
      
      // Check for empty files
      if (trimmedContent.length === 0) {
        results.empty.push(relativePath);
      }
      
      // Check for very small files (< 50 bytes)
      else if (trimmedContent.length < 50) {
        results.smallFiles.push({ path: relativePath, size: trimmedContent.length });
      }
      
      // Check for test files
      if (file.includes('.test.') || file.includes('.spec.')) {
        results.testFiles.push(relativePath);
      }
      
      // Check for temp files
      if (file.endsWith('.tmp') || file.endsWith('.log') || file === 'Thumbs.db' || file === '.DS_Store') {
        results.tempFiles.push(relativePath);
      }
      
      // Track duplicates by content hash
      if (trimmedContent.length > 0) {
        const hash = getFileHash(trimmedContent);
        if (!results.duplicates[hash]) {
          results.duplicates[hash] = [];
        }
        results.duplicates[hash].push(relativePath);
      }
    }
  }
}

console.log('🔍 SCANNING PROJECT FOR ISSUES...\n');

// Scan frontend
if (fs.existsSync('./frontend/src')) {
  scanDir('./frontend/src', './frontend/src');
}

// Scan backend
if (fs.existsSync('./backend')) {
  scanDir('./backend', './backend');
}

// Report results
console.log('📊 AUDIT RESULTS:\n');

if (results.empty.length > 0) {
  console.log('🪫 EMPTY FILES:');
  results.empty.forEach(file => console.log(`   - ${file}`));
  console.log('');
}

if (results.smallFiles.length > 0) {
  console.log('📄 VERY SMALL FILES (< 50 bytes):');
  results.smallFiles.forEach(({ path, size }) => console.log(`   - ${path} (${size} bytes)`));
  console.log('');
}

const duplicateGroups = Object.values(results.duplicates).filter(group => group.length > 1);
if (duplicateGroups.length > 0) {
  console.log('🔄 DUPLICATE FILES (same content):');
  duplicateGroups.forEach(group => {
    console.log(`   Group:`);
    group.forEach(file => console.log(`     - ${file}`));
  });
  console.log('');
}

if (results.testFiles.length > 0) {
  console.log('🧪 TEST FILES:');
  results.testFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
}

if (results.tempFiles.length > 0) {
  console.log('🗑️ TEMP FILES TO DELETE:');
  results.tempFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
}

// Summary
console.log('📈 SUMMARY:');
console.log(`   Empty files: ${results.empty.length}`);
console.log(`   Small files: ${results.smallFiles.length}`);
console.log(`   Duplicate groups: ${duplicateGroups.length}`);
console.log(`   Test files: ${results.testFiles.length}`);
console.log(`   Temp files: ${results.tempFiles.length}`);
