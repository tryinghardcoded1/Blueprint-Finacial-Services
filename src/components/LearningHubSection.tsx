import React from 'react';
import { BookOpen, Gift, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { HAVEN_ARTICLES } from '../data/siteData';

interface LearningHubSectionProps {
  onOpenBooking: () => void;
}

export const LearningHubSection: React.FC<LearningHubSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="learning-hub" className="py-16 lg:py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 mb-2">
              Education & Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Learning Hub & Haven Magazine
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Practical guides on Australian property trends, interest rate movements, tax considerations, and client community rewards.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3.5 py-2 rounded-lg border border-blue-200">
            <Gift className="w-4 h-4 text-blue-600" />
            <span>Monthly Community Client Giveaways</span>
          </div>
        </div>

        {/* Magazine Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HAVEN_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Simulated Magazine Header Cover */}
                <div className="p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white relative">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-blue-400 mb-1">
                    {article.category}
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight font-heading text-white">
                    HAVEN
                  </div>
                  <div className="text-[10px] text-slate-400 tracking-wider">
                    MONEY · LIFESTYLE · HOME
                  </div>
                  <div className="mt-4 text-xs font-semibold text-blue-200 bg-white/10 px-2.5 py-1 rounded inline-block">
                    {article.subtitle}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 text-xs font-semibold rounded-lg bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-300 hover:border-blue-600 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
