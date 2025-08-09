#!/usr/bin/env node

import { readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const results = {
  valid: [],
  corrupted: [],
  binary: [],
  empty: [],
  suspicious: []
};

// Check if content is binary
function isBinary(buffer) {
  // Check for null bytes (common in binary files)
  for (let i = 0; i < Math.min(buffer.length, 8000); i++) {
    if (buffer[i] === 0) return true;
  }
  
  // Check for high percentage of non-printable characters
  let nonPrintable = 0;
  const sample = buffer.slice(0, Math.min(buffer.length, 8000));
  
  for (let i = 0; i < sample.length; i++) {
    const byte = sample[i];
    // Printable ASCII range (32-126) plus common whitespace (9, 10, 13)
    if (byte < 32 && byte !== 9 && byte !== 10 && byte !== 13) {
      nonPrintable++;
    } else if (byte > 126) {
      nonPrintable++;
    }
  }
  
  return (nonPrintable / sample.length) > 0.3;
}

// Check PDF validity
function checkPdf(filepath) {
  try {
    const buffer = readFileSync(filepath);
    
    // Check if empty
    if (buffer.length === 0) {
      return { valid: false, reason: 'Empty file' };
    }
    
    // Check PDF header
    const header = buffer.slice(0, 5).toString();
    if (!header.startsWith('%PDF')) {
      return { valid: false, reason: 'Invalid PDF header' };
    }
    
    // Check for EOF marker
    const footer = buffer.slice(-1024).toString();
    if (!footer.includes('%%EOF')) {
      return { valid: false, reason: 'Missing EOF marker (truncated?)' };
    }
    
    return { valid: true, size: buffer.length };
  } catch (error) {
    return { valid: false, reason: error.message };
  }
}

// Check markdown file
function checkMarkdown(filepath) {
  try {
    const buffer = readFileSync(filepath);
    const content = buffer.toString('utf-8');
    
    // Check if empty
    if (buffer.length === 0) {
      return { valid: false, reason: 'Empty file' };
    }
    
    // Check if it's actually binary
    if (isBinary(buffer)) {
      return { valid: false, reason: 'Binary content in markdown file' };
    }
    
    // Check for HTML instead of markdown
    if (content.includes('<!DOCTYPE') || content.includes('<html')) {
      // Check if it's raw HTML that wasn't converted
      const htmlTags = (content.match(/<[^>]+>/g) || []).length;
      const lines = content.split('\n').length;
      
      if (htmlTags / lines > 2) {
        return { valid: false, reason: 'Unconverted HTML' };
      }
    }
    
    // Check for meaningful content
    const textContent = content.replace(/<[^>]+>/g, '').trim();
    if (textContent.length < 100) {
      return { valid: false, reason: 'Too little text content' };
    }
    
    return { 
      valid: true, 
      size: buffer.length,
      lines: content.split('\n').length,
      hasMarkdown: content.includes('#') || content.includes('**') || content.includes('[')
    };
  } catch (error) {
    return { valid: false, reason: error.message };
  }
}

// Scan all files
function scanAllFiles() {
  const sourcesDir = join(__dirname, 'sources');
  const dirs = readdirSync(sourcesDir).filter(d => 
    statSync(join(sourcesDir, d)).isDirectory()
  );
  
  console.log('🔍 Checking file quality...\n');
  
  dirs.forEach(dir => {
    const dirPath = join(sourcesDir, dir);
    const files = readdirSync(dirPath);
    
    files.forEach(file => {
      const filepath = join(dirPath, file);
      const ext = extname(file).toLowerCase();
      const stat = statSync(filepath);
      
      const fileInfo = {
        name: file,
        path: filepath,
        dir: dir,
        size: stat.size
      };
      
      if (ext === '.pdf') {
        const check = checkPdf(filepath);
        if (check.valid) {
          console.log(`✅ PDF: ${file} (${Math.round(check.size/1024)}KB)`);
          results.valid.push({ ...fileInfo, type: 'pdf', ...check });
        } else {
          console.log(`❌ PDF: ${file} - ${check.reason}`);
          if (check.reason === 'Empty file') {
            results.empty.push({ ...fileInfo, type: 'pdf', ...check });
          } else {
            results.corrupted.push({ ...fileInfo, type: 'pdf', ...check });
          }
        }
      } else if (ext === '.md') {
        const check = checkMarkdown(filepath);
        if (check.valid) {
          console.log(`✅ MD: ${file} (${check.lines} lines)`);
          results.valid.push({ ...fileInfo, type: 'markdown', ...check });
        } else {
          console.log(`❌ MD: ${file} - ${check.reason}`);
          if (check.reason === 'Binary content in markdown file') {
            results.binary.push({ ...fileInfo, type: 'markdown', ...check });
          } else if (check.reason === 'Empty file') {
            results.empty.push({ ...fileInfo, type: 'markdown', ...check });
          } else {
            results.suspicious.push({ ...fileInfo, type: 'markdown', ...check });
          }
        }
      } else if (ext === '.html') {
        const buffer = readFileSync(filepath);
        if (isBinary(buffer)) {
          console.log(`❌ HTML: ${file} - Binary content`);
          results.binary.push({ ...fileInfo, type: 'html' });
        } else {
          console.log(`✅ HTML: ${file}`);
          results.valid.push({ ...fileInfo, type: 'html' });
        }
      }
    });
  });
  
  // Generate report
  let report = `# File Quality Assessment Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  report += `## Summary\n\n`;
  report += `- ✅ Valid files: ${results.valid.length}\n`;
  report += `- ❌ Corrupted: ${results.corrupted.length}\n`;
  report += `- 🔤 Binary in text files: ${results.binary.length}\n`;
  report += `- 📭 Empty files: ${results.empty.length}\n`;
  report += `- ⚠️ Suspicious: ${results.suspicious.length}\n\n`;
  
  if (results.valid.length > 0) {
    report += `## ✅ Valid Files (${results.valid.length})\n\n`;
    
    const validPdfs = results.valid.filter(f => f.type === 'pdf');
    const validMd = results.valid.filter(f => f.type === 'markdown');
    
    if (validPdfs.length > 0) {
      report += `### Valid PDFs (${validPdfs.length})\n\n`;
      validPdfs.forEach(file => {
        report += `- ${file.name} (${Math.round(file.size/1024)}KB)\n`;
      });
      report += `\n`;
    }
    
    if (validMd.length > 0) {
      report += `### Valid Markdown (${validMd.length})\n\n`;
      validMd.forEach(file => {
        report += `- ${file.name} (${file.lines} lines)\n`;
      });
      report += `\n`;
    }
  }
  
  if (results.corrupted.length > 0) {
    report += `## ❌ Corrupted Files (${results.corrupted.length})\n\n`;
    results.corrupted.forEach(file => {
      report += `- ${file.name} - ${file.reason}\n`;
    });
    report += `\n`;
  }
  
  if (results.binary.length > 0) {
    report += `## 🔤 Binary Content in Text Files (${results.binary.length})\n\n`;
    report += `These files contain binary data and need to be re-downloaded:\n\n`;
    results.binary.forEach(file => {
      report += `- ${file.dir}/${file.name}\n`;
    });
    report += `\n`;
  }
  
  if (results.empty.length > 0) {
    report += `## 📭 Empty Files (${results.empty.length})\n\n`;
    results.empty.forEach(file => {
      report += `- ${file.dir}/${file.name}\n`;
    });
    report += `\n`;
  }
  
  report += `## Recommendations\n\n`;
  report += `1. **Delete corrupted/empty files**: ${results.corrupted.length + results.empty.length} files\n`;
  report += `2. **Re-download binary markdown**: ${results.binary.length} files\n`;
  report += `3. **Convert suspicious HTML**: ${results.suspicious.filter(f => f.reason === 'Unconverted HTML').length} files\n\n`;
  
  const reportPath = join(__dirname, 'sources', 'quality-report.md');
  writeFileSync(reportPath, report);
  
  // Save detailed results
  const jsonPath = join(__dirname, 'sources', 'quality-results.json');
  writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Quality Assessment Complete`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Valid: ${results.valid.length}`);
  console.log(`❌ Corrupted: ${results.corrupted.length}`);
  console.log(`🔤 Binary: ${results.binary.length}`);
  console.log(`📭 Empty: ${results.empty.length}`);
  console.log(`⚠️ Suspicious: ${results.suspicious.length}`);
  console.log(`\nReport saved to: ${reportPath}`);
  
  return results;
}

// Run the check
const scanResults = scanAllFiles();

// Offer to clean up
if (scanResults.corrupted.length + scanResults.empty.length + scanResults.binary.length > 0) {
  console.log(`\n🧹 Found ${scanResults.corrupted.length + scanResults.empty.length + scanResults.binary.length} problematic files`);
  console.log(`Run 'node cleanup-bad-files.js' to remove them`);
}