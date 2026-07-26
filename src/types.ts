export type UserRole = 'student' | 'teacher' | 'parent' | 'tp2k' | 'government' | 'ambassador' | 'satgas';

export type MoodLevel = 'sangat_baik' | 'baik' | 'biasa' | 'buruk' | 'sangat_buruk';

export type MoodCause = 'Teman' | 'Guru' | 'Keluarga' | 'Pelajaran' | 'Lainnya';

export interface MoodOption {
  id: MoodLevel;
  label: string;
  iconName: string; // Used for Lucide icon mapping
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  supportMsg: string;
}

export interface MoodLog {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  mood: MoodLevel;
  cause?: MoodCause;
  note?: string;
  tags?: string[];
}

export interface MoodRapot {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  period: string;
  level: '1' | '2' | '3'; // Level 1 (Baik/Hijau-Biru), Level 2 (Perlu Perhatian/Kuning), Level 3 (Rentan/Merah)
  levelTitle: string;
  averageScore: number;
  totalCheckIns: number;
  dominantMood: string;
  triggerFactors: string[];
  aiSummary: string;
  recommendations: string[];
  weeklyScores: { week: string; score: number }[];
  lastUpdated: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Tips & Trik' | 'Edukasi' | 'Cyberbullying' | 'Kesehatan Mental' | 'Panduan Upstander';
  readTime: string;
  imageUrl: string;
  author: string;
  date: string;
  summary: string;
  content: string[];
  featured?: boolean;
}

export interface QuizQuestion {
  id: number;
  type: 'myth_fact' | 'multiple_choice';
  question: string;
  statement?: string;
  options?: string[];
  correctAnswer: boolean | number;
  explanation: string;
  category: string;
}

export interface GameScenario {
  id: string;
  title: string;
  description: string;
  character: string;
  situation: string;
  choices: {
    id: string;
    text: string;
    isUpstander: boolean;
    feedback: string;
    points: number;
  }[];
}

export type CaseStage =
  | 'reported'
  | 'observation'
  | 'assessment'
  | 'investigation'
  | 'intervention'
  | 'satgas'
  | 'recommendation'
  | 'police';

export interface StageInfo {
  stage: CaseStage;
  label: string;
  completedAt?: string;
  dueDays: number;
  assignedTo: string;
  notes?: string;
}

export interface IncidentReport {
  id: string;
  ticketNumber: string;
  incidentType: 'Fisik' | 'Verbal' | 'Cyberbullying' | 'Relasional/Pengucilan' | 'Lainnya';
  triagePriority: 'Tinggi' | 'Sedang' | 'Rendah';
  dateOccurred: string;
  location: string;
  description: string;
  isAnonymous: boolean;
  reporterName?: string;
  reporterClass?: string;
  witnesses?: string;
  status: 'Terkirim' | 'Diverifikasi Konselor' | 'Dalam Penanganan' | 'Selesai Dampak Positif';
  createdAt: string;
  responseNote?: string;
  assignedTeacher?: string;
  // Case tracking fields
  currentStage: CaseStage;
  stages: StageInfo[];
  deadline: string;
  isUrgent?: boolean;
  // File attachments
  attachments?: { name: string; type: string; size: string }[];
}

export interface SchoolBullyingStat {
  schoolName: string;
  province: string;
  totalCases: number;
  activeCases: number;
  resolvedCases: number;
  avgResolutionDays: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reminder' | 'article' | 'report_update' | 'badge';
  read: boolean;
  actionUrl?: string;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string; // e.g. "08:00"
  days: string[]; // e.g. ["Senin", "Selasa", ...]
  sound: boolean;
  motivationalQuote: boolean;
  lastTriggered?: string;
}

export interface ProfessionalContact {
  id: string;
  name: string;
  role: 'Guru BK' | 'Psikolog Klinis' | 'Psikiater Anak' | 'Tim TP2K';
  institution: string;
  distance: string;
  phone: string;
  status: 'Tersedia' | 'Sedang Sesi' | 'Panggilan Darurat';
  avatarUrl: string;
}

export interface UserStudent {
  id: string;
  role: 'student';
  name: string;
  nik: string;
  nisn: string;
  className: string;
  schoolName: string;
  avatarUrl?: string;
  streakDays: number;
}

export interface UserTeacher {
  id: string;
  role: 'teacher';
  name: string;
  nik: string;
  nip: string;
  roleTitle: string; // e.g. "Guru Bimbingan Konseling (BK)"
  schoolName: string;
  avatarUrl?: string;
}

export interface UserParent {
  id: string;
  role: 'parent';
  name: string;
  nik: string;
  childNisn: string;
  childName: string;
  schoolName: string;
  avatarUrl?: string;
}

export interface UserTP2K {
  id: string;
  role: 'tp2k';
  name: string;
  nik: string;
  institutionId: string;
  roleTitle: string; // e.g. "Ketua TP2K Sekolah"
  schoolName: string;
  avatarUrl?: string;
}

export interface UserGovernment {
  id: string;
  role: 'government';
  name: string;
  nik: string;
  institutionId: string;
  roleTitle: string; // e.g. "Pengawas Dinas Pendidikan Wilayah"
  schoolName: string;
  avatarUrl?: string;
}

export interface UserAmbassador {
  id: string;
  role: 'ambassador';
  name: string;
  nik: string;
  nisn: string;
  roleTitle: string; // e.g. "Duta Anti-Perundungan"
  className: string;
  schoolName: string;
  avatarUrl?: string;
  streakDays: number;
}

export interface UserSatgas {
  id: string;
  role: 'satgas';
  name: string;
  nik: string;
  institutionId: string;
  roleTitle: string; // e.g. "Ketua Satgas PPKSP Kabupaten"
  schoolName: string;
  avatarUrl?: string;
}

export type AppUser = UserStudent | UserTeacher | UserParent | UserTP2K | UserGovernment | UserAmbassador | UserSatgas;



