import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingDown,
  Layers,
  Sparkles,
  Calendar,
  DollarSign,
  ChevronRight,
  Info,
} from 'lucide-react';

interface LoanComparisonVisualizerProps {
  onOpenBooking: () => void;
}

interface YearPoint {
  year: number;
  // Cumulative interest
  interestStandard: number;
  interestIO: number;
  interestExtra: number;
  interestBlueprint: number;
  // Remaining balance
  balanceStandard: number;
  balanceIO: number;
  balanceExtra: number;
  balanceBlueprint: number;
}

export const LoanComparisonVisualizer: React.FC<LoanComparisonVisualizerProps> = ({ onOpenBooking }) => {
  // Inputs
  const [loanPrincipal, setLoanPrincipal] = useState<number>(750000);
  const [interestRate, setInterestRate] = useState<number>(6.10);
  const [extraMonthly, setExtraMonthly] = useState<number>(350);
  const [metricMode, setMetricMode] = useState<'interest' | 'balance'>('interest');

  // Active plotted scenarios
  const [showStandard, setShowStandard] = useState<boolean>(true);
  const [showIO, setShowIO] = useState<boolean>(true);
  const [showExtra, setShowExtra] = useState<boolean>(true);
  const [showBlueprint, setShowBlueprint] = useState<boolean>(true);

  // Generate 30-year amortization curves for each scenario
  const { chartData, summaries } = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const blueprintRate = Math.max(0.01, interestRate - 0.45) / 100 / 12;
    const totalMonths = 360;

    // 1. Standard P&I
    const standardMonthly =
      (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // 2. Interest-Only: 5 years (60 months) IO, then 25 years (300 months) P&I
    const ioMonthlyIO = loanPrincipal * monthlyRate;
    const ioMonthlyPI =
      (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, 300))) /
      (Math.pow(1 + monthlyRate, 300) - 1);

    // Track monthly state for all 4 scenarios
    let balStd = loanPrincipal;
    let intStd = 0;

    let balIO = loanPrincipal;
    let intIO = 0;

    let balExtra = loanPrincipal;
    let intExtra = 0;
    let extraPayoffMonth = totalMonths;

    let balBP = loanPrincipal;
    let intBP = 0;
    let bpPayoffMonth = totalMonths;

    const yearlyPoints: YearPoint[] = [
      {
        year: 0,
        interestStandard: 0,
        interestIO: 0,
        interestExtra: 0,
        interestBlueprint: 0,
        balanceStandard: Math.round(loanPrincipal),
        balanceIO: Math.round(loanPrincipal),
        balanceExtra: Math.round(loanPrincipal),
        balanceBlueprint: Math.round(loanPrincipal),
      },
    ];

    for (let m = 1; m <= totalMonths; m++) {
      // Standard
      if (balStd > 0) {
        const i = balStd * monthlyRate;
        intStd += i;
        balStd = Math.max(0, balStd - (standardMonthly - i));
      }

      // IO: 1..60 interest only, 61..360 P&I
      if (balIO > 0) {
        if (m <= 60) {
          intIO += ioMonthlyIO;
          // balance remains unchanged
        } else {
          const i = balIO * monthlyRate;
          intIO += i;
          balIO = Math.max(0, balIO - (ioMonthlyPI - i));
        }
      }

      // Extra Repayments
      if (balExtra > 0) {
        const i = balExtra * monthlyRate;
        intExtra += i;
        const p = standardMonthly + extraMonthly - i;
        balExtra = Math.max(0, balExtra - p);
        if (balExtra === 0 && extraPayoffMonth === totalMonths) {
          extraPayoffMonth = m;
        }
      }

      // Blueprint Optimized: Rate renegotiation (-0.45%) from year 2 + extra payment
      if (balBP > 0) {
        const currentMrate = m > 24 ? blueprintRate : monthlyRate;
        const i = balBP * currentMrate;
        intBP += i;
        const p = standardMonthly + extraMonthly - i;
        balBP = Math.max(0, balBP - p);
        if (balBP === 0 && bpPayoffMonth === totalMonths) {
          bpPayoffMonth = m;
        }
      }

      // Record at each 12-month interval (Year 1 to 30)
      if (m % 12 === 0 || m === totalMonths) {
        yearlyPoints.push({
          year: Math.floor(m / 12),
          interestStandard: Math.round(intStd),
          interestIO: Math.round(intIO),
          interestExtra: Math.round(intExtra),
          interestBlueprint: Math.round(intBP),
          balanceStandard: Math.round(balStd),
          balanceIO: Math.round(balIO),
          balanceExtra: Math.round(balExtra),
          balanceBlueprint: Math.round(balBP),
        });
      }
    }

    const summaries = {
      standard: {
        totalInterest: Math.round(intStd),
        monthlyPayment: Math.round(standardMonthly),
        payoffYears: 30,
        interestSaved: 0,
      },
      interestOnly: {
        totalInterest: Math.round(intIO),
        monthlyPayment: `${Math.round(ioMonthlyIO)} (Yr 1-5) → ${Math.round(ioMonthlyPI)} (Yr 6-30)`,
        payoffYears: 30,
        interestSaved: Math.round(intStd - intIO), // negative (costs more)
      },
      extraRepayments: {
        totalInterest: Math.round(intExtra),
        monthlyPayment: Math.round(standardMonthly + extraMonthly),
        payoffYears: (extraPayoffMonth / 12).toFixed(1),
        interestSaved: Math.round(intStd - intExtra),
      },
      blueprintOptimized: {
        totalInterest: Math.round(intBP),
        monthlyPayment: Math.round(standardMonthly + extraMonthly),
        payoffYears: (bpPayoffMonth / 12).toFixed(1),
        interestSaved: Math.round(intStd - intBP),
      },
    };

    return { chartData: yearlyPoints, summaries };
  }, [loanPrincipal, interestRate, extraMonthly]);

  // Format currency tooltip
  const formatCurrency = (val: number) => `$${Number(val || 0).toLocaleString()}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-5xl mx-auto">
      {/* Component Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visualizer · Powered by Recharts</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Multi-Scenario Mortgage Comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Toggle loan strategies to visually inspect how interest compounds over 30 years versus early debt freedom.
          </p>
        </div>

        {/* Metric Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setMetricMode('interest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metricMode === 'interest'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cumulative Interest ($)
          </button>
          <button
            onClick={() => setMetricMode('balance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              metricMode === 'balance'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Remaining Balance ($)
          </button>
        </div>
      </div>

      {/* Interactive Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-200 mb-8">
        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-slate-600">Mortgage Balance</span>
            <span className="text-slate-900 font-bold tabular-nums">
              ${loanPrincipal.toLocaleString()} AUD
            </span>
          </div>
          <input
            type="range"
            min="250000"
            max="2000000"
            step="25000"
            value={loanPrincipal}
            onChange={(e) => setLoanPrincipal(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-slate-600">Interest Rate</span>
            <span className="text-blue-600 font-bold tabular-nums">
              {interestRate.toFixed(2)}% p.a.
            </span>
          </div>
          <input
            type="range"
            min="4.50"
            max="8.50"
            step="0.05"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-slate-600">Extra Monthly / Offset</span>
            <span className="text-emerald-600 font-bold tabular-nums">
              +${extraMonthly.toLocaleString()} / mo
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1500"
            step="50"
            value={extraMonthly}
            onChange={(e) => setExtraMonthly(Number(e.target.value))}
            className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Scenario Toggles Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <span className="text-xs text-slate-500 font-medium">Toggle Scenarios:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowStandard(!showStandard)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
              showStandard
                ? 'bg-slate-800 text-white border-slate-700 shadow-sm'
                : 'bg-white text-slate-400 border-slate-200 opacity-60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
            <span>Standard 30-Yr P&I</span>
          </button>

          <button
            onClick={() => setShowIO(!showIO)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
              showIO
                ? 'bg-amber-950 text-amber-200 border-amber-800 shadow-sm'
                : 'bg-white text-slate-400 border-slate-200 opacity-60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span>5-Yr Interest-Only</span>
          </button>

          <button
            onClick={() => setShowExtra(!showExtra)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
              showExtra
                ? 'bg-blue-900 text-blue-100 border-blue-700 shadow-sm'
                : 'bg-white text-slate-400 border-slate-200 opacity-60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
            <span>+${extraMonthly}/mo Extra</span>
          </button>

          <button
            onClick={() => setShowBlueprint(!showBlueprint)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
              showBlueprint
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700 shadow-sm'
                : 'bg-white text-slate-400 border-slate-200 opacity-60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span>Blueprint Optimized (-0.45%)</span>
          </button>
        </div>
      </div>

      {/* Main Recharts Visualization Canvas */}
      <div className="w-full h-80 sm:h-96 bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-800 shadow-inner">
        <ResponsiveContainer width="100%" height="100%">
          {metricMode === 'interest' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
              <defs>
                <linearGradient id="gradStandard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradIO" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradExtra" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="gradBP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
              <XAxis
                dataKey="year"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v) => `Yr ${v}`}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `$${Number(value).toLocaleString()}`,
                  name === 'interestStandard'
                    ? 'Standard P&I'
                    : name === 'interestIO'
                    ? '5-Yr Interest-Only'
                    : name === 'interestExtra'
                    ? `Extra Repayments (+${extraMonthly}/mo)`
                    : 'Blueprint Optimized',
                ]}
                labelFormatter={(label) => `Year ${label} of Mortgage`}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#fff',
                }}
              />
              <Legend
                formatter={(val) =>
                  val === 'interestStandard'
                    ? 'Standard 30-Yr P&I'
                    : val === 'interestIO'
                    ? '5-Yr Interest-Only'
                    : val === 'interestExtra'
                    ? `Extra Repayments (+${extraMonthly}/mo)`
                    : 'Blueprint 2-Yr Active Review'
                }
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />

              {showIO && (
                <Area
                  type="monotone"
                  dataKey="interestIO"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#gradIO)"
                  name="interestIO"
                />
              )}
              {showStandard && (
                <Area
                  type="monotone"
                  dataKey="interestStandard"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="url(#gradStandard)"
                  name="interestStandard"
                />
              )}
              {showExtra && (
                <Area
                  type="monotone"
                  dataKey="interestExtra"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#gradExtra)"
                  name="interestExtra"
                />
              )}
              {showBlueprint && (
                <Area
                  type="monotone"
                  dataKey="interestBlueprint"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#gradBP)"
                  name="interestBlueprint"
                />
              )}
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
              <XAxis
                dataKey="year"
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v) => `Yr ${v}`}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `$${Number(value).toLocaleString()}`,
                  name === 'balanceStandard'
                    ? 'Standard Balance'
                    : name === 'balanceIO'
                    ? 'Interest-Only Balance'
                    : name === 'balanceExtra'
                    ? 'Extra Repayment Balance'
                    : 'Blueprint Optimized Balance',
                ]}
                labelFormatter={(label) => `Year ${label}`}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#fff',
                }}
              />
              <Legend
                formatter={(val) =>
                  val === 'balanceStandard'
                    ? 'Standard 30-Yr P&I'
                    : val === 'balanceIO'
                    ? '5-Yr Interest-Only'
                    : val === 'balanceExtra'
                    ? `Extra Repayments (+${extraMonthly}/mo)`
                    : 'Blueprint 2-Yr Active Review'
                }
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />

              {showIO && (
                <Line
                  type="monotone"
                  dataKey="balanceIO"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={false}
                  name="balanceIO"
                />
              )}
              {showStandard && (
                <Line
                  type="monotone"
                  dataKey="balanceStandard"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={false}
                  name="balanceStandard"
                />
              )}
              {showExtra && (
                <Line
                  type="monotone"
                  dataKey="balanceExtra"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={false}
                  name="balanceExtra"
                />
              )}
              {showBlueprint && (
                <Line
                  type="monotone"
                  dataKey="balanceBlueprint"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  name="balanceBlueprint"
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Comparative Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        
        {/* Standard */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Standard 30-Yr P&I
          </div>
          <div className="text-xl font-bold font-heading text-slate-900 mt-1 tabular-nums">
            ${summaries.standard.totalInterest.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Total Interest Paid</div>
          <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs space-y-1 text-slate-600">
            <div>Monthly: <strong>${summaries.standard.monthlyPayment}</strong></div>
            <div>Payoff: <strong>30 Years</strong></div>
          </div>
        </div>

        {/* Interest Only */}
        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            5-Yr Interest-Only
          </div>
          <div className="text-xl font-bold font-heading text-amber-900 mt-1 tabular-nums">
            ${summaries.interestOnly.totalInterest.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">
            +${Math.abs(summaries.interestOnly.interestSaved).toLocaleString()} more interest
          </div>
          <div className="mt-3 pt-3 border-t border-amber-200 text-xs space-y-1 text-amber-900">
            <div className="truncate">Monthly: <strong>{summaries.interestOnly.monthlyPayment}</strong></div>
            <div>Payoff: <strong>30 Years</strong></div>
          </div>
        </div>

        {/* Extra Repayments */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
            +${extraMonthly}/mo Extra
          </div>
          <div className="text-xl font-bold font-heading text-blue-900 mt-1 tabular-nums">
            ${summaries.extraRepayments.totalInterest.toLocaleString()}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            Saves ${summaries.extraRepayments.interestSaved.toLocaleString()}
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200 text-xs space-y-1 text-blue-950">
            <div>Payoff: <strong>{summaries.extraRepayments.payoffYears} Years</strong></div>
            <div>Saved: <strong>{(30 - Number(summaries.extraRepayments.payoffYears)).toFixed(1)} yrs earlier</strong></div>
          </div>
        </div>

        {/* Blueprint Optimized */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
            <span>Blueprint Optimized</span>
            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
              BEST
            </span>
          </div>
          <div className="text-xl font-bold font-heading text-emerald-950 mt-1 tabular-nums">
            ${summaries.blueprintOptimized.totalInterest.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            Saves ${summaries.blueprintOptimized.interestSaved.toLocaleString()}!
          </div>
          <div className="mt-3 pt-3 border-t border-emerald-200 text-xs space-y-1 text-emerald-950">
            <div>Payoff: <strong>{summaries.blueprintOptimized.payoffYears} Years</strong></div>
            <div>Rate Cut: <strong>-0.45% 2-Yr Review</strong></div>
          </div>
        </div>

      </div>

      {/* Explanatory callout & booking action */}
      <div className="mt-8 p-4 sm:p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>The Blueprint Difference:</strong> Most banks keep loyal clients on uncompetitive rates, extracting tens of thousands in excess interest. Our systematic 2-year renegotiation cycle and offset structure ensure you stay on the lowest curve.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="shrink-0 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5"
        >
          <span>Request Free Loan Structure Audit</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
