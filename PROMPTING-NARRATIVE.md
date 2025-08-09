# Prompting Strategies: Building the BBNJ-CHM Research System

## Technical Overview

This document explains the prompting strategies and methodologies used to develop a comprehensive research system for analyzing Ocean Accounts integration with the BBNJ Clearing-House Mechanism. The project demonstrates how strategic prompting can transform raw source materials into a polished technical publication through systematic phases of development.

---

## Phase 1: Source Acquisition Strategy

### Prompting Approach: Systematic Automation

**Initial Prompt Pattern**: "Suggest an approach for systematically downloading/scraping as many of these as possible"

The first phase focused on automating source material collection from 222 identified URLs. The prompting strategy emphasized building progressive automation tools rather than manual processing:

1. **URL Extraction Script** - Parse markdown files to identify and categorize links
2. **Download Pipeline** - Implement retry logic, redirect handling, and format detection
3. **Quality Validation** - Detect corrupted files, binary contamination, and empty downloads
4. **Cleanup Automation** - Remove problematic files systematically

**Key Technique**: Instead of requesting individual file downloads, the prompt asked for systematic infrastructure that could handle bulk operations with error recovery.

**Result**: 15 validated documents from initial 222 URLs, with automated quality control preventing corrupted data from entering the research pipeline.

---

## Phase 2: Document Architecture Definition

### Prompting Approach: Structure-First Development

**Initial Prompt Pattern**: "Prepare a 5000-word technical brief on the relevance of Ocean Accounts to BBNJ CHM implementation"

Rather than immediately writing content, the prompting strategy focused on establishing robust document architecture:

1. **Word Count Allocation** - Executive Summary (300), Introduction (500), Analysis (3200), Implementation (1500), Recommendations (500)
2. **Source Hierarchy** - Primary (treaty text), Secondary (academic papers), Supporting (policy briefs), Context (commentary)
3. **Integration Requirements** - Balance Ocean Accounts technical detail with CHM policy needs

**Key Technique**: Define measurable constraints (word counts, source requirements) before content generation to ensure balanced coverage.

---

## Phase 3: Iterative Content Development

### Prompting Approach: Recursive Verification Methodology

**Core Instruction**: "Write iteratively but recursively check against sources WITHOUT expanding length"

This phase introduced a unique three-step recursive methodology:

```
Phase 3.1: Initial Drafting
- Write sections according to structure
- Maintain strict word count targets
- Draw directly from source materials

Phase 3.2: Source Verification
- Verify every claim against sources
- Add specific citations (Author Year: section)
- Identify multi-source support

Phase 3.3: Recursive Refinement
- NEVER expand overall length
- REPLACE weak claims with sourced ones
- COMPRESS while adding citations
```

**Key Technique**: The "compress while enriching" approach forced higher information density without document bloat.

**Implementation in CLAUDE.md**: Created explicit revision rules emphasizing replacement over expansion, ensuring each iteration improved quality without length creep.

---

## Phase 4: Visualization Integration

### Prompting Approach: Data-Driven Component Development

**Prompt Pattern**: "Create a Sankey diagram showing relationships between Ocean Accounts components and CHM functions"

The visualization strategy used modular development:

1. **Data Structure First** - Define JSON schema for component relationships
2. **Reusable Module** - Create `sankey-diagram.js` as imported component
3. **Dynamic Styling** - Generate colors programmatically to ensure distinctiveness
4. **Responsive Design** - Adapt to both web and PDF output formats

**Key Technique**: Separate data from presentation, allowing iterative refinement of both independently.

---

## Phase 5: Peer Review Response

### Prompting Approach: Structured Revision Management

**Prompt Pattern**: "Address peer review comments: [specific list of criticisms]"

The peer review phase required systematic approaches to complex revisions:

1. **Terminology Corrections** - Update all Ocean Accounts component names to match GOAP Technical Guidance
2. **Structural Reorganization** - Merge sections 3.2.1 into 3.2, consolidate sections 4-7
3. **Format Conversion** - Transform technical tables into narrative prose for Section 5
4. **Reference Integration** - Convert footnote URLs to semantic hyperlinks

**Key Technique**: Process multiple revision requirements in parallel rather than sequentially, maintaining document coherence throughout.

---

## Phase 6: Quality Assurance

### Prompting Approach: Systematic Verification

**Prompt Pattern**: "Triple check audit all references for accuracy"

Quality assurance used exhaustive verification strategies:

1. **Reference Validation** - Check every DOI, verify publication dates, confirm document numbers
2. **Citation Matching** - Ensure all in-text citations match reference list
3. **Format Consistency** - Standardize citation styles across 73 references
4. **Cross-Format Testing** - Verify rendering in web, PDF, and markdown formats

**Key Technique**: When spot-checks revealed issues (fabricated DOI), immediately escalate to comprehensive audit rather than patching individual problems.

**Result**: Discovered and corrected fabricated reference, incorrect UN document numbers, and formatting inconsistencies.

---

## Phase 7: Production Deployment

### Prompting Approach: Clean Architecture

**Prompt Pattern**: "Clean up this repository and make it ready for publishing"

The deployment phase focused on professional presentation:

1. **Repository Structure** - Hide source materials, remove development artifacts
2. **Navigation Simplification** - Reduce to two pages: Overview and Research Paper
3. **PDF Pipeline** - Implement one-click PDF generation with academic formatting
4. **Access Points** - Create download buttons with proper file versioning

**Key Technique**: Distinguish between development environment and production deployment, maintaining CLAUDE.md for future AI assistance while hiding implementation details from end users.

---

## Prompting Patterns and Lessons

### Effective Patterns Discovered

1. **Constraint-Based Prompting**: Define measurable constraints (word counts, source requirements) before requesting content
2. **Recursive Refinement**: "Improve WITHOUT expanding" forces quality improvements through compression
3. **Systematic Escalation**: When problems found, immediately request comprehensive audit rather than spot fixes
4. **Modular Development**: Break complex outputs into reusable components that can be refined independently
5. **Structure-First Approach**: Define architecture before content to ensure balanced coverage

### Anti-Patterns to Avoid

1. **Open-Ended Requests**: "Write about X" without constraints leads to unfocused output
2. **Sequential Processing**: Handle multiple requirements in parallel for consistency
3. **Expansion Creep**: Each iteration adding length degrades focus
4. **Manual Verification**: Automate quality checks wherever possible
5. **Mixed Contexts**: Keep development instructions (CLAUDE.md) separate from content

### Observable Framework-Specific Strategies

1. **Data Loaders**: Use JavaScript modules to process data at build time
2. **Component Isolation**: Create reusable visualization modules in `src/components/`
3. **Reactive Patterns**: Leverage Observable's reactive execution for dynamic updates
4. **PDF Styling**: Maintain separate CSS for web vs print output
5. **File-Based Routing**: Structure equals navigation in Observable Framework

---

## Technical Implementation Details

### File Structure Evolution

```
Initial State:
- Scattered markdown files with URLs
- No systematic organization

Final State:
src/
├── BBNJ-CHM.md          # Main manuscript
├── index.md              # Title page
├── components/
│   └── sankey-diagram.js # Visualization module
├── data/
│   └── oa-chm-flows.json # Relationship data
pdf-export/
├── config/
│   └── styles.css        # Print-specific styling
└── output/               # Generated PDFs
```

### Key Configuration Updates

**observablehq.config.js**:
- Simplified navigation to two pages
- Updated title to reflect final focus
- Configured build paths for PDF integration

**CLAUDE.md**:
- Added iterative verification methodology
- Defined source hierarchy
- Established revision rules
- Documented PDF export pipeline

### Automation Scripts Created

1. **extract-urls.js** - Parse markdown for URLs
2. **download-sources.js** - Fetch documents with retry logic
3. **check-quality.js** - Validate file integrity
4. **cleanup-bad-files.js** - Remove corrupted data
5. **generate-index.js** - Create searchable document index

---

## Conclusions

This project demonstrates that effective AI-assisted research development relies not on perfect initial prompts but on strategic, iterative refinement through well-defined phases. The key insight is that constraints enhance rather than limit AI capability—word counts, source requirements, and structural definitions guide the AI toward more focused, higher-quality outputs.

The progression from bulk URL extraction to polished academic publication shows how systematic prompting strategies can manage complex, multi-phase projects. Each phase built on previous work while introducing new techniques suited to its specific challenges.

Most importantly, the project reveals that AI collaboration works best when treating the AI as a skilled but literal collaborator who benefits from clear structure, measurable objectives, and systematic verification processes. The final product—a comprehensive technical brief with interactive visualizations and professional PDF output—demonstrates the power of strategic prompting in academic research development.