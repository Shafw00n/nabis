import React, { useState } from 'react';
import { MOOD_OPTIONS } from '../data/mockData';
import { MoodLevel, MoodCause, MoodLog } from '../types';
import { 
  Smile, 
  SmilePlus, 
  Meh, 
  Frown, 
  AlertCircle, 
  Calendar, 
  Flame, 
  Send, 
  HeartHandshake, 
  ShieldAlert, 
  Check, 
  Sparkles,
  Bot,
  HelpCircle,
  X
} from 'lucide-react';

interface DailyMoodCheckProps {
  onSaveMood: (mood: MoodLevel, note: string, cause?: MoodCause) => void;
  onOpenLaporModal: () => void;
  onOpenCounselingModal?: () => void;
  savedLogs: MoodLog[];
}

export const DailyMoodCheck: React.FC<DailyMoodCheckProps> = ({
  onSaveMood,
  onOpenLaporModal,
  onOpenCounselingModal,
  savedLogs
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>('baik');
  const [selectedCause, setSelectedCause] = useState<MoodCause | ''>('Teman');
  const [journalNote, setJournalNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showAiCounselingPopup, setShowAiCounselingPopup] = useState(false);

  // Today's Automated Formatted Date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedToday = today.toLocaleDateString('id-ID', dateOptions); // e.g., "Jumat, 24 Juli 2026"

  const currentOption = MOOD_OPTIONS.find(m => m.id === selectedMood);

  const renderMoodIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'SmilePlus':
        return <SmilePlus className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'Meh':
        return <Meh className={className} />;
      case 'Frown':
        return <Frown className={className} />;
      case 'AlertCircle':
        return <AlertCircle className={className} />;
      default:
        return <Smile className={className} />;
    }
  };

  const handleSelect = (moodId: MoodLevel) => {
    setSelectedMood(moodId);
    setIsSaved(false);

    // If Buruk or Sangat Buruk (Abnormal mood), offer AI counseling pop-up session
    if (moodId === 'buruk' || moodId === 'sangat_buruk') {
      setShowAiCounselingPopup(true);
    }
  };

  const handleSave = () => {
    if (!selectedMood) return;
    onSaveMood(selectedMood, journalNote, selectedCause || undefined);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const daysOfWeek = [
    { day: 'Sen', date: '20', mood: 'sangat_baik', logged: true },
    { day: 'Sel', date: '21', mood: 'baik', logged: true },
    { day: 'Rab', date: '22', mood: 'baik', logged: true },
    { day: 'Kam', date: '23', mood: 'biasa', logged: true },
    { day: 'Jum', date: '24', mood: selectedMood || 'baik', logged: true },
    { day: 'Sab', date: '25', mood: null, logged: false },
    { day: 'Min', date: '26', mood: null, logged: false },
  ];

  return (
    <div id="daily-mood-section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs my-8 relative">
      
      {/* Title Header with Today's Automatic Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <Smile className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">N-Mood</h2>
            <span className="px-2.5 py-1 text-xs font-bold bg-sky-100 text-sky-900 rounded-full border border-sky-200">
              Refleksi Harian
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-sky-700 inline" />
            <span>Hari ini: <strong className="text-sky-950 font-bold">{formattedToday}</strong></span>
          </p>
        </div>

        {/* Streak Counter Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
          <Flame className="w-5 h-5 text-sky-700" />
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Streak Check-in</p>
            <p className="text-xs font-bold text-sky-900">5 Hari Berturut-turut</p>
          </div>
        </div>
      </div>

      {/* QUESTION: "Hari ini bagaimana perasaanmu?" WITH 5 CARDS */}
      <div className="mt-6">
        <p className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-sky-700" /> Hari ini bagaimana perasaanmu?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {MOOD_OPTIONS.map((option) => {
            const isSelected = selectedMood === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`relative flex flex-col items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  option.bgColor
                } ${
                  isSelected
                    ? `${option.borderColor} ring-2 ring-sky-400 scale-102 shadow-xs z-10`
                    : 'border-slate-200 hover:border-sky-300 opacity-90 hover:opacity-100'
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-2 -right-2 bg-sky-900 text-white rounded-full p-1 shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                <div className="p-2.5 rounded-xl bg-white shadow-xs text-sky-900 my-1">
                  {renderMoodIcon(option.iconName, "w-6 h-6")}
                </div>

                <div className="text-center mt-2">
                  <p className={`font-bold text-xs sm:text-sm ${option.textColor}`}>
                    {option.label}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 hidden sm:block">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION: "Apa penyebabnya?" (Teman, Guru, Keluarga, Pelajaran, Lainnya) */}
      <div className="mt-5 p-4 bg-sky-50/70 rounded-xl border border-sky-100">
        <label className="block text-xs font-bold text-sky-950 mb-2 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-sky-700" />
          <span>Apa penyebab perasaanmu hari ini?</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {(['Teman', 'Guru', 'Keluarga', 'Pelajaran', 'Lainnya'] as MoodCause[]).map((cause) => (
            <button
              key={cause}
              type="button"
              onClick={() => setSelectedCause(cause)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedCause === cause
                  ? 'bg-sky-900 text-white border-sky-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400 hover:bg-sky-50'
              }`}
            >
              • {cause}
            </button>
          ))}
        </div>
      </div>

      {/* SUPPORT & EMPATHY RESPONSE DISPLAY */}
      {currentOption && (
        <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sky-900 text-white shadow-xs shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-900">
                  Respon Pendamping NABIS
                </span>
                <span className="text-[11px] font-semibold text-slate-600">
                  • Perasaan: {currentOption.label} ({selectedCause || 'Umum'})
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 leading-relaxed">
                "{currentOption.supportMsg}"
              </p>

              {/* Special Warning & Help Prompt if Mood is Buruk / Sangat Buruk */}
              {(selectedMood === 'buruk' || selectedMood === 'sangat_buruk') && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
                    <div>
                      <p className="font-bold text-xs text-red-900">
                        Apakah terjadi tindakan perundungan atau sesuatu yang membuatmu cemas?
                      </p>
                      <p className="text-[11px] text-red-800 mt-0.5">
                        Laporanmu rahasia dan akan langsung ditangani oleh Konselor BK Sekolah.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setShowAiCounselingPopup(true)}
                      className="px-3.5 py-2 bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Bot className="w-3.5 h-3.5" /> Konseling AI
                    </button>
                    <button
                      onClick={onOpenLaporModal}
                      className="px-3.5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
                    >
                      Buat N-Help
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* JOURNAL REFLECTION INPUT */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Catatan Perasaan (Opsional &amp; Privat):
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={journalNote}
                onChange={(e) => setJournalNote(e.target.value)}
                placeholder="Contoh: Belajar kelompok hari ini berjalan lancar..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-xs"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Simpan Perasaan</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* WEEKLY TRACKER CALENDAR STRIP */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-800" />
            <h4 className="text-xs font-bold text-slate-800">Riwayat Check-in Minggu Ini</h4>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold">20 - 26 Juli 2026</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((item, idx) => {
            const moodObj = MOOD_OPTIONS.find(m => m.id === item.mood);
            return (
              <div
                key={idx}
                className={`flex flex-col items-center p-2.5 rounded-xl text-center border text-xs transition-all ${
                  item.logged
                    ? 'bg-sky-50 border-sky-200 text-sky-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold text-slate-500">{item.day}</span>
                <span className="text-xs font-black my-0.5">{item.date}</span>
                <span className="mt-1">
                  {item.logged && moodObj ? (
                    renderMoodIcon(moodObj.iconName, "w-4 h-4 text-sky-800")
                  ) : (
                    <span className="text-[10px] text-slate-300">•</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* POP-UP NOTIFIKASI PENAWARAN SESI KONSELING AI (JIKA MOOD BURUK / SANGAT BURUK DETECTED) */}
      {showAiCounselingPopup && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-sky-200 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAiCounselingPopup(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-sky-900 text-cyan-300 shadow-md">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-900">Intervensi AI NABIS</span>
                <h3 className="text-base font-bold text-slate-900">Perhatian &amp; Tawaran Sesi Konseling</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Terdeteksi suasana hati <strong className="text-red-700 font-bold">"Buruk / Sangat Buruk"</strong> pemicu <strong className="text-sky-900">{selectedCause || 'Umum'}</strong>. Apakah kamu ingin melakukan sesi Konseling AI &amp; menghubungi Konselor BK sekarang secara aman?
            </p>

            <div className="bg-sky-50 p-3 rounded-xl border border-sky-100 mb-5 text-[11px] text-sky-900 space-y-1">
              <p className="font-bold">• Privasi Terjamin:</p>
              <p>Rangkuman sesi dapat diajukan secara transparan ke Guru BK atau disamarkan namanya.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowAiCounselingPopup(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setShowAiCounselingPopup(false);
                  if (onOpenCounselingModal) onOpenCounselingModal();
                }}
                className="px-4 py-2 text-xs font-bold bg-sky-900 hover:bg-sky-800 text-white rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>Mulai Sesi Konseling AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


