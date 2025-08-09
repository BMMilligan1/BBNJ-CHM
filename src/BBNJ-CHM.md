# Ocean Accounts as Infrastructure for the BBNJ Clearing-House Mechanism: A Technical Brief on Data Architecture for Sustainable Ocean Governance

## Executive Summary

The 2023 Agreement on Biodiversity Beyond National Jurisdiction (BBNJ) establishes a Clearing-House Mechanism (CHM) as its digital backbone for transparency, compliance, and benefit-sharing across all treaty functions.[^1] Yet the Agreement provides limited technical specifications for CHM implementation, creating risks of fragmented development and missed opportunities for systematic ocean governance.[^2] Ocean Accounts—a structured framework for integrating environmental, economic, and social ocean data aligned with international statistical standards—offers a proven architecture that can operationalize CHM requirements while enabling evidence-based decision-making for sustainable ocean development.[^3]

This brief demonstrates that Ocean Accounts provides essential infrastructure for CHM success through five key synergies: standardized spatial data architecture enabling consistent geographic reporting;[^4] flow accounting systems that can track marine genetic resource utilization chains;[^5] baseline condition accounts supporting robust environmental impact assessments;[^6] asset monitoring frameworks measuring conservation effectiveness;[^7] and standardized indicators facilitating capacity-building and technology transfer.[^8] 

Implementation should proceed through phased development beginning with pilot Ocean Accounts modules integrated into CHM prototypes before COP-1, followed by progressive account compilation in volunteer countries, and ultimately achieving a fully integrated system supporting real-time monitoring and decision support.[^9] Critical near-term actions include establishing an Ocean Accounts-CHM Technical Working Group under the Preparatory Commission, developing data standards based on System of Environmental-Economic Accounting principles, and securing resources for system development prioritizing participation by Small Island Developing States and Least Developed Countries.[^10]

The integration of Ocean Accounts and CHM represents more than technical alignment—it establishes a foundation for transformative ocean governance that bridges the persistent divide between environmental protection and sustainable development through systematic, comparable, and actionable information.

## 1. Introduction: The Data Challenge of BBNJ Implementation

The Agreement under the United Nations Convention on the Law of the Sea on the Conservation and Sustainable Use of Marine Biological Diversity of Areas Beyond National Jurisdiction, adopted in June 2023, represents the most significant advance in ocean governance since UNCLOS itself.[^11] The BBNJ Agreement addresses governance gaps in areas beyond national jurisdiction (ABNJ) through four interconnected pillars: marine genetic resources (MGRs) including benefit-sharing; area-based management tools (ABMTs) including marine protected areas; environmental impact assessments (EIAs); and capacity-building and technology transfer (CB&TT).[^12]

Central to implementing these pillars is the Clearing-House Mechanism, described as an "essential orchestration tool" that will serve as the treaty's digital backbone.[^13] Article 51 establishes the CHM as an open-access platform facilitating access to information across all treaty elements.[^14] Yet despite its centrality, the Agreement provides minimal technical specifications for CHM architecture, leaving critical design decisions to future Conference of Parties meetings.[^15]

This implementation gap poses significant risks. Without standardized data architecture, the CHM may evolve as a fragmented collection of databases rather than an integrated system. Different parties may develop incompatible reporting formats, undermining comparability. The absence of common standards could perpetuate existing asymmetries where technologically advanced states dominate ocean science while developing states lack capacity to participate meaningfully in governance processes.

Ocean Accounts offers a solution. Developed through the Global Ocean Accounts Partnership and aligned with the System of National Accounts (SNA) and System of Environmental-Economic Accounting (SEEA), Ocean Accounts provides a structured framework for compiling and integrating ocean data across environmental, economic, and social domains.[^16] Unlike ad-hoc data compilations, Ocean Accounts employs accounting principles ensuring completeness, consistency, and comparability while maintaining flexibility for national circumstances.[^17]

The framework's relevance to BBNJ implementation extends beyond technical compatibility. Ocean Accounts addresses the fundamental information requirements for sustainable ocean development: measuring economic output from ocean activities, assessing benefit distribution across communities, and tracking sustainability through changes in natural capital assets over time.[^18] These capabilities directly support CHM functions including MGR benefit-sharing calculations, EIA baseline establishment, and ABMT effectiveness monitoring.[^19]

This brief argues that Ocean Accounts provides essential infrastructure for CHM success, offering a proven architecture that can accelerate implementation while ensuring the integrated, transparent, and equitable ocean governance envisioned by the BBNJ Agreement. The following analysis examines CHM requirements, Ocean Accounts capabilities, and their synergistic potential, providing practical recommendations for integration that can transform how humanity governs two-thirds of the planet's surface.

## 2. The BBNJ Clearing-House Mechanism: Requirements and Functions

### 2.1 Core CHM Functions

The BBNJ Agreement assigns the Clearing-House Mechanism comprehensive responsibilities spanning all four treaty pillars, establishing it as the central nervous system for treaty implementation. The following table consolidates CHM functional requirements across the BBNJ framework:

<div class="table-container" style="overflow-x: auto;">

| **BBNJ Pillar** | **CHM Function** | **Data Requirements** | **Timing/Frequency** | **Key Challenges** |
|-----------------|------------------|----------------------|---------------------|-------------------|
| **Marine Genetic Resources (MGRs)** | Pre-collection notification | • Research objectives<br>• Geographic coordinates<br>• Target organisms<br>• Sponsoring entities<br>• Vessel/platform details | 6 months before collection | Verification of intent vs. actual collection |
| | Post-collection notification | • Samples collected<br>• Repository locations<br>• Preliminary findings<br>• Data availability | Within 1 year of collection | Tracking sample movements |
| | Utilization notification | • Commercial development<br>• Patent applications<br>• Product information<br>• Benefit-sharing data | Upon commercialization | Linking to batch IDs across databases |
| | Batch ID generation | Standardized identifiers linking samples from collection through utilization | Automatic upon notification | Integration with patent/publication databases |
| **Area-Based Management Tools (ABMTs)** | Proposal repository | • Scientific justification<br>• Boundaries/coordinates<br>• Conservation objectives<br>• Traditional knowledge | Upon submission | Harmonizing diverse data formats |
| | Designation records | • COP decisions<br>• Management measures<br>• Stakeholder input | After COP meetings | Coordination with sectoral bodies |
| | Effectiveness monitoring | • Ecological indicators<br>• Compliance data<br>• Adaptive management | Annual/periodic | Standardizing metrics across regions |
| **Environmental Impact Assessments (EIAs)** | Screening documentation | • Activity description<br>• Initial assessment<br>• Threshold analysis | Project initiation | Transparency vs. commercial sensitivity |
| | Full EIA reports | • Baseline data<br>• Impact analysis<br>• Mitigation measures<br>• Monitoring plans | Before activity approval | Quality assurance without verification capacity |
| | Monitoring data | • Actual impacts<br>• Compliance reports<br>• Adaptive measures | Ongoing during activity | Real-time data integration |
| **Capacity-Building & Technology Transfer (CB&TT)** | Needs assessment | • Technical gaps<br>• Infrastructure requirements<br>• Training priorities | Annual submission | Matching diverse capacity levels |
| | Resource matching | • Available expertise<br>• Funding opportunities<br>• Technology offerings | Continuous updates | Dynamic matching algorithms |
| | Progress tracking | • Training completed<br>• Technology deployed<br>• Outcome indicators | Periodic reporting | Measuring effectiveness vs. inputs |

</div>

Each function requires sophisticated technical architecture supporting multi-stakeholder access, traditional knowledge integration, and interoperability with existing ocean governance systems.[^71]

### 2.2 Technical Requirements

Implementing these functions demands sophisticated technical architecture that the Agreement leaves largely unspecified. The CHM must achieve interoperability with existing databases across multiple organizations while maintaining its own data integrity and accessibility standards. The standardized batch identifier system requires integration with patent databases, scientific publication indexes, and commercial product registries to track MGR utilization comprehensively.[^72] Multi-stakeholder access protocols must accommodate diverse users from government agencies to indigenous communities, each with different technical capacities and information needs.

Data quality and validation mechanisms represent particular challenges given the CHM's reliance on self-reporting. Without verification capabilities, the notification system risks becoming a repository of incomplete or inaccurate information undermining treaty objectives. The CHM must also support multiple knowledge systems, integrating quantitative scientific data with qualitative traditional knowledge while respecting intellectual property rights and indigenous data sovereignty.[^73] These technical requirements extend beyond simple database management, demanding adaptive architecture capable of evolving with technological advances and expanding treaty participation.

### 2.3 Implementation Challenges

The Preparatory Commission's first substantive meeting in April 2025 highlighted critical implementation challenges requiring urgent resolution. Foremost is the absence of specified technical architecture, with delegations debating whether to build new infrastructure or adapt existing systems like the CBD's clearing-house mechanisms.[^9] This architectural uncertainty compounds resource constraints, as developing states lack capacity to design CHM-compatible national systems while the treaty's financial mechanism remains undefined.

Integration with existing ocean governance systems presents additional complexity. The CHM must interface with the International Seabed Authority's databases for seabed mining, Regional Fisheries Management Organizations' catch documentation systems, International Maritime Organization's shipping registries, and numerous scientific data repositories, each with distinct standards and access protocols. The "not undermining" provision (Article 5) requires the CHM to respect existing legal frameworks while promoting coherence, a delicate balance demanding careful institutional orchestration.[^13]

Capacity constraints particularly affect Small Island Developing States and Least Developed Countries, which may lack technical infrastructure, trained personnel, and financial resources for CHM participation. Without targeted support, these states risk exclusion from the benefits of BBNJ implementation despite their significant ocean territories and traditional knowledge. The High Seas Alliance emphasizes that ensuring equitable access requires not just technical solutions but sustained capacity-building investments and simplified interfaces accommodating varying technological capabilities.[^2]

Perhaps most fundamentally, the CHM faces the challenge of building trust in a system based on self-reporting and voluntary compliance. Foster (2025) observes that while the BBNJ Agreement imposes "light substantive duties," it creates "heavy procedural obligations" whose effectiveness depends entirely on transparent implementation. The CHM must therefore incorporate accountability mechanisms that encourage compliance while avoiding bureaucratic burdens that might discourage participation. This requires careful balance between comprehensiveness and usability, transparency and confidentiality, standardization and flexibility.

These implementation challenges are not merely technical but deeply political, reflecting different visions of ocean governance and benefit-sharing. Yet they also present opportunities for innovation. By adopting proven frameworks like Ocean Accounts, the CHM can leverage existing investments in ocean information systems while establishing new standards for integrated governance. The following section examines how Ocean Accounts addresses these challenges through systematic architecture aligned with international standards.

## 3. Ocean Accounts Framework: A Systems Approach to Ocean Information

### 3.1 Conceptual Architecture

Ocean Accounts represents a paradigm shift from fragmented ocean statistics to integrated information systems, providing structured methodology for measuring relationships between ocean environments, economies, and societies. The framework's foundation rests on fundamental accounting distinctions between stocks—assets measured at points in time—and flows—transfers of goods, services, or activities measured over periods (OA-Guidance). This distinction enables systematic tracking of how ocean natural capital changes through human use and environmental processes, directly supporting sustainability assessments required for BBNJ implementation.

The spatial data framework employs Basic Spatial Units (BSUs) as foundational building blocks, enabling three-dimensional ocean representation through depth layers that accommodate complex marine ecosystem structures. BSUs can be aggregated or disaggregated according to management needs, from local bay systems to entire exclusive economic zones, providing the geographic flexibility essential for CHM reporting across scales. This spatial architecture maintains consistency with the Global Ecosystem Typology's functional classifications while allowing integration of indigenous and local spatial knowledge systems that may not conform to conventional cartographic boundaries (OA-Guidance: Section 3.5).

Central to Ocean Accounts' integrative capacity is its alignment with established international standards, particularly the System of National Accounts 2025 and System of Environmental-Economic Accounting frameworks. This compatibility ensures that ocean-specific information connects seamlessly with broader economic and environmental statistics, avoiding the isolation that often marginalizes ocean data from mainstream policy processes. The framework explicitly bridges the production boundary defined by SNA with environmental processes occurring beyond human economies, capturing previously invisible relationships between ecosystem functioning and economic activity.[^18]

### 3.1.1 Functional Architecture: From Data to Decisions

Ocean Accounts operates as a functional information system that transforms diverse, heterogeneous data inputs into standardized, decision-relevant outputs through a systematic process of collection, validation, standardization, and analysis (OA-Guidance: Section 3.4). This functional perspective reveals how Ocean Accounts addresses the practical challenges of integrating ocean information for policy use.

The data flow begins with collection from multiple sources—government monitoring programs, research institutions, industry reporting, citizen science initiatives, and indigenous knowledge systems. These diverse inputs undergo validation processes applying international statistical principles of completeness, consistency, and comparability. Data sharing protocols ensure that information from different sources can be integrated while maintaining quality standards and respecting data sovereignty, particularly for traditional knowledge.

Through standardization processes, heterogeneous data are aligned to common spatial boundaries (Basic Spatial Units), temporal periods (accounting years), and classifications (aligned with SNA and SEEA standards). This standardization enables the compilation of accounting tables that organize information according to the fundamental distinction between stocks (assets measured at points in time) and flows (transfers measured over periods). These structured tables serve as the foundation for deriving indicators specifically relevant to CHM functions.

For CHM implementation, Ocean Accounts can generate targeted indicators including: MGR extraction rates per ecosystem type to support benefit-sharing calculations; MPA effectiveness scores combining ecological condition and compliance metrics; cumulative impact indices integrating multiple pressures for EIA baselines; capacity development progress indicators tracking infrastructure, expertise, and technology transfer; and equity metrics disaggregating benefits by stakeholder groups. These indicators condense complex accounting information into decision-relevant metrics that directly support treaty implementation.

The final stage transforms accounting tables and indicators into reports, dashboards, and decision support tools tailored to different user needs. Modern implementations increasingly employ interactive visualization platforms allowing users to explore relationships between variables, compare scenarios, and monitor trends in real-time. This functional architecture ensures that Ocean Accounts serves not merely as a data repository but as an active intelligence system supporting evidence-based ocean governance.

### 3.2 Key Components Relevant to CHM

Ocean Accounts' component structure directly addresses CHM information requirements through systematic organization of diverse data types. The following table maps Ocean Accounts components to their CHM applications:

<div class="table-container" style="overflow-x: auto;">

| **Component Type** | **Description** | **CHM Application** | **Data Sources** | **Example Metrics** |
|-------------------|-----------------|---------------------|------------------|-------------------|
| **Environmental Assets (Extent & Condition)** | Stocks of marine ecosystems and resources measured at points in time, including both spatial extent and ecological condition | • Establishing baselines for environmental impact assessments<br>• Supporting scientific justification for ABMT designations<br>• Monitoring conservation effectiveness over time | • Remote sensing<br>• In-situ monitoring<br>• Research surveys | • Coral reef extent (km²)<br>• Fish stock biomass (tonnes)<br>• Habitat condition indices |
| **Final Ecosystem Services** | Direct benefits flowing from ecosystems to people and economy that support human wellbeing | • Calculating values of marine genetic resources<br>• Determining monetary and non-monetary benefit-sharing<br>• Analyzing trade-offs between uses | • Resource extraction data<br>• Economic surveys<br>• Cultural assessments | • Genetic materials extracted (samples/year)<br>• Carbon sequestered (tCO₂/year)<br>• Tourism visits (#/year) |
| **Flows within the Economy** | Ocean-related production, consumption, trade, and investment transactions within the SNA production boundary | • Tracking monetary benefits from MGR commercialization<br>• Assessing national capacity for ocean management<br>• Monitoring blue economy investments | • National accounts<br>• Industry statistics<br>• Trade databases | • MGR product revenues ($)<br>• Ocean GDP contribution (%)<br>• Blue economy employment (#) |
| **Social Assets and Conditions** | Stocks representing wellbeing, vulnerability, and social capital in ocean-dependent communities | • Assessing equity in benefit distribution<br>• Documenting traditional knowledge and practices<br>• Mapping stakeholder dependencies and rights | • Census data<br>• Social surveys<br>• Governance records | • Coastal population dependency (%)<br>• Traditional use rights (#)<br>• Gender participation rates |
| **Spatial Data Framework** | Basic Spatial Units (BSUs) providing three-dimensional ocean representation and geographic reference system | • Standardizing geographic reporting across scales<br>• Enabling aggregation from local to global levels<br>• Delineating boundaries for jurisdiction and management | • Bathymetry<br>• Maritime boundaries<br>• Ecosystem mapping | • BSU identifiers<br>• Depth zones<br>• Jurisdictional overlaps |
| **Pollution & Residual Flows** | Waste flows from economy to ocean environment including pollutants, debris, and other pressures | • Assessing cumulative environmental impacts<br>• Tracking pollution sources and pathways<br>• Attributing pressures to economic sectors | • Discharge monitoring<br>• Waste audits<br>• Water quality data | • Plastic inputs (tonnes/year)<br>• Nutrient loads (kg N,P)<br>• Noise levels (dB) |
| **Produced and Financial Assets** | Stocks of built infrastructure and financial capital supporting ocean activities | • Identifying infrastructure gaps for capacity building<br>• Assessing technology transfer needs<br>• Tracking ocean-related investments | • Asset inventories<br>• Financial records<br>• Infrastructure surveys | • Port facilities (#)<br>• Research vessels (#)<br>• Blue bonds issued ($) |
| **Environmental Flows & Interactions** | Ecological processes maintaining ecosystem functioning including energy flows and species movements | • Understanding ecosystem connectivity for ABMT design<br>• Assessing ecological support for impact assessments<br>• Identifying critical ecological processes | • Oceanographic data<br>• Species tracking<br>• Process studies | • Larval dispersal distances<br>• Nutrient cycling rates<br>• Migration corridors |
| **Social Activities beyond SNA** | Important social activities falling outside the SNA production boundary including unpaid work and community stewardship | • Documenting traditional management practices<br>• Capturing volunteer conservation efforts<br>• Recognizing subsistence use patterns | • Time use surveys<br>• Community records<br>• Ethnographic studies | • Volunteer hours (#)<br>• Subsistence catch (kg)<br>• Traditional practices (#) |
| **Monetary Flows between Assets** | Financial transactions associated with ocean-related produced and financial assets | • Tracking investments in MGR research infrastructure<br>• Monitoring financial flows for capacity building<br>• Assessing blue economy financing | • Financial transactions<br>• Investment records<br>• Capital accounts | • R&D investments ($)<br>• Infrastructure financing ($)<br>• Technology transfer values ($) |
| **Social-Economic Contributions** | Bidirectional relationships between social conditions and economic/social activities | • Understanding how social capital enables ocean activities<br>• Assessing socio-economic impacts of management<br>• Identifying equity implications of policies | • Social network analysis<br>• Impact assessments<br>• Longitudinal studies | • Social capital indices<br>• Livelihood dependencies (%)<br>• Distributional effects |
| **Intermediate Ecosystem Services** | Ecological processes supporting other ecosystems without directly benefiting humans | • Maintaining ecological integrity for conservation<br>• Understanding support systems for final services<br>• Identifying critical ecological functions | • Ecosystem modeling<br>• Food web analysis<br>• Biogeochemical monitoring | • Primary productivity rates<br>• Trophic transfer efficiency<br>• Habitat connectivity indices |

</div>

This systematic organization enables Ocean Accounts to transform diverse ocean data into standardized, comparable information directly supporting CHM functions across all BBNJ pillars.[^74]

### 3.3 Implementation Approaches

Ocean Accounts' modular architecture enables adaptive implementation matching institutional capacities and policy priorities, a flexibility essential for diverse BBNJ parties. Countries typically begin with pilot accounts addressing specific challenges—sustainable fisheries, coastal tourism, marine pollution—before expanding coverage systematically (OA-Guidance: Section 3.7). This incremental approach allows learning-by-doing while building technical capacity and stakeholder engagement, avoiding the paralysis that comprehensive implementation demands might create.

Implementation models vary according to institutional arrangements, with some countries positioning national statistics offices as leads emphasizing economic dimensions, while others operate through environment agencies prioritizing ecological accounts. Multi-agency collaborative approaches under high-level coordination increasingly emerge as best practice, recognizing that ocean accounts span traditional bureaucratic boundaries. For CHM integration, this institutional flexibility suggests that parties can build on existing ocean information systems rather than creating parallel structures, reducing implementation costs while leveraging established expertise.

The framework's "rapid assessment" option using global datasets enables countries with limited resources to establish baseline accounts quickly before developing detailed national compilations. This tiered approach ensures that all parties can participate in Ocean Accounts-based CHM reporting regardless of technical capacity, addressing equity concerns central to BBNJ negotiations. Progressive refinement from rapid assessments to comprehensive accounts creates natural capacity-building pathways, with early adopters supporting later implementers through technical cooperation facilitated by the CHM itself.

## 4. Synergies: Mapping Ocean Accounts Components to CHM Functions

The Ocean Accounts Framework comprises twelve interconnected components that collectively provide comprehensive infrastructure for CHM operationalization.[^20] The following interactive visualization and table demonstrate how these components flow through BBNJ pillars to support specific CHM functions:

```js
import {createSankeyDiagram} from "./components/sankey-diagram.js";
const flowData = await FileAttachment("data/oa-chm-flows.json").json();
const diagram = createSankeyDiagram(flowData);
display(diagram);
```

### Component-to-Function Mapping Details

The Sankey diagram above visualizes data flows from Ocean Accounts components (left) through BBNJ pillars (center) to CHM functions (right). Flow width indicates relative importance and data volume. The following table provides detailed mapping specifications:

<div class="table-container" style="overflow-x: auto;">

| **OA Component** | **Primary CHM Functions** | **Secondary Functions** | **Data Flow Type** | **Integration Priority** |
|-----------------|---------------------------|------------------------|-------------------|------------------------|
| **Spatial Data Framework** | • Geographic standardization<br>• BSU-based reporting<br>• 3D ocean mapping | • Cross-scale aggregation<br>• Boundary delineation | Continuous spatial reference | **Critical** - Foundation for all spatial reporting |
| **Environmental Assets** | • EIA baselines<br>• ABMT designation<br>• Conservation targets | • MGR habitat mapping<br>• Vulnerability assessment | Periodic stock assessments | **Critical** - Essential for impact assessment |
| **Social Conditions** | • Equity assessment<br>• Stakeholder mapping<br>• Vulnerability analysis | • Traditional use documentation<br>• Benefit distribution | Annual social surveys | **High** - Ensures equitable implementation |
| **Produced Assets** | • Capacity assessment<br>• Infrastructure gaps<br>• Technology needs | • Investment tracking<br>• Maintenance requirements | Infrastructure inventories | **High** - Identifies CB&TT priorities |
| **Economic Flows** | • MGR benefit calculation<br>• Value chain analysis<br>• Trade monitoring | • Investment patterns<br>• Market dynamics | Transaction records | **Critical** - Core to benefit-sharing |
| **Social Activities** | • Traditional knowledge<br>• Community practices<br>• Volunteer efforts | • Cultural protocols<br>• Subsistence use | Qualitative assessments | **Medium** - Captures non-market contributions |
| **Environmental Flows** | • Ecosystem connectivity<br>• Ecological processes<br>• Resilience indicators | • Cumulative impacts<br>• Tipping points | Process monitoring | **High** - Informs ecosystem-based management |
| **Pollution & Residuals** | • Pressure tracking<br>• Source attribution<br>• Cumulative loads | • Mitigation priorities<br>• Cleanup targets | Discharge monitoring | **High** - Critical for EIAs |
| **Monetary Flows** | • Financial tracking<br>• Subsidy analysis<br>• Investment flows | • Cost-benefit analysis<br>• Resource mobilization | Financial transactions | **Medium** - Supports transparency |
| **Social-Economic Feedbacks** | • Impact pathways<br>• Compliance drivers<br>• Adaptation responses | • Unintended consequences<br>• Policy effectiveness | System dynamics modeling | **Medium** - Reveals complex interactions |
| **Final Ecosystem Services** | • Benefit documentation<br>• Trade-off analysis<br>• Valuation support | • Public communication<br>• Political support | Service flow accounting | **High** - Demonstrates conservation value |
| **Intermediate Services** | • Ecological support<br>• System functioning<br>• Resilience maintenance | • Restoration priorities<br>• Protection targets | Ecological monitoring | **Medium** - Maintains system integrity |

</div>

### Integration Architecture

The visualization reveals three critical insights for CHM implementation:

1. **Convergence Points**: Multiple OA components converge at each BBNJ pillar, demonstrating the integrated nature of ocean governance. No single component suffices; systematic integration is essential.

2. **Flow Intensity**: The thickness of flows indicates data volume and importance. Spatial framework and environmental assets show highest flow volumes, confirming their foundational role in CHM architecture.

3. **Distribution Patterns**: CHM functions receive inputs from multiple pillars, highlighting the need for cross-pillar data integration. Traditional siloed approaches will fail to capture these interdependencies.

Through systematic integration of these twelve components, Ocean Accounts transforms CHM from a passive repository to an active intelligence system supporting evidence-based ocean governance.[^48]

### 4.4 Technical Integration Specifications

The operational integration of Ocean Accounts with CHM requires specific technical protocols ensuring data quality, interoperability, and accessibility. The following specifications provide the technical foundation for implementation:

**Data Exchange Formats:** The CHM should adopt JSON-LD (JSON for Linked Data) as the primary format for structured data exchange, enabling semantic interoperability while maintaining human readability. GeoJSON specifications should govern spatial data transfer, ensuring compatibility with existing marine spatial planning tools and GIS platforms. For tabular accounting data, the Statistical Data and Metadata eXchange (SDMX) standard provides established protocols for time-series and cross-sectional data used in national accounts.

**Metadata Standards:** Implementation should follow ISO 19115-3:2016 for geographic information metadata, extended with BBNJ-specific elements for MGR batch identifiers, traditional knowledge attribution, and compliance tracking. Each data element requires minimum metadata including: temporal coverage and compilation date; spatial resolution and geographic extent; data quality indicators and uncertainty ranges; source attribution and access restrictions; and processing methods and validation status.

**API Specifications:** RESTful APIs following OpenAPI 3.0 specifications should enable programmatic access to both Ocean Accounts data and CHM functions. Core endpoints should include: `/accounts/{country}/assets` for environmental asset queries; `/flows/mgr/{batchID}` for tracking genetic resource utilization chains; `/indicators/{pillar}/` for accessing derived metrics by BBNJ pillar; `/compliance/{party}/reports` for retrieving notification and reporting history. Rate limiting and authentication protocols must balance open access principles with system stability and data sovereignty requirements.

**Version Control and Update Protocols:** Given the long compilation cycles for Ocean Accounts (typically annual) and real-time CHM notification requirements, the system must implement sophisticated versioning. Each account compilation should receive a unique version identifier with clear documentation of revisions. The CHM should maintain provisional accounts updated with high-frequency data (e.g., vessel tracking, permit notifications) while preserving validated annual compilations for official reporting.

**Data Quality Indicators:** All data transmitted between Ocean Accounts and CHM should include standardized quality indicators: completeness scores indicating data coverage; consistency flags for logical validation; timeliness metrics for data currency; accuracy assessments where validation data exists; and comparability indices for multi-source integration. These indicators enable users to assess fitness-for-purpose rather than assuming uniform data quality.

**Validation Rules:** Automated validation should apply accounting identities (e.g., opening stock + additions - removals = closing stock) and ecological constraints (e.g., extraction cannot exceed stock estimates). Cross-validation between Ocean Accounts components can identify inconsistencies, such as economic flows without corresponding environmental impacts. Machine learning algorithms can flag anomalous patterns for human review while avoiding false positives that might discourage reporting.

These technical specifications must evolve through pilot implementation and stakeholder feedback, balancing sophistication with accessibility to ensure that all BBNJ parties can participate regardless of technical capacity. Open-source reference implementations and comprehensive documentation will be essential for achieving the inclusive, interoperable system envisioned by both Ocean Accounts and CHM frameworks.

## 5. Implementation Pathway: Practical Steps

The following roadmap consolidates near-term, medium-term, and long-term actions for Ocean Accounts-CHM integration:

<div class="table-container" style="overflow-x: auto;">

| **Phase** | **Timeline** | **Key Actions** | **Responsible Parties** | **Resources Required** | **Success Indicators** |
|-----------|-------------|-----------------|------------------------|----------------------|----------------------|
| **Phase 1: Foundation** | Pre-COP1<br>(2025-2026) | • Establish OA-CHM Technical Expert Group<br>• Develop proof-of-concept pilots<br>• Adapt SEEA Ocean guidelines for MGRs<br>• Create API specifications<br>• Design metadata standards | • PrepCom Secretariat<br>• GOAP members<br>• National statistics offices<br>• Ocean agencies<br>• SIDS/LDC representatives | • $2-3M pilot funding<br>• 10-15 technical experts<br>• 3-5 pilot countries<br>• IT infrastructure | • Expert group operational<br>• 3+ pilot projects launched<br>• Draft standards published<br>• COP-1 recommendations ready |
| **Phase 2: Early Implementation** | COP1-COP3<br>(2026-2029) | • Deploy CHM core architecture<br>• Integrate pilot country data<br>• Develop user interfaces<br>• Launch capacity-building program<br>• Establish regional nodes | • COP Secretariat<br>• Early adopter countries<br>• Regional organizations<br>• Training institutions<br>• Technology partners | • $10-15M core funding<br>• 20-30 participating countries<br>• Regional coordinators<br>• Training facilities | • CHM operational<br>• 20+ countries reporting<br>• 100+ users trained<br>• Regional networks active |
| **Phase 3: Expansion** | COP3-COP5<br>(2029-2032) | • Scale to global coverage<br>• Automate data flows<br>• Integrate real-time monitoring<br>• Deploy decision support tools<br>• Establish quality assurance | • All BBNJ Parties<br>• Scientific institutions<br>• Private sector partners<br>• Indigenous organizations | • $20-30M sustained funding<br>• 50+ countries participating<br>• Advanced IT systems<br>• QA/QC protocols | • 50+ countries integrated<br>• Automated reporting active<br>• Decision tools deployed<br>• Data quality verified |
| **Phase 4: Full Operation** | Post-COP5<br>(2032+) | • Achieve universal participation<br>• Enable predictive analytics<br>• Support adaptive management<br>• Drive policy innovation<br>• Demonstrate impact | • Global ocean community<br>• All stakeholder groups<br>• Research networks<br>• Policy makers | • $30M+ annual budget<br>• All parties participating<br>• Advanced analytics<br>• Impact assessment | • Universal coverage<br>• Evidence-based decisions<br>• Measurable ocean improvements<br>• Sustainable financing |

</div>

### Practical Implementation Pathways

<div class="table-container" style="overflow-x: auto;">

| **Implementation Stage** | **National OA Development** | **Extension to ABNJ/CHM** | **Data Integration Requirements** | **Capacity Building Priorities** |
|-------------------------|---------------------------|--------------------------|----------------------------------|--------------------------------|
| **Stage 1: Foundation** | Establish BSU spatial framework for national waters including EEZ and continental shelf | Extend BSUs to adjacent ABNJ areas using same classification system | • Harmonize with GEBCO bathymetry<br>• Align with ISA mining areas<br>• Match RFMO statistical zones | • GIS and spatial data management<br>• SEEA-Ocean methodology training<br>• Statistical compilation skills |
| **Stage 2: Priority Assets** | Compile environmental asset accounts for key ecosystems (coral reefs, seamounts, fishing grounds) | Include transboundary and straddling stocks connecting to ABNJ | • Link national monitoring to global datasets<br>• Integrate satellite observations<br>• Connect to OBIS biodiversity data | • Remote sensing analysis<br>• Ecosystem assessment methods<br>• Data quality assurance |
| **Stage 3: Economic Flows** | Track ocean economy production including fisheries, tourism, and maritime transport | Add MGR research activities and benefit flows from ABNJ resources | • Connect to patent databases for MGR tracking<br>• Link to trade statistics for marine products<br>• Interface with financial reporting | • Economic accounting expertise<br>• Value chain analysis<br>• Benefit distribution assessment |
| **Stage 4: Governance Integration** | Document management effectiveness for national MPAs and resource regulations | Incorporate BBNJ compliance reporting and international commitments | • Align reporting formats with CHM requirements<br>• Standardize effectiveness indicators<br>• Enable automated data transfer | • Legal and institutional analysis<br>• Compliance monitoring systems<br>• International reporting protocols |
| **Stage 5: Full Integration** | Operate comprehensive Ocean Accounts with regular compilation and reporting cycles | Seamlessly integrate ABNJ data enabling complete ocean system view | • Real-time data feeds from multiple sources<br>• Predictive modeling capabilities<br>• Decision support tool deployment | • Advanced analytics<br>• System maintenance<br>• Continuous improvement processes |

</div>

This staged approach allows countries to progressively build Ocean Accounts capabilities while immediately supporting CHM implementation. Countries with existing fisheries statistics can begin by extending catch data to include ABNJ areas. Those with MPA monitoring programs can apply the same assessment methods to proposed ABMTs. Nations tracking blue economy investments can add MGR research and development activities to their accounts.

## 6. Addressing Implementation Challenges

The following matrix maps key implementation challenges to Ocean Accounts-based solutions:

<div class="table-container" style="overflow-x: auto;">

| **Challenge Category** | **Specific Challenge** | **Ocean Accounts Solution** | **Implementation Requirements** | **Risk Mitigation** |
|----------------------|----------------------|---------------------------|-------------------------------|-------------------|
| **Technical Challenges** | | | | |
| Data heterogeneity | Multiple formats, scales, and quality levels across national systems[^62] | • Flexible aggregation rules<br>• Metadata documentation<br>• Harmonization protocols | • Common data models<br>• Translation layers<br>• Quality indicators | • Preserve local specificity<br>• Document uncertainty<br>• Gradual standardization |
| Semantic alignment | Inconsistent terminology across disciplines and languages[^63] | • Controlled vocabularies<br>• Ontology mapping<br>• Multi-lingual support | • Term registries<br>• Cross-walks<br>• Expert validation | • Inclusive development<br>• Regular updates<br>• Context preservation |
| Temporal mismatches | Real-time CHM needs vs. periodic OA compilation[^64] | • Hybrid architecture<br>• Tiered reporting<br>• Event-driven updates | • Streaming infrastructure<br>• Batch processing<br>• Cache management | • Priority notifications<br>• Periodic reconciliation<br>• Version control |
| System interoperability | Integration with existing databases and conventions | • API standards<br>• Data exchange protocols<br>• Federated queries | • Technical specifications<br>• Testing environments<br>• Partner agreements | • Phased integration<br>• Backward compatibility<br>• Fallback options |
| **Institutional Challenges** | | | | |
| Agency coordination | Statistics offices vs. ocean agencies with different mandates[^65] | • Multi-agency frameworks<br>• Clear role definition<br>• Joint protocols | • MOUs/agreements<br>• Coordination bodies<br>• Resource sharing | • High-level mandate<br>• Regular communication<br>• Shared benefits |
| Reporting burden | Multiple convention obligations creating duplication[^66] | • Integrated reporting<br>• Once-only principle<br>• Automated generation | • Requirement mapping<br>• Common formats<br>• Convention alignment | • Stakeholder engagement<br>• Efficiency metrics<br>• Gradual adoption |
| Resource mobilization | Sustaining funding beyond initial pilots[^67] | • Demonstrated ROI<br>• Cost-sharing models<br>• Efficiency gains | • Business cases<br>• Impact assessment<br>• Donor coordination | • Quick wins<br>• Regular reporting<br>• Diversified funding |
| Capacity constraints | Limited technical expertise in developing countries | • Modular implementation<br>• Regional cooperation<br>• Technology transfer | • Training programs<br>• Expert networks<br>• Technical assistance | • South-South learning<br>• Mentorship programs<br>• Long-term support |
| **Equity Considerations** | | | | |
| SIDS/LDC participation | Structural inequalities in technical and financial capacity[^68] | • Rapid assessment tools<br>• Simplified interfaces<br>• Targeted support | • Dedicated funding<br>• Regional hubs<br>• Peer assistance | • Prioritized access<br>• Flexible timelines<br>• Success recognition |
| Traditional knowledge | Protecting indigenous data sovereignty[^69] | • FPIC protocols<br>• Access controls<br>• Attribution systems | • Community agreements<br>• Data governance<br>• Benefit-sharing | • Trust building<br>• Cultural protocols<br>• Legal frameworks |
| Digital divide | Varying technical sophistication and infrastructure[^70] | • Multiple interfaces<br>• Offline capabilities<br>• Mobile access | • Progressive enhancement<br>• Low-bandwidth options<br>• Local hosting | • Basic functionality first<br>• Graceful degradation<br>• Alternative channels |
| Language barriers | Multi-lingual requirements for global participation | • Translation services<br>• Local terminology<br>• Visual communication | • Professional translation<br>• Community review<br>• Icon systems | • Priority languages<br>• Machine translation<br>• Cultural adaptation |

</div>

### Solution Integration Strategy

Ocean Accounts provides systematic approaches to each challenge category through:

1. **Technical solutions** leveraging established SEEA standards and flexible architecture accommodating diverse national contexts while maintaining global comparability.

2. **Institutional solutions** building on existing statistical and environmental accounting frameworks, reducing duplication while enhancing coordination.

3. **Equity solutions** ensuring meaningful participation through tiered implementation, regional cooperation, and respect for diverse knowledge systems.

Success requires recognizing these challenges as opportunities for innovation rather than barriers to implementation, with Ocean Accounts providing the structured framework for systematic solutions.

## 7. Recommendations and Conclusion

### 7.1 Policy Recommendations

The Preparatory Commission and first Conference of Parties should formally adopt Ocean Accounts Framework principles as the foundational data architecture for CHM development, providing the standardization essential for systematic implementation while maintaining flexibility for national circumstances. This adoption need not require comprehensive Ocean Accounts implementation immediately but should establish accounting principles—stocks versus flows, spatial consistency, temporal comparability—as design requirements shaping CHM technical specifications.

Establishing an Ocean Accounts-CHM Technical Working Group under PrepCom auspices with balanced representation from developed and developing countries, technical experts and policy practitioners, would provide the collaborative mechanism needed to develop detailed integration protocols before COP-1 decisions lock in architectural choices. This group's mandate should extend beyond technical specifications to encompass capacity-building strategies, resource mobilization plans, and equity safeguards ensuring that integration serves all parties rather than privileging those with existing accounting systems.

Pilot projects in volunteer countries representing diverse contexts—SIDS with traditional knowledge systems, developed countries with established accounts, regional collaborations pooling resources—should commence immediately to generate practical lessons informing broader implementation. These pilots should receive dedicated support from the BBNJ financial mechanism once established, demonstrating that Ocean Accounts-CHM integration represents a priority investment in treaty effectiveness rather than an optional enhancement.

### 7.2 Technical Recommendations

CHM data standards should build on SEEA principles while extending them for BBNJ-specific requirements, particularly around MGR tracking, traditional knowledge integration, and governance indicators not traditionally included in environmental-economic accounts. API specifications enabling automated data exchange between national Ocean Accounts and the global CHM should prioritize simplicity and reliability over sophisticated features that might exclude parties with limited technical infrastructure.

Modular implementation approaches allowing countries to begin with basic components—spatial framework, key ecosystem assets, priority economic flows—before adding complexity reduces entry barriers while building toward comprehensive coverage. This modularity should extend to the CHM interface, where simple data entry options coexist with sophisticated automated feeds, ensuring that all parties can participate regardless of technical capacity.

Data quality assurance protocols must balance scientific rigor with practical constraints, accepting that imperfect data systematically compiled provides more value than perfect data sporadically available. Ocean Accounts' emphasis on documenting uncertainty and data quality through metadata provides a model for maintaining transparency about information limitations while avoiding paralysis from pursuing unattainable perfection.

### 7.3 Conclusion

Ocean Accounts offers more than technical solutions to CHM implementation challenges—it provides a conceptual framework for transforming how humanity understands and governs ocean spaces that belong to all yet are managed by none. By systematically documenting relationships between ocean ecosystems, human economies, and social wellbeing, integrated Ocean Accounts-CHM systems can shift ocean governance from reactive regulation of problems to proactive management of opportunities.

The convergence of Ocean Accounts methodological maturity with BBNJ implementation urgency creates unprecedented opportunity for establishing ocean information architecture supporting sustainable development for generations. Success requires immediate action, sustained commitment, and inclusive collaboration ensuring that standardized systems serve diverse needs rather than imposing uniformity that marginalizes difference.

Ultimately, Ocean Accounts-CHM integration represents investment in ocean governance infrastructure as fundamental as ports and research vessels—invisible yet essential foundations enabling evidence-based decisions about humanity's largest shared resource. The choice facing BBNJ parties is not whether to integrate these systems but how quickly ambition can match the urgency of ocean challenges demanding systematic solutions.

## References

[^1]: Agreement under the United Nations Convention on the Law of the Sea on the Conservation and Sustainable Use of Marine Biological Diversity of Areas Beyond National Jurisdiction, June 19, 2023, Article 51. https://www.un.org/bbnj/sites/www.un.org.bbnj/files/draft_agreement_advanced_unedited_for_posting_v1.pdf

[^2]: High Seas Alliance, *Operationalizing the Clearing-House Mechanism*, PrepCom Deep Dive Series (April 2025), 3-5. https://highseasalliance.org/wp-content/uploads/2025/04/PrepCom-Deep-Dive-CIHM-April-2025-1.pdf

[^3]: Global Ocean Accounts Partnership (GOAP), *Ocean Accounting for Sustainable Ocean Development: Technical Guidance* (2025). https://www.oceanaccounts.org [hereinafter OA-Guidance].

[^4]: OA-Guidance, Section 3.5 (Spatial Data Framework).

[^5]: Lawson, C., et al., "Data Management and the 'BBNJ Standardized Batch Identifier' under the BBNJ Agreement," in *Decoding MGR Governance under the BBNJ Agreement* (Springer, 2024), 145-167. https://doi.org/10.1007/978-3-031-72100-7_2

[^6]: Boettcher, M., & Brent, K., "The potential of the BBNJ clearing house mechanism to enhance knowledge pluralism in marine carbon dioxide removal assessment," *Frontiers in Climate* 6 (2024): 1497476. https://doi.org/10.3389/fclim.2024.1497476

[^7]: OA-Guidance, Section 3.5 (Environmental Assets).

[^8]: United Nations, *System of Environmental-Economic Accounting—Ecosystem Accounting* (2021), Chapter 12. https://seea.un.org/ecosystem-accounting

[^9]: IDDRI, *The first substantive BBNJ Agreement Preparatory Committee: Preparing the ground for future implementation*, Policy Brief (April 2025), 8-10. https://www.iddri.org/en/publications-and-events/policy-brief/first-substantive-bbnj-agreement-preparatory-committee

[^10]: Gaebel, C., et al., "The BBNJ clearing-house mechanism: considerations for its diverse functions, users, and sources," *Frontiers in Ocean Sustainability* 3 (2025): 1584927. https://doi.org/10.3389/focsu.2025.1584927

[^11]: UN General Assembly Resolution 72/249, December 24, 2017. https://documents.un.org/doc/undoc/gen/n17/468/77/pdf/n1746877.pdf

[^12]: BBNJ Agreement, Articles 10-13 (Marine Genetic Resources).

[^13]: Kim, R.E., "The Likely Impact of the BBNJ Agreement on the Architecture of Ocean Governance," *Marine Policy* 165 (2024): 106190. https://doi.org/10.1016/j.marpol.2024.106190

[^14]: BBNJ Agreement, Article 51.

[^15]: PrepCom-1 Report, UN Doc. A/CONF.232/2025/1, paras. 45-52.

[^16]: OA-Guidance, Section 3.3 (Definition and Scope).

[^17]: United Nations, *System of Environmental-Economic Accounting 2012: Central Framework* (2014). https://seea.un.org/content/seea-central-framework

[^18]: Fenichel, E.P., et al., "Modifying national accounts for sustainable ocean development," *Nature Sustainability* 3 (2020): 889-895. https://doi.org/10.1038/s41893-020-0592-8

[^19]: Tessler, S., "Enforcement and Compliance under the BBNJ Agreement: The Role of the Clearing-House Mechanism," *Ocean Development & International Law* 55(3) (2024): 245-267. https://doi.org/10.1080/00908320.2024.2301234

[^20]: OA-Guidance, Section 3.5 (Conceptual Components).

[^21]: Keith, D.A., et al., "A function-based typology for Earth's ecosystems," *Nature* 610 (2022): 513-518. https://doi.org/10.1038/s41586-022-05318-4

[^22]: Pacific Community, *Pacific Ocean Accounts Initiative: Regional Framework* (2024).

[^23]: Vierros, M.K., et al., "Considering Indigenous Peoples and local communities in governance of the global ocean commons," *Marine Policy* 119 (2020): 104039. https://doi.org/10.1016/j.marpol.2020.104039

[^24]: SEEA-EA, Chapter 5 (Ecosystem Condition Accounts).

[^25]: Australian Bureau of Statistics, *Experimental Ocean Accounts* (2022).

[^26]: Vardon, M., et al., "How the System of Environmental-Economic Accounting can improve environmental information systems and data quality for decision making," *Environmental Science & Policy* 89 (2018): 83-92. https://doi.org/10.1016/j.envsci.2018.07.003

[^27]: IPBES, *Global Assessment Report on Biodiversity and Ecosystem Services* (2019), Chapter 2. https://doi.org/10.5281/zenodo.3831673

[^28]: Bennett, N.J., et al., "Blue growth and blue justice: Ten risks and solutions for the ocean economy," *Marine Policy* 125 (2021): 104387. https://doi.org/10.1016/j.marpol.2020.104387

[^29]: Cisneros-Montemayor, A.M., et al., "Social equity and benefits as the nexus of a transformative Blue Economy: A sectoral review of implications," *Marine Policy* 109 (2019): 103702. https://doi.org/10.1016/j.marpol.2019.103702

[^30]: OECD, *Ocean Economy Database* (2024).

[^31]: IOC-UNESCO, *Global Ocean Science Report 2020: Charting Capacity for Ocean Sustainability* (Paris: UNESCO, 2020). https://unesdoc.unesco.org/ark:/48223/pf0000375147

[^32]: Jolliffe, J., Jolly, C., & Stevens, B., "Blueprint for improved measurement of the international ocean economy: An exploration of satellite accounting for ocean economic activity," OECD Science, Technology and Industry Working Papers, No. 2021/04 (Paris: OECD Publishing, 2021). https://doi.org/10.1787/aff5375b-en

[^33]: Colgan, C.S., "Measurement of the ocean economy from national income accounts to the sustainable blue economy," *Journal of Ocean and Coastal Economics* 2(2) (2016): Article 12. https://doi.org/10.15351/2373-8456.1061

[^34]: FAO, *The State of World Fisheries and Aquaculture 2024: Blue Transformation in Action* (Rome: FAO, 2024). https://doi.org/10.4060/cd0683en

[^35]: Berkes, F., *Sacred Ecology* (4th ed., Routledge, 2018).

[^36]: Hoegh-Guldberg, O., et al., *The Ocean as a Solution to Climate Change: Five Opportunities for Action*, Report (Washington, DC: World Resources Institute, 2019). https://oceanpanel.org/sites/default/files/2019-10/HLP_Report_Ocean_Solution_Climate_Change_final.pdf

[^37]: Laffoley, D., & Baxter, J., *Ocean Connections: Rising Risks from a Warming Ocean* (2018).

[^38]: GESAMP, *Sources, Fate and Effects of Microplastics in the Marine Environment: Part 2 of a Global Assessment*, IMO/FAO/UNESCO-IOC/UNIDO/WMO/IAEA/UN/UNEP/UNDP/ISA Joint Group of Experts on the Scientific Aspects of Marine Environmental Protection, Reports and Studies No. 93 (2020). http://www.gesamp.org/publications/microplastics-in-the-marine-environment-part-2

[^39]: UNEP, *From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution* (Nairobi: UNEP, 2021). https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution

[^40]: Sumaila, U.R., et al., "Updated estimates and analysis of global fisheries subsidies," *Marine Policy* 109 (2019): 103695. https://doi.org/10.1016/j.marpol.2019.103695

[^41]: World Bank, *The Sunken Billions Revisited: Progress and Challenges in Global Marine Fisheries* (Washington, DC: World Bank, 2017). https://doi.org/10.1596/978-1-4648-0919-4

[^42]: Österblom, H., et al., "Transnational corporations as 'keystone actors' in marine ecosystems," *PLOS ONE* 10(5) (2015): e0127533. https://doi.org/10.1371/journal.pone.0127533

[^43]: Alexander, K.A., et al., "Progress in integrating natural and social science in marine ecosystem-based management research," *Marine Policy* 108 (2019): 103642. https://doi.org/10.1016/j.marpol.2019.103642

[^44]: Barbier, E.B., "Marine ecosystem services," *Current Biology* 27(11) (2017): R507-R510. https://doi.org/10.1016/j.cub.2017.03.020

[^45]: De Groot, R., et al., "Global estimates of the value of ecosystems and their services in monetary units," *Ecosystem Services* 1(1) (2012): 50-61. https://doi.org/10.1016/j.ecoser.2012.07.005

[^46]: Liquete, C., et al., "Current status and future prospects for the assessment of marine and coastal ecosystem services: A systematic review," *Science of the Total Environment* 463-464 (2013): 1-14. https://doi.org/10.1016/j.scitotenv.2013.05.042

[^47]: Townsend, M., et al., "The challenge of implementing the marine ecosystem service concept," *Frontiers in Marine Science* 5 (2018): 359. https://doi.org/10.3389/fmars.2018.00359

[^48]: Ruijs, A., Vardon, M., Bass, S., & Ahlroth, S., "Natural capital accounting for better policy," *Ambio* 48 (2019): 714-725. https://doi.org/10.1007/s13280-018-1107-y

[^49]: PrepCom-2 Working Document, UN Doc. A/CONF.232/2025/WP.1.

[^50]: High Seas Alliance, *PrepCom Deep Dive Series* (2025), 12-15.

[^51]: ISO 19115-3:2016, *Geographic information — Metadata*.

[^52]: Stuchtey, M., et al., *Ocean Solutions That Benefit People, Nature and the Economy*, Report (Washington, DC: World Resources Institute, 2020). https://oceanpanel.org/sites/default/files/2020-10/Ocean%20Solutions%20Report%20FINAL.pdf

[^53]: Australian Bureau of Statistics, *Ocean Accounts Implementation Guide* (2023).

[^54]: Gacutan, J., et al., "Marine spatial planning and ocean accounting: Synergistic tools enhancing integration in ocean governance," *Marine Policy* 136 (2022): 104936. https://doi.org/10.1016/j.marpol.2021.104936

[^55]: UNDP, *South-South Cooperation for Ocean Governance* (2024).

[^56]: Chen, W., Van Assche, K., Hynes, S., Bekkby, T., Christie, H.C., & Gundersen, H., "Ecosystem accounting's potential to support coastal and marine governance," *Marine Policy* 112 (2020): 103758. https://doi.org/10.1016/j.marpol.2019.103758

[^57]: Virdin, J., et al., *The Ocean 100: Transnational Corporations in the Ocean Economy*, Science Advances 7(16) (2021): eabc8041. https://doi.org/10.1126/sciadv.abc8041

[^58]: Nash, K.L., et al., "To achieve a sustainable blue future, progress assessments must include interdependencies between the sustainable development goals," *One Earth* 2(2) (2020): 161-173. https://doi.org/10.1016/j.oneear.2020.01.008

[^59]: Australian Department of Environment, *National Ocean Accounts Progress Report* (2024).

[^60]: Pacific Community, *Regional Ocean Accounts Framework* (2024).

[^61]: European Commission, *EU Ocean Observation Initiative* (2023).

[^62]: Pendleton, L., et al., "Disrupting data sharing for a healthier ocean," *ICES Journal of Marine Science* 76(6) (2019): 1415-1423. https://doi.org/10.1093/icesjms/fsz068

[^63]: Halpern, B.S., et al., "Recent pace of change in human impact on the world's ocean," *Scientific Reports* 9 (2019): 11609. https://doi.org/10.1038/s41598-019-47201-9

[^64]: CBD Secretariat, *Technical Series No. 101: Guidelines for Marine Spatial Data Management* (Montreal: CBD, 2023). https://www.cbd.int/doc/publications/cbd-ts-101-en.pdf

[^65]: UNSD, *Institutional Arrangements for Environmental-Economic Accounting: A Global Assessment* (New York: UN, 2022). https://seea.un.org/content/global-assessment-environmental-economic-accounting

[^66]: Winther, J.G., et al., *Integrated Ocean Management*, Blue Paper (Washington, DC: World Resources Institute, 2020). https://oceanpanel.org/sites/default/files/2020-10/Integrated%20Ocean%20Management.pdf

[^67]: Claudet, J., et al., "A Roadmap for Using the UN Decade of Ocean Science for Sustainable Development in Support of Science Policy Action," *One Earth* 2(1) (2020): 34-42. https://doi.org/10.1016/j.oneear.2019.12.002

[^68]: Singh, G.G., et al., "Will understanding the ocean lead to 'the ocean we want'? A critical analysis of the UN Decade of Ocean Science for Sustainable Development," *Frontiers in Marine Science* 6 (2019): 924. https://doi.org/10.3389/fmars.2019.00924

[^69]: Pascual, U., et al., "Valuing nature's contributions to people: the IPBES approach," *Current Opinion in Environmental Sustainability* 26-27 (2017): 7-16. https://doi.org/10.1016/j.cosust.2016.12.006

[^70]: Bennett, N.J., "Navigating a just and inclusive path towards sustainable oceans," *Marine Policy* 97 (2018): 139-146. https://doi.org/10.1016/j.marpol.2018.06.012

[^71]: Refer to footnote 10 above (Gaebel et al. 2025).

[^72]: Humphries, F., Rabone, M., & Jaspars, M., "The Novel Notification and Information System for Marine Genetic Resources under the BBNJ Agreement," in *Ocean Governance and the Implementation of SDG 14* (Springer, 2024), 189-215. https://doi.org/10.1007/978-3-031-20740-2_9

[^73]: Refer to footnote 23 above (Vierros et al. 2020).

[^74]: Refer to footnote 3 above (OA-Guidance).
