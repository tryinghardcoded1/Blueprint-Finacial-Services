import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Zap, Clock, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface HeroCompoundTickerProps {
  onOpenBooking: () => void;
}

export const HeroCompoundTicker: React.FC<HeroCompoundTickerProps> = ({ onOpenBooking }) => {
  const [extraMonthly, setExtraMonthly] = useState<number>(300);
  const [activeTab, setActiveTab] = useState<'extra' | 'offset'>('extra');
  const [offsetBalance, setOffsetBalance] = useState<number>(35000);

  // Baseline scenario: $750,000 mortgage at 6.10% over 30 years
  const baseLoan = 750000;
  const baseRate = 0.061;
  const monthlyRate = baseRate / 12;
  const standardTermMonths = 360;

  // Standard monthly P&I
  const standardMonthly =
    (baseLoan * (monthlyRate * Math.pow(1 + monthlyRate, standardTermMonths))) /
    (Math.pow(1 + monthlyRate, standardTermMonths) - 1);

  // Calculate accelerated metrics
  const effectiveMonthly = standardMonthly + (activeTab === 'extra' ? extraMonthly : 0);
  const effectivePrincipal = activeTab === 'offset' ? Math.max(10000, baseLoan - offsetBalance) : baseLoan;

  // Simulate amortization
  let balance = baseLoan;
  let months = 0;
  let totalInterestWithStrategy = 0;
  const offsetSavingPerMonth = activeTab === 'offset' ? offsetBalance * monthlyRate : 0;

  while (balance > 0 && months < standardTermMonths) {
    const interestThisMonth = Math.max(0, (balance - (activeTab === 'offset' ? offsetBalance : 0)) * monthlyRate);
    totalInterestWithStrategy += interestThisMonth;
    const principalPaid = effectiveMonthly - interestThisMonth;
    balance -= principalPaid;
    months++;
  }

  const standardTotalInterest = standardMonthly * standardTermMonths - baseLoan;
  const totalInterestSaved = Math.max(0, standardTotalInterest - totalInterestWithStrategy);
  const yearsSaved = Math.max(0, ((standardTermMonths - months) / 12));
  const newPayoffYears = (30 - yearsSaved).toFixed(1);

  // Micro-ticker simulation that pulses savings
  const [tickerOffset, setTickerOffset] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerOffset((prev) => (prev + 1.25) % 100);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 p-5 sm:p-6 shadow-2xl overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-semibold">
            Mortgage Acceleration Lab
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          Sydney Average ($750k @ 6.1%)
        </div>
      </div>

      {/* Strategy Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-slate-950/70 rounded-lg border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('extra')}
          className={`py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'extra'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Extra Repayments
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('offset')}
          className={`py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
            activeTab === 'offset'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          100% Offset Savings
        </button>
      </div>

      {/* Interactive Controls */}
      <div className="mt-4">
        {activeTab === 'extra' ? (
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300 font-medium">Extra Monthly Contribution:</span>
              <span className="text-blue-400 font-bold tabular-nums font-mono text-sm">
                +${extraMonthly.toLocaleString()} / mo
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {[150, 300, 500, 800].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setExtraMonthly(val)}
                  className={`py-1 text-[11px] font-semibold rounded border transition-colors ${
                    extraMonthly === val
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  +${val}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="50"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-300 font-medium">Savings Parked in Offset:</span>
              <span className="text-emerald-400 font-bold tabular-nums font-mono text-sm">
                ${offsetBalance.toLocaleString()} AUD
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {[15000, 35000, 60000, 100000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setOffsetBalance(val)}
                  className={`py-1 text-[11px] font-semibold rounded border transition-colors ${
                    offsetBalance === val
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ${(val / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={offsetBalance}
              onChange={(e) => setOffsetBalance(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Live Animated Ticker Display */}
      <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-slate-950 to-blue-950/60 border border-slate-800/90">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Compound Interest Eliminated
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
            Guaranteed Savings
          </span>
        </div>

        <motion.div
          key={`${activeTab}-${extraMonthly}-${offsetBalance}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="text-2xl sm:text-3xl font-extrabold text-white font-heading tabular-nums mt-1.5 tracking-tight flex items-center gap-1"
        >
          <span className="text-emerald-400">$</span>
          <span>{Math.round(totalInterestSaved).toLocaleString()}</span>
          <span className="text-xs font-normal text-slate-400 ml-1">in interest</span>
        </motion.div>

        {/* Timeline Visualization Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex justify-between text-[11px] text-slate-300 mb-1.5">
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Mortgage Duration:</span>
            </span>
            <span className="font-bold text-white tabular-nums font-mono">
              {newPayoffYears} yrs <span className="text-emerald-400 font-semibold">(-{yearsSaved.toFixed(1)} yrs)</span>
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(10, ((30 - yearsSaved) / 30) * 100))}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Payoff in Year {newPayoffYears}</span>
            <span>Standard 30-Year Trap</span>
          </div>
        </div>
      </div>

      {/* CTA micro action */}
      <button
        onClick={onOpenBooking}
        className="w-full mt-4 py-2.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-2 group"
      >
        <span>Structure This With Karina Bridges</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
