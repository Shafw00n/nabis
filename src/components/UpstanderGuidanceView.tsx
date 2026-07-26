import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ArrowRight, 
  HeartHandshake, 
  Clock, 
  Users, 
  ShieldAlert,
  Brain
} from 'lucide-react';
import { Article } from '../types';

interface UpstanderGuidanceViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const UpstanderGuidanceView: React.FC<UpstanderGuidanceViewProps> = ({
  articles,
  onSelectArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [customScenario, setCustomScenario] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = ['Semua', 'Panduan Upstander', 'Cyberbullying', 'Tips & Trik', 'Kesehatan Mental', 'Edukasi'];

  const filteredArticles = selectedCategory === 'Semua' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const handleAskAiGuidance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customScenario.trim()) return;

    setIsGenerating(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsGenerating(false);
      setAiResponse(`Panduan Aman Berdasarkan Psikologi Pendidikan untuk situasi: "${customScenario}"

1. Langkah 1 - Utamakan Keselamatan Fisik:
• Pastikan posisi diri berada di area ramai (seperti depan kelas, perpustakaan, atau kantin).
• Jangan langsung membalas dengan kemarahan atau dorongan fisik.

2. Langkah 2 - Gunakan Metode Distract (Pengalihan):
• Buat alasan wajar untuk menyapa korban, contoh: "Eh, kamu dipanggil guru di perpustakaan sekarang" atau "Ayo gabung kelompok kita."

3. Langkah 3 - Laporkan ke Pendamping Resmi:
• Buka tombol N-Report di NABIS untuk mengirim tiket rahasia ke Tim Guru BK sekolah.

4. Langkah 4 - Dampingi Korban:
• Berikan motivasi dan tanyakan keadaannya secara personal setelah situasi mereda.`);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Header Banner */}
      <div className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-800 text-sky-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-sky-300" />
            <span>Edukasi & Panduan Karakter Anti-Bullying</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Panduan "How to Stand Up" & Perpustakaan Edukasi
          </h1>
          <p className="text-sky-200 text-xs sm:text-sm leading-relaxed">
            Sains psikologi membuktikan bahwa tindakan pembela (Upstander) dalam 10 detik pertama dapat menghentikan 57% perundungan di sekolah. Pelajari panduan aman 5D di bawah ini.
          </p>
        </div>
      </div>

      {/* Science-Backed 5D Upstander Framework */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-lg bg-sky-100 text-sky-900">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Kerangka Kerja 5D Upstander (Science-Backed)</h3>
            <p className="text-xs text-slate-500">Metode berbasis penelitian ilmiah untuk meredakan perundungan secara damai & safe.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 space-y-1.5">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">1. Direct</span>
            <h4 className="text-xs font-bold text-slate-800">Tegur Langsung</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              • Berkata tegas namun tenang: "Hentikan, tindakan itu tidak lucu."
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-50/80 border border-cyan-200 space-y-1.5">
            <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider">2. Distract</span>
            <h4 className="text-xs font-bold text-slate-800">Alihkan Perhatian</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              • Bicarakan topik lain atau panggil korban untuk urusan tugas kelas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1.5">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">3. Delegate</span>
            <h4 className="text-xs font-bold text-slate-800">Minta Bantuan</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              • Hubungi Guru BK, Wali Kelas, atau gunakan tombol N-Report.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">4. Delay</span>
            <h4 className="text-xs font-bold text-slate-800">Dampingi Nanti</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              • Hampiri korban setelah kejadian dan tunjukkan bahwa dia didukung.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">5. Document</span>
            <h4 className="text-xs font-bold text-slate-800">Catat Bukti</h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              • Simpan catatan tanggal, waktu, lokasi, dan tangkapan layar.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive AI Guidance Tool */}
      <div className="bg-sky-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-sky-800 text-sky-200">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Tanya AI Pendamping Upstander</h3>
            <p className="text-xs text-sky-200">Ketikkan situasi perundungan yang kamu lihat, AI akan memberikan langkah panduan aman 5D.</p>
          </div>
        </div>

        <form onSubmit={handleAskAiGuidance} className="space-y-3">
          <textarea
            rows={2}
            value={customScenario}
            onChange={(e) => setCustomScenario(e.target.value)}
            placeholder="Contoh: Temanku diejek dan dipalak uang jajan di dekat kantin..."
            className="w-full p-3 rounded-xl bg-sky-950/80 border border-sky-700/80 text-white placeholder-sky-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isGenerating || !customScenario.trim()}
              className="px-4 py-2 rounded-xl bg-white text-sky-900 font-bold text-xs hover:bg-sky-100 transition-all flex items-center space-x-2 shadow-sm"
            >
              {isGenerating ? (
                <span>Memproses AI...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                  <span>Dapatkan Solusi Aman AI</span>
                </>
              )}
            </button>
          </div>
        </form>

        {aiResponse && (
          <div className="mt-4 p-4 rounded-xl bg-sky-950/90 border border-sky-700 text-xs text-sky-100 space-y-2 whitespace-pre-line leading-relaxed">
            {aiResponse}
          </div>
        )}
      </div>

      {/* Categorized Resource Library */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Perpustakaan Artikel Edukasi</h3>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-sky-900/90 text-white text-[10px] font-bold">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{article.readTime}</span>
                  <span className="font-semibold text-sky-800 group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-1">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
