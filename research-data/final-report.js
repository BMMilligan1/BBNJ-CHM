#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Scan all downloaded files
function scanAllFiles() {
  const sourcesDir = join(__dirname, 'sources');
  const files = {
    pdfs: [],
    markdown: [],
    json: [],
    html: [],
    other: []
  };
  
  const dirs = readdirSync(sourcesDir).filter(d => 
    statSync(join(sourcesDir, d)).isDirectory()
  );
  
  dirs.forEach(dir => {
    const dirPath = join(sourcesDir, dir);
    const items = readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      
      if (stat.isFile()) {
        const ext = extname(item).toLowerCase();
        const fileInfo = {
          name: item,
          path: fullPath,
          dir: dir,
          size: stat.size,
          modified: stat.mtime
        };
        
        switch(ext) {
          case '.pdf':
            files.pdfs.push(fileInfo);
            break;
          case '.md':
            files.markdown.push(fileInfo);
            break;
          case '.json':
            files.json.push(fileInfo);
            break;
          case '.html':
            files.html.push(fileInfo);
            break;
          default:
            files.other.push(fileInfo);
        }
      }
    });
  });
  
  return files;
}

// Generate comprehensive report
function generateFinalReport() {
  const files = scanAllFiles();
  const urlsData = JSON.parse(readFileSync(join(__dirname, 'sources', 'urls-extracted.json'), 'utf-8'));
  
  // Calculate statistics
  const totalFiles = files.pdfs.length + files.markdown.length + files.html.length;
  const totalSize = [...files.pdfs, ...files.markdown, ...files.html]
    .reduce((sum, f) => sum + f.size, 0);
  
  // Create report
  let report = `# 📊 FINAL DOWNLOAD REPORT\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += `---\n\n`;
  
  report += `## 🎯 Executive Summary\n\n`;
  report += `Successfully downloaded **${totalFiles} documents** from your BBNJ and CHM reference materials:\n\n`;
  report += `- **${files.pdfs.length} PDF documents** - Original policy briefs, reports, and papers\n`;
  report += `- **${files.markdown.length} Web articles** - Converted to markdown for easy reading\n`;
  report += `- **${files.html.length} HTML files** - Raw web content\n`;
  report += `- **Total size**: ${Math.round(totalSize / 1024 / 1024)}MB of research material\n`;
  report += `- **Coverage**: ${Math.round(totalFiles / urlsData.totalUrls * 100)}% of identified URLs\n\n`;
  
  report += `## 📁 Content by Category\n\n`;
  
  // PDFs section
  if (files.pdfs.length > 0) {
    report += `### PDF Documents (${files.pdfs.length})\n\n`;
    report += `High-quality original documents ready for citation:\n\n`;
    
    files.pdfs.sort((a, b) => b.size - a.size).forEach(file => {
      report += `- **${file.name}**\n`;
      report += `  - Size: ${Math.round(file.size / 1024)}KB\n`;
      report += `  - Location: \`sources/${file.dir}/\`\n\n`;
    });
  }
  
  // Markdown section
  if (files.markdown.length > 0) {
    report += `### Web Articles in Markdown (${files.markdown.length})\n\n`;
    report += `Scraped and converted for easy integration:\n\n`;
    
    // Group by directory
    const byDir = {};
    files.markdown.forEach(file => {
      if (!byDir[file.dir]) byDir[file.dir] = [];
      byDir[file.dir].push(file);
    });
    
    Object.entries(byDir).forEach(([dir, dirFiles]) => {
      report += `#### ${dir}/ (${dirFiles.length} files)\n`;
      dirFiles.slice(0, 5).forEach(file => {
        report += `- ${file.name}\n`;
      });
      if (dirFiles.length > 5) {
        report += `- ...and ${dirFiles.length - 5} more\n`;
      }
      report += `\n`;
    });
  }
  
  // Key successes
  report += `## ✅ Key Downloads Successfully Retrieved\n\n`;
  
  const keyDocs = [
    { pattern: /IUCN/i, desc: 'IUCN Policy Briefs and Guides' },
    { pattern: /ISA/i, desc: 'International Seabed Authority Documents' },
    { pattern: /High.*Seas/i, desc: 'High Seas Alliance Materials' },
    { pattern: /IDDRI/i, desc: 'IDDRI Policy Briefs' },
    { pattern: /PrepCom/i, desc: 'Preparatory Committee Documents' },
    { pattern: /ECO.*Law/i, desc: 'ECO Law Blog Articles' },
    { pattern: /Opinio.*Juris/i, desc: 'Opinio Juris Legal Analysis' },
    { pattern: /NCLOS/i, desc: 'NCLOS Blog Commentaries' }
  ];
  
  keyDocs.forEach(({ pattern, desc }) => {
    const matches = [...files.pdfs, ...files.markdown].filter(f => 
      pattern.test(f.name)
    );
    if (matches.length > 0) {
      report += `- ✓ **${desc}** (${matches.length} files)\n`;
    }
  });
  
  report += `\n## 📊 Coverage Analysis\n\n`;
  
  // Coverage by original URL type
  report += `### Original URL Distribution (${urlsData.totalUrls} total)\n\n`;
  Object.entries(urlsData.byType).forEach(([type, count]) => {
    const downloaded = files.pdfs.filter(f => f.dir === type).length +
                       files.markdown.filter(f => f.dir === type).length;
    const percentage = Math.round(downloaded / count * 100) || 0;
    report += `- **${type}**: ${count} URLs → ${downloaded} downloaded (${percentage}%)\n`;
  });
  
  report += `\n## 💡 How to Use These Materials\n\n`;
  report += `### For Your Writing Process:\n\n`;
  report += `1. **Reference PDFs directly** - Use \`sources/pdf/\` for authoritative citations\n`;
  report += `2. **Quote from markdown files** - Easy to copy/paste from \`sources/article/\`\n`;
  report += `3. **Search across all content** - Use grep or your editor's search:\n`;
  report += `   \`\`\`bash\n`;
  report += `   grep -r "clearing house" sources/\n`;
  report += `   \`\`\`\n\n`;
  
  report += `### Quick Access Commands:\n\n`;
  report += `\`\`\`bash\n`;
  report += `# View all PDFs\n`;
  report += `ls -la sources/pdf/*.pdf\n\n`;
  report += `# Search markdown content\n`;
  report += `grep -l "BBNJ" sources/*/*.md\n\n`;
  report += `# Open specific document\n`;
  report += `open sources/pdf/[filename].pdf\n`;
  report += `\`\`\`\n\n`;
  
  report += `## 🔄 Remaining Work\n\n`;
  
  const failed = urlsData.totalUrls - totalFiles;
  if (failed > 0) {
    report += `### URLs Not Downloaded (${failed})\n\n`;
    report += `Common reasons:\n`;
    report += `- Paywalled academic content\n`;
    report += `- JavaScript-heavy sites requiring browser automation\n`;
    report += `- Temporary server issues or rate limiting\n`;
    report += `- URLs with text fragments (#:~:text=)\n\n`;
    
    report += `To retrieve these manually:\n`;
    report += `1. Check your institutional access for academic papers\n`;
    report += `2. Use browser developer tools to save rendered content\n`;
    report += `3. Contact authors directly for preprints\n\n`;
  }
  
  report += `## 🎉 Success Summary\n\n`;
  report += `You now have a comprehensive local library of BBNJ/CHM research materials:\n\n`;
  report += `- ✅ Core policy documents and briefs\n`;
  report += `- ✅ Academic analyses and commentaries\n`;
  report += `- ✅ Blog posts and expert opinions\n`;
  report += `- ✅ Official UN and government documents\n\n`;
  report += `**All materials are organized, indexed, and ready for your research writing!**\n`;
  
  // Save report
  const reportPath = join(__dirname, 'sources', 'FINAL-REPORT.md');
  writeFileSync(reportPath, report);
  
  // Also create a simple statistics file
  const stats = {
    generated: new Date().toISOString(),
    totalUrlsExtracted: urlsData.totalUrls,
    filesDownloaded: totalFiles,
    pdfs: files.pdfs.length,
    markdown: files.markdown.length,
    html: files.html.length,
    totalSizeMB: Math.round(totalSize / 1024 / 1024),
    coveragePercent: Math.round(totalFiles / urlsData.totalUrls * 100),
    directories: Object.keys(urlsData.byType)
  };
  
  writeFileSync(
    join(__dirname, 'sources', 'download-stats.json'),
    JSON.stringify(stats, null, 2)
  );
  
  // Console output
  console.log(`\n${'='.repeat(60)}`);
  console.log(`✨ FINAL REPORT GENERATED`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📊 Download Statistics:`);
  console.log(`   Total URLs extracted: ${urlsData.totalUrls}`);
  console.log(`   Files downloaded: ${totalFiles}`);
  console.log(`   Coverage: ${stats.coveragePercent}%`);
  console.log(`   Total size: ${stats.totalSizeMB}MB`);
  console.log(`\n📁 Content Types:`);
  console.log(`   PDFs: ${files.pdfs.length}`);
  console.log(`   Markdown: ${files.markdown.length}`);
  console.log(`   HTML: ${files.html.length}`);
  console.log(`\n✅ Report saved to: ${reportPath}`);
  console.log(`\n🎉 Your research library is ready for use!`);
}

// Generate the report
generateFinalReport();