import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Users, Target, Globe, ShieldCheck, Zap, 
  Layout, FileText, CheckCircle2, ChevronRight, 
  ChevronLeft, Play, Settings, Database, 
  Briefcase, Clock, AlertTriangle, Layers,
  ArrowRight, Search, Plus, Trash2, MapPin,
  TrendingUp, BarChart3, Scale, Info, Building2, MousePointerClick, Flag, History, PenTool,
  Network, Cpu, MessageSquare, Mic, Share2
} from 'lucide-react';
import { ReportParameters, ReportData, GenerationPhase, LiveOpportunityItem, ReportSection } from '../types';
import { 
    ORGANIZATION_TYPES, 
    REGIONS_AND_COUNTRIES, 
    INDUSTRIES, 
    RISK_APPETITE_LEVELS, 
    TIME_HORIZONS,
    GLOBAL_CITY_DATABASE,
    ORGANIZATION_SCALE_BANDS,
    DECISION_AUTHORITY_LEVELS,
    MISSION_TYPES,
    PRIORITY_THEMES,
    TARGET_COUNTERPART_TYPES,
    SUCCESS_METRICS,
    POLITICAL_SENSITIVITIES,
    FUNDING_SOURCES,
    PROCUREMENT_MODES,
    SECTOR_OPPORTUNITIES,
    GOVERNMENT_INCENTIVES,
    DOMAIN_OBJECTIVES,
    AVAILABLE_AGENTS,
    OUTPUT_FORMATS,
    LETTER_STYLES,
    REPORT_DEPTHS
} from '../constants';

// Module Imports
import RocketEngineModule from './RocketEngineModule';
import MatchmakingEngine from './MatchmakingEngine';
import HistoricalContextComponent from './HistoricalContextComponent';
import { TemporalAnalysisComponent } from './TemporalAnalysisComponent';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { AnalysisModal } from './AnalysisModal';
import { AddOpportunityModal } from './AddOpportunityModal';
import DueDiligenceSuite from './DueDiligenceSuite';
import GlobalPartnerSearch from './GlobalPartnerSearch';
import { ComparativeAnalysis } from './ComparativeAnalysis';
import ScenarioSimulator from './ScenarioSimulator'; // NEW
import CompetitorMap from './CompetitorMap'; // NEW

// Icons
import { RocketIcon, MatchMakerIcon, GlobeIcon, BarChart } from './Icons';

interface MainCanvasProps {
  params: ReportParameters;
  setParams: (params: ReportParameters) => void;
  reportData: ReportData;
  isGenerating: boolean;
  generationPhase: GenerationPhase;
  generationProgress: number;
  onGenerate: () => void;
  reports: ReportParameters[];
  onOpenReport: (report: ReportParameters) => void;
  onDeleteReport: (id: string) => void;
  onNewAnalysis: () => void;
}

// Map internal module IDs to display info
const ENGINE_CATALOG = [
    { id: 'rocket_engine', label: 'Nexus Rocket Engine', desc: 'Latent Asset Identification (LAI) & IVAS Scoring.', icon: RocketIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'matchmaking', label: 'Symbiotic Matchmaker', desc: 'Identify high-asymmetry partners globally.', icon: MatchMakerIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'historical_precedents', label: 'Historical Precedents', desc: 'Match strategy against 100 years of case studies.', icon: History, color: 'text-stone-600', bg: 'bg-stone-100' },
    { id: 'temporal_analysis', label: 'Temporal Phase Analysis', desc: 'Lifecycle stage detection & progression modeling.', icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'geopolitics', label: 'Geopolitical Forecast', desc: 'Regional stability, currency risk & trade barriers.', icon: GlobeIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'governance', label: 'Governance Audit', desc: 'Corruption index, regulatory friction & compliance.', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'deep_reasoning', label: 'Deep Reasoning', desc: 'Adversarial logic check: "Deal Killers" vs "Hidden Gems".', icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'financials', label: 'Financial Modeling', desc: 'Strategic Cash Flow (SCF) & Predictive Growth.', icon: BarChart, color: 'text-green-600', bg: 'bg-green-50' }
];

// Helper Component for Custom/Select Inputs
const SelectOrInput = ({
    label,
    value,
    options,
    onChange,
    placeholder = "Enter custom value..."
}: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (val: string) => void;
    placeholder?: string;
}) => {
    // Determine if the current value is custom (not in options list and not empty)
    const isStandard = options.some(o => o.value === value) || value === "";
    const [isCustomMode, setIsCustomMode] = useState(!isStandard);

    // If value changes externally to a standard option, switch back to select
    useEffect(() => {
        if (options.some(o => o.value === value)) {
            setIsCustomMode(false);
        }
    }, [value, options]);

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-stone-700">{label}</label>
                <button
                    onClick={() => {
                        const nextMode = !isCustomMode;
                        setIsCustomMode(nextMode);
                        if (!nextMode) onChange(""); // Reset if switching back to select
                    }}
                    className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                >
                    {isCustomMode ? <><Layout size={10}/> Switch to List</> : <><PenTool size={10}/> Custom Entry</>}
                </button>
            </div>

            {isCustomMode ? (
                <div className="relative animate-in fade-in duration-200">
                    <input
                        className="w-full p-3 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        autoFocus
                    />
                </div>
            ) : (
                <div className="relative">
                    <select
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-stone-900 transition-shadow appearance-none"
                        value={value}
                        onChange={(e) => {
                            if (e.target.value === "CUSTOM_TRIGGER") {
                                setIsCustomMode(true);
                                onChange("");
                            } else {
                                onChange(e.target.value);
                            }
                        }}
                    >
                        <option value="">Select {label}...</option>
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                        <option disabled>──────────</option>
                        <option value="CUSTOM_TRIGGER">Other / Custom Value...</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                </div>
            )}
        </div>
    );
};

const MainCanvas: React.FC<MainCanvasProps> = ({ 
    params, setParams, reportData, isGenerating, generationPhase, generationProgress, onGenerate,
    reports, onOpenReport, onDeleteReport, onNewAnalysis
}) => {
    // UPDATED: Expanded to 6 steps to allow for deep configuration
    const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
    
    const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
    const [isComparativeModalOpen, setIsComparativeModalOpen] = useState(false);
    const [activeModuleConfig, setActiveModuleConfig] = useState<string | null>(null);
    const [customIncentive, setCustomIncentive] = useState('');
    const [resultTab, setResultTab] = useState<'dossier' | 'simulation' | 'market'>('dossier');
    
    // Feature States for Dynamic Workflow
    const [dueDiligenceTarget, setDueDiligenceTarget] = useState<string>('');
    const [showPartnerSearch, setShowPartnerSearch] = useState(false);

    // Auto-advance logic update
    useEffect(() => {
        if (generationPhase === 'complete' && step !== 6) {
            setStep(6);
        }
    }, [generationPhase]);

    const handleParamChange = (key: keyof ReportParameters, value: any) => {
        setParams({ ...params, [key]: value });
    };

    const toggleModule = (moduleId: string) => {
        const current = params.selectedModules || [];
        const updated = current.includes(moduleId)
            ? current.filter(m => m !== moduleId)
            : [...current, moduleId];
        setParams({ ...params, selectedModules: updated });
    };

    const toggleAgent = (agent: string) => {
        const current = params.selectedAgents || [];
        const updated = current.includes(agent)
            ? current.filter(a => a !== agent)
            : [...current, agent];
        setParams({ ...params, selectedAgents: updated });
    };

    const toggleArrayParam = (key: keyof ReportParameters, value: string) => {
        const current = (params[key] as string[]) || [];
        const updated = current.includes(value) 
            ? current.filter(item => item !== value)
            : [...current, value];
        setParams({ ...params, [key]: updated });
    };

    const handleSaveOpportunity = (item: Omit<LiveOpportunityItem, 'isUserAdded' | 'ai_feasibility_score' | 'ai_risk_assessment'>) => {
        const newOpportunity: LiveOpportunityItem = {
            ...item,
            isUserAdded: true,
            ai_feasibility_score: 85,
            ai_risk_assessment: "Preliminary assessment indicates viable entry point."
        };
        setParams({ ...params, activeOpportunity: newOpportunity });
        setIsOpportunityModalOpen(false);
    };

    const getCityData = () => {
        const regionCities = Object.values(GLOBAL_CITY_DATABASE).filter(c => c.country === params.country);
        return regionCities.length > 0 ? regionCities[0] : null;
    };

    const cityData = getCityData();

    // Determine Objectives List based on Organization Type (Persona Driven)
    const getObjectivesList = () => {
        return DOMAIN_OBJECTIVES[params.organizationType] || DOMAIN_OBJECTIVES['Private Enterprise'];
    };

    // --- STEP 1: ORGANIZATION DNA ---
    const renderStep1_Profile = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Organization DNA</h3>
                    <p className="text-sm text-stone-500">Comprehensive entity profiling for accurate modelling.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* 1. Skill & Persona Selector */}
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <label className="block text-sm font-bold text-stone-900 mb-3 uppercase tracking-wide">Analysis Perspective & Skill Level</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'novice', label: 'Novice / Student', desc: 'Guided experience. I need help navigating terms.' },
                            { id: 'experienced', label: 'Analyst / Lead', desc: 'Standard workflow. I know my requirements.' },
                            { id: 'expert', label: 'Expert / Executive', desc: 'Advanced tools. Give me raw data & controls.' }
                        ].map((level) => (
                            <button 
                                key={level.id} 
                                onClick={() => handleParamChange('skillLevel', level.id)} 
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                    params.skillLevel === level.id 
                                    ? 'border-stone-800 bg-white shadow-md ring-1 ring-stone-800' 
                                    : 'border-stone-200 hover:border-stone-400 text-stone-600 bg-white'
                                }`}
                            >
                                <div className={`font-bold text-sm mb-1 ${params.skillLevel === level.id ? 'text-stone-900' : 'text-stone-700'}`}>{level.label}</div>
                                <div className="text-xs text-stone-500">{level.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Corporate Identity */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Corporate Identity</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-stone-700 block mb-1">Organization Name</label>
                                <input 
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-stone-900 outline-none"
                                    value={params.organizationName}
                                    onChange={(e) => handleParamChange('organizationName', e.target.value)}
                                    placeholder="e.g. Acme Global Industries"
                                />
                            </div>
                            
                            <SelectOrInput
                                label="Entity Type"
                                value={params.organizationType}
                                options={ORGANIZATION_TYPES.map(t => ({ value: t, label: t }))}
                                onChange={(val) => handleParamChange('organizationType', val)}
                                placeholder="e.g. Special Purpose Vehicle"
                            />
                        </div>
                        <div className="space-y-4">
                            <SelectOrInput
                                label="Primary Sector"
                                value={params.industry[0] || ''}
                                options={INDUSTRIES.map(i => ({ value: i.title, label: i.title }))}
                                onChange={(val) => handleParamChange('industry', [val])}
                                placeholder="e.g. Clean Energy"
                            />
                            <div>
                                <label className="text-xs font-bold text-stone-700 block mb-1">Headquarters Address</label>
                                <input 
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white outline-none"
                                    value={params.organizationAddress || ''}
                                    onChange={(e) => handleParamChange('organizationAddress', e.target.value)}
                                    placeholder="123 Strategic Ave, Global City"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Operational Context & Role */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2 flex justify-between">
                        <span>Operational Context & User Role</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <h5 className="text-sm font-bold text-stone-900 border-l-2 border-stone-300 pl-2">Organizational Scale</h5>
                            
                            <SelectOrInput 
                                label="Annual Revenue"
                                value={params.revenueBand || ''}
                                options={ORGANIZATION_SCALE_BANDS.revenue}
                                onChange={(val) => handleParamChange('revenueBand', val)}
                                placeholder="e.g. $2.5M or 'Pre-Revenue'"
                            />

                            <SelectOrInput 
                                label="Global Headcount"
                                value={params.headcountBand || ''}
                                options={ORGANIZATION_SCALE_BANDS.headcount}
                                onChange={(val) => handleParamChange('headcountBand', val)}
                                placeholder="e.g. 15 FTEs"
                            />
                        </div>

                        <div className="space-y-5">
                            <h5 className="text-sm font-bold text-stone-900 border-l-2 border-stone-300 pl-2">Your Role Context</h5>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                                    <input 
                                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" 
                                        value={params.userName} 
                                        onChange={e => handleParamChange('userName', e.target.value)} 
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-700 block mb-1">Department</label>
                                    <input 
                                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" 
                                        value={params.userDepartment} 
                                        onChange={e => handleParamChange('userDepartment', e.target.value)}
                                        placeholder="Dept" 
                                    />
                                </div>
                            </div>
                            <SelectOrInput 
                                label="Role Perspective (Authority)"
                                value={params.decisionAuthority || ''}
                                options={DECISION_AUTHORITY_LEVELS}
                                onChange={(val) => handleParamChange('decisionAuthority', val)}
                                placeholder="e.g. Consultant, Owner, Advisor"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 2: STRATEGIC MANDATE ---
    const renderStep2_Mandate = () => {
        const domainObjectives = getObjectivesList();
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                        <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-stone-900">Strategic Mandate</h3>
                        <p className="text-sm text-stone-500">Define mission vectors, narrative context, and success metrics.</p>
                    </div>
                </div>

                {/* 1. Mission Architecture */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Mission Architecture</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectOrInput
                            label="Core Strategic Intent"
                            value={params.strategicIntent}
                            options={domainObjectives}
                            onChange={(val) => handleParamChange('strategicIntent', val)}
                            placeholder="e.g. Hostile Takeover Defense"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-stone-700 block mb-1">Target Region</label>
                                <select 
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                    value={params.region}
                                    onChange={(e) => handleParamChange('region', e.target.value)}
                                >
                                    <option value="">Select Region...</option>
                                    {REGIONS_AND_COUNTRIES.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-stone-700 block mb-1">Specific Country</label>
                                <select 
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                    value={params.country}
                                    onChange={(e) => handleParamChange('country', e.target.value)}
                                >
                                    <option value="">Select Country...</option>
                                    {REGIONS_AND_COUNTRIES.find(r => r.name === params.region)?.countries.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    )) || <option disabled>Select Region First</option>}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Strategic Context (Narrative) */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Strategic Context (Narrative)</h4>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Problem Statement / Mission Context</label>
                            <textarea 
                                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-stone-900 transition-all"
                                rows={3}
                                value={params.problemStatement}
                                onChange={(e) => handleParamChange('problemStatement', e.target.value)}
                                placeholder="Describe the specific challenge or opportunity driving this mandate..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Ideal Partner Profile</label>
                            <textarea 
                                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-stone-900 transition-all"
                                rows={2}
                                value={params.idealPartnerProfile}
                                onChange={(e) => handleParamChange('idealPartnerProfile', e.target.value)}
                                placeholder="Describe the attributes of your ideal counterpart..."
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Targeting & Mechanics */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Targeting & Mechanics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectOrInput
                            label="Target Counterpart Profile"
                            value={params.targetCounterpartType || ''}
                            options={TARGET_COUNTERPART_TYPES.map(t => ({ value: t, label: t }))}
                            onChange={(val) => handleParamChange('targetCounterpartType', val)}
                            placeholder="e.g. Specific Ministry or Conglomerate"
                        />
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Target Incentives</label>
                            <div className="flex gap-2 mb-2">
                                <select 
                                    className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" 
                                    onChange={e => {
                                        if(e.target.value) toggleArrayParam('targetIncentives', e.target.value);
                                    }}
                                    value=""
                                >
                                    <option value="">Select Standard Incentive...</option>
                                    {GOVERNMENT_INCENTIVES.map(inc => <option key={inc} value={inc}>{inc}</option>)}
                                </select>
                                <div className="flex-1 flex gap-1">
                                    <input 
                                        className="w-full p-3 bg-white border border-stone-200 rounded-lg text-sm outline-none"
                                        placeholder="Or type custom..."
                                        value={customIncentive}
                                        onChange={(e) => setCustomIncentive(e.target.value)}
                                    />
                                    <button 
                                        onClick={() => {
                                            if (customIncentive) {
                                                toggleArrayParam('targetIncentives', customIncentive);
                                                setCustomIncentive('');
                                            }
                                        }}
                                        className="px-3 bg-stone-100 border border-stone-200 rounded-lg hover:bg-stone-200 text-stone-600"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(params.targetIncentives || []).map(inc => (
                                    <span key={inc} onClick={() => toggleArrayParam('targetIncentives', inc)} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-1">
                                        {inc} <Trash2 size={10} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- STEP 3: MECHANICS & CALIBRATION ---
    const renderStep3_Calibration = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <Scale className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Operational Mechanics</h3>
                    <p className="text-sm text-stone-500">Fine-tune the IVAS and SPI algorithms with real-world constraints.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Financial & Timeline */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Financial Architecture</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Budget Cap</label>
                            <input 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                placeholder="$50M USD"
                                value={params.calibration?.constraints?.budgetCap || ''}
                                onChange={(e) => setParams({
                                    ...params,
                                    calibration: { ...params.calibration, constraints: { ...params.calibration?.constraints, budgetCap: e.target.value } }
                                })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Time Horizon</label>
                            <select 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                value={params.expansionTimeline}
                                onChange={(e) => handleParamChange('expansionTimeline', e.target.value)}
                            >
                                {TIME_HORIZONS.map(t => <option key={t.value} value={t.label}>{t.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Funding Source</label>
                        <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.fundingSource} onChange={e => handleParamChange('fundingSource', e.target.value)}>
                            <option value="">Select Source...</option>
                            {FUNDING_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Procurement Mode</label>
                        <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.procurementMode} onChange={e => handleParamChange('procurementMode', e.target.value)}>
                            <option value="">Select Mode...</option>
                            {PROCUREMENT_MODES.map(m => <option key={m.value} value={m.label}>{m.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Risk & Sensitivities */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Risk & Sensitivities</h4>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-3">Risk Appetite</label>
                        <div className="space-y-2">
                            {RISK_APPETITE_LEVELS.map((lvl) => (
                                <label key={lvl.value} className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all ${params.riskTolerance === lvl.value ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-300'}`}>
                                    <input 
                                        type="radio" 
                                        name="risk"
                                        className="hidden"
                                        checked={params.riskTolerance === lvl.value}
                                        onChange={() => handleParamChange('riskTolerance', lvl.value)}
                                    />
                                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${params.riskTolerance === lvl.value ? 'border-white bg-white' : 'border-stone-400'}`}></div>
                                    <span className="text-xs font-bold">{lvl.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Political Sensitivities (Red Lines)</label>
                        <div className="flex flex-wrap gap-2">
                            {POLITICAL_SENSITIVITIES.map(sense => (
                                <button
                                    key={sense}
                                    onClick={() => toggleArrayParam('politicalSensitivities', sense)}
                                    className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${
                                        (params.politicalSensitivities || []).includes(sense)
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-white text-stone-500 border-stone-200 hover:border-red-200'
                                    }`}
                                >
                                    {sense}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 4: INTELLIGENCE ARCHITECTURE (New Step) ---
    const renderStep4_Architecture = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <Cpu className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Intelligence Architecture</h3>
                    <p className="text-sm text-stone-500">Configure the AI Agent Swarm and Mathematical Engines.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Column 1: Math Modules */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-stone-400" /> Active Math Engines
                            </h3>
                            <div className="text-xs font-bold text-stone-400">{(params.selectedModules || []).length} Selected</div>
                        </div>
                        <div className="space-y-3">
                            {ENGINE_CATALOG.map(eng => {
                                const isActive = (params.selectedModules || []).includes(eng.id);
                                return (
                                    <div 
                                        key={eng.id}
                                        onClick={() => toggleModule(eng.id)}
                                        className={`rounded-lg border p-3 cursor-pointer transition-all ${isActive ? 'bg-stone-50 border-stone-800' : 'bg-white border-stone-200 hover:bg-stone-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded ${isActive ? 'bg-stone-200' : 'bg-stone-50'}`}>
                                                <eng.icon className={`w-4 h-4 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div className={`text-xs font-bold ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>{eng.label}</div>
                                                    {isActive && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                                                </div>
                                                <div className="text-[10px] text-stone-400 leading-tight mt-0.5">{eng.desc}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: AI Agents */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                <Users className="w-5 h-5 text-stone-400" /> AI Agent Swarm
                            </h3>
                            <div className="text-xs font-bold text-stone-400">{(params.selectedAgents || []).length} Active</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {AVAILABLE_AGENTS.map(agent => (
                                <button
                                    key={agent}
                                    onClick={() => toggleAgent(agent)}
                                    className={`px-3 py-3 rounded-lg border text-left transition-all ${
                                        (params.selectedAgents || []).includes(agent)
                                        ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm'
                                        : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${(params.selectedAgents || []).includes(agent) ? 'bg-blue-500 animate-pulse' : 'bg-stone-300'}`}></div>
                                        <span className="text-xs font-bold">{agent}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-100">
                            <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Swarm Logic</h4>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Selected agents will run in parallel. "Scout" gathers raw data, "Diplomat" analyzes political risk, and "Strategist" synthesizes the final roadmap.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 5: OUTPUT CONFIGURATION (New Step) ---
    const renderStep5_Output = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <FileText className="w-6 h-6 text-stone-700" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Output Configuration</h3>
                    <p className="text-sm text-stone-500">Define the format, tone, and specific deliverables for this mission.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Format & Audience */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Format & Audience</h4>
                    
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Primary Deliverable Format</label>
                        <select 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                            value={params.outputFormat}
                            onChange={(e) => handleParamChange('outputFormat', e.target.value)}
                        >
                            {OUTPUT_FORMATS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Report Depth</label>
                        <div className="grid grid-cols-1 gap-2">
                            {REPORT_DEPTHS.map((depth) => (
                                <button
                                    key={depth.value}
                                    onClick={() => handleParamChange('reportLength', depth.value)}
                                    className={`px-4 py-3 rounded-lg border text-left flex justify-between items-center transition-all ${
                                        params.reportLength === depth.value
                                        ? 'bg-stone-800 text-white border-stone-800'
                                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                    }`}
                                >
                                    <span className="text-xs font-bold">{depth.label}</span>
                                    {params.reportLength === depth.value && <CheckCircle2 size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 2: Tone & Artifacts */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Voice & Artifacts</h4>
                    
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Communication Style (Tone)</label>
                        <select 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                            value={params.letterStyle}
                            onChange={(e) => handleParamChange('letterStyle', e.target.value)}
                        >
                            {LETTER_STYLES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Tactical Emphasis</label>
                        <div className="space-y-4 bg-stone-50 p-4 rounded-lg border border-stone-100">
                            <div>
                                <div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 mb-1">
                                    <span>Conservative</span>
                                    <span>Aggressive</span>
                                </div>
                                <input type="range" className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 mb-1">
                                    <span>Strategic (Long Term)</span>
                                    <span>Tactical (Immediate)</span>
                                </div>
                                <input type="range" className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="text-xs font-bold text-stone-700 block mb-2">Additional Artifacts</label>
                        <div className="flex flex-wrap gap-2">
                            {['Executive Memo', 'Risk Matrix', 'Partner Shortlist', 'Financial Model (XLS)'].map(art => (
                                <span key={art} className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-[10px] font-bold text-stone-600 cursor-pointer hover:bg-stone-200">
                                    + {art}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 6: SYNTHESIS (RENDER) ---
    const renderStep6_Synthesis = () => (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-12">
            {isGenerating && generationPhase !== 'complete' ? (
                <>
                    <div className="w-20 h-20 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-8"></div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Synthesizing Dossier</h3>
                    <p className="text-stone-500 font-mono text-sm uppercase tracking-widest mb-8">{generationPhase} phase... {generationProgress}%</p>
                    <div className="w-96 h-1 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-stone-900 transition-all duration-300" style={{width: `${generationProgress}%`}}></div>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-6xl text-left h-full flex flex-col">
                    {/* New Tabbed Header */}
                    <div className="flex justify-between items-end border-b border-stone-200 pb-2 mb-6 shrink-0">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-green-100">
                                <CheckCircle2 size={14} /> Intelligence Ready
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-stone-900">Strategic Intelligence Hub</h1>
                            <p className="text-stone-500 mt-1">Prepared for {params.organizationName} targeting {params.country}</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setResultTab('dossier')}
                                className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'dossier' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                            >
                                Executive Dossier
                            </button>
                            <button 
                                onClick={() => setResultTab('simulation')}
                                className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'simulation' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                            >
                                Strategic Simulation
                            </button>
                            <button 
                                onClick={() => setResultTab('market')}
                                className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'market' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                            >
                                Competitive Landscape
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {/* TAB 1: EXECUTIVE DOSSIER (Existing View) */}
                        {resultTab === 'dossier' && (
                            <div className="space-y-8 animate-in fade-in">
                                <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex justify-between items-center">
                                    <div className="text-sm text-stone-600">
                                        <strong>Actions:</strong>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => window.print()} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-xs transition-colors">
                                            Download PDF
                                        </button>
                                        <button onClick={() => setIsLetterModalOpen(true)} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-xs transition-colors">
                                            Draft Outreach
                                        </button>
                                        <button onClick={() => setIsComparativeModalOpen(true)} className="px-4 py-2 bg-purple-50 text-purple-900 border border-purple-200 font-bold rounded-lg text-xs hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                                            <Scale size={14} /> Compare
                                        </button>
                                    </div>
                                </div>

                                {(params.selectedModules || []).includes('rocket_engine') && (
                                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                                        <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2">
                                            <RocketIcon className="w-5 h-5 text-orange-500" /> Nexus Rocket Engine Results
                                        </div>
                                        <RocketEngineModule params={params} />
                                    </div>
                                )}
                                {(params.selectedModules || []).includes('matchmaking') && (
                                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                                        <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2">
                                            <MatchMakerIcon className="w-5 h-5 text-blue-500" /> Strategic Partners
                                        </div>
                                        <div className="p-6"><MatchmakingEngine params={params} autoRun={true} /></div>
                                    </div>
                                )}
                                {(params.selectedModules || []).includes('historical_precedents') && (
                                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                                        <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2">
                                            <History className="w-5 h-5 text-stone-600" /> Historical Context Engine
                                        </div>
                                        <div className="p-6"><HistoricalContextComponent params={params} /></div>
                                    </div>
                                )}
                                {(params.selectedModules || []).includes('temporal_analysis') && (
                                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                                        <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-cyan-600" /> Temporal Phase Analysis
                                        </div>
                                        <div className="p-6"><TemporalAnalysisComponent params={params} /></div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB 2: SIMULATION (New) */}
                        {resultTab === 'simulation' && (
                            <div className="h-[600px] animate-in slide-in-from-right-4">
                                <ScenarioSimulator />
                            </div>
                        )}

                        {/* TAB 3: MARKET LANDSCAPE (New) */}
                        {resultTab === 'market' && (
                            <div className="h-[600px] animate-in slide-in-from-right-4">
                                <CompetitorMap clientName={params.organizationName} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex-1 w-full flex h-full bg-stone-50 font-sans text-stone-900 min-w-0">
            
            {/* LEFT COLUMN: BUILDER (60%) */}
            <div className={`flex-1 flex flex-col border-r border-stone-200 bg-stone-50/30 transition-all duration-500 ${step === 6 ? 'w-0 opacity-0 hidden' : 'w-[60%] p-8 overflow-y-auto'}`}>
                <div className="max-w-3xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <button 
                            onClick={() => setStep(Math.max(1, step - 1) as any)} 
                            disabled={step === 1} 
                            className="text-stone-400 hover:text-stone-800 mb-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider disabled:opacity-0 transition-opacity"
                        >
                            <ChevronLeft size={14} /> Back
                        </button>
                        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                            {step === 1 && "Establish Organization DNA"}
                            {step === 2 && "Strategic Mandate"}
                            {step === 3 && "Operational Mechanics"}
                            {step === 4 && "Intelligence Architecture"}
                            {step === 5 && "Output Configuration"}
                        </h1>
                        <p className="text-stone-500 text-sm">
                            {step === 1 && "Deep entity profiling: define scale, authority, and identity."}
                            {step === 2 && "Define specific mission vectors, priorities, and success metrics."}
                            {step === 3 && "Calibrate risk, procurement, and financial constraints."}
                            {step === 4 && "Select specific AI agents and mathematical engines to deploy."}
                            {step === 5 && "Customize the format, tone, and depth of your intelligence dossier."}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center space-x-2 mb-8">
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <React.Fragment key={num}>
                                <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                        step === num ? 'bg-stone-900 text-white shadow-md scale-110' : 
                                        step > num ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-500'
                                    }`}
                                >
                                    {step > num ? <CheckCircle2 size={14} /> : num}
                                </div>
                                {num < 6 && <div className={`h-1 w-8 rounded-full ${step > num ? 'bg-green-500' : 'bg-stone-200'}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">
                        {step === 1 && renderStep1_Profile()}
                        {step === 2 && renderStep2_Mandate()}
                        {step === 3 && renderStep3_Calibration()}
                        {step === 4 && renderStep4_Architecture()}
                        {step === 5 && renderStep5_Output()}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 pt-8 border-t border-stone-200 flex justify-end">
                        {step < 5 ? (
                            <button 
                                onClick={() => setStep(step + 1 as any)}
                                disabled={!params.organizationName || (step === 2 && !params.country)}
                                className="px-8 py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Step <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button 
                                onClick={onGenerate}
                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1"
                            >
                                <Play size={20} fill="currentColor" /> Initialize Nexus Core
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: PREVIEW (40%) */}
            <div className={`flex flex-col bg-white transition-all duration-500 ${step === 6 ? 'w-full' : 'w-[40%] shadow-xl'}`}>
                {step < 6 ? <LivePreview /> : renderStep6_Synthesis()}
            </div>

            {/* Modals */}
            <AddOpportunityModal 
                isOpen={isOpportunityModalOpen} 
                onClose={() => setIsOpportunityModalOpen(false)}
                onSave={handleSaveOpportunity}
            />
            
            {isAnalysisModalOpen && params.activeOpportunity && (
                <AnalysisModal 
                    item={params.activeOpportunity} 
                    region={params.country || 'Global'} 
                    onClose={() => setIsAnalysisModalOpen(false)} 
                />
            )}

            {isComparativeModalOpen && (
                <ComparativeAnalysis 
                    reports={reports} 
                    onClose={() => setIsComparativeModalOpen(false)} 
                />
            )}

            <LetterGeneratorModal 
                isOpen={isLetterModalOpen}
                onClose={() => setIsLetterModalOpen(false)}
                onGenerate={async (content) => {
                    return new Promise(resolve => setTimeout(() => resolve(`To Whom It May Concern,\n\n regarding ${params.organizationName}...`), 1000));
                }}
                reportContent={Object.values(reportData).map((s) => (s as ReportSection).content).join('\n')}
                reportParameters={params}
            />

            {/* Simple Module Config Modal (Placeholder for deep config) */}
            {activeModuleConfig && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-stone-900 mb-4">Configure {ENGINE_CATALOG.find(e => e.id === activeModuleConfig)?.label}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase">Specific Focus / Context</label>
                                <textarea className="w-full mt-1 p-3 border border-stone-200 rounded-lg text-sm h-24 resize-none" placeholder="E.g., Focus specifically on port infrastructure assets..." />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setActiveModuleConfig(null)} className="px-4 py-2 text-stone-500 font-bold text-sm">Cancel</button>
                                <button onClick={() => setActiveModuleConfig(null)} className="px-4 py-2 bg-stone-900 text-white font-bold text-sm rounded-lg">Save Config</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainCanvas;