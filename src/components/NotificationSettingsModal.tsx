import React, { useState } from 'react';
import { ReminderSettings, NotificationItem } from '../types';
import { Bell, Clock, Check, X, Sparkles, Volume2, ShieldCheck, Play } from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReminderSettings;
  onUpdateSettings: (newSettings: ReminderSettings) => void;
  onTestNotification: () => void;
  notifications: NotificationItem[];
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onTestNotification,
  notifications
}) => {
  const [enabled, setEnabled] = useState(settings.enabled);
  const [time, setTime] = useState(settings.time);
  const [selectedDays, setSelectedDays] = useState<string[]>(settings.days);
  const [sound, setSound] = useState(settings.sound);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    onUpdateSettings({
      ...settings,
      enabled,
      time,
      days: selectedDays,
      sound
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl max-w-lg w-full border border-sky-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-cyan-800 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Clock className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Pengingat Jadwal Check-in Harian</h3>
              <p className="text-xs text-sky-200 mt-0.5">Atur jam pengingat rutin N-Mood NABIS</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-slate-800 text-xs">
          
          {/* Main Toggle Switch */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-sky-700 shrink-0" />
              <div>
                <p className="font-extrabold text-sm text-sky-950">Aktifkan Notifikasi Harian</p>
                <p className="text-slate-500 text-[11px]">Kirimkan pesan hangat pengingat perasaan setiap hari</p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>

          {enabled && (
            <>
              {/* Time Picker */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  ⏰ Pilih Waktu Pengingat (WIB):
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['08:00', '12:00', '16:00'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTime(preset)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        time === preset
                          ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {preset} WIB
                    </button>
                  ))}
                </div>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* Days Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  📅 Hari Rutin Pengingat:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {daysList.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-sky-100 border-sky-400 text-sky-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound & Motivation Settings */}
              <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-slate-700">Suara / Nada Notifikasi</span>
                </div>
                <input
                  type="checkbox"
                  checked={sound}
                  onChange={(e) => setSound(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
              </div>
            </>
          )}

          {/* TEST NOTIFICATION TRIGGER BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onTestNotification}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-700" />
              <span>Uji Coba Kirim Notifikasi Pengingat Sekarang</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{isSaved ? 'Tersimpan!' : 'Simpan Pengingat'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
