#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to fetch webpage content
async function fetchWebpage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    let data = '';
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }, response => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
        const redirectUrl = response.headers.location;
        console.log(`    Following redirect to: ${redirectUrl}`);
        fetchWebpage(redirectUrl).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.on('data', chunk => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    });
    
    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Simple HTML to Markdown converter
function htmlToMarkdown(html, url) {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  
  // Extract main content (try different selectors)
  let content = html;
  
  // Try to find article content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    content = articleMatch[1];
  } else {
    // Try main tag
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      content = mainMatch[1];
    } else {
      // Try to extract body content
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        content = bodyMatch[1];
      }
    }
  }
  
  // Clean up HTML
  let markdown = `# ${title}\n\n`;
  markdown += `Source: ${url}\n\n`;
  markdown += `Downloaded: ${new Date().toISOString()}\n\n---\n\n`;
  
  // Convert common HTML elements to markdown
  content = content
    // Remove scripts and styles
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // Headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    // Paragraphs
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    // Lists
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    // Links
    .replace(/<a[^>]+href="([^"]*)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
    // Bold and italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Breaks
    .replace(/<br[^>]*>/gi, '\n')
    .replace(/<hr[^>]*>/gi, '\n---\n')
    // Remove remaining tags
    .replace(/<[^>]+>/g, '')
    // Clean up entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  markdown += content;
  
  return markdown;
}

// Process metadata files
async function processMetadataFiles() {
  const dirs = ['article', 'official', 'academic'];
  const results = {
    successful: [],
    failed: [],
    timestamp: new Date().toISOString()
  };
  
  console.log('🌐 Starting web scraping...\n');
  
  for (const dir of dirs) {
    const dirPath = join(__dirname, 'sources', dir);
    if (!existsSync(dirPath)) continue;
    
    const files = readdirSync(dirPath).filter(f => f.endsWith('.json'));
    console.log(`\n📁 Processing ${files.length} files in ${dir}/`);
    
    for (const file of files) {
      const metaPath = join(dirPath, file);
      const metadata = JSON.parse(readFileSync(metaPath, 'utf-8'));
      
      if (!metadata.url) continue;
      
      console.log(`\n  🔍 ${file}`);
      console.log(`     URL: ${metadata.url.substring(0, 60)}...`);
      
      try {
        // Skip if already processed
        const mdFile = file.replace('.json', '.md');
        const mdPath = join(dirPath, mdFile);
        
        if (existsSync(mdPath)) {
          console.log(`     ✓ Already scraped`);
          continue;
        }
        
        // Fetch webpage
        console.log(`     ⬇️  Fetching...`);
        const html = await fetchWebpage(metadata.url);
        
        // Convert to markdown
        const markdown = htmlToMarkdown(html, metadata.url);
        
        // Save markdown
        writeFileSync(mdPath, markdown);
        console.log(`     ✅ Saved: ${mdFile}`);
        
        results.successful.push({
          file: mdFile,
          url: metadata.url,
          size: markdown.length
        });
        
      } catch (error) {
        console.log(`     ❌ Failed: ${error.message}`);
        results.failed.push({
          file: file,
          url: metadata.url,
          error: error.message
        });
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Save results
  const resultsPath = join(__dirname, 'sources', 'scraping-results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 Web Scraping Summary:`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`\nResults saved to: ${resultsPath}`);
  
  if (results.successful.length > 0) {
    console.log(`\n📄 Successfully scraped:`);
    results.successful.slice(0, 10).forEach(item => {
      console.log(`  - ${item.file} (${Math.round(item.size/1024)}KB)`);
    });
    if (results.successful.length > 10) {
      console.log(`  ... and ${results.successful.length - 10} more`);
    }
  }
}

// Run the scraper
processMetadataFiles().catch(console.error);