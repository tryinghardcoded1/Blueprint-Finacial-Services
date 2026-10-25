import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '../data/siteData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors">
            {/* Architectural Blueprint Fingerprint / Compass Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity="0.3" />
              <path d="M12 6a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.2" />
              <path d="M12 10a2 2 0 0 0-2 2c0 .7.4 1.4 1 1.7" />
              <path d="M12 14a2 2 0 0 1 2-2c.7 0 1.4.4 1.7 1" />
              <path d="M18 12a6 6 0 0 0-6-6" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-white leading-none">
              Blueprint
            </div>
            <div className="text-[10px] tracking-widest uppercase text-blue-400 font-medium mt-1">
              Financial Services
            </div>
          </div>
        </a>

        {/* Zone 2: 4-5 Concise Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              {item.label}
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white leading-none">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action & Call Contact */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-slate-600 transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm hover:shadow-blue-600/30 transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Book Consultation</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg border border-slate-700"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg text-center"
            >
              Book Free Strategy Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
