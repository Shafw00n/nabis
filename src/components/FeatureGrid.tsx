import React from 'react';
import { Brain, Gamepad2, ShieldAlert, ArrowRight, Lock, Trophy, BookMarked, MessageSquarePlus } from 'lucide-react';

interface FeatureGridProps {
  onOpenKnowledgeCheck: () => void;
  onOpenGames: () => void;
  onOpenLaporModal: () => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  onOpenKnowledgeCheck,
  onOpenGames,
  onOpenLaporModal
}) => {
  return (
    <section className="my-10">
      
      {/* Section Title */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950 tracking-tight">
            Menu Utama Fitur NABIS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pilih fitur untuk belajar, bermain, atau melaporkan perundungan secara aman.
          </p>
        </div>
      </div>

      {/* FEATURE GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: KNOWLEDGE CHECK */}
        <div
          onClick={onOpenKnowledgeCheck}
          className="group cursor-pointer bg-white rounded-3xl p-6 border-2 border-sky-100 hover:border-sky-400 shadow-xl shadow-sky-900/5 hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sky-100 blur-2xl group-hover:bg-sky-200 transition-colors pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <Brain className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold border border-sky-200">
                Edukasi
              </span>
            </div>

            <h3 className="text-lg font-bold text-sky-950 group-hover:text-sky-700 transition-colors">
              N-Learn
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Uji pemahamanmu tentang mitos vs fakta perundungan, pelajari jenis-jenis bullying, dan kenali hak keamananmu sebagai siswa.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-4 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-sky-700">
                <BookMarked className="w-3.5 h-3.5" /> 4 Kuis Interaktif
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Trophy className="w-3.5 h-3.5" /> Dapatkan Lencana
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full py-3 px-4 rounded-xl bg-sky-50 group-hover:bg-sky-700 text-sky-800 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
              <span>Mulai N-Learn</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 2: ANTI BULLYING GAMES */}
        <div
          onClick={onOpenGames}
          className="group cursor-pointer bg-white rounded-3xl p-6 border-2 border-cyan-100 hover:border-cyan-400 shadow-xl shadow-cyan-900/5 hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-100 blur-2xl group-hover:bg-cyan-200 transition-colors pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-extrabold border border-cyan-200">
                Simulasi
              </span>
            </div>

            <h3 className="text-lg font-bold text-sky-950 group-hover:text-cyan-700 transition-colors">
              N-Play
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Mainkan simulasi peran interaktif! Ambil keputusan tepat sebagai 'Upstander' pembela teman dan kumpulkan Poin Empati.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-4 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-cyan-700">
                <Gamepad2 className="w-3.5 h-3.5" /> 2 Misi Skenario
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <Trophy className="w-3.5 h-3.5" /> Poin Empati: +280
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full py-3 px-4 rounded-xl bg-cyan-50 group-hover:bg-cyan-600 text-cyan-800 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm">
              <span>Mainkan Game Now</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 3: TOMBOL MERAH MENONJOL "N-REPORT" */}
        <div
          onClick={onOpenLaporModal}
          className="group cursor-pointer bg-gradient-to-br from-red-600 via-red-600 to-rose-700 rounded-3xl p-6 border-2 border-red-500 hover:border-red-300 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 relative overflow-hidden ring-4 ring-red-100"
        >
          {/* Pulsing Alert Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-all">
                <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-red-700 text-xs font-black uppercase tracking-wider shadow-sm">
                Sangat Penting
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              N-Report <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-800/80 text-red-100">SOS</span>
            </h3>
            <p className="text-xs text-red-100 mt-2 leading-relaxed">
              Kirim laporan perundungan secara 100% anonim atau rahasia. Tim Bimbingan Konseling (BK) akan segera mendampingi.
            </p>

            <div className="mt-4 pt-3 border-t border-red-500/80 flex items-center gap-3 text-[11px] font-bold text-red-100">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-red-200" /> Terlindungi & Anonim
              </span>
              <span className="flex items-center gap-1">
                <MessageSquarePlus className="w-3.5 h-3.5 text-red-200" /> Respon Konselor
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-red-50 text-red-700 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group-hover:scale-[1.02]">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Buka N-Report Sekarang</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
