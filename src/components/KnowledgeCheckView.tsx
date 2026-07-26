import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { MOCK_QUIZ } from '../data/mockData';
import { Brain, CheckCircle2, XCircle, Trophy, ArrowRight, BookOpen, Shield, RefreshCw } from 'lucide-react';

interface KnowledgeCheckViewProps {
  onBackToDashboard: () => void;
}

export const KnowledgeCheckView: React.FC<KnowledgeCheckViewProps> = ({ onBackToDashboard }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = MOCK_QUIZ[currentIdx];

  const handleAnswer = (ans: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);

    if (ans === question.correctAnswer) {
      setScore(prev => prev + 25);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < MOCK_QUIZ.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl my-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-100 text-sky-800">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950">N-Learn: Anti-Bullying</h2>
            <p className="text-xs text-slate-500">Uji wawasanmu tentang perundungan & ketahui mitos vs fakta.</p>
          </div>
        </div>

        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors self-start sm:self-auto min-h-[44px]"
        >
          ← Kembali ke Dashboard
        </button>
      </div>

      {/* QUIZ SECTION */}
      {!completed ? (
        <div className="mt-6 max-w-2xl mx-auto bg-sky-50/60 p-6 rounded-2xl border border-sky-200">
          
          <div className="flex items-center justify-between text-xs font-bold text-sky-800 mb-4">
            <span>Soal {currentIdx + 1} dari {MOCK_QUIZ.length}</span>
            <span>Skor: {score} Poin</span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-sky-600 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / MOCK_QUIZ.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-sm font-bold text-slate-800 mb-6 leading-relaxed">
            {question.question}
          </p>

          {/* Mitos vs Fakta Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleAnswer(false)} // False = Mitos
              disabled={isAnswered}
              className={`p-4 rounded-xl border-2 font-black text-sm flex flex-col items-center justify-center gap-1 transition-all ${
                isAnswered && question.correctAnswer === false
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                  : isAnswered && selectedAnswer === false && question.correctAnswer !== false
                  ? 'bg-red-100 border-red-500 text-red-900'
                  : 'bg-white border-slate-200 hover:border-sky-400 text-slate-700'
              }`}
            >
              <XCircle className="w-6 h-6 text-red-500" />
              <span>MITOS</span>
            </button>

            <button
              onClick={() => handleAnswer(true)} // True = Fakta
              disabled={isAnswered}
              className={`p-4 rounded-xl border-2 font-black text-sm flex flex-col items-center justify-center gap-1 transition-all ${
                isAnswered && question.correctAnswer === true
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                  : isAnswered && selectedAnswer === true && question.correctAnswer !== true
                  ? 'bg-red-100 border-red-500 text-red-900'
                  : 'bg-white border-slate-200 hover:border-sky-400 text-slate-700'
              }`}
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <span>FAKTA</span>
            </button>
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-white border border-sky-200 text-xs text-slate-700 space-y-3 mb-4 animate-in fade-in duration-200">
              <p className="font-bold text-sky-900">Penjelasan Lengkap:</p>
              <p className="leading-relaxed">{question.explanation}</p>

              <button
                onClick={handleNext}
                className="w-full min-h-[44px] rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors px-4"
              >
                <span>Lanjut ke Soal Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* QUIZ COMPLETED CERTIFICATE BADGE */
        <div className="mt-8 text-center max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-b from-sky-50 to-cyan-50 border border-sky-200 shadow-md space-y-4">
          <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-300 text-amber-600 flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-extrabold text-sky-950">Selamat, Kamu Lulus!</h3>
          <p className="text-xs text-slate-600">
            Skor Akhirmu: <span className="font-extrabold text-sky-700 text-base">{score} / 100 Poin</span>
          </p>

          <div className="p-4 rounded-2xl bg-white border border-sky-200 text-xs font-semibold text-sky-900 flex items-center justify-center gap-1.5">
            <Trophy className="w-4 h-4 text-cyan-700" />
            <span>Kamu Memperoleh Lencana: <span className="font-black text-cyan-700">"Pahlawan Upstander NABIS 2026"</span></span>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow"
          >
            <RefreshCw className="w-4 h-4" /> Ulangi Kuis
          </button>
        </div>
      )}

      {/* KNOWLEDGE GUIDE CARDS */}
      <div className="mt-10 pt-8 border-t border-slate-100">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-600" />
          Ensiklopedia Jenis-Jenis Perundungan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <p className="font-extrabold text-sky-900 mb-1">1. Bullying Fisik</p>
            <p className="text-slate-600">Memukul, menendang, merusak barang milik orang lain, atau dorongan fisik secara sengaja.</p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
            <p className="font-extrabold text-cyan-900 mb-1">2. Bullying Verbal</p>
            <p className="text-slate-600">Mengejek fisik, julukan buruk, ancaman verbal, atau hinaan berulang.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <p className="font-extrabold text-indigo-900 mb-1">3. Cyberbullying</p>
            <p className="text-slate-600">Ujaran kebencian di media sosial, penyebaran rumor online, atau stiker editan menghina.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <p className="font-extrabold text-emerald-900 mb-1">4. Bullying Relasional</p>
            <p className="text-slate-600">Pengucilan sengaja dari kelompok, penghasutan, atau isolasi sosial teman.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
