import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  BarChart2, 
  FileText, 
  Users, 
  Search, 
  Filter, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  UserCheck, 
  Eye, 
  Printer, 
  Layers, 
  PieChart, 
  TrendingUp, 
  X,
  Edit,
  UserX,
  Paperclip,
  Image,
  File
} from 'lucide-react';
import { IncidentReport, UserTeacher, MoodRapot } from '../types';
import { DEMO_MOOD_RAPOTS } from '../data/mockData';

interface TeacherPortalViewProps {
  currentTeacher: UserTeacher;
  reports: IncidentReport[];
  onUpdateReportStatus: (reportId: string, newStatus: IncidentReport['status'], responseNote: string) => void;
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({
  currentTeacher,
  reports,
  onUpdateReportStatus
}) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'analytics' | 'mood_monitor'>('cases');
  
  // Case Management Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // Response Modal State
  const [selectedReport, setSelectedReport] = useState<IncidentReport | null>(null);
  const [statusInput, setStatusInput] = useState<IncidentReport['status']>('Dalam Penanganan');
  const [responseInput, setResponseInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; type: string; size: string }[]>([]);

  // Filtered reports
  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.location && r.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedTypeFilter === 'all' || r.incidentType === selectedTypeFilter;
    const matchesPriority = selectedPriorityFilter === 'all' || r.triagePriority === selectedPriorityFilter;
    const matchesStatus = selectedStatusFilter === 'all' || r.status === selectedStatusFilter;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const handleOpenResponseModal = (report: IncidentReport) => {
    setSelectedReport(report);
    setStatusInput(report.status);
    setResponseInput(report.responseNote || '');
    setAttachedFiles([]);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: { name: string; type: string; size: string }[] = Array.from(files).map((f: File) => ({
        name: f.name,
        type: f.type,
        size: (f.size / 1024).toFixed(1) + ' KB'
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;
    let note = responseInput;
    if (attachedFiles.length > 0) {
      const fileList = attachedFiles.map(f => f.name).join(', ');
      note += `\n\nLampiran bukti: ${fileList}`;
    }
    onUpdateReportStatus(selectedReport.id, statusInput, note);
    setSelectedReport(null);
  };

  // Case statistics calculations
  const totalCases = reports.length;
  const highPriorityCases = reports.filter(r => r.triagePriority === 'Tinggi').length;
  const pendingCases = reports.filter(r => r.status === 'Terkirim' || r.status === 'Diverifikasi Konselor').length;
  const activeCases = reports.filter(r => r.status === 'Dalam Penanganan').length;
  const resolvedCases = reports.filter(r => r.status === 'Selesai Dampak Positif').length;

  // Stats by type
  const typeCounts = {
    Fisik: reports.filter(r => r.incidentType === 'Fisik').length,
    Verbal: reports.filter(r => r.incidentType === 'Verbal').length,
    Cyberbullying: reports.filter(r => r.incidentType === 'Cyberbullying').length,
    Relasional: reports.filter(r => r.incidentType === 'Relasional/Pengucilan').length,
    Lainnya: reports.filter(r => r.incidentType === 'Lainnya').length
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* BK Teacher Portal Header Banner */}
      <div className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-800 text-sky-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span>Portal Terbatas • Bimbingan Konseling (BK)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              N-Insight: {currentTeacher.name}
            </h1>
            <p className="text-sky-200 text-xs sm:text-sm">
              {currentTeacher.roleTitle} • NIP: {currentTeacher.nip} • {currentTeacher.schoolName}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-sky-800/80 p-3 rounded-xl border border-sky-700/60">
              <p className="text-[11px] text-sky-300">Total Kasus</p>
              <p className="text-xl font-black text-white">{totalCases}</p>
            </div>
            <div className="bg-sky-800/80 p-3 rounded-xl border border-sky-700/60">
              <p className="text-[11px] text-amber-300 font-medium">Triage Tinggi</p>
              <p className="text-xl font-black text-amber-200">{highPriorityCases}</p>
            </div>
            <div className="bg-sky-800/80 p-3 rounded-xl border border-sky-700/60">
              <p className="text-[11px] text-sky-300">Aktif Ditangani</p>
              <p className="text-xl font-black text-sky-200">{activeCases}</p>
            </div>
            <div className="bg-sky-800/80 p-3 rounded-xl border border-sky-700/60">
              <p className="text-[11px] text-emerald-300">Selesai Positif</p>
              <p className="text-xl font-black text-emerald-200">{resolvedCases}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-sky-800/80 pt-4">
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'cases'
                ? 'bg-white text-sky-900 shadow-sm'
                : 'bg-sky-800/60 text-sky-100 hover:bg-sky-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Manajemen Laporan Lapor Aku</span>
            <span className="ml-1 px-1.5 py-0.2 rounded bg-sky-100 text-sky-900 text-[10px] font-bold">
              {reports.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'analytics'
                ? 'bg-white text-sky-900 shadow-sm'
                : 'bg-sky-800/60 text-sky-100 hover:bg-sky-800'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Statistik & Grafik Kasus</span>
          </button>

          <button
            onClick={() => setActiveTab('mood_monitor')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-colors ${
              activeTab === 'mood_monitor'
                ? 'bg-white text-sky-900 shadow-sm'
                : 'bg-sky-800/60 text-sky-100 hover:bg-sky-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pemantauan Mood Rapot Siswa</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CASE MANAGEMENT (GRID & TRIAGE) */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nomor tiket, deskripsi, atau lokasi..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedPriorityFilter}
                  onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
                >
                  <option value="all">Semua Triage Prioritas</option>
                  <option value="Tinggi">Triage Tinggi (Urgent)</option>
                  <option value="Sedang">Triage Sedang</option>
                  <option value="Rendah">Triage Rendah</option>
                </select>

                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
                >
                  <option value="all">Semua Jenis Kasus</option>
                  <option value="Fisik">Fisik</option>
                  <option value="Verbal">Verbal</option>
                  <option value="Cyberbullying">Cyberbullying</option>
                  <option value="Relasional/Pengucilan">Relasional/Pengucilan</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
                >
                  <option value="all">Semua Status</option>
                  <option value="Terkirim">Terkirim</option>
                  <option value="Diverifikasi Konselor">Diverifikasi Konselor</option>
                  <option value="Dalam Penanganan">Dalam Penanganan</option>
                  <option value="Selesai Dampak Positif">Selesai Dampak Positif</option>
                </select>
              </div>
            </div>
          </div>

          {/* Incident Reports Table / Grid View */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Daftar Tiket Masuk Lapor Aku ({filteredReports.length} Laporan)
              </h3>
              <span className="text-xs text-slate-500">Privasi Terjaga Terenkripsi</span>
            </div>

            {filteredReports.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">Tidak ada laporan yang sesuai dengan filter.</p>
                <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau reset filter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="p-3.5">No. Tiket</th>
                      <th className="p-3.5">Triage Prioritas</th>
                      <th className="p-3.5">Jenis & Lokasi</th>
                      <th className="p-3.5">Identitas Pelapor</th>
                      <th className="p-3.5">Status Penanganan</th>
                      <th className="p-3.5 text-right">Aksi Konselor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredReports.map((report) => {
                      const priorityColor = 
                        report.triagePriority === 'Tinggi' 
                          ? 'bg-red-100 text-red-800 border-red-300' 
                          : report.triagePriority === 'Sedang' 
                          ? 'bg-amber-100 text-amber-800 border-amber-300' 
                          : 'bg-sky-100 text-sky-800 border-sky-300';

                      return (
                        <tr key={report.id} className="hover:bg-sky-50/40 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-sky-900">
                            {report.ticketNumber}
                            <p className="text-[10px] text-slate-400 font-normal mt-0.5">{report.createdAt}</p>
                          </td>

                          <td className="p-3.5">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${priorityColor}`}>
                              {report.triagePriority || 'Tinggi'}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <p className="font-bold text-slate-800">{report.incidentType}</p>
                            <p className="text-[11px] text-slate-500 truncate max-w-[200px]">{report.location}</p>
                          </td>

                          <td className="p-3.5">
                            {report.isAnonymous ? (
                              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                                <UserX className="w-3.5 h-3.5 text-slate-500" />
                                <span>Anonim (100% Rahasia)</span>
                              </div>
                            ) : (
                              <div>
                                <p className="font-bold text-slate-800">{report.reporterName || 'Siswa'}</p>
                                <p className="text-[11px] text-sky-700">{report.reporterClass || 'Siswa SMA'}</p>
                              </div>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-900 font-semibold border border-sky-200 text-[11px]">
                              <span>{report.status}</span>
                            </span>
                          </td>

                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => handleOpenResponseModal(report)}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs transition-all shadow-xs"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Tindak Lanjuti</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DATA VISUALIZATION ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: Case Type Distribution */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-sky-800" />
                  <h3 className="text-sm font-bold text-slate-800">Distribusi Kasus Berdasarkan Jenis</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Bulan Juli 2026</span>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kasus Verbal (Ejekan / Ancaman)</span>
                    <span>{typeCounts.Verbal} Kasus</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-sky-800 h-full rounded-full" style={{ width: `${totalCases ? (typeCounts.Verbal / totalCases) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kasus Cyberbullying (Medsos / Chat)</span>
                    <span>{typeCounts.Cyberbullying} Kasus</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${totalCases ? (typeCounts.Cyberbullying / totalCases) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kasus Fisik (Kontak / Barang Disembunyikan)</span>
                    <span>{typeCounts.Fisik} Kasus</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${totalCases ? (typeCounts.Fisik / totalCases) * 100 : 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kasus Relasional (Pengucilan / Rumor)</span>
                    <span>{typeCounts.Relasional} Kasus</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${totalCases ? (typeCounts.Relasional / totalCases) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Case Distribution by Grade Level */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-sky-800" />
                  <h3 className="text-sm font-bold text-slate-800">Statistik Kasus Per Tingkat Kelas</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Semester Ganjil</span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kelas 7</span>
                  <p className="text-2xl font-black text-sky-900">4 Kasus</p>
                  <p className="text-[10px] text-slate-500">• Penyesuaian Lingkungan</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kelas 8</span>
                  <p className="text-2xl font-black text-sky-900">6 Kasus</p>
                  <p className="text-[10px] text-slate-500">• Dinamika Kelompok</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kelas 9</span>
                  <p className="text-2xl font-black text-sky-900">2 Kasus</p>
                  <p className="text-[10px] text-slate-500">• Tekanan Ujian & Medsos</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
                <p className="font-bold">• Catatan Analisis Konselor:</p>
                <p>Kelas 8 menunjukkan frekuensi tertinggi dalam pelaporan kasus verbal. Disarankan intervensi sosialisasi Upstander pada jam Bimbingan Konseling mendatang.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: STUDENT MOOD RAPOT MONITORING */}
      {activeTab === 'mood_monitor' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pemantauan Indeks Kesejahteraan Emosional Siswa</h3>
              <p className="text-xs text-slate-500">Merekapitulasi hasil Mood Rapot siswa terdaftar untuk pencegahan dini perundungan.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-300">
              Integrasi BK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_MOOD_RAPOTS.map((rapot) => {
              const levelColor = 
                rapot.level === '1' 
                  ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950' 
                  : rapot.level === '2' 
                  ? 'border-amber-300 bg-amber-50/60 text-amber-950' 
                  : 'border-red-300 bg-red-50/60 text-red-950';

              return (
                <div key={rapot.id} className={`p-5 rounded-xl border ${levelColor} space-y-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{rapot.studentName}</h4>
                      <p className="text-xs text-slate-600">Kelas {rapot.className} • {rapot.period}</p>
                    </div>
                    <span className="font-black text-lg text-sky-900">{rapot.averageScore} / 5.0</span>
                  </div>

                  <p className="text-xs font-semibold leading-tight">{rapot.levelTitle}</p>
                  <p className="text-xs text-slate-600 line-clamp-3">{rapot.aiSummary}</p>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Terakhir Diperbarui: {rapot.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ACTION RESPONSE MODAL FOR COUNSELOR */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Tindak Lanjuti Tiket #{selectedReport.ticketNumber}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedReport.incidentType} • Tanggal: {selectedReport.dateOccurred}
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <p className="font-bold text-slate-900">• Isi Laporan Siswa:</p>
              <p className="italic">"{selectedReport.description}"</p>
              <p className="text-[11px] text-slate-500 mt-1">• Lokasi: {selectedReport.location}</p>
            </div>

            {selectedReport.attachments && selectedReport.attachments.length > 0 && (
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                <p className="font-bold text-[11px] text-purple-900 flex items-center gap-1.5 mb-2">
                  <Paperclip className="w-3.5 h-3.5" /> Bukti Lampiran dari Siswa ({selectedReport.attachments.length})
                </p>
                <div className="space-y-1.5">
                  {selectedReport.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-purple-100">
                      {att.type.includes('image') ? (
                        <Image className="w-4 h-4 text-purple-500 shrink-0" />
                      ) : (
                        <File className="w-4 h-4 text-blue-500 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-purple-900 truncate">{att.name}</p>
                        <p className="text-[9px] text-purple-400">{att.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSaveResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Perbarui Status Penanganan Laporan
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as IncidentReport['status'])}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                >
                  <option value="Diverifikasi Konselor">Diverifikasi Konselor</option>
                  <option value="Dalam Penanganan">Dalam Penanganan (Konseling / Mediasi)</option>
                  <option value="Selesai Dampak Positif">Selesai Dampak Positif (Kasus Tuntas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Konseling / Tanggapan Respon BK untuk Pelapor
                </label>
                <textarea
                  rows={4}
                  value={responseInput}
                  onChange={(e) => setResponseInput(e.target.value)}
                  placeholder="Tuliskan catatan penanganan atau langkah yang telah diambil tim BK..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-sky-600"
                  required
                />
              </div>

              {/* Attach File Section */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lampirkan Bukti Penanganan (Opsional)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-sky-400 transition-colors bg-slate-50">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={handleFileAttach}
                    className="hidden"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-600">Klik untuk lampirkan bukti</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, PDF, DOC (maks. 5MB)</p>
                  </label>
                </div>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {attachedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 border border-sky-100">
                        {file.type.includes('image') ? (
                          <Image className="w-4 h-4 text-sky-600 shrink-0" />
                        ) : (
                          <File className="w-4 h-4 text-sky-600 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-800 truncate">{file.name}</p>
                          <p className="text-[9px] text-slate-400">{file.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="p-0.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold"
                >
                  Simpan & Kirim Tanggapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
