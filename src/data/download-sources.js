#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load extracted URLs
const urlsFile = join(__dirname, 'sources', 'urls-extracted.json');
const urlData = JSON.parse(readFileSync(urlsFile, 'utf-8'));

// Create directories
const dirs = [
  'sources/pdf',
  'sources/pdfs',
  'sources/article',
  'sources/articles', 
  'sources/academic',
  'sources/official',
  'sources/doi',
  'sources/ssrn',
  'sources/metadata'
];

dirs.forEach(dir => {
  mkdirSync(join(__dirname, dir), { recursive: true });
});

// Download results tracking
const results = {
  successful: [],
  failed: [],
  skipped: [],
  timestamp: new Date().toISOString()
};

// Sanitize filename
function sanitizeFilename(text, url, index) {
  // Try to create meaningful filename from text or URL
  let filename = text || '';
  
  if (filename === 'Direct URL' || filename === 'Link' || filename === 'PDF') {
    // Extract from URL
    const urlParts = url.split('/');
    filename = urlParts[urlParts.length - 1] || `file_${index}`;
  }
  
  // Remove special characters
  filename = filename
    .replace(/[^\w\s\-\.]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 100); // Limit length
    
  // Ensure it has an extension
  if (!filename.includes('.')) {
    if (url.endsWith('.pdf') || url.includes('/pdf/')) {
      filename += '.pdf';
    } else if (url.includes('doi.org')) {
      filename += '.html';
    } else {
      filename += '.html';
    }
  }
  
  return filename;
}

// Download file with retries
async function downloadFile(url, filepath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${retries}: ${url}`);
      
      // Handle redirects and choose http/https
      const protocol = url.startsWith('https') ? https : http;
      
      return new Promise((resolve, reject) => {
        const file = createWriteStream(filepath);
        
        const request = protocol.get(url, { 
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Research-Bot/1.0)'
          }
        }, response => {
          // Handle redirects
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location;
            console.log(`    Redirect to: ${redirectUrl}`);
            file.close();
            downloadFile(redirectUrl, filepath, retries - attempt + 1)
              .then(resolve)
              .catch(reject);
            return;
          }
          
          if (response.statusCode !== 200) {
            file.close();
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }
          
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            resolve(filepath);
          });
        });
        
        request.on('error', err => {
          file.close();
          reject(err);
        });
        
        request.setTimeout(30000, () => {
          request.destroy();
          reject(new Error('Timeout'));
        });
      });
      
    } catch (error) {
      console.log(`    Error: ${error.message}`);
      if (attempt === retries) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// Process URLs by type
async function processUrls() {
  console.log(`\n🚀 Starting download of ${urlData.urls.length} URLs...\n`);
  
  for (let i = 0; i < urlData.urls.length; i++) {
    const item = urlData.urls[i];
    const { url, text, type, source } = item;
    
    console.log(`\n[${i + 1}/${urlData.urls.length}] Processing: ${type.toUpperCase()}`);
    console.log(`  Text: ${text.substring(0, 80)}...`);
    
    // Skip certain types for now
    if (url.includes('#:~:text=')) {
      console.log(`  ⚠️  Skipping: URL with text fragment`);
      results.skipped.push({ ...item, reason: 'Text fragment URL' });
      continue;
    }
    
    // Determine output directory and filename
    const outputDir = join(__dirname, 'sources', type);
    const filename = sanitizeFilename(text, url, i);
    const filepath = join(outputDir, filename);
    
    // Skip if already downloaded
    if (existsSync(filepath)) {
      console.log(`  ✓ Already exists: ${filename}`);
      results.skipped.push({ ...item, reason: 'Already downloaded', filepath });
      continue;
    }
    
    try {
      // Special handling for different types
      if (type === 'doi') {
        // For DOIs, we'll need to resolve them first
        console.log(`  ℹ️  DOI link - would need resolution`);
        results.skipped.push({ ...item, reason: 'DOI resolution needed' });
        continue;
      }
      
      if (type === 'pdf' || url.endsWith('.pdf')) {
        // Direct PDF download
        await downloadFile(url, filepath);
        console.log(`  ✅ Downloaded PDF: ${filename}`);
        results.successful.push({ ...item, filepath, filename });
      } else if (type === 'official' || type === 'article') {
        // For now, save the URL for later web scraping
        const metaFile = filepath.replace('.html', '.json');
        writeFileSync(metaFile, JSON.stringify({ url, text, source, type }, null, 2));
        console.log(`  📝 Saved metadata for web scraping: ${basename(metaFile)}`);
        results.successful.push({ ...item, filepath: metaFile, filename, needsScraping: true });
      } else {
        // Academic and other types - attempt download
        try {
          await downloadFile(url, filepath);
          console.log(`  ✅ Downloaded: ${filename}`);
          results.successful.push({ ...item, filepath, filename });
        } catch (error) {
          console.log(`  ⚠️  Saved for later processing`);
          const metaFile = filepath.replace('.html', '.json');
          writeFileSync(metaFile, JSON.stringify({ url, text, source, type, error: error.message }, null, 2));
          results.skipped.push({ ...item, reason: 'Needs alternative method' });
        }
      }
      
    } catch (error) {
      console.error(`  ❌ Failed: ${error.message}`);
      results.failed.push({ ...item, error: error.message });
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save results
  const resultsPath = join(__dirname, 'sources', 'download-results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Generate summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Download Summary:`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`⚠️  Skipped: ${results.skipped.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\nResults saved to: ${resultsPath}`);
  
  // List PDFs successfully downloaded
  const pdfs = results.successful.filter(r => r.filepath && r.filepath.endsWith('.pdf'));
  if (pdfs.length > 0) {
    console.log(`\n📄 PDFs Downloaded (${pdfs.length}):`);
    pdfs.forEach(pdf => {
      console.log(`  - ${pdf.filename}`);
    });
  }
  
  // List items needing web scraping
  const needsScraping = results.successful.filter(r => r.needsScraping);
  if (needsScraping.length > 0) {
    console.log(`\n🌐 Items prepared for web scraping (${needsScraping.length}):`);
    console.log(`  Run web-scraper.js to fetch full content`);
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ Failed Downloads:`);
    results.failed.forEach(item => {
      console.log(`  - ${item.text.substring(0, 50)}...`);
      console.log(`    URL: ${item.url}`);
      console.log(`    Error: ${item.error}`);
    });
  }
}

// Run the download process
processUrls().catch(console.error);