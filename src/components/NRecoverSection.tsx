import React, { useState } from 'react';
import { Mail, Footprints, Wind, PenLine, Music, Heart, Palette, Sun, X } from 'lucide-react';

const RECOVERY_ACTIVITIES = [
  {
    id: 1,
    title: 'Jalan Kaki 15 Menit',
    description: 'Keluar dari ruangan dan jalan kaki santai selama 15 menit. Rasakan udara segar dan biarkan pikiranmu mengalir bebas.',
    icon: Footprints,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    duration: '15 menit'
  },
  {
    id: 2,
    title: 'Atur Pernafasan',
    description: 'Tarik napas dalam 4 detik, tahan 4 detik, hembuskan 4 detik. Ulangi 5 kali. Fokuskan perhatianmu hanya pada napas.',
    icon: Wind,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    hoverBorder: 'hover:border-sky-400',
    duration: '5 menit'
  },
  {
    id: 3,
    title: 'Tulis Hal Positif',
    description: 'Ambil kertas dan tulis 3 hal yang membuatmu senang hari ini. Bisa hal kecil seperti makanan enak atau senyum teman.',
    icon: PenLine,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    duration: '10 menit'
  },
  {
    id: 4,
    title: 'Dengarkan Musik',
    description: 'Putar lagu favoritmu dan tutup mata. Biarkan musik membawamu ke tempat yang lebih tenang dan nyaman.',
    icon: Music,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    duration: '10 menit'
  },
  {
    id: 5,
    title: 'Kirim Pesan Baik',
    description: 'Kirim pesan singkat ke teman atau keluarga yang kamu sayangi. Katakan sesuatu yang positif dan tulus.',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    hoverBorder: 'hover:border-rose-400',
    duration: '5 menit'
  },
  {
    id: 6,
    title: 'Gambar atau Mewarnai',
    description: 'Ambil kertas kosong dan gambar apa saja yang terlintas di pikiranmu. Tidak perlu sempurna, yang penting kamu menikmatinya.',
    icon: Palette,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    hoverBorder: 'hover:border-cyan-400',
    duration: '15 menit'
  }
];

export const NRecoverSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="my-6">
      <div className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 rounded-3xl p-5 sm:p-6 border border-teal-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-teal-600 text-white shadow-sm">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-teal-900 flex items-center gap-2">
              N-Recover
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-100 text-teal-700 border border-teal-200">
                Recovery Box
              </span>
            </h2>
            <p className="text-xs text-teal-600">Aktivitas pemulihan ringan untuk membantumu meregulasi emosi</p>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {RECOVERY_ACTIVITIES.map((activity) => {
            const isExpanded = expandedId === activity.id;
            const Icon = activity.icon;

            return (
              <div key={activity.id} className="relative">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 ${activity.bgColor} ${activity.borderColor} ${activity.hoverBorder} transition-all duration-200 min-h-[44px] flex flex-col items-center gap-2 text-center cursor-pointer`}
                >
                  <div className={`w-10 h-10 rounded-xl ${activity.bgColor} ${activity.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{activity.title}</p>
                  <span className="text-[9px] text-slate-400 font-medium">{activity.duration}</span>
                </button>

                {/* Expanded Activity Detail */}
                {isExpanded && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => setExpandedId(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                      <h4 className="font-bold text-sm text-slate-900">{activity.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{activity.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[11px] font-semibold text-slate-500">Estimasi: {activity.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
