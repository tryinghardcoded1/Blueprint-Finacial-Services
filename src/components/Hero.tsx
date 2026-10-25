import React from 'react';
import { ArrowRight, ShieldCheck, Award, Star, Compass } from 'lucide-react';
import { HeroCompoundTicker } from './HeroCompoundTicker';
import { BUSINESS_INFO } from '../data/siteData';

interface HeroProps {
  onSelectAction: (action: 'purchase' | 'refinance') => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectAction, onOpenBooking }) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pb-24">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-coastal.jpg"
          alt="Coastal luxury residence in Sydney Eastern Suburbs"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-30 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950"></div>
        {/* Subtle blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Marker */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-blue-300 font-medium mb-6">
          <span className="flex items-center gap-1.5 text-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Australian Credit Licence: 389087</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 text-blue-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Finalist 2024 Local Business Awards</span>
          </span>
          <span className="text-slate-600 hidden md:inline">·</span>
          <span className="flex items-center gap-1 text-amber-300 hidden md:inline-flex">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>5.0 Star Client Rating (Google & RateMyAgent)</span>
          </span>
        </div>

        {/* 2-Column Split: Headline/Intents on Left + Compound Interest Ticker on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column (7 cols): Brand Proposition & CTA */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Your Dreams,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                Our Mission
              </span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal max-w-2xl">
              Trusted Mortgage Broker in Sydney. We structure tailored home loans, renegotiate rates, and secure competitive finance across 40+ Australian lenders—with our signature 2-year review guarantee.
            </p>

            {/* Action Row */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#ai-calculator"
                className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-blue-200 group-hover:rotate-45 transition-transform" />
                <span>Explore Blueprint AI Loan Strategist</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-colors whitespace-nowrap"
              >
                Speak with Karina Today
              </button>
            </div>

            {/* Dual Primary Intent Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {/* Card 1: Purchase a Property */}
              <button
                onClick={() => onSelectAction('purchase')}
                className="group relative text-left p-5 sm:p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-blue-950/70 border border-slate-800 hover:border-blue-500/80 transition-all duration-200 shadow-xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">
                    Ready To
                  </span>
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                  Purchase a Property
                </h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  First home buyers, upsizers & investors. Fast pre-approvals & 5% deposit schemes.
                </p>
              </button>

              {/* Card 2: Refinance My Loan */}
              <button
                onClick={() => onSelectAction('refinance')}
                className="group relative text-left p-5 sm:p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-indigo-950/70 border border-slate-800 hover:border-indigo-400/80 transition-all duration-200 shadow-xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
                    Seeking To
                  </span>
                  <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-300" />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                  Refinance My Loan
                </h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  Slash rates, release equity for renovations, and consolidate high-interest debts.
                </p>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Visual Compound Interest Ticker Micro-interaction */}
          <div className="lg:col-span-5">
            <HeroCompoundTicker onOpenBooking={onOpenBooking} />
          </div>

        </div>

        {/* 4-Item Proof Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400 text-xs">
          <div>
            <div className="text-white font-bold text-lg sm:text-xl font-heading tabular-nums">
              40+
            </div>
            <div className="text-slate-400 mt-0.5">Accredited Australian Lenders</div>
          </div>
          <div>
            <div className="text-white font-bold text-lg sm:text-xl font-heading tabular-nums">
              $0
            </div>
            <div className="text-slate-400 mt-0.5">Broker Fee to Borrowers</div>
          </div>
          <div>
            <div className="text-white font-bold text-lg sm:text-xl font-heading tabular-nums">
              24-Month
            </div>
            <div className="text-slate-400 mt-0.5">Active Loan Review Guarantee</div>
          </div>
          <div>
            <div className="text-white font-bold text-lg sm:text-xl font-heading tabular-nums">
              Coogee, NSW
            </div>
            <div className="text-slate-400 mt-0.5">Local Sydney Expertise</div>
          </div>
        </div>

      </div>
    </section>
  );
};
