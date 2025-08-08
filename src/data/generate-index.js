#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get all downloaded files
function scanDirectory(dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...scanDirectory(fullPath));
    } else if (stat.isFile()) {
      const ext = extname(item);
      if (['.pdf', '.md', '.html', '.txt'].includes(ext)) {
        files.push({
          path: fullPath,
          name: item,
          type: ext.substring(1),
          size: stat.size,
          modified: stat.mtime
        });
      }
    }
  }
  
  return files;
}

// Generate the index
function generateIndex() {
  const sourcesDir = join(__dirname, 'sources');
  const files = scanDirectory(sourcesDir);
  
  // Load original URLs data
  const urlsData = JSON.parse(readFileSync(join(sourcesDir, 'urls-extracted.json'), 'utf-8'));
  
  // Categorize files
  const byType = {
    pdf: [],
    md: [],
    html: [],
    other: []
  };
  
  files.forEach(file => {
    const category = byType[file.type] || byType.other;
    category.push(file);
  });
  
  // Generate markdown index
  let markdown = `# Downloaded Research Sources Index\n\n`;
  markdown += `Generated: ${new Date().toLocaleString()}\n\n`;
  markdown += `## Summary Statistics\n\n`;
  markdown += `- **Total URLs extracted**: ${urlsData.totalUrls}\n`;
  markdown += `- **Total files downloaded**: ${files.length}\n`;
  markdown += `- **PDFs**: ${byType.pdf.length}\n`;
  markdown += `- **Markdown/HTML**: ${byType.md.length + byType.html.length}\n`;
  markdown += `- **Total size**: ${Math.round(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024)}MB\n\n`;
  
  // PDFs section
  if (byType.pdf.length > 0) {
    markdown += `## PDF Documents (${byType.pdf.length})\n\n`;
    byType.pdf.sort((a, b) => b.size - a.size).forEach(file => {
      markdown += `### ${file.name}\n`;
      markdown += `- Path: \`${file.path.replace(__dirname, '.')}\`\n`;
      markdown += `- Size: ${Math.round(file.size / 1024)}KB\n`;
      markdown += `- Modified: ${file.modified.toLocaleDateString()}\n\n`;
    });
  }
  
  // Markdown files section
  if (byType.md.length > 0) {
    markdown += `## Scraped Web Content (${byType.md.length})\n\n`;
    byType.md.forEach(file => {
      markdown += `### ${file.name}\n`;
      markdown += `- Path: \`${file.path.replace(__dirname, '.')}\`\n`;
      markdown += `- Size: ${Math.round(file.size / 1024)}KB\n\n`;
    });
  }
  
  // Categories from original data
  markdown += `## Original URL Categories\n\n`;
  Object.entries(urlsData.byType).forEach(([type, count]) => {
    markdown += `- **${type}**: ${count} URLs\n`;
  });
  
  // Next steps
  markdown += `\n## Next Steps\n\n`;
  markdown += `1. **PDF Conversion**: Convert PDFs to markdown for better integration\n`;
  markdown += `2. **DOI Resolution**: Resolve academic DOIs to full papers\n`;
  markdown += `3. **Quality Check**: Review scraped content for completeness\n`;
  markdown += `4. **Integration**: Use downloaded content as context for writing\n\n`;
  
  // How to use
  markdown += `## How to Use These Sources\n\n`;
  markdown += `The downloaded sources are organized by type in the \`sources/\` directory:\n\n`;
  markdown += `- \`sources/pdf/\` - Downloaded PDF documents\n`;
  markdown += `- \`sources/article/\` - Scraped web articles (markdown format)\n`;
  markdown += `- \`sources/academic/\` - Academic papers and resources\n`;
  markdown += `- \`sources/official/\` - Official UN and government documents\n\n`;
  markdown += `You can now reference these local files when writing your research, `;
  markdown += `ensuring all source material is available for context without requiring `;
  markdown += `internet access during the writing phase.\n`;
  
  // Save the index
  const indexPath = join(sourcesDir, 'INDEX.md');
  writeFileSync(indexPath, markdown);
  
  // Also create a JSON index for programmatic access
  const jsonIndex = {
    generated: new Date().toISOString(),
    statistics: {
      totalUrls: urlsData.totalUrls,
      filesDownloaded: files.length,
      pdfs: byType.pdf.length,
      webContent: byType.md.length + byType.html.length,
      totalSizeMB: Math.round(files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024)
    },
    files: files.map(f => ({
      ...f,
      path: f.path.replace(__dirname, '.')
    })),
    categories: urlsData.byType
  };
  
  const jsonPath = join(sourcesDir, 'index.json');
  writeFileSync(jsonPath, JSON.stringify(jsonIndex, null, 2));
  
  console.log(`\n✅ Index Generation Complete!\n`);
  console.log(`📊 Summary:`);
  console.log(`   - Total files indexed: ${files.length}`);
  console.log(`   - PDFs: ${byType.pdf.length}`);
  console.log(`   - Web content: ${byType.md.length + byType.html.length}`);
  console.log(`   - Total size: ${jsonIndex.statistics.totalSizeMB}MB`);
  console.log(`\n📁 Index files created:`);
  console.log(`   - ${indexPath}`);
  console.log(`   - ${jsonPath}`);
  console.log(`\n📖 View the index at: sources/INDEX.md`);
}

// Run the index generation
generateIndex();