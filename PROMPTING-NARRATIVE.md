# Prompting Narrative: Building a BBNJ-CHM Research System

## Project Overview
This document chronicles the prompting journey to build a comprehensive research and documentation system for the BBNJ Agreement's Clearing-House Mechanism (CHM). The project uses Observable Framework for data visualization and narrative construction.

---

## Session 1: Initial Discovery and Source Download Strategy
*Date: August 8, 2025*

### Opening Context
You began by showing me your `src/data` folder containing three markdown files packed with high-quality source material links for your BBNJ-CHM research project. These files contained:
- `BBNJ-references.md` - Top analyses of the BBNJ Agreement
- `CHM-references.md` - Specific CHM-focused materials  
- `BBNJ-CHM-narrative.md` - A comprehensive narrative document

### The Challenge
You asked: *"Suggest an approach for systematically downloading/scraping as many of these as possible into the data folder so they're available for model context when I proceed to detailed writing."*

### Initial Approach - Planning Mode
I started in planning mode to research your codebase before executing. I:
1. Examined your markdown files to understand the scope (222 unique URLs identified)
2. Analyzed the types of links (PDFs, DOIs, web articles, official documents)
3. Proposed a systematic download approach with proper tooling

### Building the Download Infrastructure

#### Phase 1: URL Extraction
Created `extract-urls.js` to:
- Parse all markdown files for links
- Categorize URLs by type (pdf, doi, academic, official, article)
- Generate comprehensive reports
- **Result**: Found 222 unique URLs across all documents

#### Phase 2: Initial Download Attempts
Built `download-sources.js` with:
- Directory organization by content type
- Basic HTTP/HTTPS download capability
- Metadata tracking for failed downloads
- **Result**: Limited success due to redirects and authentication

#### Phase 3: Comprehensive Downloader
Developed `download-all.js` with:
- Aggressive retry logic
- Redirect following
- HTML-to-markdown conversion
- Better error handling
- **Result**: Downloaded 27 documents successfully

#### Phase 4: Web Scraping
Created `web-scraper.js` to:
- Fetch web articles
- Convert HTML to clean markdown
- Preserve source attribution
- **Result**: Converted 9 web articles to readable markdown

#### Phase 5: DOI Resolution
Built `doi-resolver.js` attempting to:
- Resolve DOIs through Unpaywall API
- Try CrossRef as fallback
- Save metadata for manual retrieval
- **Result**: Limited success due to API restrictions

### Quality Control Discovery

When you reported: *"Many of the downloaded markdown files appear to have binary information in them. Could you check all the sources for usefulness? Some of the PDFs also generate an error message"*

This led to a critical quality assessment phase.

#### Quality Check Implementation
Created `check-quality.js` to:
- Detect binary content in text files
- Validate PDF headers and structure
- Identify empty files
- Assess markdown conversion quality

**Findings**:
- 15 valid files (5 PDFs, 7 markdown, 3 HTML)
- 7 markdown files contained binary data (PDFs saved with wrong extension)
- 3 empty PDF files (0 bytes)
- 1 corrupted PDF

#### Cleanup Operation
Built `cleanup-bad-files.js` to:
- Remove corrupted files
- Delete empty downloads
- Clear binary-contaminated text files
- **Result**: Removed 11 problematic files

### Final Outcomes

#### Successfully Downloaded Materials
**High-Value PDFs**:
- ISA's contribution to BBNJ objectives (6.5MB)
- IUCN BBNJ Treaty Policy Brief
- High Seas Alliance PrepCom CHM Brief
- IOC Report for BBNJ PrepCom

**Quality Web Articles** (as markdown):
- ECO Law Blog - Deep-sea hydrothermal vents analysis
- Inside EU Life Sciences - Industry ABS obligations
- IDDRI Policy Briefs - Implementation guidance
- NCLOS Blog - CITES-BBNJ interface
- Opinio Juris - MGR governance perspectives

### Lessons Learned

1. **URL Extraction Challenges**:
   - Many URLs contained text fragments (#:~:text=) pointing to specific passages
   - These fragments caused download failures

2. **Download Limitations**:
   - Academic paywalls blocked many papers
   - Some sites require JavaScript rendering
   - Rate limiting prevented bulk downloads
   - Server authentication requirements

3. **File Format Issues**:
   - Some servers returned PDFs when HTML was expected
   - Binary content corrupted markdown files
   - Empty files resulted from failed authentication

4. **What Worked Well**:
   - Direct PDF downloads from open repositories
   - Simple HTML-to-markdown conversion for blogs
   - Organized file structure by content type
   - Quality validation before use

### Technical Artifacts Created

```
src/data/
├── extract-urls.js          # URL extraction and categorization
├── download-sources.js      # Initial downloader
├── download-all.js          # Comprehensive downloader
├── web-scraper.js          # HTML to markdown converter
├── doi-resolver.js         # DOI resolution attempts
├── check-quality.js        # File validation
├── cleanup-bad-files.js   # Remove corrupted files
├── generate-index.js       # Create searchable index
├── final-report.js         # Generate summary reports
└── sources/                # Downloaded content
    ├── pdf/               # Valid PDFs
    ├── article/           # Markdown articles
    ├── academic/          # Academic papers
    ├── official/          # Government docs
    └── CLEAN-STATUS.md    # Current status
```

### Current Status
- **15 high-quality documents** ready for research use
- **10MB** of validated content
- **Clean library** with corrupted files removed
- **Organized structure** for easy access

---

## Session 2: Technical Brief Development
*Date: August 8, 2025, continued*

### The Assignment
You presented a new substantive task: prepare a 5000-word technical brief on the relevance of Ocean Accounts/Ocean Accounting to implementation of the BBNJ agreement clearing house mechanism. You also introduced a critical new document - `OA-Guidance.md` explaining the Ocean Accounts framework.

### Strategic Approach - Structure Development

After reviewing both the Ocean Accounts framework and BBNJ-CHM materials, I developed a comprehensive structure that:

1. **Identified Key Synergies** between Ocean Accounts and CHM:
   - Standardized spatial data architecture
   - MGR tracking through flow accounting
   - EIA baseline support
   - ABMT/MPA effectiveness monitoring
   - Capacity-building indicators

2. **Created Balanced Structure** (5000 words):
   - Executive Summary (300)
   - Introduction (500)
   - CHM Requirements (800)
   - Ocean Accounts Framework (800)
   - Synergies Analysis (1200) - core section
   - Implementation Pathway (900)
   - Challenges (700)
   - Recommendations (500)

### Methodology Innovation - Iterative/Recursive Verification

You requested a unique approach: write iteratively but recursively check against sources WITHOUT expanding length. This led to creating a sophisticated methodology:

1. **Phase 1**: Draft sections per structure
2. **Phase 2**: Verify every claim against sources
3. **Phase 3**: Recursive refinement - compress while adding citations

Key principle: NEVER expand, only REPLACE and COMPRESS while improving accuracy.

### Implementation Updates

Updated `CLAUDE.md` with:
- Technical brief writing instructions
- Iterative verification methodology
- Source hierarchy (Primary → Secondary → Supporting → Context)
- Quality control protocol
- Revision rules emphasizing compression

Created `BBNJ-CHM.md` as the manuscript file with:
- Executive Summary positioning OA as essential CHM infrastructure
- Introduction establishing the data challenge
- Detailed CHM requirements analysis
- Progress tracking (currently 1,453 words of 5,000)

### Key Insights Emerging

The brief is revealing that:
1. CHM lacks technical specifications despite being treaty's "digital backbone"
2. Ocean Accounts offers proven architecture aligned with international standards
3. Integration addresses both technical and equity challenges
4. Implementation must be phased but urgent (before COP-1)

### Technical Innovation

The recursive checking approach ensures:
- Higher citation density without length increase
- Accuracy improvement through compression
- Source fidelity while maintaining narrative flow
- Policy relevance with technical rigor

---

## Next Steps
*To be updated as project continues*

1. ✅ Complete remaining sections of technical brief - DONE
2. ✅ Apply recursive verification to written sections - DONE
3. ✅ Ensure balanced OA-CHM integration throughout - DONE
4. ✅ Final quality control and word count optimization - DONE (4,986 words)
5. Generate PDF version for distribution - Ready for user action

---

*Last updated: August 8, 2025, 9:45 PM*