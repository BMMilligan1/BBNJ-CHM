# Ocean Accounts for BBNJ Implementation

An Observable Framework research system analyzing how Ocean Accounts can provide essential infrastructure for the BBNJ Agreement's Clearing-House Mechanism.

## Research Summary

This project presents a comprehensive technical analysis demonstrating that Ocean Accounts—a structured framework for integrating environmental, economic, and social ocean data—offers proven architecture to operationalize the BBNJ Clearing-House Mechanism (CHM). The research identifies five key synergies between Ocean Accounts and CHM requirements:

- **Spatial Architecture**: Three-dimensional geographic reference systems for consistent BBNJ reporting
- **Resource Tracking**: Flow accounting for marine genetic resource utilization chains
- **Impact Assessment**: Environmental baselines supporting comprehensive assessments
- **Conservation Monitoring**: Asset frameworks measuring management effectiveness
- **Capacity Building**: Standardized indicators enabling universal participation

The full research paper provides detailed technical specifications, implementation pathways, and policy recommendations for integrating these systems before the first Conference of Parties.

## Live Demo

View the interactive research paper at: [https://yourusername.github.io/BBNJ-CHM/](https://yourusername.github.io/BBNJ-CHM/)

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

# Install PDF export dependencies (optional)
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
# Build static site
npm run build

# Build and export to PDF
npm run pdf:build
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
| `npm run pdf:install` | Install Puppeteer for PDF generation |
| `npm run pdf:export` | Convert built HTML to PDF |
| `npm run pdf:build` | Build site and generate PDF |
| `npm run pdf:watch` | Auto-export on changes |
| **Deployment** | |
| `npm run deploy` | Deploy to Observable platform |

## Key Features

### Interactive Visualizations

The research includes a dynamic Sankey diagram showing relationships between Ocean Accounts components and CHM functions:

```javascript
// Import and use the Sankey diagram component
import {createSankeyDiagram} from "./components/sankey-diagram.js";
const diagram = createSankeyDiagram(data);
```

### PDF Export

Generate publication-ready PDFs with:
- Preserved D3.js visualizations
- Academic formatting with proper citations
- Configurable page layout (A4 portrait)
- Clean print styling without UI elements

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

## Development Guide

### Adding Content

Edit `src/BBNJ-CHM.md` to modify the main research paper. The document uses standard markdown with Observable Framework extensions:

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

## Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow for automatic deployment:

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch to trigger deployment
4. Access at `https://yourusername.github.io/BBNJ-CHM/`

### Manual Deployment

Build and deploy the `dist/` folder to any static hosting:

```bash
npm run build
# Upload dist/ contents to hosting service
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Make your changes with clear commits
4. Ensure references are properly formatted
5. Submit a pull request with description

### Research Contributions

- Verify citations and references
- Suggest additional Ocean Accounts components
- Provide implementation case studies
- Review technical specifications

### Technical Contributions

- Improve visualization components
- Enhance PDF export quality
- Add data validation tools
- Optimize build performance

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