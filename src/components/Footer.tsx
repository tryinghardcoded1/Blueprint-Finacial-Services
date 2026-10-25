import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Blueprint Financial Services"
                className="h-10 w-auto object-contain rounded shadow-sm"
              />
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Sydney’s trusted boutique mortgage brokerage. Providing tailored home loan, refinancing, and property investment finance across 40+ leading Australian banks and lenders.
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-blue-400 transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-blue-400 transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quick Details
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Home Loans & Purchases</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Strategic Refinancing</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Investment Finance</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Karina Bridges</a>
              </li>
              <li>
                <a href="#learning-hub" className="hover:text-white transition-colors">Haven Magazine</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Calculators */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Financial Calculators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#ai-calculator" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Blueprint AI Loan Strategist™
                </a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-white transition-colors">Borrowing Power Calculator</a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-white transition-colors">Loan Repayment Calculator</a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-white transition-colors">Refinance Savings Calculator</a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-white transition-colors">NSW Stamp Duty Calculator</a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-white transition-colors">Split Fixed & Variable Calculator</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Credentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Licensing & Compliance
            </h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Australian Credit Licence</span>
                </div>
                <div className="text-[11px] font-mono text-blue-300 mt-0.5">
                  ACL: 389087
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  ABN: {BUSINESS_INFO.abn}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Operating under the National Consumer Credit Protection Act 2009 (Best Interests Duty).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © Copyright Blueprint Financial Services {new Date().getFullYear()}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Australian Credit Licence: 389087</span>
            <span>·</span>
            <span className="text-slate-400">Coogee, Sydney NSW</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] text-slate-400 leading-relaxed max-w-5xl">
          Disclaimer: Information provided on this website is of a general nature only and does not constitute individual personal financial, legal, or credit advice. Before acting on any information, you should consider the appropriateness of the information having regard to your personal objectives, financial situation, and needs. Lending criteria, fees, charges, terms and conditions apply and are subject to lender approval. Blueprint Financial Services Pty Ltd holds Australian Credit Licence 389087.
        </div>

      </div>
    </footer>
  );
};
