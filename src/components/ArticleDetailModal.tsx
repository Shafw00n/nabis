import React from 'react';
import { Article } from '../types';
import { X, Clock, User, Share2, BookOpen, Heart } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-sky-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Article Banner Header Image */}
        <div className="relative h-56 sm:h-64 bg-slate-900 shrink-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {article.category}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold mt-2 leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="px-6 py-3 bg-sky-50 border-b border-sky-100 flex items-center justify-between text-xs text-sky-900">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5 text-sky-600" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> {article.readTime}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">{article.date}</span>
        </div>

        {/* Article Paragraph Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 italic">Diulas oleh Tim Bimbingan Konseling NABIS</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold transition-colors"
          >
            Selesai Membaca
          </button>
        </div>

      </div>

    </div>
  );
};
