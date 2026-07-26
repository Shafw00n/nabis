import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DailyMoodCheck } from './components/DailyMoodCheck';
import { FeatureGrid } from './components/FeatureGrid';
import { LaporAkuModal } from './components/LaporAkuModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { KnowledgeCheckView } from './components/KnowledgeCheckView';
import { AntiBullyingGamesView } from './components/AntiBullyingGamesView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { LoginView } from './components/LoginView';
import { TeacherPortalView } from './components/TeacherPortalView';
import { GovernmentPortalView } from './components/GovernmentPortalView';
import { AiCounselingModal } from './components/AiCounselingModal';
import { CaseTrackingView } from './components/CaseTrackingView';

import {
  MOCK_ARTICLES,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  DEFAULT_REMINDER_SETTINGS
} from './data/mockData';

import { Article, MoodLevel, MoodCause, MoodLog, IncidentReport, NotificationItem, ReminderSettings, AppUser, UserStudent, UserTeacher } from './types';
import { BellRing, Shield, HeartHandshake, X, LayoutDashboard, Brain, Gamepad2, Bot, Users, Building, Building2, BarChart2, ShieldCheck, FileText } from 'lucide-react';
import { NabisLogoIcon } from './components/NabisLogo';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Navigation View State
  const [currentView, setCurrentView] = useState<'dashboard' | 'knowledge' | 'games' | 'tracking'>('dashboard');

  // Modals State
  const [isLaporModalOpen, setIsLaporModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isAiCounselingOpen, setIsAiCounselingOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // App Data State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(DEFAULT_REMINDER_SETTINGS);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  // Live Toast Notification Banner
  const [activeToast, setActiveToast] = useState<{ title: string; msg: string; time: string } | null>(null);

  // Trigger test notification
  const handleTriggerTestNotification = () => {
    const studentName = currentUser?.name || 'Siswa';
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Waktunya N-Mood',
      message: `Halo ${studentName}! Yuk luangkan 10 detik untuk mencatat perasaanmu hari ini di NABIS.`,
      time: 'Baru Saja',
      type: 'reminder',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast({
      title: 'Pengingat Check-in Harian NABIS',
      msg: `Halo ${studentName}! Bagaimana perasaanmu hari ini? Luangkan 10 detik untuk N-Mood.`,
      time: 'Sekarang'
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 6000);
  };

  // Mark all notifications read
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Save Daily Mood Log
  const handleSaveMood = (mood: MoodLevel, note: string, cause?: MoodCause) => {
    const newLog: MoodLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      mood,
      note,
      cause
    };

    setMoodLogs(prev => [newLog, ...prev]);

    setActiveToast({
      title: 'Perasaan Berhasil Dicatat',
      msg: `Terima kasih telah check-in hari ini (${cause || 'Umum'}). Suaramu & kesehatan mentalmu sangat berharga di NABIS.`,
      time: 'Baru Saja'
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  // Submit Incident Report
  const handleSubmitReport = (newReportData: Omit<IncidentReport, 'id' | 'ticketNumber' | 'status' | 'createdAt'>) => {
    const ticket = `NBS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdReport: IncidentReport = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      ticketNumber: ticket,
      status: 'Terkirim',
      createdAt: '24 Juli 2026, 12:00 WIB',
      responseNote: 'Laporan telah diterima oleh Tim BK & TP2K Sekolah.'
    };

    setReports(prev => [createdReport, ...prev]);

    const reportNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Laporan Lapor Aku Terkirim',
      message: `Nomor Tiket #${ticket} telah tercatat. Tim Konselor BK segera meninjau laporanmu.`,
      time: 'Baru Saja',
      type: 'report_update',
      read: false
    };

    setNotifications(prev => [reportNotif, ...prev]);
  };

  // Update Report Status
  const handleUpdateReportStatus = (
    reportId: string,
    newStatus: IncidentReport['status'],
    responseNote: string
  ) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: newStatus,
          responseNote
        };
      }
      return r;
    }));

    setActiveToast({
      title: 'Status Laporan Diperbarui',
      msg: 'Tanggapan konselor BK berhasil disimpan dan diperbarui pada tiket siswa.',
      time: 'Baru Saja'
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  // Login handler
  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    setActiveToast({
      title: `Selamat Datang, ${user.name}`,
      msg: user.role === 'teacher'
        ? `Berhasil masuk ke Portal Konselor BK.`
        : user.role === 'parent'
        ? `Berhasil masuk ke Portal Orang Tua Siswa.`
        : user.role === 'tp2k'
        ? `Berhasil masuk ke Portal Satgas TP2K Sekolah.`
        : user.role === 'government'
        ? `Berhasil masuk ke Portal Pemantauan Dinas Pendidikan.`
        : user.role === 'ambassador'
        ? `Berhasil masuk ke Portal Routes Ambassador Anti-Perundungan.`
        : user.role === 'satgas'
        ? `Berhasil masuk ke Portal Satgas PPKSP Kabupaten.`
        : `Berhasil masuk ke Portal Siswa NABIS.`,
      time: 'Baru Saja'
    });
    setTimeout(() => {
      setActiveToast(null);
    }, 5000);
  };

  // Emergency click from Login Screen
  const handleEmergencyFromLogin = () => {
    const guestUser: UserStudent = {
      id: `emergency-guest-${Date.now()}`,
      role: 'student',
      name: 'Siswa Darurat (Akses Langsung)',
      nik: '3171000000000001',
      nisn: '1000000000',
      className: 'Dampingan BK',
      schoolName: 'SMA Milbos Bogor',
      streakDays: 1
    };
    setCurrentUser(guestUser);
    setIsLaporModalOpen(true);
  };

  // IF NOT LOGGED IN -> RENDER LOGIN SCREEN
  if (!currentUser) {
    return (
      <LoginView
        onLogin={handleLogin}
      />
    );
  }

  // PORTAL UNTUK PERAN TEKS / ROLE LAINNYA
  // 1. TEACHER PORTAL
  if (currentUser.role === 'teacher') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
        <Header
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onOpenReminderModal={() => setIsReminderModalOpen(false)}
          onOpenLaporModal={() => setIsLaporModalOpen(false)}
          reminderSettings={reminderSettings}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pt-6 pb-16">
          <TeacherPortalView
            currentTeacher={currentUser as UserTeacher}
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p className="font-bold text-sky-900">• NABIS — Portal Konselor Guru BK • SMA Milbos Bogor</p>
        </footer>
      </div>
    );
  }

  // 2. PARENT PORTAL
  if (currentUser.role === 'parent') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
        <Header
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onOpenReminderModal={() => setIsReminderModalOpen(false)}
          onOpenLaporModal={() => setIsLaporModalOpen(true)}
          reminderSettings={reminderSettings}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 text-xs font-bold border border-cyan-200">
              Portal Orang Tua Siswa NABIS
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Pantau Kesejahteraan Emosional Anak: {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Akses pemantauan Mood Rapot anak, riwayat kehadiran harian, serta saluran pengaduan langsung ke Guru BK Sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-sky-900">• Status Mood Anak Harian</span>
              <h3 className="text-xl font-extrabold text-emerald-800">Sangat Baik (Stabil)</h3>
              <p className="text-xs text-slate-500">Log Check-in Terakhir: Hari ini, 07:15 WIB</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-sky-900">• Kehadiran Check-in</span>
              <h3 className="text-xl font-extrabold text-slate-900">95% Bulan Ini</h3>
              <p className="text-xs text-slate-500">Streak: 5 Hari Berturut-turut</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-sky-900">• Saluran Laporan Orang Tua</span>
              <button
                onClick={() => setIsLaporModalOpen(true)}
                className="w-full py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition-colors mt-1"
              >
                Buat Lapor Aku Untuk Anak
            </button>
            <button
              onClick={() => setCurrentView('tracking')}
              className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
                currentView === 'tracking'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Lacak Kasus</span>
            </button>
          </div>
          </div>
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p className="font-bold text-sky-900">• NABIS — Portal Komunikasi Orang Tua &amp; Sekolah</p>
        </footer>
        <LaporAkuModal
          isOpen={isLaporModalOpen}
          onClose={() => setIsLaporModalOpen(false)}
          reports={reports}
          onSubmitReport={handleSubmitReport}
        />
      </div>
    );
  }

  // 3. TP2K PORTAL
  if (currentUser.role === 'tp2k') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
        <Header
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onOpenReminderModal={() => setIsReminderModalOpen(false)}
          onOpenLaporModal={() => setIsLaporModalOpen(false)}
          reminderSettings={reminderSettings}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 py-8 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200">
              Portal TP2K — Tim Pencegahan &amp; Penanganan Kekerasan Sekolah
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Dasbor Operasional Satgas TP2K
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pengawasan penanganan insiden, verifikasi laporan resmi, serta mitigasi perundungan di lingkungan sekolah.
            </p>
          </div>

          <TeacherPortalView
            currentTeacher={{
              id: currentUser.id,
              role: 'teacher',
              name: currentUser.name,
              nik: currentUser.nik,
              nip: currentUser.institutionId || 'TP2K-001',
              roleTitle: 'Ketua Tim Satgas TP2K',
              schoolName: currentUser.schoolName,
              avatarUrl: currentUser.avatarUrl
            }}
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p className="font-bold text-sky-900">• NABIS — Portal Satgas TP2K Sekolah</p>
        </footer>
      </div>
    );
  }

  // 4. GOVERNMENT / DINAS PORTAL
  if (currentUser.role === 'government' || currentUser.role === 'satgas') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
        <Header
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onOpenReminderModal={() => setIsReminderModalOpen(false)}
          onOpenLaporModal={() => setIsLaporModalOpen(false)}
          reminderSettings={reminderSettings}
          currentUser={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
          <GovernmentPortalView />
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p className="font-bold text-sky-900">• NABIS — Portal Pengawasan Dinas Pendidikan &amp; Kebudayaan</p>
        </footer>
      </div>
    );
  }

  // 5. STUDENT PORTAL VIEW (DEFAULT)
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-sky-200 flex flex-col justify-between">
      
      {/* FLOATING LIVE NOTIFICATION TOAST */}
      {activeToast && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-2xl border-2 border-sky-400 shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-top duration-300">
          <div className="p-2 rounded-xl bg-sky-900 text-white shadow-xs">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-xs text-sky-950">{activeToast.title}</p>
              <span className="text-[10px] text-slate-400 font-semibold">{activeToast.time}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activeToast.msg}</p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP HEADER */}
      <Header
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onOpenReminderModal={() => setIsReminderModalOpen(true)}
        onOpenLaporModal={() => setIsLaporModalOpen(true)}
        reminderSettings={reminderSettings}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        
        {/* Navigation Breadcrumb / Tab Switcher */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between bg-white p-2.5 rounded-2xl border border-sky-100 shadow-xs text-xs font-bold gap-2">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
                currentView === 'dashboard'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Siswa</span>
            </button>
            <button
              onClick={() => setCurrentView('knowledge')}
              className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
                currentView === 'knowledge'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              <Brain className="w-4 h-4 shrink-0" />
              <span>N-Learn</span>
            </button>
            <button
              onClick={() => setCurrentView('games')}
              className={`flex items-center justify-center gap-2 flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all ${
                currentView === 'games'
                  ? 'bg-sky-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              <Gamepad2 className="w-4 h-4 shrink-0" />
              <span>N-Play</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAiCounselingOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-950 font-bold text-xs transition-colors border border-sky-200"
            >
              <Bot className="w-4 h-4 text-sky-800" />
              <span>AI Counseling</span>
            </button>

            <button
              onClick={() => setIsLaporModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-red-200" />
              <span>'Lapor Aku'</span>
            </button>
          </div>
        </div>

        {/* VIEW ROUTER */}
        {currentView === 'dashboard' && (
          <>
            {/* HERO SECTION WITH BANNER ARTIKEL */}
            <HeroSection
              articles={MOCK_ARTICLES}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onOpenKnowledgeCheck={() => setCurrentView('knowledge')}
            />

            {/* DAILY MOOD CHECK (5 Horizontal Card Buttons) */}
            <DailyMoodCheck
              onSaveMood={handleSaveMood}
              onOpenLaporModal={() => setIsLaporModalOpen(true)}
              onOpenCounselingModal={() => setIsAiCounselingOpen(true)}
              savedLogs={moodLogs}
            />

            {/* FEATURE GRID LAYOUT */}
            <FeatureGrid
              onOpenKnowledgeCheck={() => setCurrentView('knowledge')}
              onOpenGames={() => setCurrentView('games')}
              onOpenLaporModal={() => setIsLaporModalOpen(true)}
            />
          </>
        )}

        {currentView === 'knowledge' && (
          <KnowledgeCheckView onBackToDashboard={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'games' && (
          <AntiBullyingGamesView onBackToDashboard={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'tracking' && (
          <CaseTrackingView reports={INITIAL_REPORTS} />
        )}

      </main>

      {/* ALL MODALS */}
      <LaporAkuModal
        isOpen={isLaporModalOpen}
        onClose={() => setIsLaporModalOpen(false)}
        reports={reports}
        onSubmitReport={handleSubmitReport}
      />

      <AiCounselingModal
        isOpen={isAiCounselingOpen}
        onClose={() => setIsAiCounselingOpen(false)}
        onOpenLaporModal={() => {
          setIsAiCounselingOpen(false);
          setIsLaporModalOpen(true);
        }}
        studentName={currentUser.name}
      />

      <NotificationSettingsModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        settings={reminderSettings}
        onUpdateSettings={(newSettings) => setReminderSettings(newSettings)}
        onTestNotification={handleTriggerTestNotification}
        notifications={notifications}
      />

      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* FOOTER */}
      <footer className="bg-white border-t border-sky-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-sky-900 text-sm">
            <NabisLogoIcon className="w-5 h-5" />
            <span>NABIS — National Anti-Bullying Intelligence System</span>
          </div>
          <p className="text-slate-600">
            Aplikasi Web Anti-Bullying Dashboard Siswa • Dikelola oleh Tim Bimbingan Konseling &amp; Satgas TP2K Sekolah
          </p>
          <p className="text-[11px] text-slate-400">
            © 2026 NABIS Anti-Bullying. Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>

    </div>
  );
}



