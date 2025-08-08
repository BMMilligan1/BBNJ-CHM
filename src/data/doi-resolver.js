#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load URLs data
const urlsData = JSON.parse(readFileSync(join(__dirname, 'sources', 'urls-extracted.json'), 'utf-8'));

// Filter DOI URLs
const doiUrls = urlsData.urls.filter(item => 
  item.url.includes('doi.org') || 
  item.url.includes('10.') ||
  item.type === 'doi'
);

console.log(`\n📚 Found ${doiUrls.length} DOI URLs to resolve\n`);

// Resolve DOI through multiple methods
async function resolveDoi(doi) {
  // Extract clean DOI
  let cleanDoi = doi;
  if (doi.includes('doi.org/')) {
    cleanDoi = doi.split('doi.org/')[1];
  } else if (doi.match(/10\.\d{4,}/)) {
    cleanDoi = doi.match(/(10\.\d{4,}[^\s\)]*)/)[1];
  }
  
  // Try different resolution methods
  const methods = [
    {
      name: 'Unpaywall',
      url: `https://api.unpaywall.org/v2/${cleanDoi}?email=research@example.com`,
      extract: (data) => {
        const json = JSON.parse(data);
        if (json.is_oa && json.best_oa_location) {
          return json.best_oa_location.url_for_pdf || json.best_oa_location.url;
        }
        return null;
      }
    },
    {
      name: 'DOI.org',
      url: `https://doi.org/${cleanDoi}`,
      extract: (data) => {
        // This will return HTML, we can save it
        return `https://doi.org/${cleanDoi}`;
      }
    },
    {
      name: 'CrossRef',
      url: `https://api.crossref.org/works/${cleanDoi}`,
      extract: (data) => {
        const json = JSON.parse(data);
        if (json.message && json.message.link) {
          const links = json.message.link;
          for (const link of links) {
            if (link['content-type'] === 'application/pdf') {
              return link.URL;
            }
          }
        }
        return json.message?.URL || null;
      }
    }
  ];
  
  for (const method of methods) {
    try {
      console.log(`  Trying ${method.name}...`);
      const data = await fetchUrl(method.url);
      const result = method.extract(data);
      if (result) {
        console.log(`    ✓ Found: ${result.substring(0, 60)}...`);
        return result;
      }
    } catch (error) {
      console.log(`    ✗ ${method.name} failed: ${error.message}`);
    }
  }
  
  return null;
}

// Fetch URL helper
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Academic-Research-Bot/1.0 (research@example.com)'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Process all DOIs
async function processAllDois() {
  const results = {
    resolved: [],
    failed: [],
    timestamp: new Date().toISOString()
  };
  
  for (const item of doiUrls) {
    console.log(`\n🔍 Processing: ${item.text.substring(0, 50)}...`);
    console.log(`   DOI: ${item.url}`);
    
    try {
      const resolvedUrl = await resolveDoi(item.url);
      
      if (resolvedUrl) {
        // Save metadata
        const metadata = {
          ...item,
          resolvedUrl,
          resolvedAt: new Date().toISOString()
        };
        
        const filename = item.url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50) + '.json';
        const filepath = join(__dirname, 'sources', 'doi', filename);
        writeFileSync(filepath, JSON.stringify(metadata, null, 2));
        
        console.log(`   ✅ Resolved and saved metadata`);
        results.resolved.push(metadata);
      } else {
        console.log(`   ❌ Could not resolve`);
        results.failed.push(item);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.failed.push({ ...item, error: error.message });
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save results
  const resultsPath = join(__dirname, 'sources', 'doi-resolution-results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 DOI Resolution Summary:`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Resolved: ${results.resolved.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\nResults saved to: ${resultsPath}`);
  
  if (results.resolved.length > 0) {
    console.log(`\n📚 Resolved DOIs:`);
    results.resolved.forEach(item => {
      console.log(`  - ${item.text.substring(0, 50)}...`);
      if (item.resolvedUrl) {
        console.log(`    → ${item.resolvedUrl.substring(0, 60)}...`);
      }
    });
  }
}

// Run DOI resolution
processAllDois().catch(console.error);