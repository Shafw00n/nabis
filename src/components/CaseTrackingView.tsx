import React, { useState } from 'react';
import { Check, Circle, Clock, AlertTriangle, ChevronDown, ChevronUp, Shield, Search, UserCheck, FileText, Scale, ShieldAlert, ArrowRight, Calendar, X } from 'lucide-react';
import { IncidentReport, CaseStage } from '../types';

const STAGE_ICONS: Record<CaseStage, React.ReactNode> = {
  reported: <FileText className="w-5 h-5" />,
  observation: <Search className="w-5 h-5" />,
  assessment: <UserCheck className="w-5 h-5" />,
  investigation: <Shield className="w-5 h-5" />,
  intervention: <Clock className="w-5 h-5" />,
  satgas: <Scale className="w-5 h-5" />,
  recommendation: <FileText className="w-5 h-5" />,
  police: <ShieldAlert className="w-5 h-5" />
};

const STAGE_COLORS: Record<CaseStage, { bg: string; text: string; border: string }> = {
  reported: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  observation: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-300' },
  assessment: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  investigation: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  intervention: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  satgas: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  recommendation: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' },
  police: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
};

const ALL_STAGES: { stage: CaseStage; label: string; description: string }[] = [
  { stage: 'reported', label: 'Laporan Diterima', description: 'Laporan masuk dan tercatat di sistem NABIS' },
  { stage: 'observation', label: 'Observasi Agen Perubahan Roots', description: 'Observasi awal oleh Agen Perubahan Roots' },
  { stage: 'assessment', label: 'Assessment Guru BK', description: 'Assessment psikososial oleh Guru BK (1-3 hari)' },
  { stage: 'investigation', label: 'Investigasi TPPK Sekolah', description: 'Investigasi resmi TPPK Sekolah (maks. 14 hari)' },
  { stage: 'intervention', label: 'Intervensi & Konseling', description: 'Intervensi dan sesi konseling terpandu' },
  { stage: 'satgas', label: 'Satgas PPKSP Daerah', description: 'Investigasi independen Satgas PPKSP Daerah (7-14 hari)' },
  { stage: 'recommendation', label: 'Rekomendasi Final', description: 'Rekomendasi final dan putusan kasus' },
  { stage: 'police', label: 'UPTD PPA / Kepolisian', description: 'Ranah pidana - ditangani aparat penegak hukum' }
];

interface CaseTrackingViewProps {
  report?: IncidentReport;
  reports?: IncidentReport[];
  onBack?: () => void;
}

export const CaseTrackingView: React.FC<CaseTrackingViewProps> = ({
  report: singleReport,
  reports,
  onBack
}) => {
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(singleReport || null);

  const displayReports = selectedReport ? [selectedReport] : (reports || []);

  const getStageIndex = (stage: CaseStage) => ALL_STAGES.findIndex(s => s.stage === stage);

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline.split(' ')[0] + ', ' + deadline.split(' ').slice(1).join(' '));
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: 'Melebihi batas', urgent: true };
    if (diffDays <= 7) return { text: `${diffDays} hari lagi`, urgent: true };
    return { text: `${diffDays} hari lagi`, urgent: false };
  };

  if (displayReports.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
        <p className="font-bold">Belum ada laporan</p>
        <p className="text-xs mt-1">Laporan yang diajukan akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-sky-950 flex items-center gap-2">
          <Shield className="w-6 h-6 text-sky-700" />
          Pelacakan Kasus Perundungan
        </h2>
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors min-h-[44px]"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Kembali
          </button>
        )}
      </div>

      {displayReports.map((report) => {
        const isExpanded = expandedReport === report.id;
        const currentIdx = getStageIndex(report.currentStage);

        return (
          <div key={report.id} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-sky-950 px-4 sm:px-6 py-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-sky-300 font-semibold">Ticket #{report.ticketNumber}</p>
                  <h3 className="text-base sm:text-lg font-bold mt-0.5 truncate">{report.incidentType} - {report.location}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5 ${
                    report.triagePriority === 'Tinggi' ? 'bg-red-500/20 text-red-300 border border-red-400/30' :
                    report.triagePriority === 'Sedang' ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' :
                    'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  }`}>
                    <AlertTriangle className="w-3 h-3" />
                    {report.triagePriority}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {/* Deadline Bar */}
              {report.deadline && (
                <div className={`mb-6 p-3 rounded-xl flex items-center gap-3 ${
                  getDeadlineStatus(report.deadline).urgent ? 'bg-red-50 border border-red-200' : 'bg-sky-50 border border-sky-200'
                }`}>
                  <Calendar className={`w-5 h-5 ${getDeadlineStatus(report.deadline).urgent ? 'text-red-600' : 'text-sky-600'}`} />
                  <div className="flex-1">
                    <p className={`text-xs font-bold ${getDeadlineStatus(report.deadline).urgent ? 'text-red-800' : 'text-sky-800'}`}>
                      Batas akhir penanganan (30 hari): {report.deadline}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${getDeadlineStatus(report.deadline).urgent ? 'text-red-600' : 'text-sky-600'}`}>
                      Sisa waktu: {getDeadlineStatus(report.deadline).text}
                    </p>
                  </div>
                  {getDeadlineStatus(report.deadline).urgent && (
                    <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
                  )}
                </div>
              )}

              {/* Stage Timeline */}
              <div className="relative">
                {ALL_STAGES.map((stageDef, idx) => {
                  const isCompleted = idx < currentIdx;
                  const isActive = idx === currentIdx;
                  const isPolice = stageDef.stage === 'police';

                  const stageInfo = report.stages?.find(s => s.stage === stageDef.stage);
                  const stageColor = STAGE_COLORS[stageDef.stage];

                  return (
                    <div key={stageDef.stage} className="flex gap-4 pb-6 last:pb-0 relative">
                      {/* Connecting line */}
                      {idx < ALL_STAGES.length - 1 && (
                        <div className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                          isCompleted ? 'bg-emerald-400' : isActive ? 'bg-sky-400' : 'bg-slate-200'
                        }`} />
                      )}

                      {/* Icon circle */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                        isActive ? 'bg-sky-500 border-sky-500 text-white animate-pulse' :
                        'bg-white border-slate-300 text-slate-400'
                      }`}>
                        {isCompleted ? <Check className="w-5 h-5" /> : STAGE_ICONS[stageDef.stage]}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-sm ${
                            isCompleted ? 'text-emerald-700' : isActive ? 'text-sky-900' : 'text-slate-400'
                          }`}>
                            {stageDef.label}
                          </h4>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">
                              Proses
                            </span>
                          )}
                          {isPolice && isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                              Ranah Hukum
                            </span>
                          )}
                        </div>

                        <p className={`text-xs mt-0.5 ${isCompleted ? 'text-emerald-600' : isActive ? 'text-sky-600' : 'text-slate-400'}`}>
                          {stageDef.description}
                        </p>

                        {stageInfo && (
                          <div className="mt-1.5 space-y-0.5">
                            <p className="text-[10px] text-slate-500">
                              <span className="font-semibold">Penanggung jawab:</span> {stageInfo.assignedTo}
                            </p>
                            {stageInfo.completedAt && (
                              <p className="text-[10px] text-slate-500">
                                <span className="font-semibold">Selesai:</span> {stageInfo.completedAt}
                              </p>
                            )}
                            {stageInfo.dueDays > 0 && isActive && (
                              <p className="text-[10px] text-sky-700 font-semibold">
                                Batas: {stageInfo.dueDays} hari kerja
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
              <button
                onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                className="flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors min-h-[44px]"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {isExpanded ? 'Sembunyikan detail' : 'Lihat detail laporan'}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                  <p><span className="font-bold text-slate-800">Deskripsi:</span> {report.description}</p>
                  <p><span className="font-bold text-slate-800">Tanggal kejadian:</span> {report.dateOccurred}</p>
                  <p><span className="font-bold text-slate-800">Lokasi:</span> {report.location}</p>
                  {report.reporterClass && (
                    <p><span className="font-bold text-slate-800">Pelapor:</span> {report.isAnonymous ? 'Anonim' : report.reporterName || 'Tidak diketahui'} ({report.reporterClass})</p>
                  )}
                  {report.assignedTeacher && (
                    <p><span className="font-bold text-slate-800">Ditangani:</span> {report.assignedTeacher}</p>
                  )}
                  {report.responseNote && (
                    <p><span className="font-bold text-slate-800">Catatan:</span> {report.responseNote}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
