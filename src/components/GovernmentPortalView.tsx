import React, { useState } from 'react';
import { Building2, TrendingUp, AlertTriangle, CheckCircle2, Clock, Shield, MapPin, ChevronDown, ChevronUp, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { SchoolBullyingStat, IncidentReport } from '../types';
import { DEMO_SCHOOL_STATS, INITIAL_REPORTS } from '../data/mockData';
import { CaseTrackingView } from './CaseTrackingView';

// Top 3 provinces data (derived from DEMO_SCHOOL_STATS)
const TOP_PROVINCES = [
  { province: 'Jawa Barat', totalCases: 27, activeCases: 8, resolvedCases: 19, trend: 'up' },
  { province: 'Jawa Timur', totalCases: 20, activeCases: 7, resolvedCases: 13, trend: 'up' },
  { province: 'Jawa Tengah', totalCases: 14, activeCases: 6, resolvedCases: 8, trend: 'down' },
];

export const GovernmentPortalView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'cases'>('dashboard');
  const [searchSchool, setSearchSchool] = useState('');
  const [sortBy, setSortBy] = useState<'totalCases' | 'activeCases' | 'resolvedCases'>('totalCases');

  const filteredSchools = DEMO_SCHOOL_STATS.filter(s =>
    s.schoolName.toLowerCase().includes(searchSchool.toLowerCase()) ||
    s.province.toLowerCase().includes(searchSchool.toLowerCase())
  ).sort((a, b) => b[sortBy] - a[sortBy]);

  const totalAllCases = DEMO_SCHOOL_STATS.reduce((sum, s) => sum + s.totalCases, 0);
  const totalActiveCases = DEMO_SCHOOL_STATS.reduce((sum, s) => sum + s.activeCases, 0);
  const totalResolvedCases = DEMO_SCHOOL_STATS.reduce((sum, s) => sum + s.resolvedCases, 0);
  const avgResolution = Math.round(DEMO_SCHOOL_STATS.reduce((sum, s) => sum + s.avgResolutionDays, 0) / DEMO_SCHOOL_STATS.length);

  if (viewMode === 'cases') {
    return (
      <div className="my-6">
        <button
          onClick={() => setViewMode('dashboard')}
          className="mb-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5 rotate-[-45deg]" /> Kembali ke Dashboard
        </button>
        <CaseTrackingView reports={INITIAL_REPORTS} />
      </div>
    );
  }

  return (
    <div className="my-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-700/50">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-purple-300" />
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
            Portal Pemantauan Pemerintah
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">N-Insight (Dashboard Anti-Bullying Nasional)</h2>
        <p className="text-purple-200 text-sm mt-1">Monitor real-time kasus perundungan di seluruh sekolah terintegrasi</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
            <Building2 className="w-4 h-4 text-purple-600" />
            Total Sekolah
          </div>
          <p className="text-3xl font-black text-slate-900">{DEMO_SCHOOL_STATS.length}</p>
          <p className="text-[10px] text-slate-400 mt-1">Sekolah terintegrasi</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Total Kasus
          </div>
          <p className="text-3xl font-black text-slate-900">{totalAllCases}</p>
          <p className="text-[10px] text-slate-400 mt-1">Semua kasus tercatat</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
            <Clock className="w-4 h-4 text-amber-600" />
            Kasus Aktif
          </div>
          <p className="text-3xl font-black text-amber-800">{totalActiveCases}</p>
          <p className="text-[10px] text-slate-400 mt-1">Dalam penanganan</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Kasus Selesai
          </div>
          <p className="text-3xl font-black text-emerald-800">{totalResolvedCases}</p>
          <p className="text-[10px] text-slate-400 mt-1">Rata-rata {avgResolution} hari</p>
        </div>
      </div>

      {/* Top 3 Provinces */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-extrabold text-sky-950 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            3 Provinsi dengan Kasus Perundungan Tertinggi
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOP_PROVINCES.map((prov, idx) => (
            <div key={prov.province} className={`rounded-2xl p-5 border-2 ${
              idx === 0 ? 'bg-red-50 border-red-200' :
              idx === 1 ? 'bg-orange-50 border-orange-200' :
              'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                  idx === 0 ? 'bg-red-500 text-white' :
                  idx === 1 ? 'bg-orange-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {idx + 1}
                </div>
                {prov.trend === 'up' ? (
                  <ArrowUp className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-emerald-500" />
                )}
              </div>
              <h4 className="font-bold text-slate-900">{prov.province}</h4>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Kasus:</span>
                  <span className="font-bold text-slate-900">{prov.totalCases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kasus Aktif:</span>
                  <span className="font-bold text-amber-700">{prov.activeCases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selesai:</span>
                  <span className="font-bold text-emerald-700">{prov.resolvedCases}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-extrabold text-sky-950 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-700" />
            Statistik per Sekolah
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchSchool}
                onChange={(e) => setSearchSchool(e.target.value)}
                placeholder="Cari sekolah..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50 w-40 sm:w-48"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50"
            >
              <option value="totalCases">Total Kasus</option>
              <option value="activeCases">Kasus Aktif</option>
              <option value="resolvedCases">Kasus Selesai</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 font-bold text-slate-600">Sekolah</th>
                <th className="text-left px-6 py-3 font-bold text-slate-600">Provinsi</th>
                <th className="text-center px-6 py-3 font-bold text-slate-600">Total Kasus</th>
                <th className="text-center px-6 py-3 font-bold text-slate-600">Aktif</th>
                <th className="text-center px-6 py-3 font-bold text-slate-600">Selesai</th>
                <th className="text-center px-6 py-3 font-bold text-slate-600">Rata-rata (hari)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchools.map((school) => (
                <tr key={school.schoolName} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-slate-900">{school.schoolName}</td>
                  <td className="px-6 py-3.5 text-slate-500">{school.province}</td>
                  <td className="px-6 py-3.5 text-center font-bold text-slate-900">{school.totalCases}</td>
                  <td className="px-6 py-3.5 text-center">
                    <span className={`font-bold ${school.activeCases > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {school.activeCases}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center font-bold text-emerald-700">{school.resolvedCases}</td>
                  <td className="px-6 py-3.5 text-center text-slate-600">{school.avgResolutionDays} hari</td>
                </tr>
              ))}
              {filteredSchools.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">Tidak ada sekolah ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Cases Button */}
      <button
        onClick={() => setViewMode('cases')}
        className="w-full py-3.5 rounded-2xl bg-sky-950 hover:bg-sky-900 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
      >
        <Shield className="w-4 h-4" />
        Lihat Semua Laporan Kasus & Pelacakan
        <ArrowUp className="w-4 h-4 rotate-90" />
      </button>
    </div>
  );
};
