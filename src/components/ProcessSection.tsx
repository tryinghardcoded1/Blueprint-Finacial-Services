import React from 'react';
import { Layers, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CORE_PILLARS, PROCESS_STEPS } from '../data/siteData';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Layers':
        return Layers;
      case 'Zap':
        return Zap;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return ShieldCheck;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sub-Header: Commitment to Your Convenience */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
            Our Responsibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Commitment to Your Convenience
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Securing finance should be empowering, not frustrating. Here is how Blueprint removes the friction from every property milestone.
          </p>
        </div>

        {/* 3 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CORE_PILLARS.map((pillar, index) => {
            const Icon = getPillarIcon(pillar.icon);
            return (
              <div
                key={pillar.title}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process Flow: How We Serve You */}
        <div className="pt-12 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
              Our Process
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              How We Serve You
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              From your initial idea to loan settlement and ongoing rate reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.step}
                className="relative bg-slate-950/50 border border-slate-800/80 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-bold font-mono text-blue-500/80 mb-3">
                    {step.step}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center text-[11px] text-blue-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-blue-400" />
                  <span>Verified Blueprint Standard</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>Start Step 1: Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
