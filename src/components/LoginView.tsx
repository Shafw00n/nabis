import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  Users,
  GraduationCap,
  Building2,
  Heart,
  FileText,
  Building,
  CreditCard
} from 'lucide-react';
import { AppUser, UserRole, UserStudent, UserTeacher, UserParent, UserTP2K, UserGovernment } from '../types';
import { DEMO_STUDENTS, DEMO_TEACHERS, DEMO_PARENTS, DEMO_TP2K, DEMO_GOVERNMENT } from '../data/mockData';
import { NabisLogoIcon } from './NabisLogo';

interface LoginViewProps {
  onLogin: (user: AppUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [loginMode, setLoginMode] = useState<'form' | 'quick'>('form');

  // Form Fields
  const [nik, setNik] = useState('3171012304080001'); // Data 1: NIK
  const [dynamicId, setDynamicId] = useState('0082341234'); // Data 3: Dynamic NISN / NIP / ID
  const [password, setPassword] = useState('123456');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When role changes, set default sample values
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'student') {
      setNik('3171012304080001');
      setDynamicId('0082341234');
    } else if (role === 'teacher') {
      setNik('3172015203850001');
      setDynamicId('198503122010012004');
    } else if (role === 'parent') {
      setNik('3171011505750001');
      setDynamicId('0082341234');
    } else if (role === 'tp2k') {
      setNik('3173014208820005');
      setDynamicId('TP2K-SMPN1-001');
    } else if (role === 'government') {
      setNik('3174011204720008');
      setDynamicId('DINAS-DKI-8821');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik.trim()) {
      setErrorMsg('Silakan masukkan NIK 16 Digit.');
      return;
    }
    if (!dynamicId.trim()) {
      setErrorMsg('Silakan lengkapi ID Otorisasi sesuai peran.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      let userToLogin: AppUser;

      if (selectedRole === 'student') {
        const found = DEMO_STUDENTS.find(s => s.nisn === dynamicId.trim() || s.nik === nik.trim());
        userToLogin = found || {
          id: `stu-${Date.now()}`,
          role: 'student',
          name: 'Budi Santoso',
          nik: nik.trim(),
          nisn: dynamicId.trim(),
          className: '8B',
          schoolName: 'SMP Nusantara Jakarta',
          avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
          streakDays: 5
        };
      } else if (selectedRole === 'teacher') {
        const found = DEMO_TEACHERS.find(t => t.nip === dynamicId.trim() || t.nik === nik.trim());
        userToLogin = found || {
          id: `tch-${Date.now()}`,
          role: 'teacher',
          name: 'Ibu Fitri Handayani, M.Pd',
          nik: nik.trim(),
          nip: dynamicId.trim(),
          roleTitle: 'Koordinator Bimbingan Konseling (BK)',
          schoolName: 'SMP Nusantara Jakarta',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        };
      } else if (selectedRole === 'parent') {
        const found = DEMO_PARENTS.find(p => p.nik === nik.trim());
        userToLogin = found || {
          id: `prn-${Date.now()}`,
          role: 'parent',
          name: 'Bapak Hendra Santoso',
          nik: nik.trim(),
          childNisn: dynamicId.trim(),
          childName: 'Budi Santoso (8B)',
          schoolName: 'SMP Nusantara Jakarta',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
        };
      } else if (selectedRole === 'tp2k') {
        const found = DEMO_TP2K.find(t => t.nik === nik.trim());
        userToLogin = found || {
          id: `tp2k-${Date.now()}`,
          role: 'tp2k',
          name: 'Ibu Ratna Dewi, S.Pd',
          nik: nik.trim(),
          institutionId: dynamicId.trim(),
          roleTitle: 'Ketua Tim TP2K Sekolah',
          schoolName: 'SMP Nusantara Jakarta',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
        };
      } else {
        const found = DEMO_GOVERNMENT.find(g => g.nik === nik.trim());
        userToLogin = found || {
          id: `gov-${Date.now()}`,
          role: 'government',
          name: 'Bapak Dr. H. Ahmad Fauzi, M.Si',
          nik: nik.trim(),
          institutionId: dynamicId.trim(),
          roleTitle: 'Pengawas Sub-Dinas Pendidikan',
          schoolName: 'Dinas Pendidikan DKI Jakarta',
          avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
        };
      }

      setIsSubmitting(false);
      onLogin(userToLogin);
    }, 500);
  };

  const handleQuickUserLogin = (user: AppUser) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(user);
    }, 400);
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'student': return 'Siswa';
      case 'teacher': return 'Guru BK';
      case 'parent': return 'Orang Tua';
      case 'tp2k': return 'Tim TP2K';
      case 'government': return 'Pemerintah / Dinas';
    }
  };

  const getDynamicLabel = () => {
    switch (selectedRole) {
      case 'student': return 'Data 3: NISN Siswa';
      case 'teacher': return 'Data 3: NIP Guru BK';
      case 'parent': return 'Data 3: ID Anak / NISN Siswa';
      case 'tp2k': return 'Data 3: ID Reg. TP2K Sekolah';
      case 'government': return 'Data 3: NIP / ID Instansi Dinas';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950 flex items-center justify-center text-white shadow-md ring-2 ring-sky-200">
            <NabisLogoIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black text-sky-950 tracking-tight">
              NABIS
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200">
              Platform Anti-Bullying Sekolah
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center my-auto">
        
        {/* Left Column: Branding & Portal Descriptions */}
        <div className="lg:col-span-6 space-y-7">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-sky-100/90 border border-sky-200 text-sky-900 text-xs sm:text-sm font-bold">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-700" />
            <span>National Anti-Bullying Intelligence System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            NABIS Anti-Bullying <br />
            <span className="text-sky-900">
              {getRoleLabel(selectedRole)}
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Platform sinergi perlindungan remaja, penanganan dini perundungan, deteksi dini Mood Rapot, serta sesi intervensi konseling aman dengan pemantauan transparan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 hover:border-sky-300 transition-colors">
              <h4 className="text-sm font-extrabold text-sky-900">• Preventif</h4>
              <p className="text-xs text-slate-600 leading-normal">Daily Mood Check, Games, Knowledge Check &amp; Reward-Punishment.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 hover:border-sky-300 transition-colors">
              <h4 className="text-sm font-extrabold text-sky-900">• Detect</h4>
              <p className="text-xs text-slate-600 leading-normal">Rapot Siswa, Analitik Emosional, &amp; Peringatan Dini Konselor.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 hover:border-sky-300 transition-colors">
              <h4 className="text-sm font-extrabold text-sky-900">• Kuratif</h4>
              <p className="text-xs text-slate-600 leading-normal">Lapor Aku, Respond Triage, &amp; Recover Sesi Konseling.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Login Box */}
        <div className="lg:col-span-6 w-full max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Header Title */}
            <div className="bg-sky-950 px-6 py-5 text-white text-center">
              <h3 className="font-extrabold text-lg sm:text-xl tracking-wide flex items-center justify-center gap-2.5">
                Masuk ke NABIS
              </h3>
            </div>

            {/* Form Mode Selector */}
            <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex justify-center space-x-2 text-xs sm:text-sm">
              <button
                onClick={() => setLoginMode('form')}
                className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                  loginMode === 'form' ? 'bg-white text-sky-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Formulir Login 3-Data
              </button>
              <button
                onClick={() => setLoginMode('quick')}
                className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                  loginMode === 'quick' ? 'bg-white text-sky-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pilih Akun Demo Cepat
              </button>
            </div>

            <div className="p-6 sm:p-9">
              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* FORMULIR LOGIN 3 DATA SESUAI DOKUMEN CLIENT */}
              {loginMode === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* DATA 1: NIK (Untuk Semua Peran) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-sky-800" />
                      <span>Data 1: NIK (Nomor Induk Kependudukan - 16 Digit)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      placeholder="Masukkan NIK 16 digit..."
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50"
                      required
                    />
                  </div>

                  {/* DATA 2: DROPDOWN PERAN */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-2">
                      <User className="w-4 h-4 text-sky-800" />
                      <span>Data 2: Dropdown Peran Pengguna</span>
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-600 bg-white text-sky-950"
                    >
                      <option value="student">Siswa (Fitur Preventif &amp; Kuratif)</option>
                      <option value="teacher">Guru BK (Fitur Detect, Respond &amp; Analitik)</option>
                      <option value="parent">Orang Tua (Monitoring Rapot &amp; Akses Kuratif)</option>
                      <option value="tp2k">TP2K - Tim Pencegahan Kekerasan Sekolah</option>
                      <option value="government">Pemerintah / Dinas Pendidikan</option>
                    </select>
                  </div>

                  {/* DATA 3: DINAMIS SESUAI PERAN */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-800" />
                      <span>{getDynamicLabel()}</span>
                    </label>
                    <input
                      type="text"
                      value={dynamicId}
                      onChange={(e) => setDynamicId(e.target.value)}
                      placeholder={`Masukkan ${getDynamicLabel()}...`}
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50"
                      required
                    />
                  </div>

                  {/* KATA SANDI */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-sky-800" />
                      <span>Kata Sandi Akses</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-sky-900 hover:bg-sky-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mt-3"
                  >
                    <span>{isSubmitting ? 'Memverifikasi...' : `Masuk Sebagai ${getRoleLabel(selectedRole)}`}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {/* QUICK DEMO USER SELECTOR */}
              {loginMode === 'quick' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-700 text-center mb-2">
                    Pilih Salah Satu Akun Demo Sesuai Peran:
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickUserLogin(DEMO_STUDENTS[0])}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 transition-all flex items-center justify-between text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">• Siswa: Budi Santoso (8B)</h4>
                        <p className="text-[10px] text-slate-500">NIK: 3171012304080001 • NISN: 0082341234</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">Siswa</span>
                    </button>

                    <button
                      onClick={() => handleQuickUserLogin(DEMO_TEACHERS[0])}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 transition-all flex items-center justify-between text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">• Guru BK: Ibu Fitri Handayani, M.Pd</h4>
                        <p className="text-[10px] text-slate-500">NIK: 3172015203850001 • NIP: 198503122010012004</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">Guru BK</span>
                    </button>

                    <button
                      onClick={() => handleQuickUserLogin(DEMO_PARENTS[0])}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 transition-all flex items-center justify-between text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">• Orang Tua: Bapak Hendra Santoso</h4>
                        <p className="text-[10px] text-slate-500">Orang Tua Siswa Budi Santoso (8B)</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-900">Orang Tua</span>
                    </button>

                    <button
                      onClick={() => handleQuickUserLogin(DEMO_TP2K[0])}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 transition-all flex items-center justify-between text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">• TP2K: Ibu Ratna Dewi, S.Pd</h4>
                        <p className="text-[10px] text-slate-500">Ketua Tim Penanganan Kekerasan Sekolah</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">TP2K</span>
                    </button>

                    <button
                      onClick={() => handleQuickUserLogin(DEMO_GOVERNMENT[0])}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50 hover:bg-sky-50 transition-all flex items-center justify-between text-left"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">• Pemerintah: Dr. H. Ahmad Fauzi</h4>
                        <p className="text-[10px] text-slate-500">Pengawas Dinas Pendidikan DKI Jakarta</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">Dinas</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-[11px] text-slate-500 font-medium">
              Sistem Terenkripsi NABIS • Hak Cipta © 2026 SMP Nusantara
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-3 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p>NABIS — National Anti-Bullying Intelligence System</p>
      </footer>
    </div>
  );
};


