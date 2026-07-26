import React, { useState } from 'react';
import { ShieldAlert, Bell, Clock, User, CheckCircle2, LogOut, GraduationCap, ShieldCheck } from 'lucide-react';
import { NotificationItem, ReminderSettings, AppUser } from '../types';
import { NabisLogoIcon } from './NabisLogo';

interface HeaderProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onOpenReminderModal: () => void;
  onOpenLaporModal: () => void;
  reminderSettings: ReminderSettings;
  currentUser?: AppUser | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  notifications,
  onMarkAllRead,
  onOpenReminderModal,
  onOpenLaporModal,
  reminderSettings,
  currentUser,
  onLogout
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const isTeacher = currentUser?.role === 'teacher';
  const isAmbassador = currentUser?.role === 'ambassador';
  const isGovernment = currentUser?.role === 'government';
  const isParent = currentUser?.role === 'parent';
  const isStudent = currentUser?.role === 'student';

  const roleBadgeLabel = isTeacher
    ? 'Portal Guru BK'
    : isAmbassador
      ? 'Roots Ambassador'
      : isGovernment
        ? 'Portal Pemerintah'
        : isParent
          ? 'Portal Orang Tua'
          : 'Siswa Active';

  const roleBadgeStyle = isTeacher
    ? 'bg-amber-100 text-amber-900 border-amber-300'
    : isAmbassador
      ? 'bg-orange-100 text-orange-900 border-orange-300'
      : isGovernment
        ? 'bg-purple-100 text-purple-900 border-purple-300'
        : isParent
          ? 'bg-teal-100 text-teal-900 border-teal-300'
          : 'bg-sky-100 text-sky-900 border-sky-200';

  const roleProfileStyle = isTeacher
    ? 'bg-amber-50 text-amber-900 border-amber-200'
    : isAmbassador
      ? 'bg-orange-50 text-orange-900 border-orange-200'
      : isGovernment
        ? 'bg-purple-50 text-purple-900 border-purple-200'
        : isParent
          ? 'bg-teal-50 text-teal-900 border-teal-200'
          : 'bg-sky-50 text-sky-900 border-sky-200';

  const roleProfileLabel = isTeacher
    ? 'Konselor BK Sekolah'
    : isAmbassador
      ? 'Roots Ambassador - Duta Anti-Perundungan'
      : isGovernment
        ? 'Dinas Pendidikan'
        : isParent
          ? 'Orang Tua / Wali'
          : `Siswa Terdaftar • Kelas ${(currentUser as any)?.className}`;

  const logoutLabel = isTeacher
    ? 'Keluar Portal Guru BK'
    : isAmbassador
      ? 'Keluar Roots Ambassador'
      : isGovernment
        ? 'Keluar Portal Pemerintah'
        : isParent
          ? 'Keluar Portal Orang Tua'
          : 'Keluar / Ganti Akun Siswa';

  return (
    <header className="sticky top-0 z-40 bg-white backdrop-blur-md border-b border-sky-100 shadow-sm text-sky-900 transition-all pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <NabisLogoIcon className="w-9 h-9 sm:w-11 sm:h-11 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-sky-950 font-sans">
                NABIS
              </span>
              <span className={`hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border ${roleBadgeStyle}`}>
                {roleBadgeLabel}
              </span>
            </div>
            <p className="hidden sm:block text-[11px] sm:text-xs text-slate-500 font-medium">
              National Anti-Bullying Intelligence System
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Reminder Quick Pill (Student view only) */}
          {isStudent && (
            <button
              onClick={onOpenReminderModal}
              className={`hidden md:flex items-center gap-2 px-3 py-2.5 rounded-full text-xs font-semibold border transition-all min-h-[44px] ${
                reminderSettings.enabled
                  ? 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title="Pengaturan Jadwal Check-in Harian"
            >
              <Clock className={`w-3.5 h-3.5 ${reminderSettings.enabled ? 'text-sky-700 animate-pulse' : 'text-slate-400'}`} />
              <span>
                {reminderSettings.enabled ? `Check-in: ${reminderSettings.time} WIB` : 'Pengingat Matang'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>
          )}

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-3 rounded-xl text-sky-900 bg-slate-50 hover:bg-sky-50 border border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-sky-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifDropdown && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-[calc(100vw-32px)] sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-w-sm">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-sky-800" />
                    <h3 className="font-bold text-slate-800 text-sm">Notifikasi &amp; Pembaruan</h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllRead}
                      className="text-xs text-sky-800 hover:text-sky-950 font-bold flex items-center gap-1 min-h-[44px] px-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Tandai Dibaca
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-xs text-slate-400">Belum ada notifikasi baru</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3.5 text-xs transition-colors hover:bg-slate-50 ${
                          !n.read ? 'bg-sky-50/60 font-medium' : 'bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sky-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {isStudent && (
                  <div className="px-4 pt-2 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-b-2xl">
                    <button
                      onClick={() => {
                        setShowNotifDropdown(false);
                        onOpenReminderModal();
                      }}
                      className="text-xs text-sky-800 font-bold hover:underline flex items-center gap-1.5 py-1"
                    >
                      <Clock className="w-3.5 h-3.5 text-sky-700" /> Atur Pengingat Harian
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Prominent Red Emergency Button "N-Report" in Header (Student View only) */}
          {isStudent && (
            <button
              onClick={onOpenLaporModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all transform hover:-translate-y-0.5 border border-red-600"
            >
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="tracking-wide uppercase font-black">N-Report</span>
            </button>
          )}

          {/* Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition-opacity focus:outline-none"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-sky-300"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-900 flex items-center justify-center font-bold text-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {currentUser?.name || 'Pengguna'}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  {isTeacher
                    ? `NIP. ${(currentUser as any)?.nip || '198503122010012004'}`
                    : isAmbassador
                      ? `NISN ${(currentUser as any)?.nisn || '0082345679'} • Duta`
                      : isStudent
                        ? `Kelas ${(currentUser as any)?.className || '8B'} • NISN ${(currentUser as any)?.nisn || '0082341234'}`
                        : currentUser?.roleTitle || 'Pengguna NABIS'
                  }
                </p>
              </div>
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-32px)] sm:w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-150 max-w-xs">
                <div className="px-4 pb-3 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser?.schoolName || 'MAS Milbos Bogor'}</p>
                  <div className={`mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${roleProfileStyle}`}>
                    {roleProfileLabel}
                  </div>
                </div>

                <div className="p-2">
                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>{logoutLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};


