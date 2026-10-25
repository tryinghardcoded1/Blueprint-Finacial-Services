import React from 'react';
import { ShieldCheck, Building2, Landmark, CheckCircle2 } from 'lucide-react';
import { LENDERS } from '../data/siteData';

export const LendersSection: React.FC = () => {
  return (
    <section className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-1.5">
            Lending Freedom
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Accredited with 40+ Leading Australian Lenders
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            We are not tied to any single bank. We negotiate across major retail banks, customer-owned credit unions, and non-bank specialists to secure your lowest rate.
          </p>
        </div>

        {/* Lenders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center justify-center">
          {LENDERS.map((lender) => (
            <div
              key={lender.name}
              className="h-16 px-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center text-center hover:bg-white hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 tracking-tight transition-colors">
                {lender.logoText}
              </span>
            </div>
          ))}
        </div>

        {/* Key Guarantee Points */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Big-4 Banks & Tier-1 Regional Institutions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Ethical & Customer-Owned Banking Options</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Specialty Non-Bank Funders for Complex Incomes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
