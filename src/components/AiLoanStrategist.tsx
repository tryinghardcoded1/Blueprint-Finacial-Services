import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calculator,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Percent,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Send,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface AiLoanStrategistProps {
  onOpenBookingWithScenario: (scenarioText: string) => void;
  defaultPurpose?: 'purchase' | 'refinance';
}

interface AnalysisResult {
  borrowingCapacityEstimate: string;
  estimatedMonthlyRepayment: string;
  indicativeLVR: string;
  lmiImplication: string;
  potentialSavingsOrEquity: string;
  executiveSummary: string;
  keyRecommendations: string[];
  questionsForBroker: string[];
}

export const AiLoanStrategist: React.FC<AiLoanStrategistProps> = ({
  onOpenBookingWithScenario,
  defaultPurpose = 'purchase',
}) => {
  // Scenario inputs
  const [purpose, setPurpose] = useState<'purchase' | 'refinance' | 'investment' | 'first_home'>(defaultPurpose);
  const [annualIncome, setAnnualIncome] = useState<number>(145000);
  const [secondIncome, setSecondIncome] = useState<number>(65000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(3600);
  const [depositOrEquity, setDepositOrEquity] = useState<number>(180000);
  const [targetPropertyPrice, setTargetPropertyPrice] = useState<number>(950000);
  const [currentLoanAmount, setCurrentLoanAmount] = useState<number>(720000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(6.45);
  const [repaymentType, setRepaymentType] = useState<'PI' | 'IO'>('PI');
  const [preferredTerm, setPreferredTerm] = useState<number>(30);
  const [notes, setNotes] = useState<string>('');

  // AI State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Quick Presets
  const applyPreset = (presetType: string) => {
    if (presetType === 'first_home_sydney') {
      setPurpose('first_home');
      setAnnualIncome(120000);
      setSecondIncome(85000);
      setMonthlyExpenses(3400);
      setDepositOrEquity(80000);
      setTargetPropertyPrice(850000);
      setNotes('Eligible for Australian First Home Guarantee (5% deposit scheme with zero LMI). Looking in Eastern Suburbs / South Sydney.');
    } else if (presetType === 'refinance_rate_cut') {
      setPurpose('refinance');
      setAnnualIncome(160000);
      setSecondIncome(70000);
      setCurrentLoanAmount(780000);
      setCurrentInterestRate(6.59);
      setTargetPropertyPrice(1250000);
      setNotes('Current loan with big-4 bank for 3 years. Looking to reduce rate and access $60,000 equity for renovations.');
    } else if (presetType === 'investor_scaling') {
      setPurpose('investment');
      setAnnualIncome(180000);
      setSecondIncome(110000);
      setMonthlyExpenses(4500);
      setDepositOrEquity(280000);
      setTargetPropertyPrice(1100000);
      setRepaymentType('IO');
      setNotes('Looking to purchase second investment property. Desire tax-effective interest-only structure with 100% offset account.');
    }
  };

  // Instant Mathematical Formulas (Runs instantly on client for zero-latency feedback)
  const clientCalculations = useMemo(() => {
    const loanPrincipal =
      purpose === 'refinance' ? currentLoanAmount : Math.max(10000, targetPropertyPrice - depositOrEquity);
    const estimatedValue = purpose === 'refinance' ? targetPropertyPrice : targetPropertyPrice;
    const lvr = estimatedValue > 0 ? (loanPrincipal / estimatedValue) * 100 : 80;

    // Standard Australian benchmark rates
    const competitiveRate = purpose === 'investment' ? 6.14 : 5.89;
    const monthlyRate = competitiveRate / 100 / 12;
    const totalMonths = preferredTerm * 12;

    let monthlyRepayment = 0;
    if (repaymentType === 'PI') {
      monthlyRepayment =
        (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyRepayment = loanPrincipal * monthlyRate;
    }

    // Refinance savings if applicable
    let monthlySavings = 0;
    if (purpose === 'refinance') {
      const oldMonthlyRate = currentInterestRate / 100 / 12;
      const oldRepayment =
        (currentLoanAmount * (oldMonthlyRate * Math.pow(1 + oldMonthlyRate, totalMonths))) /
        (Math.pow(1 + oldMonthlyRate, totalMonths) - 1);
      monthlySavings = Math.max(0, oldRepayment - monthlyRepayment);
    }

    // Borrowing capacity baseline rough benchmark (income * multiple adjusted for living expenses)
    const totalGross = annualIncome + secondIncome;
    const netMonthlyApprox = (totalGross * 0.72) / 12;
    const disposable = Math.max(500, netMonthlyApprox - monthlyExpenses);
    // Buffer rate ~ 8.9%
    const bufferMonthlyRate = (competitiveRate + 3.0) / 100 / 12;
    const approxBorrowingPower =
      (disposable * (Math.pow(1 + bufferMonthlyRate, totalMonths) - 1)) /
      (bufferMonthlyRate * Math.pow(1 + bufferMonthlyRate, totalMonths));

    return {
      loanPrincipal,
      lvr: lvr.toFixed(1),
      isLmiApplicable: lvr > 80 && purpose !== 'first_home',
      monthlyRepayment: Math.round(monthlyRepayment),
      fortnightlyRepayment: Math.round((monthlyRepayment * 12) / 26),
      weeklyRepayment: Math.round((monthlyRepayment * 12) / 52),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(monthlySavings * 12),
      approxBorrowingPower: Math.round(approxBorrowingPower / 10000) * 10000,
    };
  }, [
    purpose,
    annualIncome,
    secondIncome,
    monthlyExpenses,
    depositOrEquity,
    targetPropertyPrice,
    currentLoanAmount,
    currentInterestRate,
    repaymentType,
    preferredTerm,
  ]);

  // Call Server-Side Gemini API
  const handleRunAiAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-loan-strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose,
          annualIncome,
          secondIncome,
          monthlyExpenses,
          depositOrEquity,
          targetPropertyPrice,
          currentLoanAmount,
          currentInterestRate,
          preferredLoanTerm: preferredTerm,
          repaymentType,
          state: 'NSW',
          specificSituationNotes: notes,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Failed to run AI analysis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnalysis = () => {
    if (!analysis) return;
    const text = `
Blueprint Financial Services - AI Loan Strategy Assessment
Borrower Purpose: ${purpose.toUpperCase()}
Est. Borrowing Capacity: ${analysis.borrowingCapacityEstimate}
Est. Repayment: ${analysis.estimatedMonthlyRepayment}
Indicative LVR: ${analysis.indicativeLVR}
LMI Assessment: ${analysis.lmiImplication}
Potential Savings: ${analysis.potentialSavingsOrEquity}

Executive Summary:
${analysis.executiveSummary}

Key Recommendations:
${analysis.keyRecommendations.map((r) => `• ${r}`).join('\n')}

Broker Discussion Points:
${analysis.questionsForBroker.map((q) => `• ${q}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerConsultation = () => {
    const summary = analysis
      ? `AI Loan Strategy Assessment for ${purpose.toUpperCase()}: Looking at est. borrowing of ${analysis.borrowingCapacityEstimate}, LVR ${analysis.indicativeLVR}. Note: ${notes || 'Standard scenario'}`
      : `Loan scenario: ${purpose.toUpperCase()}, Price/Balance: $${(purpose === 'refinance' ? currentLoanAmount : targetPropertyPrice).toLocaleString()}, Incomes: $${(annualIncome + secondIncome).toLocaleString()}`;
    onOpenBookingWithScenario(summary);
  };

  return (
    <section id="ai-calculator" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient blur backdrop */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/80 border border-blue-800/80 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Proprietary Credit Modeling · Sydney Mortgage Specialist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Blueprint AI Loan Strategist™
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Combine precision Australian lending math with intelligent credit policy insights. See what banks will evaluate before you submit.
          </p>

          {/* Quick Scenario Preset Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 mr-2">Try quick scenarios:</span>
            <button
              onClick={() => applyPreset('first_home_sydney')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 transition-colors"
            >
              Sydney First Home (5% Deposit)
            </button>
            <button
              onClick={() => applyPreset('refinance_rate_cut')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition-colors"
            >
              Refinance & Rate Reduction
            </button>
            <button
              onClick={() => applyPreset('investor_scaling')}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            >
              Property Investor (Interest-Only)
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Parameters vs Live Mathematical Output & AI Intelligence */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Calculator className="w-5 h-5 text-blue-400" />
              <span>1. Your Financial Snapshot</span>
            </h3>

            {/* Purpose Selector */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-slate-400 mb-2">Loan Objective</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'purchase', label: 'Buy a Home' },
                  { key: 'refinance', label: 'Refinance Loan' },
                  { key: 'first_home', label: 'First Home Buyer' },
                  { key: 'investment', label: 'Investment Property' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPurpose(item.key as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                      purpose === item.key
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Income Inputs */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Primary Gross Annual Income</span>
                  <span className="text-blue-400 font-bold tabular-nums">
                    ${annualIncome.toLocaleString()} AUD
                  </span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="450000"
                  step="5000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Co-borrower / Second Income</span>
                  <span className="text-blue-400 font-bold tabular-nums">
                    ${secondIncome.toLocaleString()} AUD
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="350000"
                  step="5000"
                  value={secondIncome}
                  onChange={(e) => setSecondIncome(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Monthly Living Expenses</span>
                  <span className="text-slate-400 font-bold tabular-nums">
                    ${monthlyExpenses.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="12000"
                  step="200"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {purpose === 'refinance' ? (
                <>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Current Loan Balance</span>
                      <span className="text-indigo-400 font-bold tabular-nums">
                        ${currentLoanAmount.toLocaleString()} AUD
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="2500000"
                      step="25000"
                      value={currentLoanAmount}
                      onChange={(e) => setCurrentLoanAmount(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Current Interest Rate</span>
                      <span className="text-amber-400 font-bold tabular-nums">
                        {currentInterestRate.toFixed(2)}% p.a.
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4.50"
                      max="8.50"
                      step="0.05"
                      value={currentInterestRate}
                      onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Target Property Price</span>
                      <span className="text-blue-400 font-bold tabular-nums">
                        ${targetPropertyPrice.toLocaleString()} AUD
                      </span>
                    </div>
                    <input
                      type="range"
                      min="350000"
                      max="3500000"
                      step="25000"
                      value={targetPropertyPrice}
                      onChange={(e) => setTargetPropertyPrice(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Available Deposit / Savings</span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        ${depositOrEquity.toLocaleString()} AUD
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20000"
                      max="1000000"
                      step="10000"
                      value={depositOrEquity}
                      onChange={(e) => setDepositOrEquity(Number(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* Natural Language Notes / Specific Aspirations */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Specific Questions or Situation (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Self-employed for 2 years, looking in Coogee/Eastern Suburbs, want to avoid LMI or release equity..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Action Button: Run AI Assessment */}
              <button
                type="button"
                onClick={() => handleRunAiAnalysis()}
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                    <span>Analyzing APRA Buffers & 40+ Lenders...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Generate AI Mortgage Strategy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Math Metrics & AI Strategic Assessment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real-Time Live Math Cards (Zero-latency instant figures) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-medium text-slate-400">Est. Repayment (Monthly)</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-heading tabular-nums mt-1">
                  ${clientCalculations.monthlyRepayment.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ${clientCalculations.fortnightlyRepayment.toLocaleString()} fortnightly
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-medium text-slate-400">Indicative LVR</div>
                <div
                  className={`text-xl sm:text-2xl font-bold font-heading tabular-nums mt-1 ${
                    Number(clientCalculations.lvr) <= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {clientCalculations.lvr}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {Number(clientCalculations.lvr) <= 80 ? 'No LMI required' : 'LMI applies (or 5% scheme)'}
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-medium text-slate-400">
                  {purpose === 'refinance' ? 'Potential Monthly Savings' : 'Est. Borrowing Power'}
                </div>
                <div className="text-xl sm:text-2xl font-bold text-sky-400 font-heading tabular-nums mt-1">
                  {purpose === 'refinance'
                    ? `$${clientCalculations.monthlySavings.toLocaleString()}/mo`
                    : `$${(clientCalculations.approxBorrowingPower / 1000).toFixed(0)}k`}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {purpose === 'refinance'
                    ? `$${clientCalculations.annualSavings.toLocaleString()} / year`
                    : 'Subject to 3% APRA buffer'}
                </div>
              </div>
            </div>

            {/* AI Assessment Panel */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      Blueprint AI Credit Analysis & Strategy
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Grounded in Australian credit policy & 40+ lender tier benchmarks
                    </span>
                  </div>
                </div>

                {analysis && (
                  <button
                    onClick={copyAnalysis}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 transition-colors"
                    title="Copy Assessment"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {/* Assessment Body */}
              {isLoading ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-slate-300 font-medium">
                    Synthesizing credit policies across Banjo, Bank Australia, ANZ, Macquarie, CBA & more...
                  </p>
                  <p className="text-xs text-slate-500">
                    Applying APRA 3% serviceability buffer, NSW stamp duty brackets, and offset structure...
                  </p>
                </div>
              ) : analysis ? (
                <div className="space-y-5">
                  {/* Executive Summary */}
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                      Executive Mortgage Assessment
                    </h5>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {analysis.executiveSummary}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80">
                      <div className="text-[11px] text-slate-400">Borrowing Capacity Bracket</div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {analysis.borrowingCapacityEstimate}
                      </div>
                    </div>
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80">
                      <div className="text-[11px] text-slate-400">LMI Mitigation Status</div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        {analysis.lmiImplication}
                      </div>
                    </div>
                  </div>

                  {/* Key Recommendations */}
                  <div className="pt-2">
                    <h5 className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                      Strategic Blueprint Recommendations
                    </h5>
                    <ul className="space-y-2">
                      {analysis.keyRecommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Questions Karina will discuss */}
                  <div className="pt-2">
                    <h5 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                      Priority Points for Your Broker Consultation
                    </h5>
                    <ul className="space-y-2">
                      {analysis.questionsForBroker.map((q, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                          <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Strip */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-400 text-center sm:text-left">
                      Ready to verify with 40+ Australian lenders?
                    </div>
                    <button
                      onClick={triggerConsultation}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>Book Consultation With Karina</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Initial Prompt State */
                <div className="py-8 text-center space-y-4">
                  <p className="text-sm text-slate-300">
                    Adjust the financial sliders on the left or click one of the quick scenario presets, then click{' '}
                    <strong className="text-blue-400">Generate AI Mortgage Strategy</strong> to receive a bespoke credit analysis.
                  </p>
                  <button
                    onClick={() => handleRunAiAnalysis()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Run Analysis on Current Scenario</span>
                  </button>
                </div>
              )}
            </div>

            {/* Regulatory qualification */}
            <p className="text-[11px] text-slate-500 leading-normal">
              Disclaimer: The Blueprint AI Loan Strategist provides indicative estimates for educational and discussion purposes based on standard Australian credit parameters and APRA benchmark guidelines. It does not constitute formal credit assistance or a guaranteed loan offer under the National Consumer Credit Protection Act 2009. Official borrowing capacity and loan approvals depend on full lender verification by Blueprint Financial Services (ACL 389087).
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
