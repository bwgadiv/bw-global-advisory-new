import React from 'react';
import { Network, BarChart3, TrendingUp, Cpu, Layers, Database, Globe } from 'lucide-react';
import { Service } from '../types';

const engines: Service[] = [
  {
    id: 'ivas',
    title: 'IVAS™ Engine',
    subtitle: 'Investment Viability Assessment',
    description: 'Calculates the "Velocity of Capital." IVAS™ models how quickly an investment can actually be deployed in a specific region, factoring in bureaucratic friction, infrastructure lag, and local partner capability.',
    icon: <BarChart3 className="h-8 w-8 text-bw-gold" />,
  },
  {
    id: 'spi',
    title: 'SPI™ Engine',
    subtitle: 'Strategic Partnership Index',
    description: 'Measures "Symbiotic Fit." SPI™ moves beyond basic due diligence to analyze operational compatibility. It assigns a probability score to a partnership\'s long-term survival based on historical cultural and operational data.',
    icon: <Network className="h-8 w-8 text-bw-gold" />,
  },
  {
    id: 'scf',
    title: 'SCF™ Engine',
    subtitle: 'Strategic Cash Flow',
    description: 'Projects the "Knock-On Effect." SCF™ is a non-linear financial model that simulates second and third-order economic impacts, showing how a single investment creates ripples across the regional ecosystem.',
    icon: <TrendingUp className="h-8 w-8 text-bw-gold" />,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="nexus-core" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="black" strokeWidth="0.5" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bw-navy text-white text-xs font-bold uppercase tracking-widest mb-4">
             <Cpu size={12} className="text-bw-gold" /> System Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bw-navy mb-6">
            An Engine, Not an Opinion.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The BWGA system is not just a data tool; it's a <strong>circuit breaker</strong> for the inefficient feedback loop that traps 90% of global capital in the same 10% of markets. It operates on the premise that the answers to today's economic challenges are buried in the successes and failures of the last century.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            By reverse-engineering a century of economic history, we built a system that replaces subjective advice with mathematical proof. It deploys a swarm of specialized AI agents to analyze historical patterns, calculate the probability of a partnership's survival (SPI™), and model the true velocity of capital (IVAS™), turning ambiguity into a calculated advantage.
          </p>
        </div>

        {/* The Engines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {engines.map((engine) => (
            <div key={engine.id} className="group p-8 border border-gray-200 bg-white hover:border-bw-gold transition-all duration-500 rounded-sm relative shadow-sm hover:shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {React.cloneElement(engine.icon as React.ReactElement<{ className?: string }>, { className: 'h-40 w-40 text-bw-navy' })}
              </div>
              
              <div className="mb-8 p-4 bg-bw-light rounded-sm w-fit group-hover:bg-bw-navy transition-colors duration-300">
                {React.cloneElement(engine.icon as React.ReactElement<{ className?: string }>, { className: 'h-8 w-8 text-bw-navy group-hover:text-bw-gold transition-colors duration-300' })}
              </div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-serif font-bold text-bw-navy mb-2">{engine.title}</h4>
                <p className="text-xs font-bold text-bw-gold uppercase tracking-widest mb-6">{engine.subtitle}</p>
                <p className="text-gray-600 leading-relaxed text-sm border-l-2 border-gray-100 pl-4 group-hover:border-bw-gold transition-colors duration-300">
                  {engine.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Stack Context */}
        <div className="mt-20 bg-stone-900 text-white p-12 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bw-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                        <Layers className="w-5 h-5 text-bw-gold" />
                        <h3 className="text-bw-gold font-bold uppercase tracking-widest text-xs">The Full Stack</h3>
                    </div>
                    <h4 className="text-3xl font-serif font-bold mb-6 leading-tight">
                        Engineered to Eliminate the <br/>Cost of Uncertainty.
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg mb-6">
                        When data is missing, risk feels infinite. The BWGA System's 19 analytical cores were built to relieve that pressure. By tasking our AI with reconstructing economic data from historical precedent, we turn "unknown" regions into a landscape of calculated probabilities.
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                        From Cultural Asymmetry (CCI) to Regulatory Friction (RFI), the system doesn't guess; it triangulates truth from fragmented signals.
                    </p>
                </div>
                
                <div className="md:col-span-5 grid gap-4">
                    <div className="bg-white/5 p-6 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <Database className="w-8 h-8 text-bw-gold mb-3" />
                        <div className="text-xl font-bold">Validated Against History</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Every engine is validated against a century of economic precedent to prove its ability to identify the root causes of failure and the hidden drivers of success.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <Globe className="w-8 h-8 text-blue-400 mb-3" />
                        <div className="text-xl font-bold">Inference Engine for Data Voids</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Where data is missing, the system infers economic structure from analogous markets, filling the information void that traditionally keeps capital away.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};