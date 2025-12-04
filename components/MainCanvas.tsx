import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Target, Globe, ShieldCheck, Zap, 
  Layout, FileText, CheckCircle2, ChevronRight, 
  ChevronLeft, Play, Settings, Database, 
  Briefcase, Clock, AlertTriangle, Layers,
  ArrowRight, Search, Plus, Trash2, MapPin,
  TrendingUp, BarChart3, Scale, Info, Building2, MousePointerClick, Flag, History
} from 'lucide-react';
import { ReportParameters, ReportData, GenerationPhase, LiveOpportunityItem } from '../types';
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
    GOVERNMENT_INCENTIVES
} from '../constants';

// Module Imports
import RocketEngineModule from './RocketEngineModule';
import MatchmakingEngine from './MatchmakingEngine';
import HistoricalContextComponent from './HistoricalContextComponent';
import { TemporalAnalysisComponent } from './TemporalAnalysisComponent';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { AnalysisModal } from './AnalysisModal';
import { AddOpportunityModal } from './AddOpportunityModal';

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

const MainCanvas: React.FC<MainCanvasProps> = ({ 
    params, setParams, reportData, isGenerating, generationPhase, generationProgress, onGenerate,
    reports, onOpenReport, onDeleteReport, onNewAnalysis
}) => {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
    const [activeModuleConfig, setActiveModuleConfig] = useState<string | null>(null);
    
    // Auto-advance
    useEffect(() => {
        if (generationPhase === 'complete' && step !== 4) {
            setStep(4);
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

    // --- STEP 1: ORGANIZATION DNA ---
    const renderStep1_Profile = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Organization DNA</h3>
                    <p className="text-sm text-stone-500">Comprehensive entity profiling for accurate modelling.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Corporate Identity */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Corporate Identity</h4>
                    
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Organization Name</label>
                        <input 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-stone-900 outline-none"
                            value={params.organizationName}
                            onChange={(e) => handleParamChange('organizationName', e.target.value)}
                            placeholder="e.g. Acme Global Industries"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Entity Type</label>
                            <select 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                value={params.organizationType}
                                onChange={(e) => handleParamChange('organizationType', e.target.value)}
                            >
                                {ORGANIZATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Primary Sector</label>
                            <select 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                value={params.industry[0] || ''}
                                onChange={(e) => handleParamChange('industry', [e.target.value])}
                            >
                                <option value="">Select Sector...</option>
                                {INDUSTRIES.map(i => <option key={i.title} value={i.title}>{i.title}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Headquarters Address</label>
                        <input 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white outline-none"
                            value={params.organizationAddress || ''}
                            onChange={(e) => handleParamChange('organizationAddress', e.target.value)}
                            placeholder="123 Strategic Ave, Global City, 10001"
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Website</label>
                        <input 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white outline-none"
                            value={params.organizationWebsite || ''}
                            onChange={(e) => handleParamChange('organizationWebsite', e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                {/* Operational Scale & Authority */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Operational Scale & Authority</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Revenue Band</label>
                            <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.revenueBand} onChange={e => handleParamChange('revenueBand', e.target.value)}>
                                <option value="">Select Revenue...</option>
                                {ORGANIZATION_SCALE_BANDS.revenue.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Headcount</label>
                            <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.headcountBand} onChange={e => handleParamChange('headcountBand', e.target.value)}>
                                <option value="">Select Count...</option>
                                {ORGANIZATION_SCALE_BANDS.headcount.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">Decision Authority Level</label>
                        <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.decisionAuthority} onChange={e => handleParamChange('decisionAuthority', e.target.value)}>
                            <option value="">Select Level...</option>
                            {DECISION_AUTHORITY_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                            <input className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.userName} onChange={e => handleParamChange('userName', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Department</label>
                            <input className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.userDepartment} onChange={e => handleParamChange('userDepartment', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- STEP 2: STRATEGIC MANDATE ---
    const renderStep2_Mandate = () => {
        // Derive specific opportunities based on selected industry
        const currentSector = params.industry[0]?.split('&')[0].trim() || 'Technology'; // Fallback logic
        const availableOpportunities = SECTOR_OPPORTUNITIES[currentSector] || SECTOR_OPPORTUNITIES['Technology'];

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                        <Target className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-stone-900">Strategic Mandate</h3>
                        <p className="text-sm text-stone-500">Defining the mission vector, opportunity focus, and success KPIs.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Core Mandate Type</label>
                            <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none font-bold text-stone-800" value={params.strategicIntent} onChange={e => handleParamChange('strategicIntent', e.target.value)}>
                                <option value="">Select Primary Objective...</option>
                                {MISSION_TYPES.map(m => <option key={m.value} value={m.label}>{m.label}</option>)}
                            </select>
                        </div>
                        
                        {/* NEW: Opportunity Radar */}
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-orange-500" /> Specific Opportunity Radar
                            </label>
                            <select 
                                className="w-full p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm outline-none font-medium text-orange-900" 
                                value={params.specificOpportunity || ''} 
                                onChange={e => handleParamChange('specificOpportunity', e.target.value)}
                            >
                                <option value="">Select Specific Opportunity...</option>
                                {availableOpportunities.map(opp => <option key={opp} value={opp}>{opp}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Target Counterpart Profile</label>
                            <select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" value={params.targetCounterpartType} onChange={e => handleParamChange('targetCounterpartType', e.target.value)}>
                                <option value="">Select Counterpart...</option>
                                {TARGET_COUNTERPART_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        
                        {/* NEW: Incentives */}
                        <div>
                            <label className="text-xs font-bold text-stone-700 block mb-1">Target Incentives (Optional)</label>
                            <select 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none" 
                                value="" // Single select for simplicity in demo, could be multi
                                onChange={e => toggleArrayParam('targetIncentives', e.target.value)}
                            >
                                <option value="">Add Incentive Target...</option>
                                {GOVERNMENT_INCENTIVES.map(inc => <option key={inc} value={inc}>{inc}</option>)}
                            </select>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {(params.targetIncentives || []).map(inc => (
                                    <span key={inc} onClick={() => toggleArrayParam('targetIncentives', inc)} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-colors">
                                        {inc} ×
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Priority Themes (Select all that apply)</label>
                        <div className="flex flex-wrap gap-2">
                            {PRIORITY_THEMES.map(theme => (
                                <button
                                    key={theme}
                                    onClick={() => toggleArrayParam('priorityThemes', theme)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                                        (params.priorityThemes || []).includes(theme)
                                        ? 'bg-stone-900 text-white border-stone-900'
                                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                    }`}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2">Success Metrics (KPIs)</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {SUCCESS_METRICS.map(metric => (
                                <button
                                    key={metric.value}
                                    onClick={() => toggleArrayParam('successMetrics', metric.label)}
                                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                                        (params.successMetrics || []).includes(metric.label)
                                        ? 'bg-blue-50 border-blue-500 text-blue-800'
                                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                                    }`}
                                >
                                    {metric.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                        <label className="text-xs font-bold text-stone-700 block mb-2">Target Region (Specific)</label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select 
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none"
                                value={params.region}
                                onChange={(e) => handleParamChange('region', e.target.value)}
                            >
                                <option value="">Select Region...</option>
                                {REGIONS_AND_COUNTRIES.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                            </select>
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

    const renderStep3_Engines = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-stone-400" /> Intelligence Architecture
                        </h3>
                        <p className="text-sm text-stone-500 mt-1">Activate and configure specific intelligence modules.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                        {(params.selectedModules || []).length} Active
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ENGINE_CATALOG.map(eng => {
                        const isActive = (params.selectedModules || []).includes(eng.id);
                        return (
                            <div 
                                key={eng.id}
                                className={`rounded-xl border transition-all ${isActive ? 'bg-white border-stone-900 shadow-md' : 'bg-stone-50 border-transparent hover:bg-stone-100'}`}
                            >
                                <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => toggleModule(eng.id)}>
                                    <div className={`p-2 rounded-lg ${isActive ? eng.bg : 'bg-white border border-stone-200'}`}>
                                        <eng.icon className={`w-6 h-6 ${isActive ? eng.color : 'text-stone-400'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <div className={`font-bold text-sm ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>{eng.label}</div>
                                            {isActive && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                        </div>
                                        <div className="text-xs text-stone-400 leading-snug">{eng.desc}</div>
                                    </div>
                                </div>
                                {isActive && (
                                    <div className="px-4 pb-4 pt-0">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setActiveModuleConfig(eng.id); }}
                                            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Settings size={12} /> Configure Parameters
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const renderStep4_Synthesis = () => (
        <div className="h-full flex flex-col items-center justify-center text-center p-12">
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
                <div className="w-full max-w-4xl space-y-8 text-left">
                    <div className="bg-white border border-stone-200 p-8 rounded-xl shadow-lg flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-green-100">
                                <CheckCircle2 size={14} /> Intelligence Ready
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-stone-900">Strategic Intelligence Dossier</h1>
                            <p className="text-stone-500 mt-1">Prepared for {params.organizationName} targeting {params.country}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => window.print()} className="px-6 py-2 bg-stone-900 text-white font-bold rounded-lg text-sm hover:bg-black transition-colors shadow-lg">
                                Download PDF
                            </button>
                            <button onClick={() => setIsLetterModalOpen(true)} className="px-6 py-2 bg-white text-stone-900 border border-stone-300 font-bold rounded-lg text-sm hover:bg-stone-50 transition-colors">
                                Draft Outreach
                            </button>
                        </div>
                    </div>

                    {/* RENDER MODULES */}
                    <div className="space-y-8">
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
                </div>
            )}
        </div>
    );

    // --- LIVE PREVIEW COMPONENT ---
    const LivePreview = () => (
        <div className="bg-stone-50 border-l border-stone-200 h-full flex flex-col">
            <div className="p-6 border-b border-stone-200 bg-white sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Live Intelligence Feed</h3>
                    <div className="flex gap-2">
                        {params.country && <span className="text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 font-bold border border-stone-200">{params.country}</span>}
                    </div>
                </div>
                
                {/* Dynamic Header Based on Input */}
                <div className="space-y-1">
                    <h2 className="text-lg font-serif font-bold text-stone-900 leading-tight">
                        {params.organizationName || 'Organization Name'}
                    </h2>
                    <p className="text-xs text-stone-500 truncate">{params.strategicIntent || 'Define Strategic Intent...'}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 1. Regional Context Card */}
                {params.country && cityData && (
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-xs font-bold text-stone-800 uppercase mb-3 flex items-center gap-2">
                            <GlobeIcon className="w-3 h-3 text-blue-500" /> Regional Context: {params.country}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-stone-50 rounded border border-stone-100">
                                <div className="text-stone-400 mb-1">GDP (Est.)</div>
                                <div className="font-bold text-stone-800">${cityData.gdp.totalBillionUSD}B</div>
                            </div>
                            <div className="p-2 bg-stone-50 rounded border border-stone-100">
                                <div className="text-stone-400 mb-1">Ease of Biz</div>
                                <div className="font-bold text-stone-800">{cityData.businessEnvironment.easeOfDoingBusiness}/10</div>
                            </div>
                            <div className="p-2 bg-stone-50 rounded border border-stone-100">
                                <div className="text-stone-400 mb-1">Infra Score</div>
                                <div className="font-bold text-stone-800">{cityData.infrastructure.digital}/10</div>
                            </div>
                            <div className="p-2 bg-stone-50 rounded border border-stone-100">
                                <div className="text-stone-400 mb-1">Talent</div>
                                <div className="font-bold text-stone-800">{cityData.talentPool.skillsAvailability}/10</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Calculated Metrics Preview */}
                {step >= 2 && (
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-xs font-bold text-stone-800 uppercase mb-3 flex items-center gap-2">
                            <BarChart className="w-3 h-3 text-green-500" /> Projected Metrics
                        </h4>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-stone-500">Risk Profile</span>
                                    <span className="font-bold text-stone-900">{params.riskTolerance || 'N/A'}</span>
                                </div>
                                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                                    <div className={`h-full ${params.riskTolerance === 'High' ? 'bg-red-500 w-3/4' : params.riskTolerance === 'Medium' ? 'bg-yellow-500 w-1/2' : 'bg-green-500 w-1/4'}`}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-stone-500">Timeline</span>
                                    <span className="font-bold text-stone-900">{params.expansionTimeline || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Architecture Stack */}
                {step >= 3 && (params.selectedModules || []).length > 0 && (
                    <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="text-xs font-bold text-stone-800 uppercase mb-3 flex items-center gap-2">
                            <Layers className="w-3 h-3 text-purple-500" /> Active Architecture
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {(params.selectedModules || []).map(m => (
                                <span key={m} className="px-2 py-1 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-600">
                                    {ENGINE_CATALOG.find(e => e.id === m)?.label || m}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!params.country && step === 1 && (
                    <div className="text-center py-12 text-stone-400">
                        <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        <p className="text-xs">Select a Target Region to activate intelligence feed.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex h-full bg-stone-50 font-sans text-stone-900">
            
            {/* LEFT COLUMN: BUILDER (60%) */}
            <div className={`flex-1 flex flex-col border-r border-stone-200 bg-stone-50/30 transition-all duration-500 ${step === 4 ? 'w-0 opacity-0 hidden' : 'w-[60%] p-8 overflow-y-auto'}`}>
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
                        </h1>
                        <p className="text-stone-500 text-sm">
                            {step === 1 && "Deep entity profiling: define scale, authority, and identity."}
                            {step === 2 && "Define specific mission vectors, priorities, and success metrics."}
                            {step === 3 && "Calibrate risk, procurement, and financial constraints."}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center space-x-2 mb-8">
                        {[1, 2, 3, 4].map(num => (
                            <React.Fragment key={num}>
                                <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                        step === num ? 'bg-stone-900 text-white shadow-md scale-110' : 
                                        step > num ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-500'
                                    }`}
                                >
                                    {step > num ? <CheckCircle2 size={14} /> : num}
                                </div>
                                {num < 4 && <div className={`h-1 w-12 rounded-full ${step > num ? 'bg-green-500' : 'bg-stone-200'}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">
                        {step === 1 && renderStep1_Profile()}
                        {step === 2 && renderStep2_Mandate()}
                        {step === 3 && renderStep3_Calibration()}
                        {step === 3 && renderStep3_Engines()} {/* Combine Engines into step 3 for cleaner flow */}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 pt-8 border-t border-stone-200 flex justify-end">
                        {step < 3 ? (
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
            <div className={`flex flex-col bg-white transition-all duration-500 ${step === 4 ? 'w-full' : 'w-[40%] shadow-xl'}`}>
                {step < 4 ? <LivePreview /> : renderStep4_Synthesis()}
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

            <LetterGeneratorModal 
                isOpen={isLetterModalOpen}
                onClose={() => setIsLetterModalOpen(false)}
                onGenerate={async (content) => {
                    return new Promise(resolve => setTimeout(() => resolve(`To Whom It May Concern,\n\n regarding ${params.organizationName}...`), 1000));
                }}
                reportContent={Object.values(reportData).map(s => s.content).join('\n')}
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