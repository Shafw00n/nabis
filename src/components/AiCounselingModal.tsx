import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  FileCheck, 
  Lock, 
  Sparkles, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  HeartHandshake, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { DEMO_PROFESSIONALS } from '../data/mockData';
import { ProfessionalContact } from '../types';

interface AiCounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLaporModal: () => void;
  studentName?: string;
}

export const AiCounselingModal: React.FC<AiCounselingModalProps> = ({
  isOpen,
  onClose,
  onOpenLaporModal,
  studentName = 'Budi Santoso'
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'contacts' | 'prescriptions'>('chat');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Privacy Modal confirmation state
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [shareConsent, setShareConsent] = useState<'share_name' | 'share_anonymous' | 'private_only'>('share_anonymous');
  const [consentSaved, setConsentSaved] = useState(false);

  // Chat message state
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Halo ${studentName}, saya Asisten Konseling AI NABIS. Tempat ini aman & privat. Apa yang sedang kamu rasakan atau alami di sekolah saat ini?`,
      time: 'Baru saja'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setInputMsg('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = `Terima kasih sudah berbagi, ${studentName}. Kamu sangat berani. Ingat bahwa semua jenis perundungan bukanlah kesalahanmu.`;
      
      if (userText.toLowerCase().includes('diejek') || userText.toLowerCase().includes('verbal')) {
        reply = `Menghadapi ejekan verbal memang menyakitkan. Langkah aman: Tetap tenang, hindari membalas dengan emosi, catat ucapan pelaku, dan beri tahu Guru BK.`;
      } else if (userText.toLowerCase().includes('ancam') || userText.toLowerCase().includes('pukul') || userText.toLowerCase().includes('fisik')) {
        reply = `Tindakan fisik atau ancaman adalah pelanggaran berat. Harap pertimbangkan untuk menekan tombol 'Lapor Aku' agar Tim TP2K dan Guru BK segera melindungimu.`;
      } else if (userText.toLowerCase().includes('takut') || userText.toLowerCase().includes('cemas')) {
        reply = `Perasaan takut itu wajar. Kamu tidak sendirian. Mari coba latihan napas dalam 4-7-8, dan ingat kamu bisa mengontak Psikolog atau Guru BK di tab 'Kontak Profesional'.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply, time: timeNow }]);
      setIsAiTyping(false);
    }, 1000);
  };

  const filteredProfessionals = DEMO_PROFESSIONALS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="bg-sky-950 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-sky-900 text-cyan-300 ring-1 ring-sky-700">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base sm:text-lg">Ruang Konseling &amp; Edukasi AI NABIS</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-900 text-cyan-300 text-[10px] font-extrabold border border-cyan-700">
                  Aman &amp; Privat
                </span>
              </div>
              <p className="text-xs text-sky-200 mt-0.5">Layanan Intervensi Psikologis &amp; Kontak Bantuan Terdekat</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="px-3 py-1.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white text-xs font-bold transition-all border border-sky-700 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Set Pengaturan Privasi</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-sky-200 hover:text-white rounded-xl hover:bg-sky-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Global Search Bar */}
        <div className="bg-slate-100 p-2 sm:px-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'chat'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Sesi AI Counseling</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'contacts'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Kontak Profesional ({DEMO_PROFESSIONALS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                activeTab === 'prescriptions'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Resep Edukasi AI</span>
            </button>
          </div>

          {/* Kolom Cari / Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik / nama psikolog..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
        </div>

        {/* TAB 1: CHAT AI COUNSELING */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col p-4 sm:p-6 bg-slate-50 overflow-hidden min-h-[350px]">
            
            {/* Disclaimer Strip */}
            <div className="mb-3 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-800 shrink-0" />
                <span>
                  Status Privasi Sesi: <strong className="font-bold">{shareConsent === 'share_name' ? 'Diteruskan ke BK dengan Nama' : shareConsent === 'share_anonymous' ? 'Diteruskan Anonim ke BK' : 'Privat Sepenuhnya'}</strong>
                </span>
              </div>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-[11px] font-bold text-sky-900 hover:underline shrink-0"
              >
                Ubah Privasi
              </button>
            </div>

            {/* Chat History Container */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 my-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-2 rounded-xl text-white shrink-0 ${m.sender === 'user' ? 'bg-sky-800' : 'bg-sky-950'}`}>
                    {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-cyan-300" />}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-900 text-white rounded-tr-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs'
                  }`}>
                    <p>{m.text}</p>
                    <span className={`block text-[10px] mt-1.5 text-right ${m.sender === 'user' ? 'text-sky-200' : 'text-slate-400'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex items-center space-x-2 text-xs text-slate-500 p-2">
                  <Bot className="w-4 h-4 animate-bounce text-sky-700" />
                  <span>AI Konselor NABIS sedang mengetik respon empati...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 shrink-0 pt-2 border-t border-slate-200">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Tuliskan isi hatimu atau kejadian perundungan di sini..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600 shadow-xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Kirim</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: KONTAK PROFESIONAL TERDEKAT */}
        {activeTab === 'contacts' && (
          <div className="flex-1 p-4 sm:p-6 bg-slate-50 overflow-y-auto space-y-4">
            <div className="p-4 rounded-xl bg-sky-100 border border-sky-200 text-sky-950 text-xs font-semibold flex items-center justify-between">
              <p>
                Daftar profil Guru Konsultan, Psikolog Klinis, Psikiater Anak &amp; Tim Satgas TP2K terdekat yang siap membantu kamu.
              </p>
              <button
                onClick={onOpenLaporModal}
                className="px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-all shrink-0 ml-3"
              >
                Buat Laporan Resmi
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProfessionals.map((prof) => (
                <div key={prof.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                  <img
                    src={prof.avatarUrl}
                    alt={prof.name}
                    className="w-12 h-12 rounded-xl object-cover border border-sky-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-900">
                        {prof.role}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        • {prof.status}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 truncate">
                      {prof.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{prof.institution}</p>
                    
                    <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-sky-700" />
                      <span>{prof.distance}</span>
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={`tel:${prof.phone}`}
                        className="flex-1 py-1.5 rounded-lg bg-sky-900 hover:bg-sky-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Hubungi ({prof.phone})</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RESEP EDUKASI / TINDAKAN (AI PRESCRIPTION CARDS) */}
        {activeTab === 'prescriptions' && (
          <div className="flex-1 p-4 sm:p-6 bg-slate-50 overflow-y-auto space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Resep Edukasi &amp; Panduan Tindakan NABIS berbasis sains psikologi anak untuk mengatasi masalah perundungan secara terukur.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-200">
                    Kategori: Mental Fortitude
                  </span>
                  <span className="text-xs font-bold text-slate-400">Resep #01</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Pertahanan Ejekan Verbal (Fogging Technique)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Langkah praktis menetralkan ejekan tanpa memicu eskalasi emosi. Jawab dengan kalimat singkat "Mungkin saja" atau "Itu pendapatmu" sambil menjaga kontak mata netral.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-900">• Rekomendasi Konselor BK</span>
                  <span className="text-slate-500">Estimasi Praktik: 3 Hari</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    Kategori: Anti-Cyberbullying
                  </span>
                  <span className="text-xs font-bold text-slate-400">Resep #02</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  Protokol Bukti Digital &amp; Pengamanan Akun
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  1. Tangkap layar (screenshot) pesan berisi hinaan. 2. Jangan membalas di kolom komentar. 3. Blokir akun pelaku. 4. Lampirkan tangkapan layar ke fitur Lapor Aku.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-900">• Panduan Resmi Satgas TP2K</span>
                  <span className="text-slate-500">Prioritas: Tinggi</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-200">
                    Kategori: Relaksasi Emosi
                  </span>
                  <span className="text-xs font-bold text-slate-400">Resep #03</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-cyan-700" />
                  Teknik Pernapasan Diafragma 4-7-8
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tarik napas perlahan melalui hidung 4 detik, tahan 7 detik, lalu hembuskan lembut lewat mulut 8 detik. Lakukan 4 siklus saat merasa cemas sebelum masuk kelas.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-900">• Rekomendasi Psikolog Klinis</span>
                  <span className="text-slate-500">Rutin Harian</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    Kategori: Upstander Action
                  </span>
                  <span className="text-xs font-bold text-slate-400">Resep #04</span>
                </div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  Intervensi Saksi Aman (5D Upstander)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan metode 5D: Distract (alihkan perhatian), Delegate (minta bantuan guru), Document (catat kejadian), Direct (bicara langsung jika aman), &amp; Delay (hibur korban setelahnya).
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-900">• Kurikulum Anti-Bullying</span>
                  <span className="text-slate-500">Praktik Sosial</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODAL KONFIRMASI PRIVASI KLIEN */}
        {showPrivacyModal && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-sky-900 text-white">
                  <Lock className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Modal Konfirmasi Privasi AI</h3>
                  <p className="text-xs text-slate-500">Tentukan keterbukaan rangkuman sesi konseling ini</p>
                </div>
              </div>

              <div className="space-y-3 my-4">
                <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  shareConsent === 'share_anonymous' ? 'border-sky-600 bg-sky-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="consent"
                    checked={shareConsent === 'share_anonymous'}
                    onChange={() => setShareConsent('share_anonymous')}
                    className="mt-1 text-sky-900 focus:ring-sky-600"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">• Teruskan Anonim ke Guru BK</h5>
                    <p className="text-[11px] text-slate-600">Rangkuman poin permasalahan dikirim ke Guru BK tanpa menampilkan identitas namamu.</p>
                  </div>
                </label>

                <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  shareConsent === 'share_name' ? 'border-sky-600 bg-sky-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="consent"
                    checked={shareConsent === 'share_name'}
                    onChange={() => setShareConsent('share_name')}
                    className="mt-1 text-sky-900 focus:ring-sky-600"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">• Teruskan Resmi Dengan Nama</h5>
                    <p className="text-[11px] text-slate-600">Guru BK menerima nama lengkapmu untuk pendampingan konseling tatap muka langsung.</p>
                  </div>
                </label>

                <label className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  shareConsent === 'private_only' ? 'border-sky-600 bg-sky-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <input
                    type="radio"
                    name="consent"
                    checked={shareConsent === 'private_only'}
                    onChange={() => setShareConsent('private_only')}
                    className="mt-1 text-sky-900 focus:ring-sky-600"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">• Privat Sepenuhnya (Hanya Saya &amp; AI)</h5>
                    <p className="text-[11px] text-slate-600">Sesi konseling hanya tersimpan di perangkatmu dan tidak dikirimkan ke siapapun.</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setConsentSaved(true);
                    setShowPrivacyModal(false);
                    setTimeout(() => setConsentSaved(false), 2500);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-sky-900 hover:bg-sky-800 text-white rounded-xl shadow-xs"
                >
                  Simpan Konfirmasi Privasi
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
