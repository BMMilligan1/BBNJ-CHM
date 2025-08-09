#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load all URLs
const urlsData = JSON.parse(readFileSync(join(__dirname, 'sources', 'urls-extracted.json'), 'utf-8'));

// Results tracking
const results = {
  successful: [],
  failed: [],
  skipped: [],
  timestamp: new Date().toISOString()
};

// Create necessary directories
const dirs = ['pdf', 'article', 'academic', 'official', 'doi', 'ssrn', 'content'];
dirs.forEach(dir => {
  mkdirSync(join(__dirname, 'sources', dir), { recursive: true });
});

// Clean filename
function cleanFilename(url, index) {
  // Extract meaningful part from URL
  let filename = url.split('/').pop() || `file_${index}`;
  
  // Remove query parameters
  filename = filename.split('?')[0];
  filename = filename.split('#')[0];
  
  // Clean special characters
  filename = filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/__+/g, '_')
    .substring(0, 100);
  
  // Add extension if missing
  if (!filename.includes('.')) {
    if (url.includes('.pdf') || url.includes('/pdf/')) {
      filename += '.pdf';
    } else {
      filename += '.html';
    }
  }
  
  return filename;
}

// Download with aggressive retry and follow redirects
async function downloadUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) {
      reject(new Error('Too many redirects'));
      return;
    }
    
    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      },
      timeout: 30000
    };
    
    const request = protocol.get(url, options, response => {
      // Handle redirects
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          // Handle relative redirects
          const newUrl = redirectUrl.startsWith('http') 
            ? redirectUrl 
            : new URL(redirectUrl, url).toString();
          console.log(`    → Redirect to: ${newUrl.substring(0, 60)}...`);
          downloadUrl(newUrl, maxRedirects - 1).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode === 200) {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          resolve({
            data: Buffer.concat(chunks),
            contentType: response.headers['content-type'],
            finalUrl: url
          });
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });
    
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// HTML to Markdown conversion
function htmlToMarkdown(html, url) {
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Document';
  
  // Extract body content
  let content = html;
  
  // Try different content selectors
  const selectors = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i
  ];
  
  for (const regex of selectors) {
    const match = html.match(regex);
    if (match) {
      content = match[1];
      break;
    }
  }
  
  // Clean and convert
  let markdown = `# ${title}\n\nSource: ${url}\n\n---\n\n`;
  
  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<p[^>]*>/gi, '\n\n')
    .replace(/<\/p>/gi, '')
    .replace(/<br[^>]*>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<a[^>]+href="([^"]*)"[^>]*>([^<]+)<\/a>/gi, '[$2]($1)')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  markdown += content;
  return markdown;
}

// Process all URLs
async function downloadAll() {
  console.log(`\n🚀 Starting comprehensive download of ${urlsData.urls.length} URLs...\n`);
  
  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;
  
  for (let i = 0; i < urlsData.urls.length; i++) {
    const item = urlsData.urls[i];
    const { url, text, type, source } = item;
    
    // Skip URLs with text fragments
    if (url.includes('#:~:text=')) {
      skipCount++;
      results.skipped.push({ ...item, reason: 'Text fragment URL' });
      continue;
    }
    
    // Progress indicator
    if (i % 10 === 0) {
      console.log(`\n[${i}/${urlsData.urls.length}] Progress: ✅ ${successCount} | ❌ ${failCount} | ⏭️ ${skipCount}`);
    }
    
    // Generate filename
    const filename = cleanFilename(url, i);
    const dir = type === 'pdf' ? 'pdf' : type === 'doi' ? 'doi' : type === 'ssrn' ? 'ssrn' : type;
    const filepath = join(__dirname, 'sources', dir, filename);
    
    // Skip if already exists
    if (existsSync(filepath) || existsSync(filepath.replace('.html', '.md'))) {
      console.log(`  ✓ ${filename}`);
      skipCount++;
      results.skipped.push({ ...item, reason: 'Already exists' });
      continue;
    }
    
    console.log(`  ⬇ [${type}] ${url.substring(0, 50)}...`);
    
    try {
      // Attempt download
      const result = await downloadUrl(url);
      
      // Check content type
      const contentType = result.contentType || '';
      const isPdf = contentType.includes('pdf') || url.includes('.pdf');
      const isHtml = contentType.includes('html') || contentType.includes('text');
      
      if (isPdf) {
        // Save PDF
        const pdfPath = filepath.endsWith('.pdf') ? filepath : filepath.replace(/\.[^.]+$/, '.pdf');
        writeFileSync(pdfPath, result.data);
        console.log(`    ✅ PDF saved: ${basename(pdfPath)}`);
        successCount++;
        results.successful.push({ ...item, filepath: pdfPath });
      } else if (isHtml) {
        // Convert to markdown and save
        const markdown = htmlToMarkdown(result.data.toString(), url);
        const mdPath = filepath.replace(/\.[^.]+$/, '.md');
        writeFileSync(mdPath, markdown);
        console.log(`    ✅ HTML→MD: ${basename(mdPath)}`);
        successCount++;
        results.successful.push({ ...item, filepath: mdPath });
      } else {
        // Save raw content
        writeFileSync(filepath, result.data);
        console.log(`    ✅ Saved: ${basename(filepath)}`);
        successCount++;
        results.successful.push({ ...item, filepath });
      }
      
    } catch (error) {
      console.log(`    ❌ Failed: ${error.message}`);
      failCount++;
      results.failed.push({ ...item, error: error.message });
      
      // Save metadata for retry
      const metaPath = filepath.replace(/\.[^.]+$/, '.json');
      writeFileSync(metaPath, JSON.stringify({ url, text, type, source, error: error.message }, null, 2));
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Save results
  const resultsPath = join(__dirname, 'sources', 'download-all-results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Generate summary report
  let report = `# Comprehensive Download Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- **Total URLs**: ${urlsData.urls.length}\n`;
  report += `- **✅ Successful**: ${successCount}\n`;
  report += `- **❌ Failed**: ${failCount}\n`;
  report += `- **⏭️ Skipped**: ${skipCount}\n`;
  report += `- **Success Rate**: ${Math.round(successCount / (successCount + failCount) * 100)}%\n\n`;
  
  if (results.successful.length > 0) {
    report += `## Successfully Downloaded (Latest)\n\n`;
    results.successful.slice(-20).forEach(item => {
      report += `- ${basename(item.filepath)}\n`;
    });
    if (results.successful.length > 20) {
      report += `\n...and ${results.successful.length - 20} more\n`;
    }
  }
  
  if (results.failed.length > 0) {
    report += `\n## Failed Downloads\n\n`;
    const failureReasons = {};
    results.failed.forEach(item => {
      const reason = item.error;
      failureReasons[reason] = (failureReasons[reason] || 0) + 1;
    });
    
    Object.entries(failureReasons).forEach(([reason, count]) => {
      report += `- ${reason}: ${count}\n`;
    });
    
    report += `\n### Sample Failed URLs\n\n`;
    results.failed.slice(0, 10).forEach(item => {
      report += `- ${item.url.substring(0, 60)}...\n`;
      report += `  Error: ${item.error}\n`;
    });
  }
  
  const reportPath = join(__dirname, 'sources', 'DOWNLOAD-REPORT.md');
  writeFileSync(reportPath, report);
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 FINAL DOWNLOAD SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`⏭️ Skipped: ${skipCount}`);
  console.log(`📈 Success Rate: ${Math.round(successCount / (successCount + failCount) * 100)}%`);
  console.log(`\n📁 Results saved to:`);
  console.log(`   - ${resultsPath}`);
  console.log(`   - ${reportPath}`);
}

// Run the comprehensive download
downloadAll().catch(console.error);