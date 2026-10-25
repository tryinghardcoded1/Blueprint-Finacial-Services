import React, { useState } from 'react';
import { Star, ShieldCheck, Play, ArrowRight, Quote, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/siteData';

interface ReviewsSectionProps {
  onOpenBooking: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenBooking }) => {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const videoSpotlights = [
    {
      id: 'jonathan',
      title: "Client Spotlight: Jonathan's Story",
      duration: '4:15',
      summary: 'How Jonathan navigated competitive Sydney auctions with formal pre-approval and saved over $18,000 on upfront lender fees.',
      tag: 'Home Purchase',
    },
    {
      id: 'refinance-celebration',
      title: 'Strategic Refinance & Equity Release',
      duration: '3:30',
      summary: 'Cutting 1.15% off a variable mortgage rate and unlocking $75,000 equity for home renovations.',
      tag: 'Refinancing',
    },
    {
      id: 'property-empire',
      title: 'Portfolio Structuring: Building Long-Term Wealth',
      duration: '5:20',
      summary: 'How smart interest-only loan structures and separate security titles enabled multi-property portfolio scaling.',
      tag: 'Investment',
    },
  ];

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
            Independent Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            What Our Valued Clients Are Saying
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Verified reviews on Google and RateMyAgent from Australian home buyers, refinancers, and investors.
          </p>

          {/* Social Proof Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-900">Google Reviews</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-800">5.0 / 5.0</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-900">RateMyAgent</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-800">Verified Top Broker</span>
            </div>
          </div>
        </div>

        {/* Written Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {rev.source}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-slate-200 mb-2" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.role}</div>
                </div>
                <div className="text-emerald-600" title="Verified Customer Review">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials / Spotlights Section */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-400 mb-1">
                Real Client Journeys
              </div>
              <h3 className="text-2xl font-bold text-white">
                Video Spotlights & Success Stories
              </h3>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Share Your Property Goals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoSpotlights.map((video) => (
              <div
                key={video.id}
                className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                {/* Simulated Thumbnail with Play Trigger */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-blue-950 flex items-center justify-center p-4 group cursor-pointer"
                  onClick={() => setActiveVideoModal(video.title)}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 group-hover:bg-blue-500 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/70 px-1.5 py-0.5 rounded text-slate-300">
                    {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 text-[10px] font-semibold bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded border border-blue-700/60">
                    {video.tag}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {video.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(video.title)}
                    className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Case Study</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full p-6 border border-slate-800 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white">{activeVideoModal}</h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl flex flex-col items-center justify-center p-8 text-center border border-slate-800">
              <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-4">
                <Play className="w-8 h-8 fill-blue-400" />
              </div>
              <h5 className="text-lg font-bold text-white mb-2">{activeVideoModal}</h5>
              <p className="text-xs text-slate-400 max-w-md">
                Blueprint Financial Services client spotlight video. In production, this embeds the official YouTube case study featuring Karina Bridges and clients.
              </p>
              <button
                onClick={() => {
                  setActiveVideoModal(null);
                  onOpenBooking();
                }}
                className="mt-6 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Discuss Your Own Loan Scenario
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
