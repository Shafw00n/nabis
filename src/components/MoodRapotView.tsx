import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Brain, 
  ShieldCheck, 
  BookOpen, 
  RefreshCw,
  FileText,
  UserCheck
} from 'lucide-react';
import { MoodRapot, UserStudent } from '../types';
import { DEMO_MOOD_RAPOTS } from '../data/mockData';

interface MoodRapotViewProps {
  currentUser: UserStudent;
}

export const MoodRapotView: React.FC<MoodRapotViewProps> = ({ currentUser }) => {
  // Find rapot for current student or fallback to demo rapot
  const existingRapot = DEMO_MOOD_RAPOTS.find(r => r.studentId === currentUser.id) || DEMO_MOOD_RAPOTS[0];
  const [rapot, setRapot] = useState<MoodRapot>(existingRapot);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleRefreshAiAnalysis = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setRapot(prev => ({
        ...prev,
        lastUpdated: 'Baru Saja (24 Juli 2026)',
        aiSummary: `Hasil Analisis AI Terbaru untuk ${currentUser.name}: Emosi siswa cenderung stabil di rata-rata skor ${prev.averageScore}/5. Terdeteksi adaptasi yang baik terhadap jadwal kelas 8B. Disarankan mempertahankan kebiasaan Daily Mood Check dan menyisipkan jeda istirahat ringan saat belajar.`,
      }));
    }, 1200);
  };

  const getLevelBadge = (level: '1' | '2' | '3') => {
    switch (level) {
      case '1':
        return {
          bg: 'bg-emerald-50 border-emerald-300 text-emerald-900',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          label: 'Tingkat 1 - Stabil & Positif'
        };
      case '2':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-900',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          label: 'Tingkat 2 - Perlu Pemantauan Ringan'
        };
      case '3':
        return {
          bg: 'bg-red-50 border-red-300 text-red-900',
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          label: 'Tingkat 3 - Perlu Pendampingan Khusus BK'
        };
    }
  };

  const levelInfo = getLevelBadge(rapot.level);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-800 text-sky-200 text-xs font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              <span>Sistem Rapot Mood & Kesejahteraan Siswa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mood Rapot: {currentUser.name}
            </h1>
            <p className="text-sky-200 text-xs sm:text-sm mt-1">
              Periode {rapot.period} • Kelas {currentUser.className} • SMP Nusantara
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-sky-800/80 backdrop-blur-xs p-4 rounded-xl border border-sky-700/60 text-center min-w-[120px]">
              <p className="text-xs text-sky-300 font-medium">Skor Rata-Rata</p>
              <p className="text-2xl font-black text-white mt-0.5">{rapot.averageScore} <span className="text-xs font-normal text-sky-300">/ 5.0</span></p>
            </div>
            <div className="bg-sky-800/80 backdrop-blur-xs p-4 rounded-xl border border-sky-700/60 text-center min-w-[120px]">
              <p className="text-xs text-sky-300 font-medium">Total Check-In</p>
              <p className="text-2xl font-black text-sky-200 mt-0.5">{rapot.totalCheckIns} <span className="text-xs font-normal text-sky-300">kali</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-level Status Indicator Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${levelInfo.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs`}>
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-xl bg-white shadow-xs">
            {levelInfo.icon}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Status Kesejahteraan Emosional</span>
            <h3 className="text-lg font-bold mt-0.5">{rapot.levelTitle}</h3>
            <p className="text-xs text-slate-600 mt-1">
              • Hasil evaluasi berdasarkan histori Daily Mood Check dan observasi emosional.
            </p>
          </div>
        </div>

        <button
          onClick={handleRefreshAiAnalysis}
          disabled={isGeneratingAi}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
          <span>{isGeneratingAi ? 'Memproses AI...' : 'Perbarui Analisis AI'}</span>
        </button>
      </div>

      {/* Grid Content: AI Analysis & Weekly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Mood Analysis Summary */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-sky-100 text-sky-800">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Analisis Emosi Berbasis AI</h3>
                <p className="text-xs text-slate-500">Pembaruan Terakhir: {rapot.lastUpdated}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 text-[11px] font-semibold border border-sky-200">
              AI Secured
            </span>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="font-medium text-sky-950 mb-1">Rangkuman Psikologis AI:</p>
            <p>{rapot.aiSummary}</p>
          </div>

          {/* Trigger Factors Identified */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Faktor Pemicu Mood Dominan
            </h4>
            <div className="flex flex-wrap gap-2">
              {rapot.triggerFactors.map((factor, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  • {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Science-backed Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Rekomendasi Tindakan Konselor & Mandiri
            </h4>
            <div className="space-y-2">
              {rapot.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                  <span className="text-sky-700 font-bold">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Mood Score Trend */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-cyan-100 text-cyan-800">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Grafik Mingguan</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Bulan Juli</span>
          </div>

          <div className="space-y-4 pt-2">
            {rapot.weeklyScores.map((item, idx) => {
              const percentage = (item.score / 5) * 100;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{item.week}</span>
                    <span className="text-sky-800 font-bold">{item.score} / 5.0</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="bg-sky-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800">Catatan Privasi Sistem Rapot:</p>
            <p>• Data Mood Rapot terhubung aman dengan portal Konselor Bimbingan Konseling (BK).</p>
            <p>• Hanya Guru BK berwenang yang dapat melihat statistik untuk pencegahan dini perundungan.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
