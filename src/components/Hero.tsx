import React from 'react';
import { ArrowRight, ShieldCheck, Award, Star, Compass } from 'lucide-react';
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
          src="/src/assets/images/hero_sydney_coastal_living_1792967428688.jpg"
          alt="Coastal luxury residence in Sydney Eastern Suburbs"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950"></div>
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

        {/* Main Headline & Value Proposition */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
            Your Dreams, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Our Mission</span>.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mt-4 leading-relaxed font-normal">
            Trusted Mortgage Broker in Sydney. We structure tailored home loans, renegotiate rates, and secure competitive finance across 40+ Australian lenders—with our signature 2-year review guarantee.
          </p>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#ai-calculator"
              className="px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-blue-200 group-hover:rotate-45 transition-transform" />
              <span>Explore Blueprint AI Loan Strategist</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-colors whitespace-nowrap"
            >
              Speak with Karina Today
            </button>
          </div>
        </div>

        {/* Dual Primary Intent Cards - High Conversion Gateways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {/* Card 1: Purchase a Property */}
          <button
            onClick={() => onSelectAction('purchase')}
            className="group relative text-left p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/70 border border-slate-700/80 hover:border-blue-500/80 transition-all duration-200 shadow-xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-blue-300" />
              </div>
            </div>

            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">
              Ready To
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">
              Purchase a Property
            </h2>
            <p className="text-sm text-slate-300 mt-3 max-w-md leading-relaxed">
              First home buyers, upsizers, and investors. Secure auction-ready pre-approvals and explore government grants or 5% deposit schemes.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-blue-300 font-medium">
              <span>First Home Buyer Grants</span>
              <span>·</span>
              <span>Fast Pre-Approvals</span>
              <span>·</span>
              <span>Zero Broker Fees</span>
            </div>
          </button>

          {/* Card 2: Refinance My Loan */}
          <button
            onClick={() => onSelectAction('refinance')}
            className="group relative text-left p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-indigo-950/70 border border-slate-700/80 hover:border-indigo-400/80 transition-all duration-200 shadow-xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-indigo-300" />
              </div>
            </div>

            <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">
              Seeking To
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-indigo-200 transition-colors">
              Refinance My Loan
            </h2>
            <p className="text-sm text-slate-300 mt-3 max-w-md leading-relaxed">
              Slash your interest rate, release home equity for renovations or investments, and consolidate high-interest debts into one simple payment.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-indigo-300 font-medium">
              <span>Free Rate Health-Check</span>
              <span>·</span>
              <span>Equity Cash-Out</span>
              <span>·</span>
              <span>Save Thousands</span>
            </div>
          </button>
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
