#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read markdown files
const files = [
  'BBNJ-references.md',
  'CHM-references.md',
  'BBNJ-CHM-narrative.md'
];

const urls = new Map(); // Use Map to track URL source and metadata

// Regex patterns for different URL formats
const patterns = {
  // Standard markdown links: [text](url)
  markdownLink: /\[([^\]]+)\]\(([^)]+)\)/g,
  // Direct URLs starting with http/https
  directUrl: /https?:\/\/[^\s\)]+/g,
  // DOI links
  doi: /doi\.org\/[^\s\)]+/g
};

// Process each file
files.forEach(filename => {
  try {
    const filepath = join(__dirname, filename);
    const content = readFileSync(filepath, 'utf-8');
    
    // Extract markdown links
    let match;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    while ((match = linkRegex.exec(content)) !== null) {
      const [fullMatch, linkText, url] = match;
      if (url.startsWith('http') || url.includes('doi.org')) {
        if (!urls.has(url)) {
          urls.set(url, {
            url: url,
            text: linkText,
            source: filename,
            type: categorizeUrl(url)
          });
        }
      }
    }
    
    // Also extract standalone URLs that might not be in markdown format
    const standaloneRegex = /https?:\/\/[^\s\)\]]+/g;
    while ((match = standaloneRegex.exec(content)) !== null) {
      const url = match[0];
      if (!urls.has(url)) {
        urls.set(url, {
          url: url,
          text: 'Direct URL',
          source: filename,
          type: categorizeUrl(url)
        });
      }
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
});

// Categorize URL by type
function categorizeUrl(url) {
  if (url.endsWith('.pdf') || url.includes('/pdf/')) {
    return 'pdf';
  } else if (url.includes('doi.org')) {
    return 'doi';
  } else if (url.includes('ssrn.com')) {
    return 'ssrn';
  } else if (url.includes('frontiersin.org') || url.includes('springer.com') || 
             url.includes('researchgate.net')) {
    return 'academic';
  } else if (url.includes('.gov') || url.includes('.int') || url.includes('un.org') || 
             url.includes('iisd.org')) {
    return 'official';
  } else {
    return 'article';
  }
}

// Convert to array and sort by type
const urlArray = Array.from(urls.values()).sort((a, b) => {
  // Sort by type, then by URL
  if (a.type !== b.type) return a.type.localeCompare(b.type);
  return a.url.localeCompare(b.url);
});

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  totalUrls: urlArray.length,
  byType: {},
  bySource: {},
  urls: urlArray
};

// Count by type
urlArray.forEach(item => {
  report.byType[item.type] = (report.byType[item.type] || 0) + 1;
  report.bySource[item.source] = (report.bySource[item.source] || 0) + 1;
});

// Create output directory
const outputDir = join(__dirname, 'sources');
mkdirSync(outputDir, { recursive: true });

// Save JSON report
const jsonPath = join(outputDir, 'urls-extracted.json');
writeFileSync(jsonPath, JSON.stringify(report, null, 2));

// Generate markdown report
let markdown = `# Extracted URLs Report\n\n`;
markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
markdown += `## Summary\n\n`;
markdown += `- **Total URLs**: ${report.totalUrls}\n\n`;
markdown += `### By Type:\n`;
Object.entries(report.byType).forEach(([type, count]) => {
  markdown += `- ${type}: ${count}\n`;
});
markdown += `\n### By Source:\n`;
Object.entries(report.bySource).forEach(([source, count]) => {
  markdown += `- ${source}: ${count}\n`;
});
markdown += `\n## URLs by Category\n\n`;

// Group URLs by type for markdown
const byType = {};
urlArray.forEach(item => {
  if (!byType[item.type]) byType[item.type] = [];
  byType[item.type].push(item);
});

Object.entries(byType).forEach(([type, items]) => {
  markdown += `### ${type.toUpperCase()} (${items.length})\n\n`;
  items.forEach((item, i) => {
    markdown += `${i + 1}. [${item.text}](${item.url})\n`;
    markdown += `   - Source: ${item.source}\n\n`;
  });
});

// Save markdown report
const mdPath = join(outputDir, 'urls-report.md');
writeFileSync(mdPath, markdown);

// Generate download script
let downloadScript = `#!/bin/bash
# Download script for extracted URLs
# Generated: ${new Date().toISOString()}

set -e

# Create directories
mkdir -p sources/pdfs
mkdir -p sources/articles
mkdir -p sources/academic
mkdir -p sources/official

# Download function with error handling
download_file() {
  local url="$1"
  local output="$2"
  local type="$3"
  
  echo "Downloading: $url"
  if curl -L -o "$output" "$url" --fail --silent --show-error; then
    echo "  ✓ Success: $output"
  else
    echo "  ✗ Failed: $url" >> sources/download-errors.log
  fi
}

echo "Starting downloads..."
echo "Errors will be logged to sources/download-errors.log"
echo "" > sources/download-errors.log

`;

// Add download commands for PDFs
const pdfs = urlArray.filter(u => u.type === 'pdf');
pdfs.forEach((item, i) => {
  const filename = `pdf_${i + 1}.pdf`;
  downloadScript += `download_file "${item.url}" "sources/pdfs/${filename}" "pdf"\n`;
});

// Save download script
const scriptPath = join(outputDir, 'download.sh');
writeFileSync(scriptPath, downloadScript);

console.log(`\n✅ URL Extraction Complete!\n`);
console.log(`📊 Summary:`);
console.log(`   - Total URLs found: ${report.totalUrls}`);
console.log(`   - PDFs: ${report.byType.pdf || 0}`);
console.log(`   - DOIs: ${report.byType.doi || 0}`);
console.log(`   - Academic: ${report.byType.academic || 0}`);
console.log(`   - Official: ${report.byType.official || 0}`);
console.log(`   - Articles: ${report.byType.article || 0}`);
console.log(`\n📁 Files created:`);
console.log(`   - ${jsonPath}`);
console.log(`   - ${mdPath}`);
console.log(`   - ${scriptPath}`);
console.log(`\nNext steps:`);
console.log(`1. Review the extracted URLs in: ${mdPath}`);
console.log(`2. Run the download script: bash ${scriptPath}`);