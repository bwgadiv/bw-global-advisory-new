
import { ReportParameters, GlobalCityData } from './types';

export const INITIAL_PARAMETERS: ReportParameters = {
  // Identity
  reportName: '',
  userName: '',
  userDepartment: '',
  skillLevel: 'experienced',
  userCountry: '',
  userTier: 'Tier 1',
  
  // Organization
  organizationName: '',
  organizationType: 'Private Enterprise',
  organizationSubType: '',
  region: '',
  country: '',
  industry: [],
  customIndustry: '',
  tier: [],
  
  // Strategy
  strategicIntent: '',
  strategicMode: 'analysis',
  problemStatement: '',
  idealPartnerProfile: '',
  analysisTimeframe: '12 months',
  strategicObjectives: [],
  specificOpportunity: '', 
  targetIncentives: [], 
  
  // Execution
  relationshipStage: 'New',
  dueDiligenceDepth: 'Standard',
  partnerCapabilities: [],
  operationalPriority: 'Efficiency',
  riskTolerance: 'Medium',
  expansionTimeline: '1-2 Years',
  partnershipSupportNeeds: [],

  // Metadata
  id: '',
  createdAt: '',
  status: 'draft',
  
  // UI Helpers
  selectedAgents: ['Scout', 'Strategist', 'Diplomat', 'Analyzer', 'Forecaster'],
  selectedModels: ['Partnership [SPI]', 'Investment [IVAS]', 'Financial [SCF]', 'Assets [LAI]', 'Risk [PRI]', 'Growth [AGI]'],
  selectedModules: ['Rocket Engine Module', 'Symbiotic Matchmaking', 'RROI Diagnostic', 'Geopolitical Analysis', 'Governance Audit', 'Due Diligence Suite'],
  analyticalModules: [],
  aiPersona: [],
  customAiPersona: '',
  
  // Output Config
  reportLength: 'standard',
  outputFormat: 'report',
  letterStyle: 'Formal Exploratory',
  stakeholderPerspectives: [],
  includeCrossSectorMatches: true,
  matchCount: 5,
  partnerDiscoveryMode: false,
  searchScope: 'Global',
  intentTags: [],
  comparativeContext: [],
  additionalContext: '',
  opportunityScore: { totalScore: 0, marketPotential: 0, riskFactors: 0 },
};

export const SECTOR_THEMES: Record<string, { bg: string, border: string, text: string, icon: string }> = {
    'Banking & Finance': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: '💰' },
    'Technology': { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', icon: '⚡' },
    'Government': { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800', icon: '🏛️' },
    'Healthcare': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', icon: '⚕️' },
    'Energy': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: '🔋' },
    'Default': { bg: 'bg-stone-50', border: 'border-stone-200', text: 'text-stone-800', icon: '🏢' }
};

export const SECTOR_DEPARTMENTS: Record<string, string[]> = {
    'Banking & Finance': [
        'Investment Banking Division', 'Risk Management', 'Compliance & Regulatory', 'Private Wealth', 
        'Corporate Lending', 'Capital Markets', 'Fintech Innovation', 'Treasury'
    ],
    'Technology': [
        'Engineering / R&D', 'Product Management', 'Strategic Partnerships', 'Sales & Revenue', 
        'Data Science', 'Cloud Infrastructure', 'Cybersecurity'
    ],
    'Government': [
        'Ministry of Economy', 'Trade & Investment Agency', 'Foreign Affairs', 'Infrastructure Development', 
        'Policy & Planning', 'Regulatory Oversight'
    ],
    'Healthcare': [
        'Clinical Operations', 'Medical Affairs', 'R&D (Pharma)', 'Supply Chain', 'Hospital Administration', 'Public Health'
    ],
    'Energy': [
        'Exploration & Production', 'Renewables Division', 'Grid Operations', 'Sustainability / ESG', 'Project Finance'
    ],
    'Manufacturing': [
        'Operations', 'Supply Chain', 'Quality Assurance', 'Plant Management', 'Procurement', 'Product Design'
    ]
};

export const SECTORS_LIST = [
  'Government',
  'Technology',
  'Banking & Finance',
  'Education',
  'Business Services',
  'Infrastructure',
  'Healthcare',
  'Energy',
  'Defense',
  'Manufacturing',
  'Agriculture',
  'Mining',
  'Tourism',
  'Real Estate',
  'Non-Profit / NGO'
];

export const ORGANIZATION_TYPES = [
    'Private Enterprise',
    'Financial Institution',
    'Government / Public Sector',
    'Sovereign Wealth Fund',
    'NGO / Non-Profit',
    'Academic / Research Institution',
    'Multilateral Organization',
    'Family Office',
    'Startup / Scaleup',
    'Conglomerate / Holding Co.'
];

export const ORGANIZATION_SUBTYPES: Record<string, string[]> = {
    'Private Enterprise': ['Corporation', 'Startup', 'SME', 'Conglomerate', 'PE Firm'],
    'Financial Institution': ['Investment Bank', 'Commercial Bank', 'Asset Manager', 'Insurance', 'Fintech'],
    'Government / Public Sector': ['Ministry', 'Agency', 'Local Government', 'Regulator', 'State-Owned Enterprise'],
    'Sovereign Wealth Fund': ['National', 'State', 'Pension', 'Strategic Investment Fund'],
    'NGO / Non-Profit': ['Foundation', 'Association', 'Charity', 'Think Tank', 'Development Finance Institution'],
    'Custom': []
};

export const REGIONS_AND_COUNTRIES = [
    { name: 'Asia-Pacific', countries: ['Singapore', 'Vietnam', 'Japan', 'Australia', 'China', 'India', 'Indonesia', 'Thailand', 'South Korea', 'New Zealand', 'Philippines', 'Malaysia', 'Taiwan', 'Bangladesh'] },
    { name: 'Europe', countries: ['United Kingdom', 'Germany', 'France', 'Estonia', 'Switzerland', 'Netherlands', 'Belgium', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Spain', 'Italy', 'Portugal', 'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Ireland'] },
    { name: 'North America', countries: ['United States', 'Canada', 'Mexico'] },
    { name: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Israel', 'Kuwait', 'Bahrain', 'Oman', 'Turkey', 'Jordan', 'Egypt'] },
    { name: 'South America', countries: ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Uruguay'] },
    { name: 'Africa', countries: ['South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Ethiopia', 'Rwanda', 'Tanzania', 'Morocco', 'Tunisia', 'Ivory Coast'] }
];

export const COUNTRIES = REGIONS_AND_COUNTRIES.flatMap(r => r.countries).sort();

export const STRATEGIC_OBJECTIVES = {
    Growth: [{ id: 'market_entry', label: 'Market Entry' }, { id: 'expansion', label: 'Expansion' }, { id: 'acquisition', label: 'M&A' }, { id: 'ipo_prep', label: 'IPO Preparation' }],
    Efficiency: [{ id: 'cost_reduction', label: 'Cost Reduction' }, { id: 'supply_chain', label: 'Supply Chain Opt' }, { id: 'automation', label: 'Automation / AI' }],
    Innovation: [{ id: 'rd', label: 'R&D' }, { id: 'tech_transfer', label: 'Tech Transfer' }, { id: 'product_launch', label: 'New Product Launch' }],
    Risk: [{ id: 'diversification', label: 'Diversification' }, { id: 'compliance', label: 'Compliance' }, { id: 'crisis_mgmt', label: 'Crisis Management' }],
    Impact: [{ id: 'esg', label: 'ESG / Sustainability' }, { id: 'job_creation', label: 'Job Creation' }, { id: 'national_dev', label: 'National Development' }]
};

export const SECTOR_OPPORTUNITIES: Record<string, string[]> = {
    'Technology': [
        'National Data Center Infrastructure',
        '5G Network Rollout & TowerCo',
        'Smart City Operation Center',
        'E-Government Portal Development',
        'Cybersecurity Operations Center (SOC)',
        'Tech Park / Innovation Hub Development',
        'Semiconductor Fabrication / Assembly',
        'Fiber Optic Backbone Expansion',
        'Fintech Sandbox Implementation',
        'AI Sovereign Cloud Initiative'
    ],
    'Energy': [
        'Utility-Scale Solar PV Plant',
        'Offshore / Onshore Wind Farm',
        'Green Hydrogen Production Hub',
        'National Grid Modernization',
        'Waste-to-Energy Plant',
        'LNG Terminal & Regasification',
        'Hydroelectric Dam Refurbishment',
        'Battery Energy Storage System (BESS)',
        'Nuclear SMR Deployment',
        'Cross-Border Interconnector'
    ],
    'Infrastructure': [
        'Deep Water Port Expansion',
        'International Airport Terminal',
        'High-Speed Rail Corridor',
        'Toll Road / Expressway Concession',
        'Mass Transit System (Metro/LRT)',
        'Water Treatment & Desalination',
        'Affordable Housing PPP',
        'Industrial Park Development',
        'Special Economic Zone (SEZ)',
        'Cold Chain Logistics Network'
    ],
    'Healthcare': [
        'National Hospital Network PPP',
        'Pharmaceutical Manufacturing Plant',
        'Telemedicine Infrastructure',
        'Medical Device Production',
        'Specialized Cancer/Cardiac Center',
        'Vaccine Production Facility',
        'Health Information System (HIS)',
        'Medical Tourism Hub'
    ],
    'Agriculture': [
        'Agro-Processing Industrial Park',
        'Smart Farming / AgTech Pilot',
        'Aquaculture & Fisheries Hub',
        'Irrigation Infrastructure Upgrade',
        'Export Certification Laboratory',
        'Fertilizer Production Plant',
        'Biofuel / Biomass Facility',
        'Commodity Exchange Setup'
    ],
    'Manufacturing': [
        'EV Assembly Plant',
        'Battery Gigafactory',
        'Textile & Garment Park',
        'Electronics Manufacturing Services',
        'Heavy Machinery Plant',
        'Food & Beverage Processing',
        'Aerospace Component Mfg',
        'Green Steel / Aluminum Plant'
    ],
    'Banking & Finance': [
        'Digital Bank Licensing',
        'SME Credit Guarantee Fund',
        'National Payment Switch',
        'Green Bond Issuance',
        'Venture Capital Fund Setup',
        'Insurance Market Liberalization',
        'Stock Exchange Modernization',
        'Crypto / Asset Registry'
    ],
    'Mining': [
        'Critical Minerals Extraction',
        'Rare Earth Processing',
        'Mining Infrastructure (Rail/Port)',
        'Smelter / Refinery Construction',
        'Sustainable Mining Tech',
        'Geological Survey / Mapping'
    ],
    'Tourism': [
        'Integrated Resort / Casino',
        'Eco-Tourism Zone Development',
        'Cruise Terminal',
        'Heritage Site Restoration',
        'Hotel Chain Expansion',
        'MICE Convention Center'
    ],
    'Defense': [
        'Defense Equipment Manufacturing',
        'Cyber Defense Infrastructure',
        'Border Security Systems',
        'Naval Shipyard Upgrade',
        'Aerospace Maintenance (MRO)'
    ]
};

export const GOVERNMENT_INCENTIVES = [
    'Tax Holiday (5-10 Years)',
    'Corporate Tax Reduction',
    'Import Duty Exemption',
    'Free Land / Land Lease Subsidy',
    'R&D Grants / Credits',
    'Employment / Training Subsidies',
    'VAT / GST Exemption',
    'Capital Equipment Grants',
    'Infrastructure Connection Subsidy',
    'Fast-Track Permitting',
    'Profit Repatriation Guarantee',
    'Expat Visa Facilitation'
];

export const STRATEGIC_LENSES = [
    { id: 'financial', label: 'Financial', desc: 'ROI, Capital Efficiency, Cash Flow' },
    { id: 'operational', label: 'Operational', desc: 'Logistics, Process, Infrastructure' },
    { id: 'market', label: 'Market', desc: 'Growth, Share, Competitors' },
    { id: 'regulatory', label: 'Regulatory', desc: 'Compliance, Law, Policy' },
    { id: 'cultural', label: 'Cultural', desc: 'People, Values, Alignment' },
    { id: 'technological', label: 'Technological', desc: 'Innovation, IP, Stack' }
];

export const INDUSTRY_NICHES: Record<string, string[]> = {
    'Technology': ['AI/ML', 'SaaS', 'Fintech', 'Cybersecurity', 'IoT', 'Cloud', 'Blockchain', 'Quantum', 'Robotics'],
    'Energy': ['Solar', 'Wind', 'Oil & Gas', 'Nuclear', 'Grid', 'Hydrogen', 'Bioenergy', 'Geothermal'],
    'Healthcare': ['Pharma', 'Biotech', 'Medtech', 'Hospitals', 'Digital Health', 'Diagnostics'],
    'Banking & Finance': ['Investment Banking', 'Retail Banking', 'Insurance', 'Wealth Management', 'PE/VC', 'Capital Markets', 'Payments'],
    'Manufacturing': ['Automotive', 'Aerospace', 'Electronics', 'Chemicals', 'Textiles', 'FMCG'],
    'Government': ['Defense', 'Infrastructure', 'Education', 'Policy', 'Smart City', 'Public Health'],
    'Infrastructure': ['Transport', 'Utilities', 'Real Estate', 'Logistics', 'Water', 'Waste'],
    'Agriculture': ['AgTech', 'Crop Science', 'Livestock', 'Fisheries', 'Forestry'],
    'Mining': ['Precious Metals', 'Base Metals', 'Critical Minerals', 'Coal', 'Quarrying']
};

export const INTELLIGENCE_CATEGORIES = [
    'Market Entry Strategy',
    'Government Relations',
    'Strategic Partnership Development',
    'Supply Chain Optimization',
    'Investment Diligence',
    'Competitor Intelligence',
    'Crisis Response & Resilience',
    'Sovereign Risk Assessment',
    'Technology Transfer Protocol'
];

// EXPANDED PROFILE FIELDS
export const MANDATE_TYPES = [
  'Economic Development',
  'Investment Promotion',
  'Infrastructure Delivery',
  'Regulator',
  'Sovereign Investor',
  'Commercial Operator',
  'Development Finance',
  'Community / Social',
  'Academic / R&D',
  'Trade Facilitation'
];

export const PARTNERSHIP_ROLES = [
  'Capital Provider',
  'Asset Owner',
  'Technology Provider',
  'Operator',
  'Offtaker',
  'Regulator / Approver',
  'Knowledge Partner',
  'Service Provider',
  'Joint Venture Partner',
  'EPC Contractor'
];

export const DECISION_AUTHORITY_LEVELS = [
  { value: 'analyst', label: 'Working-level Analyst' },
  { value: 'project_lead', label: 'Project Lead / Manager' },
  { value: 'director', label: 'Director-General / Deputy Secretary' },
  { value: 'executive', label: 'Minister\'s Office / C-Suite' },
  { value: 'board', label: 'Board / Cabinet' }
];

export const ORGANIZATION_SCALE_BANDS = {
  revenue: [
    { value: 'under_10m', label: 'Under $10M' },
    { value: '10m_50m', label: '$10M - $50M' },
    { value: '50m_250m', label: '$50M - $250M' },
    { value: '250m_1b', label: '$250M - $1B' },
    { value: 'over_1b', label: 'Over $1B' }
  ],
  headcount: [
    { value: 'under_50', label: 'Under 50' },
    { value: '50_250', label: '50 - 250' },
    { value: '250_1000', label: '250 - 1,000' },
    { value: '1000_5000', label: '1,000 - 5,000' },
    { value: 'over_5000', label: 'Over 5,000' }
  ],
  dealSize: [
    { value: 'under_10m', label: 'Under $10M' },
    { value: '10m_50m', label: '$10M - $50M' },
    { value: '50m_250m', label: '$50M - $250M' },
    { value: 'over_250m', label: 'Over $250M' }
  ]
};

export const REGIONAL_PRESENCE = [
  { value: 'operating', label: 'Already Operating / Offices' },
  { value: 'exploring', label: 'Exploring Only' },
  { value: 'no_presence', label: 'No Presence' },
  { value: 'exited', label: 'Previously Exited' }
];

export const RISK_APPETITE_LEVELS = [
  { value: 'very_low', label: 'Very Low - Conservative' },
  { value: 'moderate', label: 'Moderate - Balanced' },
  { value: 'high', label: 'High - Growth-Focused' },
  { value: 'opportunistic', label: 'Opportunistic - Aggressive' }
];

export const TIME_HORIZONS = [
  { value: '0_6_months', label: '0-6 Months (Immediate)' },
  { value: '6_12_months', label: '6-12 Months (Short-term)' },
  { value: '1_2_years', label: '1-2 Years (Medium-term)' },
  { value: '3_5_years', label: '3-5 Years (Long-term)' },
  { value: '5_plus_years', label: '5+ Years (Strategic)' }
];

export const PRIORITY_THEMES = [
  'Climate / Energy Transition',
  'Digital Transformation',
  'Defence / Security',
  'Agrifood / Agriculture',
  'Health / Life Sciences',
  'Transport & Logistics',
  'Tourism / Hospitality',
  'Mining / Resources',
  'Financial Services',
  'Education / Skills',
  'Smart Cities',
  'Water / Utilities',
  'Gender Equality / Inclusion',
  'Circular Economy'
];

// EXPANDED MISSION FIELDS
export const MISSION_TYPES = [
  { value: 'attract_fdi', label: 'Attract Foreign Direct Investment' },
  { value: 'government_partner', label: 'Secure Government Partner' },
  { value: 'corporate_partner', label: 'Secure Corporate Strategic Partner' },
  { value: 'ppp', label: 'PPP / Concession' },
  { value: 'tender', label: 'Tender / Procurement Response' },
  { value: 'market_entry', label: 'Market Entry' },
  { value: 'supply_chain', label: 'Supply Chain Diversification' },
  { value: 'tech_transfer', label: 'Technology Transfer' },
  { value: 'grant_aid', label: 'Grant / Aid' },
  { value: 'project_finance', label: 'Debt / Project Finance' },
  { value: 'joint_venture', label: 'Joint Venture Formation' },
  { value: 'licensing', label: 'Licensing / Franchising' },
  { value: 'strategic_alliance', label: 'Strategic Alliance' },
  { value: 'capacity_building', label: 'Capacity Building / Training' },
  { value: 'policy_advocacy', label: 'Policy Advocacy / Reform' },
  { value: 'research_collab', label: 'Research Collaboration' },
  { value: 'export_promotion', label: 'Export Promotion' },
  { value: 'import_substitution', label: 'Import Substitution' },
  { value: 'privatization', label: 'Privatization / Divestiture' },
  { value: 'merger_acquisition', label: 'Merger / Acquisition' },
  { value: 'asset_recycling', label: 'Asset Recycling' },
  { value: 'ecosystem_dev', label: 'Ecosystem Development' },
  { value: 'other', label: 'Other (Specify Below)' }
];

export const DOMAIN_OBJECTIVES: Record<string, {value: string, label: string}[]> = {
    'Government / Public Sector': [
        { value: 'attract_fdi', label: 'Attract Foreign Direct Investment' },
        { value: 'policy_benchmark', label: 'Benchmark Policy Framework' },
        { value: 'sez_development', label: 'Develop Special Economic Zone' },
        { value: 'infrastructure_modernization', label: 'Infrastructure Modernization' },
        { value: 'trade_agreement', label: 'Negotiate Trade Agreement' },
        { value: 'sovereign_wealth_deployment', label: 'Sovereign Wealth Deployment' }
    ],
    'Financial Institution': [
        { value: 'identify_alpha', label: 'Identify Alpha Opportunities' },
        { value: 'portfolio_derisking', label: 'Portfolio De-risking' },
        { value: 'lbo_screening', label: 'LBO Target Screening' },
        { value: 'sovereign_debt_analysis', label: 'Sovereign Debt Analysis' },
        { value: 'market_making', label: 'Market Making / Liquidity' }
    ],
    'Private Enterprise': MISSION_TYPES, // Default to standard list
    'Startup / Scaleup': [
        { value: 'market_entry', label: 'New Market Entry' },
        { value: 'fundraising', label: 'Raise Capital (Series A/B)' },
        { value: 'strategic_partnership', label: 'Find Strategic Partner' },
        { value: 'supply_chain', label: 'Secure Supply Chain' }
    ]
};

export const TARGET_COUNTERPART_TYPES = [
  'National Government',
  'Regional Government',
  'City / Municipality',
  'State-Owned Enterprise',
  'Private Corporation',
  'Bank / DFI',
  'NGO / Foundation',
  'University / Research',
  'Multilateral Organization',
  'Trade Association',
  'Sovereign Wealth Fund',
  'Family Office',
  'Accelerator / Incubator',
  'Chamber of Commerce',
  'Industry Consortium',
  'Development Agency',
  'Other (Specify)'
];

export const SUCCESS_METRICS = [
  { value: 'jobs', label: 'Jobs Created' },
  { value: 'capital', label: 'Capital Deployed' },
  { value: 'export', label: 'Export Growth' },
  { value: 'emissions', label: 'Emissions Reduced' },
  { value: 'innovation', label: 'Innovation / IP' },
  { value: 'equity', label: 'Regional Equity / Inclusion' },
  { value: 'infrastructure', label: 'Infrastructure Delivered' },
  { value: 'revenue', label: 'Revenue Growth' },
  { value: 'speed', label: 'Speed to Market' },
  { value: 'resilience', label: 'Supply Resilience' }
];

export const POLITICAL_SENSITIVITIES = [
  'Human Rights',
  'ESG / Environmental',
  'Defence Sensitivity',
  'Sanctions / Geopolitics',
  'Community Opposition',
  'Media / Public Scrutiny',
  'Indigenous Rights',
  'Labor Standards',
  'Data Sovereignty',
  'National Security'
];

// EXPANDED OPERATIONS FIELDS
export const OPERATING_MODELS = [
  { value: 'in_house', label: 'In-house Operations' },
  { value: 'jv', label: 'Joint Venture' },
  { value: 'local_partner', label: 'Local Partner-led' },
  { value: 'no_presence', label: 'No Current Presence' },
  { value: 'spv', label: 'Special Purpose Vehicle (SPV)' },
  { value: 'franchise', label: 'Franchise Model' }
];

export const INTERNAL_CAPABILITIES = [
  'Legal',
  'Procurement',
  'Engineering',
  'Policy / Government Relations',
  'Community Engagement',
  'Finance / Treasury',
  'Project Management',
  'Technical / R&D',
  'Marketing / Communications'
];

export const PROCUREMENT_MODES = [
  { value: 'public_tender', label: 'Public Tender' },
  { value: 'direct_negotiation', label: 'Direct Negotiation' },
  { value: 'framework', label: 'Framework Agreement' },
  { value: 'ppp', label: 'PPP / Concession' },
  { value: 'grant', label: 'Grant / Subsidy' },
  { value: 'g2g', label: 'Government-to-Government (G2G)' },
  { value: 'unsolicited', label: 'Unsolicited Proposal' }
];

export const FUNDING_SOURCES = [
  'Budget (Public)',
  'Sovereign Fund',
  'Commercial Debt',
  'Development Finance',
  'Blended Finance',
  'Grants',
  'Private Equity',
  'Project Finance',
  'Green Bonds',
  'Carbon Credits'
];

export const DECISION_TIMELINE = [
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: '1-6 Months' },
  { value: 'over_12_months', label: 'Over 12 Months' }
];

// EXPANDED NEXUS ENGINE FIELDS
export const OUTPUT_FORMATS = [
  { value: 'leadership_brief', label: '1-Page Leadership Brief' },
  { value: 'narrative_report', label: 'Detailed Narrative Report' },
  { value: 'board_pack', label: 'Board Pack Outline' },
  { value: 'negotiation_prep', label: 'Negotiation Prep Note' },
  { value: 'tender_skeleton', label: 'Tender Response Skeleton' },
  { value: 'stakeholder_brief', label: 'Stakeholder Briefing Notes' },
  { value: 'talking_points', label: 'Talking Points for Executive' },
  { value: 'memo', label: 'Strategic Memo' }
];

export const LETTER_STYLES = [
  { value: 'Formal Exploratory', label: '📋 Formal Exploratory' },
  { value: 'Consultative Partnership', label: '🤝 Consultative Partnership' },
  { value: 'Strategic Aggressive', label: '⚡ Strategic Aggressive' },
  { value: 'Relationship-Focused', label: '💼 Relationship-Focused' },
  { value: 'Diplomatic', label: '🏛️ Diplomatic / G2G' },
  { value: 'Technical', label: '🔧 Technical / Engineering' }
];

export const REPORT_DEPTHS = [
  { value: 'brief', label: '⚡ Brief (200-400w)' },
  { value: 'snapshot', label: '📝 Summary (500-800w)' },
  { value: 'standard', label: '📄 Standard (1.2k-1.5k)' },
  { value: 'detailed', label: '📊 Comprehensive (2k-3k)' },
  { value: 'comprehensive', label: '🏢 Enterprise (4k-6k+)' }
];

export const AVAILABLE_AGENTS = [
  'Scout', 'Strategist', 'Diplomat', 'Analyzer', 'Forecaster', 
  'Implementer', 'Optimizer', 'Monitor', 'Negotiator'
];

export const AVAILABLE_MODELS_CATEGORIZED = {
  'Partnership': ['Partnership [SPI]'],
  'Investment': ['Investment [IVAS]', 'Financial [SCF]', 'Assets [LAI]'],
  'Regional': ['Regional [LQ]', 'Regional [Gravity Model]'],
  'Cultural': ['Cultural [CCI]', 'Cultural [CSA]'],
  'Negotiation': ['Negotiation [BATNA+]', 'Negotiation [NVI]', 'Negotiation [CAP]'],
  'Execution': ['Execution [ATI]', 'Regulatory [RNI]', 'Stakeholder [SAI]', 'Resources [RAI]'],
  'Strategic': ['Growth [AGI]', 'Risk [PRI]', 'Value [VCI]', 'Success [ESI]']
};

export const AVAILABLE_MODELS = Object.values(AVAILABLE_MODELS_CATEGORIZED).flat();

export const AVAILABLE_MODULES = [
  'Rocket Engine Module',
  'Symbiotic Matchmaking',
  'RROI Diagnostic',
  'Geopolitical Analysis',
  'Governance Audit',
  'Due Diligence Suite',
  'Cultural Intelligence',
  'Trade Disruption',
  'Predictive Growth',
  'Location Matcher',
  'Stakeholder Perspective',
  'Relationship Builder',
  'Deep Reasoning Engine',
  'Negotiation Advantage Engine',
  'Mathematical Models Engine',
  'Ethics Safeguard',
  'Export Suite',
  'Quality Analysis',
  'AI Copilot',
  'Data Visualization'
];

export const INDUSTRIES = [
    { id: 'Technology', title: 'Technology & Software' },
    { id: 'Banking & Finance', title: 'Banking & Financial Services' },
    { id: 'Energy', title: 'Energy & Renewables' },
    { id: 'Healthcare', title: 'Healthcare & Pharma' },
    { id: 'Infrastructure', title: 'Infrastructure & Construction' },
    { id: 'Retail', title: 'Retail & E-commerce' },
    { id: 'Agriculture', title: 'Agriculture & Food' },
    { id: 'Manufacturing', title: 'Manufacturing & Industry' },
    { id: 'Mining', title: 'Mining & Metals' },
    { id: 'Transport', title: 'Transport & Logistics' },
    { id: 'Tourism', title: 'Tourism & Hospitality' },
    { id: 'Government', title: 'Government & Defense' },
    { id: 'Non-Profit', title: 'Non-Profit / NGO' }
];

export const GLOBAL_CITY_DATABASE: Record<string, GlobalCityData> = {
    // ... (Keeping existing data logic, assuming it's populating from TYPES correctly now)
    "United States": {
      city: "New York", country: "United States", region: "North America", population: 8400000,
      talentPool: { laborCosts: 10, educationLevel: 9, skillsAvailability: 10 },
      infrastructure: { transportation: 7, digital: 9, utilities: 8 },
      businessEnvironment: { easeOfDoingBusiness: 9, corruptionIndex: 2, regulatoryQuality: 9 },
      marketAccess: { domesticMarket: 10, exportPotential: 8, regionalConnectivity: 9 },
      gdp: { totalBillionUSD: 1700, perCapitaUSD: 85000 }
    },
    // ... simplified for brevity, ensuring types match
};
