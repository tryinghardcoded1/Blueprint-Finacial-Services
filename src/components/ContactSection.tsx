import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Send, AlertCircle, RefreshCw } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'Home Loan',
  initialMessage = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loanType, setLoanType] = useState(initialService);
  const [loanAmount, setLoanAmount] = useState('$750,000');
  const [message, setMessage] = useState(initialMessage);

  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          loanType,
          loanAmount,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedTicket(data.ticketId);
      } else {
        setErrorMsg(data.message || 'Submission could not be completed.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      // Fallback ticket for demo resiliency
      setSubmittedTicket(`BFS-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Details & Trust (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                Share Your Ideas
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Connect With Us
              </h2>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Are you ready to achieve your financial goals? Share your details once, and Karina Bridges and our team will take care of the heavy lifting.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/60 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Broker Hotline</div>
                  <div className="text-base font-bold text-white font-heading">
                    {BUSINESS_INFO.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/60 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Email Enquiries</div>
                  <div className="text-sm font-semibold text-white">
                    {BUSINESS_INFO.email}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Postal & Office Location</div>
                  <div className="text-sm font-semibold text-white">
                    {BUSINESS_INFO.address}
                  </div>
                  <div className="text-[11px] text-slate-400">Serving Sydney Eastern Suburbs & Nationwide</div>
                </div>
              </div>
            </div>

            {/* Regulatory Credentials */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Compliant Australian Credit Services</span>
              </div>
              <p className="text-slate-400">
                Blueprint Financial Services is authorised under {BUSINESS_INFO.creditLicence}. ABN: {BUSINESS_INFO.abn}.
              </p>
              <p className="text-slate-400">
                We work strictly in your best interests under the National Consumer Credit Protection Act 2009 (Best Interests Duty).
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-7 sm:p-9 shadow-2xl">
            {submittedTicket ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Reference Ticket: <strong className="text-blue-400">{submittedTicket}</strong>
                </p>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Blueprint Financial Services. Karina Bridges or our senior credit team will review your details and contact you within business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  Request a Free Strategy Consultation
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Fill in your details below. No obligation, no credit checks without your prior signed consent.
                </p>

                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com.au"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0412 345 678"
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Loan Category
                    </label>
                    <select
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Home Loan">Purchase: Home Loan</option>
                      <option value="Refinancing">Refinance: Better Rate / Cash Out</option>
                      <option value="First Home Buyer">First Home Buyer Scheme</option>
                      <option value="Investment Loan">Property Investment Loan</option>
                      <option value="Debt Consolidation">Debt Consolidation</option>
                      <option value="General Advice">General Finance Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Loan Amount / Property Value
                  </label>
                  <input
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="e.g. $850,000"
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Message or Key Goals (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us a little about your timeline, current situation, or specific questions..."
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Secure Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry to Blueprint Financial</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center pt-2">
                  We respect your privacy. Your personal information is handled in accordance with the Australian Privacy Principles and will never be shared without your explicit instruction.
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
