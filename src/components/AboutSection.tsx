import React from 'react';
import { Award, ShieldCheck, HeartHandshake, PhoneCall, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/siteData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
            Meet Your Broker
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Your Dedicated Partner in Financial Success
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Welcome to Blueprint Financial Services, where we make your dreams of wealth and homeownership a reality with over a decade of industry expertise in Sydney.
          </p>
        </div>

        {/* 2-Column Split: Director Spotlight & Commitment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: Director Card & Accolades (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 shadow-xl border border-slate-800 text-center relative overflow-hidden">
            <div className="w-32 h-32 rounded-full mx-auto border-4 border-blue-400/40 p-1 bg-slate-800/80 mb-5 overflow-hidden shadow-lg">
              {/* Director Avatar / Professional Silhouette or Badge */}
              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold font-heading">
                KB
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Finalist 2024 Local Business Awards</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {BUSINESS_INFO.director}
            </h3>
            <div className="text-xs text-blue-300 font-medium mt-1">
              {BUSINESS_INFO.directorTitle}
            </div>

            <p className="text-xs text-slate-300 mt-4 leading-relaxed max-w-sm mx-auto">
              "We work for you, not the banks. We leave no stone unturned in finding the optimal finance solution for your specific goals, family, and future."
            </p>

            <div className="mt-6 pt-5 border-t border-slate-800 text-left space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{BUSINESS_INFO.creditLicence}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>ABN: {BUSINESS_INFO.abn}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Based in {BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Right: Story & The "Never Set and Forget" Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Our Story & Vision
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Blueprint Financial Services started with a simple vision: to provide exceptional mortgage and financial services that put our clients first, strengthen their financial position, and achieve their key wealth goals. In a market dominated by complex bank jargon and opaque algorithms, we bring human clarity, fierce rate negotiation, and personalized guidance.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-7">
              <h4 className="text-lg font-bold text-blue-950 mb-2">
                Our Signature Commitment: Never "Set and Forget"
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                We believe your home loan should be actively managed throughout its lifetime. Lenders quietly raise rates for existing borrowers while reserving competitive discounts for new ones. By systematically reviewing your mortgage <strong>every two years</strong>, we keep your lender honest, negotiate market-leading rates, and ensure your loan adapts to your evolving family and investment needs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book 15-Minute Strategy Call</span>
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-all"
              >
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>

        </div>

        {/* Real Customer Relationship Feature with Photography */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-2">
                Long-Term Relationships
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Building Lasting Value Beyond Settlement
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you are upgrading your home, expanding your family, or navigating life’s milestones, we remain in regular contact, providing continuous guidance and support. Our commitment to personalized service means many of our clients become lifelong friends.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-6">
                <div>
                  <div className="text-2xl font-bold font-heading text-white">100%</div>
                  <div className="text-xs text-slate-400">Independent Broker Advocacy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">40+</div>
                  <div className="text-xs text-slate-400">Australian Lenders</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">5.0★</div>
                  <div className="text-xs text-slate-400">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 min-h-[320px] relative">
              <img
                src="/src/assets/images/sydney_family_new_home_1792967429198.jpg"
                alt="Happy Australian homeowners outside modern residence in Sydney"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
