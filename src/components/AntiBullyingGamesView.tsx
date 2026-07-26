import React, { useState } from 'react';
import { GameScenario } from '../types';
import { MOCK_GAMES } from '../data/mockData';
import { Gamepad2, Award, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface AntiBullyingGamesViewProps {
  onBackToDashboard: () => void;
}

export const AntiBullyingGamesView: React.FC<AntiBullyingGamesViewProps> = ({ onBackToDashboard }) => {
  const [activeGameIdx, setActiveGameIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(280);

  const currentGame = MOCK_GAMES[activeGameIdx];
  const selectedChoice = currentGame.choices.find(c => c.id === selectedChoiceId);

  const handleSelectChoice = (choice: typeof currentGame.choices[0]) => {
    if (selectedChoiceId) return;
    setSelectedChoiceId(choice.id);
    setTotalPoints(prev => prev + choice.points);
  };

  const handleNextGame = () => {
    if (activeGameIdx + 1 < MOCK_GAMES.length) {
      setActiveGameIdx(activeGameIdx + 1);
      setSelectedChoiceId(null);
    } else {
      setActiveGameIdx(0);
      setSelectedChoiceId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cyan-100 shadow-xl my-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-100 text-cyan-800">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-sky-950">N-Play: Empathy Quest</h2>
            <p className="text-xs text-slate-500">Mainkan simulasi peran & kumpulkan Poin Empati Upstander.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Poin Empati: {totalPoints}</span>
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            ← Kembali
          </button>
        </div>
      </div>

      {/* GAME SCENARIO BOX */}
      <div className="mt-6 max-w-2xl mx-auto bg-gradient-to-br from-cyan-50/70 to-sky-50/70 p-6 rounded-2xl border border-cyan-200 space-y-4">
        
        <div className="flex items-center justify-between text-xs font-bold text-cyan-900">
          <span className="px-2.5 py-1 rounded-md bg-cyan-600 text-white uppercase text-[10px] tracking-wider">
            {currentGame.title}
          </span>
          <span>Skenario {activeGameIdx + 1} dari {MOCK_GAMES.length}</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-cyan-200 space-y-2">
          <p className="font-bold text-xs text-slate-800">
            SITUASI: <span className="text-cyan-800">{currentGame.situation}</span>
          </p>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{currentGame.description}"
          </p>
        </div>

        <p className="text-xs font-bold text-slate-700 pt-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-600" /> Apa tindakan yang akan kamu ambil sebagai seorang Upstander?
        </p>

        {/* Choices */}
        <div className="space-y-3">
          {currentGame.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                disabled={!!selectedChoiceId}
                className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? choice.isUpstander
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                      : 'bg-red-100 border-red-500 text-red-900'
                    : 'bg-white border-slate-200 hover:border-cyan-400 text-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="leading-relaxed">{choice.text}</p>
                  {choice.isUpstander && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded shrink-0">
                      +{choice.points} Poin
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Display */}
        {selectedChoice && (
          <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-200 ${
            selectedChoice.isUpstander
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedChoice.isUpstander ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Tindakan Pahlawan Upstander!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>Perlu Dipertimbangkan Kembali</span>
                </>
              )}
            </div>
            <p className="leading-relaxed">{selectedChoice.feedback}</p>

            <button
              onClick={handleNextGame}
              className="mt-3 w-full min-h-[44px] rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors px-4"
            >
              <span>{activeGameIdx + 1 < MOCK_GAMES.length ? 'Misi Skenario Berikutnya' : 'Ulangi Misi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
