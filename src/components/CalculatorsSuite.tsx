import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Percent,
  Calendar,
  PiggyBank,
  TrendingDown,
  Building,
  Split,
  ChevronRight,
  ArrowRight,
  LineChart,
} from 'lucide-react';
import { LoanComparisonVisualizer } from './LoanComparisonVisualizer';

interface CalculatorsSuiteProps {
  onOpenBooking: () => void;
}

export const CalculatorsSuite: React.FC<CalculatorsSuiteProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'repayment' | 'refinance' | 'stampDuty' | 'splitLoan' | 'extra'>('visualizer');

  // Repayment state
  const [repLoanAmount, setRepLoanAmount] = useState<number>(750000);
  const [repRate, setRepRate] = useState<number>(5.99);
  const [repTerm, setRepTerm] = useState<number>(30);
  const [repFrequency, setRepFrequency] = useState<'monthly' | 'fortnightly' | 'weekly'>('monthly');
  const [repType, setRepType] = useState<'PI' | 'IO'>('PI');

  // Refinance state
  const [refBalance, setRefBalance] = useState<number>(680000);
  const [refCurrentRate, setRefCurrentRate] = useState<number>(6.65);
  const [refNewRate, setRefNewRate] = useState<number>(5.89);
  const [refTermRemaining, setRefTermRemaining] = useState<number>(25);

  // Stamp Duty state
  const [sdPrice, setSdPrice] = useState<number>(950000);
  const [sdState, setSdState] = useState<'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA'>('NSW');
  const [sdBuyerType, setSdBuyerType] = useState<'first_home' | 'owner' | 'investor'>('first_home');

  // Split Loan state
  const [splitTotal, setSplitTotal] = useState<number>(800000);
  const [splitFixedPct, setSplitFixedPct] = useState<number>(50);
  const [splitFixedRate, setSplitFixedRate] = useState<number>(5.69);
  const [splitVarRate, setSplitVarRate] = useState<number>(6.09);

  // Extra Repayments state
  const [extBalance, setExtBalance] = useState<number>(600000);
  const [extRate, setExtRate] = useState<number>(6.10);
  const [extExtraMonthly, setExtExtraMonthly] = useState<number>(400);

  // Calculations: Repayment
  const repaymentResults = useMemo(() => {
    const monthlyRate = repRate / 100 / 12;
    const totalMonths = repTerm * 12;

    let monthly = 0;
    if (repType === 'PI') {
      monthly = (repLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthly = repLoanAmount * monthlyRate;
    }

    const totalPaid = monthly * totalMonths;
    const totalInterest = Math.max(0, totalPaid - repLoanAmount);

    let payment = monthly;
    if (repFrequency === 'fortnightly') payment = (monthly * 12) / 26;
    if (repFrequency === 'weekly') payment = (monthly * 12) / 52;

    return {
      payment: Math.round(payment),
      monthly: Math.round(monthly),
      totalInterest: Math.round(totalInterest),
      totalPaid: Math.round(totalPaid),
    };
  }, [repLoanAmount, repRate, repTerm, repFrequency, repType]);

  // Calculations: Refinance
  const refinanceResults = useMemo(() => {
    const totalMonths = refTermRemaining * 12;
    const rOld = refCurrentRate / 100 / 12;
    const rNew = refNewRate / 100 / 12;

    const oldMonthly = (refBalance * (rOld * Math.pow(1 + rOld, totalMonths))) / (Math.pow(1 + rOld, totalMonths) - 1);
    const newMonthly = (refBalance * (rNew * Math.pow(1 + rNew, totalMonths))) / (Math.pow(1 + rNew, totalMonths) - 1);

    const monthlySaving = Math.max(0, oldMonthly - newMonthly);
    const annualSaving = monthlySaving * 12;
    const fiveYearSaving = monthlySaving * 60;
    const lifetimeSaving = monthlySaving * totalMonths;

    return {
      oldMonthly: Math.round(oldMonthly),
      newMonthly: Math.round(newMonthly),
      monthlySaving: Math.round(monthlySaving),
      annualSaving: Math.round(annualSaving),
      fiveYearSaving: Math.round(fiveYearSaving),
      lifetimeSaving: Math.round(lifetimeSaving),
    };
  }, [refBalance, refCurrentRate, refNewRate, refTermRemaining]);

  // Calculations: Stamp Duty (NSW & other states approximation with FHB exemptions)
  const stampDutyResults = useMemo(() => {
    let duty = 0;
    let concession = false;

    if (sdState === 'NSW') {
      // NSW First Home Buyer Assistance Scheme: Full exemption up to $800k, concessional up to $1M
      if (sdBuyerType === 'first_home') {
        if (sdPrice <= 800000) {
          duty = 0;
          concession = true;
        } else if (sdPrice <= 1000000) {
          // Concession gradient
          duty = (sdPrice - 800000) * 0.154;
          concession = true;
        } else {
          duty = 8990 + (sdPrice - 304000) * 0.045;
        }
      } else {
        if (sdPrice <= 350000) duty = sdPrice * 0.03;
        else if (sdPrice <= 1000000) duty = 10000 + (sdPrice - 350000) * 0.045;
        else duty = 40000 + (sdPrice - 1000000) * 0.055;
      }
    } else {
      // General state average formula
      const rate = sdBuyerType === 'first_home' && sdPrice <= 750000 ? 0.02 : 0.042;
      duty = sdPrice * rate;
    }

    const transferFee = 165;
    const mortgageRegFee = 165;
    const totalGovernmentFees = Math.round(duty + transferFee + mortgageRegFee);

    return {
      duty: Math.round(duty),
      transferFee,
      mortgageRegFee,
      totalGovernmentFees,
      concession,
    };
  }, [sdPrice, sdState, sdBuyerType]);

  // Calculations: Split Loan
  const splitResults = useMemo(() => {
    const fixedAmount = (splitTotal * splitFixedPct) / 100;
    const varAmount = splitTotal - fixedAmount;
    const blendedRate = (splitFixedRate * splitFixedPct + splitVarRate * (100 - splitFixedPct)) / 100;

    const r = blendedRate / 100 / 12;
    const n = 30 * 12;
    const monthly = (splitTotal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    return {
      fixedAmount: Math.round(fixedAmount),
      varAmount: Math.round(varAmount),
      blendedRate: blendedRate.toFixed(2),
      monthly: Math.round(monthly),
    };
  }, [splitTotal, splitFixedPct, splitFixedRate, splitVarRate]);

  // Calculations: Extra Repayments
  const extraResults = useMemo(() => {
    const r = extRate / 100 / 12;
    const n = 30 * 12;
    const standardMonthly = (extBalance * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const newMonthly = standardMonthly + extExtraMonthly;

    // Estimate years saved
    let balance = extBalance;
    let months = 0;
    let totalInterestNew = 0;

    while (balance > 0 && months < 360) {
      const interest = balance * r;
      totalInterestNew += interest;
      const principal = newMonthly - interest;
      balance -= principal;
      months++;
    }

    const rawYearsSaved = Math.max(0, (360 - months) / 12);
    const yearsSaved = rawYearsSaved.toFixed(1);
    const totalInterestOld = standardMonthly * 360 - extBalance;
    const interestSaved = Math.max(0, totalInterestOld - totalInterestNew);

    return {
      standardMonthly: Math.round(standardMonthly),
      newMonthly: Math.round(newMonthly),
      yearsSaved,
      interestSaved: Math.round(interestSaved),
    };
  }, [extBalance, extRate, extExtraMonthly]);

  return (
    <section id="calculators" className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
            Independent Australian Finance Tools
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Comprehensive Mortgage Calculators
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Accurate, real-world borrowing, refinancing, and stamp duty tools to test your options before speaking with a broker.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 p-1.5 bg-slate-200/80 rounded-xl max-w-4xl mx-auto mb-10 border border-slate-300/80 no-scrollbar">
          {[
            { id: 'visualizer', label: 'Loan Comparison (Interactive Chart)', icon: LineChart },
            { id: 'repayment', label: 'Loan Repayments', icon: Calculator },
            { id: 'refinance', label: 'Refinance Savings', icon: TrendingDown },
            { id: 'stampDuty', label: 'Stamp Duty (NSW)', icon: Building },
            { id: 'splitLoan', label: 'Split Fixed / Variable', icon: Split },
            { id: 'extra', label: 'Extra Repayments & Offset', icon: PiggyBank },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display: Visualizer or Calculator Body Container */}
        {activeTab === 'visualizer' ? (
          <LoanComparisonVisualizer onOpenBooking={onOpenBooking} />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-10 max-w-5xl mx-auto">
            {/* TAB 1: Repayment Calculator */}
            {activeTab === 'repayment' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Loan Amount</span>
                    <span className="text-slate-900 font-bold tabular-nums">
                      ${repLoanAmount.toLocaleString()} AUD
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2500000"
                    step="25000"
                    value={repLoanAmount}
                    onChange={(e) => setRepLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Interest Rate</span>
                    <span className="text-blue-600 font-bold tabular-nums">
                      {repRate.toFixed(2)}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="9.0"
                    step="0.05"
                    value={repRate}
                    onChange={(e) => setRepRate(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Loan Term</span>
                    <span className="text-slate-900 font-bold tabular-nums">
                      {repTerm} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="5"
                    value={repTerm}
                    onChange={(e) => setRepTerm(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Repayment Frequency & Type */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Repayment Frequency</label>
                    <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                      {(['monthly', 'fortnightly', 'weekly'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setRepFrequency(f)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors ${
                            repFrequency === f ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Repayment Type</label>
                    <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
                      <button
                        onClick={() => setRepType('PI')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          repType === 'PI' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        P & I
                      </button>
                      <button
                        onClick={() => setRepType('IO')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          repType === 'IO' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Interest Only
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Column */}
              <div className="lg:col-span-5 bg-blue-900 text-white rounded-xl p-6 sm:p-7 shadow-md">
                <div className="text-xs text-blue-200 font-medium">Estimated Repayment</div>
                <div className="text-3xl sm:text-4xl font-bold font-heading tabular-nums mt-1 text-white">
                  ${repaymentResults.payment.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-blue-200">/ {repFrequency}</span>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-800 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Total Loan Principal:</span>
                    <span className="font-bold tabular-nums">${repLoanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Total Interest Payable:</span>
                    <span className="font-bold tabular-nums">${repaymentResults.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-800/80 font-bold">
                    <span>Total Cost of Loan:</span>
                    <span className="tabular-nums">${repaymentResults.totalPaid.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full mt-6 py-2.5 text-xs font-semibold rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Compare Across 40+ Lenders</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Refinance Comparison */}
          {activeTab === 'refinance' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Remaining Balance</span>
                    <span className="text-slate-900 font-bold tabular-nums">${refBalance.toLocaleString()} AUD</span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="2500000"
                    step="25000"
                    value={refBalance}
                    onChange={(e) => setRefBalance(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Current Rate (% p.a.)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={refCurrentRate}
                      onChange={(e) => setRefCurrentRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Blueprint Refinance Target (% p.a.)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={refNewRate}
                      onChange={(e) => setRefNewRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-blue-50 border border-blue-300 rounded-lg text-sm font-bold text-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Remaining Loan Term</span>
                    <span className="text-slate-900 font-bold tabular-nums">{refTermRemaining} Years</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={refTermRemaining}
                    onChange={(e) => setRefTermRemaining(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-5 bg-emerald-900 text-white rounded-xl p-6 sm:p-7 shadow-md">
                <div className="text-xs text-emerald-200 font-medium">Estimated Monthly Cash Savings</div>
                <div className="text-3xl sm:text-4xl font-bold font-heading tabular-nums mt-1 text-white">
                  ${refinanceResults.monthlySaving.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-emerald-200">/ month</span>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-800 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-emerald-200">5-Year Cumulative Savings:</span>
                    <span className="font-bold tabular-nums text-emerald-100">${refinanceResults.fiveYearSaving.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-200">Lifetime Loan Savings:</span>
                    <span className="font-bold tabular-nums text-emerald-100">${refinanceResults.lifetimeSaving.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-emerald-800/80">
                    <span className="text-emerald-200">Old vs New Monthly:</span>
                    <span className="tabular-nums font-semibold">${refinanceResults.oldMonthly} → ${refinanceResults.newMonthly}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full mt-6 py-2.5 text-xs font-semibold rounded-lg bg-white text-emerald-950 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Request Free Rate Audit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Stamp Duty (NSW Focus) */}
          {activeTab === 'stampDuty' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Property Purchase Price</span>
                    <span className="text-slate-900 font-bold tabular-nums">${sdPrice.toLocaleString()} AUD</span>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="3000000"
                    step="25000"
                    value={sdPrice}
                    onChange={(e) => setSdPrice(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">State / Territory</label>
                    <select
                      value={sdState}
                      onChange={(e) => setSdState(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900"
                    >
                      <option value="NSW">NSW (Sydney)</option>
                      <option value="VIC">VIC (Melbourne)</option>
                      <option value="QLD">QLD (Brisbane)</option>
                      <option value="WA">WA (Perth)</option>
                      <option value="SA">SA (Adelaide)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Buyer Status</label>
                    <select
                      value={sdBuyerType}
                      onChange={(e) => setSdBuyerType(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900"
                    >
                      <option value="first_home">First Home Buyer</option>
                      <option value="owner">Owner Occupier (Next Home)</option>
                      <option value="investor">Property Investor</option>
                    </select>
                  </div>
                </div>

                {sdState === 'NSW' && sdBuyerType === 'first_home' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                    <strong>NSW First Home Buyer Assistance Scheme:</strong> Nil stamp duty up to $800,000, and concessional rate up to $1,000,000.
                  </div>
                )}
              </div>

              {/* Output */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-7 shadow-md">
                <div className="text-xs text-slate-400 font-medium">Estimated State Government Stamp Duty</div>
                <div className="text-3xl sm:text-4xl font-bold font-heading tabular-nums mt-1 text-white">
                  ${stampDutyResults.duty.toLocaleString()}{' '}
                  {stampDutyResults.duty === 0 && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                      100% EXEMPT
                    </span>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transfer Registration:</span>
                    <span className="font-bold tabular-nums">${stampDutyResults.transferFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mortgage Registration:</span>
                    <span className="font-bold tabular-nums">${stampDutyResults.mortgageRegFee}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 font-bold">
                    <span>Total Upfront Gov Fees:</span>
                    <span className="tabular-nums text-blue-300">${stampDutyResults.totalGovernmentFees.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full mt-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Verify Eligible Grants With Karina</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Split Loan */}
          {activeTab === 'splitLoan' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Total Borrowing Amount</span>
                    <span className="text-slate-900 font-bold tabular-nums">${splitTotal.toLocaleString()} AUD</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="2500000"
                    step="25000"
                    value={splitTotal}
                    onChange={(e) => setSplitTotal(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Fixed vs Variable Allocation</span>
                    <span className="text-blue-600 font-bold tabular-nums">
                      {splitFixedPct}% Fixed / {100 - splitFixedPct}% Variable
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={splitFixedPct}
                    onChange={(e) => setSplitFixedPct(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Fixed Portion Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={splitFixedRate}
                      onChange={(e) => setSplitFixedRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Variable Portion Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={splitVarRate}
                      onChange={(e) => setSplitVarRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-5 bg-indigo-950 text-white rounded-xl p-6 sm:p-7 shadow-md">
                <div className="text-xs text-indigo-300 font-medium">Effective Combined Rate</div>
                <div className="text-3xl sm:text-4xl font-bold font-heading tabular-nums mt-1 text-white">
                  {splitResults.blendedRate}% <span className="text-sm font-normal text-indigo-300">p.a.</span>
                </div>

                <div className="mt-6 pt-6 border-t border-indigo-900 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Fixed Balance:</span>
                    <span className="font-bold tabular-nums">${splitResults.fixedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300">Variable Balance (with offset):</span>
                    <span className="font-bold tabular-nums">${splitResults.varAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-indigo-900 font-bold">
                    <span>Est. Combined Monthly:</span>
                    <span className="tabular-nums text-white">${splitResults.monthly.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full mt-6 py-2.5 text-xs font-semibold rounded-lg bg-white text-indigo-950 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Split Structures With Karina</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: Extra Repayments & Offset */}
          {activeTab === 'extra' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Current Loan Balance</span>
                    <span className="text-slate-900 font-bold tabular-nums">${extBalance.toLocaleString()} AUD</span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="2000000"
                    step="25000"
                    value={extBalance}
                    onChange={(e) => setExtBalance(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-slate-600">Extra Contribution / Offset Deposit (Monthly)</span>
                    <span className="text-blue-600 font-bold tabular-nums">+${extExtraMonthly.toLocaleString()} AUD</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2500"
                    step="50"
                    value={extExtraMonthly}
                    onChange={(e) => setExtExtraMonthly(Number(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mortgage Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={extRate}
                    onChange={(e) => setExtRate(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-slate-900"
                  />
                </div>
              </div>

              {/* Output */}
              <div className="lg:col-span-5 bg-blue-950 text-white rounded-xl p-6 sm:p-7 shadow-md">
                <div className="text-xs text-blue-300 font-medium">Mortgage Time Saved</div>
                <div className="text-3xl sm:text-4xl font-bold font-heading tabular-nums mt-1 text-emerald-400">
                  {extraResults.yearsSaved} Years Off
                </div>

                <div className="mt-6 pt-6 border-t border-blue-900 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-300">Total Interest Saved:</span>
                    <span className="font-bold tabular-nums text-emerald-300">${extraResults.interestSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Standard Monthly:</span>
                    <span className="font-bold tabular-nums">${extraResults.standardMonthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-900 font-bold">
                    <span>New Monthly Target:</span>
                    <span className="tabular-nums text-white">${extraResults.newMonthly.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full mt-6 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Set Up 100% Offset Account</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
        )}

      </div>
    </section>
  );
};
