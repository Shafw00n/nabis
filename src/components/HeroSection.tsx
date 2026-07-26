import React, { useState } from 'react';
import { Article } from '../types';
import { BookOpen, Sparkles, ChevronRight, Clock, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenKnowledgeCheck: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  articles,
  onSelectArticle,
  onOpenKnowledgeCheck
}) => {
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const featuredArticles = articles.filter(a => a.featured || activeTab === 'Semua');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-sky-700/50 my-6">
      
      {/* Background Decorative Sea Waves */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none"></div>

      {/* Hero Greeting Top Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-sky-700/60">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-700/50 border border-sky-500/40 text-sky-200 text-xs font-semibold mb-3 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-cyan-300" />
            <span>Zona Bebas Bullying • MAS Milbos Bogor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Selamat Datang, <span className="text-cyan-300">Aqeela!</span>
          </h1>
          <p className="mt-2 text-sky-100 text-sm sm:text-base leading-relaxed">
            Kamu berhak belajar dan berkembang dalam lingkungan yang aman, dihargai, dan penuh kedamaian. Mari saling jaga & rangkul sesama teman.
          </p>
        </div>

        {/* Quick Quote / Hero Action Card */}
        <div className="bg-sky-950/60 backdrop-blur-md p-4 rounded-2xl border border-sky-600/40 max-w-sm w-full flex flex-col justify-between shadow-inner">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">Pesan Hari Ini</p>
              <p className="text-xs text-sky-100 italic mt-1 leading-relaxed">
                "Keberanian bukan tentang tidak punya rasa takut, tapi tentang bertindak benar meski takut."
              </p>
            </div>
          </div>
          <button
            onClick={onOpenKnowledgeCheck}
            className="mt-3 w-full py-3 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-sky-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm min-h-[44px]"
          >
            <BookOpen className="w-4 h-4" /> Pelajari Hak & Keamanan Siswa
          </button>
        </div>
      </div>

      {/* BANNER ARTIKEL SECTION */}
      <div className="relative z-10 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-300" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Banner Artikel Edukasi & Inspirasi</h2>
            </div>
            <p className="text-xs text-sky-200 mt-0.5">Panduan praktis mencegah perundungan dan memperkuat persahabatan</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['Semua', 'Tips & Trik', 'Cyberbullying', 'Kesehatan Mental'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap min-h-[44px] ${
                  activeTab === cat
                    ? 'bg-cyan-400 text-sky-950 font-bold shadow-sm'
                    : 'bg-sky-800/60 text-sky-200 hover:bg-sky-700/80 border border-sky-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Banner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredArticles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-sky-950/80 hover:bg-sky-900/90 rounded-2xl border border-sky-700/60 hover:border-cyan-400/80 overflow-hidden shadow-lg transition-all duration-300 flex flex-col sm:flex-row transform hover:-translate-y-1"
            >
              {/* Banner Image */}
              <div className="sm:w-2/5 h-44 sm:h-auto relative overflow-hidden bg-sky-900">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-sky-950/80 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-cyan-500/30">
                  {article.category}
                </span>
              </div>

              {/* Banner Content */}
              <div className="p-4 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-sky-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-sky-200 mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sky-800/80 flex items-center justify-between text-xs font-semibold text-cyan-300 group-hover:text-cyan-200">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
