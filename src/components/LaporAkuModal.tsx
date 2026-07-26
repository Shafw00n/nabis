import React, { useState } from 'react';
import { IncidentReport } from '../types';
import { ShieldAlert, X, Send, Lock, EyeOff, FileText, PhoneCall, CheckCircle2, AlertTriangle, Clock, Paperclip, Check, Image, File } from 'lucide-react';

interface LaporAkuModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: IncidentReport[];
  onSubmitReport: (newReport: Omit<IncidentReport, 'id' | 'ticketNumber' | 'status' | 'createdAt'>) => void;
}

export const LaporAkuModal: React.FC<LaporAkuModalProps> = ({
  isOpen,
  onClose,
  reports,
  onSubmitReport
}) => {
  const [activeTab, setActiveTab] = useState<'buat' | 'status' | 'kontak'>('buat');
  
  // Form State
  const [incidentType, setIncidentType] = useState<IncidentReport['incidentType']>('Verbal');
  const [dateOccurred, setDateOccurred] = useState<string>('2026-07-24');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('Aqeela Nahdasasfia');
  const [witnesses, setWitnesses] = useState('');
  const [hasEvidence, setHasEvidence] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; type: string; size: string }[]>([]);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [createdTicket, setCreatedTicket] = useState('');

  if (!isOpen) return null;

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: { name: string; type: string; size: string }[] = Array.from(files).map((f: File) => ({
        name: f.name,
        type: f.type,
        size: (f.size / 1024).toFixed(1) + ' KB'
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
      setHasEvidence(true);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    if (attachedFiles.length <= 1) setHasEvidence(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) {
      alert('Mohon lengkapi lokasi dan deskripsi kejadian terlebih dahulu.');
      return;
    }

    const ticket = `NBS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedTicket(ticket);

    onSubmitReport({
      incidentType,
      dateOccurred,
      location,
      description,
      isAnonymous,
      reporterName: isAnonymous ? undefined : reporterName,
      witnesses: witnesses || undefined,
      attachments: attachedFiles.length > 0 ? attachedFiles : undefined
    });

    setSubmittedSuccess(true);
  };

  const handleResetForm = () => {
    setSubmittedSuccess(false);
    setDescription('');
    setLocation('');
    setWitnesses('');
    setHasEvidence(false);
    setAttachedFiles([]);
    setActiveTab('status');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-red-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 border border-white/30 text-white">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold tracking-tight">Lapor Aku NABIS</h3>
                <span className="px-2 py-0.5 text-[10px] bg-white text-red-700 font-black rounded-md uppercase">
                  Aman & Rahasia
                </span>
              </div>
              <p className="text-xs text-red-100 mt-0.5">
                Ruang pelaporan perlindungan siswa dari segala bentuk perundungan.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 p-2 gap-1 shrink-0">
          <button
            onClick={() => { setActiveTab('buat'); setSubmittedSuccess(false); }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'buat'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Form Laporan Baru
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'status'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4" /> Lacak Laporanku ({reports.length})
          </button>

          <button
            onClick={() => setActiveTab('kontak')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'kontak'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <PhoneCall className="w-4 h-4" /> Bantuan Darurat
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: FORM LAPORAN BARU */}
          {activeTab === 'buat' && (
            <div>
              {submittedSuccess ? (
                <div className="text-center py-8 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-800">Laporan Berhasil Terkirim!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Nomor Tiket Anda: <span className="font-extrabold text-sky-700 text-sm">{createdTicket}</span>.
                    Tim Konselor Bimbingan BK sekolah telah menerima laporan ini dan akan menindaklanjuti secara aman.
                  </p>

                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left text-xs space-y-1.5 max-w-md mx-auto">
                    <p className="font-bold text-sky-900">🔒 Jaminan Keamanan NABIS:</p>
                    <p className="text-sky-800">
                      • Identitas Anda terlindungi sesuai standar privasi anak.
                    </p>
                    <p className="text-sky-800">
                      • Anda dapat memantau status perkembangan penanganan pada tab "Lacak Laporanku".
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow"
                  >
                    Lihat Status Laporan
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Anonymous Toggle Banner */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <EyeOff className="w-5 h-5 text-amber-700 shrink-0" />
                      <div>
                        <p className="font-bold text-xs text-amber-900">Laporkan Secara Anonim?</p>
                        <p className="text-[11px] text-amber-700">Identitas nama Anda tidak akan ditampilkan kepada publik.</p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  {/* Incident Type Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Jenis Perundungan:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {(['Fisik', 'Verbal', 'Cyberbullying', 'Relasional/Pengucilan'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setIncidentType(type)}
                          className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                            incidentType === type
                              ? 'bg-red-50 border-red-500 text-red-800 ring-2 ring-red-100 font-extrabold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tanggal Kejadian:
                      </label>
                      <input
                        type="date"
                        value={dateOccurred}
                        onChange={(e) => setDateOccurred(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lokasi Kejadian:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Belakang Kantin, Grup WA Kelas, dsb."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ceritakan Kejadian Secara Jelas:
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Jelaskan kronologi kejadian, siapa saja yang terlibat, dan apa dampak yang dirasakan..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-400 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Optional Witness & File attachment simulation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Saksi Mata (Opsional):
                      </label>
                      <input
                        type="text"
                        placeholder="Nama teman yang melihat (jika ada)..."
                        value={witnesses}
                        onChange={(e) => setWitnesses(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lampirkan Bukti Foto/Screenshot:
                      </label>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center hover:border-red-400 transition-colors bg-slate-50">
                        <input
                          type="file"
                          id="evidence-upload"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf,.mp4"
                          onChange={handleFileAttach}
                          className="hidden"
                        />
                        <label htmlFor="evidence-upload" className="cursor-pointer">
                          <Paperclip className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                          <p className="text-[11px] font-bold text-slate-600">Klik untuk unggah bukti</p>
                          <p className="text-[9px] text-slate-400">Foto, Screenshot, Video (maks. 10MB)</p>
                        </label>
                      </div>

                      {/* Attached Files List */}
                      {attachedFiles.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-100">
                              {file.type.includes('image') ? (
                                <Image className="w-4 h-4 text-red-500 shrink-0" />
                              ) : file.type.includes('video') ? (
                                <FileText className="w-4 h-4 text-purple-500 shrink-0" />
                              ) : (
                                <File className="w-4 h-4 text-blue-500 shrink-0" />
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
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Laporan Rahasia "Lapor Aku"</span>
                    </button>
                  </div>

                </form>
              )}
            </div>
          )}

          {/* TAB 2: LACAK LAPORANKU */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                Daftar Laporan yang Telah Terkirim ({reports.length})
              </h4>

              {reports.length === 0 ? (
                <p className="text-center py-10 text-xs text-slate-400">Belum ada laporan yang dikirim.</p>
              ) : (
                reports.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-xs font-extrabold text-sky-800">{rep.ticketNumber}</span>
                        <span className="ml-2 text-[10px] text-slate-400">({rep.createdAt})</span>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${
                        rep.status === 'Selesai Dampak Positif'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : rep.status === 'Dalam Penanganan'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-sky-100 text-sky-800 border border-sky-300'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-800">
                        Kategori: <span className="text-red-700">{rep.incidentType}</span> • Lokasi: {rep.location}
                      </p>
                      <p className="text-slate-600 italic">"{rep.description}"</p>
                    </div>

                    {rep.responseNote && (
                      <div className="p-3 rounded-xl bg-sky-100/70 border border-sky-200 text-xs text-sky-900 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-[11px] text-sky-950">Catatan Tindak Lanjut Konselor BK:</p>
                          <p className="text-[11px] text-sky-800 mt-0.5">{rep.responseNote}</p>
                        </div>
                      </div>
                    )}

                    {rep.attachments && rep.attachments.length > 0 && (
                      <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                        <p className="font-bold text-[11px] text-purple-900 flex items-center gap-1.5 mb-1.5">
                          <Paperclip className="w-3.5 h-3.5" /> Bukti Lampiran ({rep.attachments.length})
                        </p>
                        <div className="space-y-1">
                          {rep.attachments.map((att, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-purple-800">
                              {att.type.includes('image') ? (
                                <Image className="w-3.5 h-3.5 shrink-0" />
                              ) : (
                                <File className="w-3.5 h-3.5 shrink-0" />
                              )}
                              <span className="truncate">{att.name}</span>
                              <span className="text-purple-400 text-[9px] shrink-0">{att.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: KONTAK DARURAT & HOTLINE */}
          {activeTab === 'kontak' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-700" />
                  Layanan Bantuan & Hotline Bebas Pulsa
                </h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Jika kamu membutuhkan tempat bercerita atau situasi darurat, hubungi kontak berikut:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                  <div>
                    <p className="font-bold text-slate-800">Konselor BK SMA Milbos Bogor</p>
                    <p className="text-slate-500">Ibu Fitri, M.Pd (Jam Kerja Sekolah)</p>
                  </div>
                  <a href="tel:081234567890" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700">
                    Hubungi BK
                  </a>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                  <div>
                    <p className="font-bold text-slate-800">Layanan SAPA 129 (Telepon Sahabat Anak)</p>
                    <p className="text-slate-500">Kementerian PPPA Republik Indonesia</p>
                  </div>
                  <a href="tel:129" className="px-3 py-1.5 rounded-lg bg-sky-700 text-white font-bold text-xs hover:bg-sky-800">
                    Call 129
                  </a>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white">
                  <div>
                    <p className="font-bold text-slate-800">Layanan Psikologi Sehat Jiwa (SEJIWA)</p>
                    <p className="text-slate-500">Hotline Darurat Mental Health Remaja</p>
                  </div>
                  <a href="tel:119" className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700">
                    Call 119 Ext 8
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center shrink-0">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5 text-sky-600" />
            Dilindungi oleh Protokol Keamanan & Perlindungan Anak NABIS 2026.
          </p>
        </div>

      </div>

    </div>
  );
};
