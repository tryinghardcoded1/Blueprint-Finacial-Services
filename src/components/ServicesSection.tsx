import React, { useState } from 'react';
import {
  Home,
  RefreshCw,
  TrendingUp,
  Key,
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  X,
} from 'lucide-react';
import { SERVICES_CATALOG, ServiceDetail } from '../data/siteData';

interface ServicesSectionProps {
  onSelectService: (serviceSlug: string) => void;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenBooking }) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceDetail | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'home-loans':
        return Home;
      case 'refinance':
        return RefreshCw;
      case 'investment-loans':
        return TrendingUp;
      case 'first-home-buyer':
        return Key;
      case 'debt-consolidation':
        return Layers;
      default:
        return Home;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
              Our Lending Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Tailored Finance For Every Stage of Your Life
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              We look beyond basic computer algorithms to find lending solutions that match your personal goals across 40+ Australian tier-1 banks and specialty funders.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="self-start md:self-auto px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>Discuss Your Scenario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.map((service, index) => {
            const Icon = getServiceIcon(service.id);
            const isMarquee = index === 0 || index === 1;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between ${
                  isMarquee
                    ? 'bg-gradient-to-br from-slate-50 to-blue-50/40 border-slate-200 hover:border-blue-400 hover:shadow-lg'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
                    0{index + 1}. {service.slug.replace('-', ' ')}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {service.keyBenefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
                  >
                    <span>View Details & FAQs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectService(service.slug);
                      onOpenBooking();
                    }}
                    className="text-xs font-medium text-slate-500 hover:text-slate-900"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  Service Breakdown
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedServiceModal.title}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {selectedServiceModal.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              {/* Who it suits */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Ideal For
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedServiceModal.audience.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Key Advantages with Blueprint
                </h4>
                <ul className="space-y-2">
                  {selectedServiceModal.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3">
                  {selectedServiceModal.typicalQuestions.map((qa, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>{qa.q}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed pl-5">
                        {qa.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedServiceModal.slug;
                  setSelectedServiceModal(null);
                  onSelectService(s);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
              >
                Book Consultation for this Loan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
