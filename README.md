# Ocean Accounts for BBNJ Implementation

A technical research paper examining how Ocean Accounts can support the BBNJ Agreement's Clearing-House Mechanism, with interactive visualizations and PDF export capabilities.

## Research Focus

This paper analyzes the potential integration of Ocean Accounts methodology with the BBNJ Agreement's Clearing-House Mechanism (CHM). The research examines technical synergies between existing Ocean Accounts frameworks and CHM implementation requirements:

- **Spatial Architecture**: Three-dimensional geographic reference systems for consistent BBNJ reporting
- **Resource Tracking**: Flow accounting for marine genetic resource utilization chains
- **Impact Assessment**: Environmental baselines supporting comprehensive assessments
- **Conservation Monitoring**: Asset frameworks measuring management effectiveness
- **Capacity Building**: Standardized indicators enabling universal participation

The paper includes technical specifications, implementation pathways, and recommendations based on analysis of treaty text, preparatory documents, and Ocean Accounts technical guidance.

## Deployment

The research paper deploys as both an interactive website and PDF document. View online at: [https://yourusername.github.io/BBNJ-CHM/](https://yourusername.github.io/BBNJ-CHM/)

## Quick Start

### Prerequisites

- Node.js 18 or later
- npm (comes with Node.js)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/BBNJ-CHM.git
cd BBNJ-CHM

# Install dependencies
npm install

# Install PDF export dependencies (required for PDF generation)
npm run pdf:install
```

### Development

```bash
# Start the development server
npm run dev
```

Visit http://localhost:3000 to view the research paper with live reload.

### Building

```bash
# Build static site only
npm run build

# Complete workflow: Build → Generate PDFs → Rebuild with PDFs
npm run pdf:full

# Or step by step:
npm run build        # Build HTML
npm run pdf:export   # Generate PDFs (auto-copies to src/)
npm run build        # Rebuild to include PDFs
```

## Project Structure

```
BBNJ-CHM/
├── src/                           # Source files
│   ├── BBNJ-CHM.md               # Main research paper (5000 words)
│   ├── index.md                  # Title page and summary
│   ├── components/               
│   │   └── sankey-diagram.js     # Ocean Accounts-CHM flow visualization
│   └── data/                     
│       └── oa-chm-flows.json     # Component relationship data
├── pdf-export/                    # PDF generation system
│   ├── config/                   
│   │   ├── styles.css            # Academic print formatting
│   │   └── config.json           # Page settings (A4, margins)
│   └── output/                   # Generated PDFs
├── research-data/                 # Source materials and references
├── docs/                          # Additional documentation
├── CLAUDE.md                      # AI assistance instructions
├── PROMPTING-NARRATIVE.md        # Development methodology
└── observablehq.config.js         # Framework configuration
```

## Available Commands

| Command | Description |
|---------|-------------|
| **Development** | |
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build static site to `./dist` |
| `npm run clean` | Clear data loader cache |
| **PDF Export** | |
| `npm run pdf:install` | Install Puppeteer for PDF generation (run once) |
| `npm run pdf:export` | Convert HTML to PDF with auto-copy to src/ |
| `npm run pdf:build` | Build HTML then generate PDFs |
| `npm run pdf:full` | Complete cycle: build → PDF → rebuild with PDFs |
| `npm run pdf:watch` | Auto-export PDFs on HTML changes |
| **Deployment** | |
| `npm run deploy` | Deploy to Observable platform |

## Technical Implementation

### Document Structure

The research is written in Markdown with Observable Framework extensions, enabling both static HTML and PDF outputs. The main document (`src/BBNJ-CHM.md`) contains the full 5000-word analysis with 73 references.

### Interactive Visualizations

A D3.js Sankey diagram visualizes relationships between Ocean Accounts components and CHM functions:

```javascript
// Import and use the Sankey diagram component
import {createSankeyDiagram} from "./components/sankey-diagram.js";
const diagram = createSankeyDiagram(data);
```

### PDF Export & Professional Typesetting

Generate publication-ready PDFs with sophisticated typesetting and pagination:

#### Intelligent Pagination
- **Smart table breaks**: Automatically detects table size during rendering
  - Small tables (≤6 rows) are kept together on a single page
  - Large tables flow naturally across pages with rows never splitting mid-content
  - Table headers repeat on continuation pages for readability
- **Heading placement**: Prevents orphaned headings using CSS page-break controls
  - Headings stay with their following content (minimum 3 lines)
  - Section headings (h3) specifically protected from appearing alone at page bottom
- **Content flow optimization**: 
  - Paragraphs use orphan/widow controls (minimum 2 lines)
  - Block quotes and code blocks kept intact where possible
  - Figures and captions stay together

#### Academic Formatting
- **Professional layout**: Academic journal style with consistent 15% left margin
- **Hierarchical indentation**: 
  - Body text, headings, and lists aligned at 15% left margin
  - Footnotes properly indented with hanging indent for numbers
  - Nested lists maintain proper visual hierarchy
- **Dynamic footer**: Right-aligned page numbers with render date ("Page 2 of 20. Updated: January 8, 2025")
- **Typography**: Plus Jakarta Sans font throughout for modern readability

#### Technical Implementation
- **Automatic detection**: JavaScript pre-processes tables to add size-based classes
- **CSS page rules**: Uses `@page`, `page-break-inside`, and `page-break-after` for precise control
- **Preserved visualizations**: D3.js Sankey diagrams rendered as vector graphics in PDF
- **Clean output**: All Observable UI elements removed, pure content focus

### Data Architecture

Ocean Accounts components mapped to CHM requirements:
- Basic Spatial Units → Geographic reporting
- Flow Accounts → MGR benefit-sharing
- Condition Accounts → Environmental baselines
- Asset Accounts → Conservation effectiveness
- Governance Accounts → Institutional coordination

## Research Content

### Main Sections

1. **Introduction**: BBNJ Agreement context and CHM requirements
2. **CHM Technical Requirements**: Functions, architecture, and challenges
3. **Ocean Accounts Framework**: Components and integration potential
4. **Implementation Pathway**: Phased approach from pilot to global
5. **Recommendations**: Technical and policy actions

### Key References

The paper includes 73 verified references to:
- BBNJ Agreement text and preparatory documents
- Ocean Accounts Technical Guidance (GOAP 2025)
- Academic analyses of treaty implementation
- Policy briefs from High Seas Alliance and IDDRI

## Editing and Extending the Research

### Modifying Content

The research content resides in `src/BBNJ-CHM.md`. To update or extend the analysis, edit this file using standard Markdown with Observable Framework extensions:

```markdown
## New Section

Content with citations[^1] and **emphasis**.

[^1]: Citation details
```

### Updating Visualizations

Modify the Sankey diagram data in `src/data/oa-chm-flows.json`:

```json
{
  "nodes": [
    {"id": "spatial", "title": "Spatial Data"}
  ],
  "links": [
    {"source": "spatial", "target": "mgr", "value": 3}
  ]
}
```

### Customizing PDF Output

Edit `pdf-export/config/styles.css` for print-specific formatting:

```css
@media print {
  .no-print { display: none; }
  h2 { page-break-before: always; }
}
```

## Publishing

### GitHub Pages

The repository includes automated deployment via GitHub Actions:

1. Enable GitHub Pages in repository settings
2. Select "GitHub Actions" as the source
3. Push to main branch to trigger deployment
4. The site will be available at `https://yourusername.github.io/BBNJ-CHM/`

### Manual Deployment

To deploy elsewhere, build and host the `dist/` directory:

```bash
npm run build
# Deploy dist/ contents to any static hosting service
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Make your changes with clear commits
4. Ensure references are properly formatted
5. Submit a pull request with description

### Research Extensions

- Verification of citations and reference accuracy
- Additional analysis of Ocean Accounts components
- Case studies from national implementations
- Technical specification refinements
- Updates based on PrepCom developments

### Technical Improvements

- Enhanced visualization components (D3.js)
- PDF export optimization (Puppeteer configuration)
- Data validation and quality checks
- Build system performance
- Additional Observable Framework features

## Citation

To cite this research:

```bibtex
@techreport{milligan2025ocean,
  title={Ocean Accounts as Infrastructure for the BBNJ Clearing-House Mechanism},
  author={Milligan, Ben},
  institution={Centre for Sustainable Development Reform, UNSW},
  year={2025},
  url={https://github.com/yourusername/BBNJ-CHM}
}
```

## License

This work is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). See LICENSE for details.

## Acknowledgments

- Built with [Observable Framework](https://observablehq.com/framework/)
- Visualizations powered by [D3.js](https://d3js.org/)
- PDF export via [Puppeteer](https://pptr.dev/)
- Research supported by Centre for Sustainable Development Reform, UNSW

## Resources

### Project Documentation
- [CLAUDE.md](CLAUDE.md) - AI assistance configuration
- [PROMPTING-NARRATIVE.md](PROMPTING-NARRATIVE.md) - Development methodology
- [Peer Review Notes](docs/Peer-review.md) - Revision history

### External Resources
- [BBNJ Agreement Text](https://www.un.org/bbnjagreement/)
- [Global Ocean Accounts Partnership](https://www.oceanaccounts.org)
- [Observable Framework Docs](https://observablehq.com/framework/)

## Contact

Ben Milligan  
Centre for Sustainable Development Reform  
University of New South Wales  

---

For technical issues, please open a GitHub issue. For research inquiries, contact the author directly.