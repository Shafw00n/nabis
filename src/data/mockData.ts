import { Article, MoodOption, QuizQuestion, GameScenario, IncidentReport, NotificationItem, ReminderSettings, UserStudent, UserTeacher, UserParent, UserTP2K, UserGovernment, MoodRapot, ProfessionalContact, UserAmbassador, UserSatgas, SchoolBullyingStat } from '../types';

export const DEMO_STUDENTS: UserStudent[] = [
  {
    id: 'stu-1',
    role: 'student',
    name: 'Aqeela Nahdasasfia',
    nik: '3171012304080001',
    nisn: '0082341234',
    className: '8B',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: '',
    streakDays: 5
  },
  {
    id: 'stu-2',
    role: 'student',
    name: 'Siti Rahmawati',
    nik: '3171025506070002',
    nisn: '0082345678',
    className: '9A',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    streakDays: 12
  },
  {
    id: 'stu-3',
    role: 'student',
    name: 'Andi Pratama',
    nik: '3171031201090003',
    nisn: '0091234567',
    className: '7C',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    streakDays: 3
  }
];

export const DEMO_TEACHERS: UserTeacher[] = [
  {
    id: 'tch-1',
    role: 'teacher',
    name: 'Ibu Fitri Handayani, M.Pd',
    nik: '3172015203850001',
    nip: '198503122010012004',
    roleTitle: 'Koordinator Guru Bimbingan Konseling (BK)',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tch-2',
    role: 'teacher',
    name: 'Bapak Drs. Sugeng Santoso',
    nik: '3172021509780002',
    nip: '197809152005011002',
    roleTitle: 'Guru BK Kelas 8 & Tim Kesiswaan',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_PARENTS: UserParent[] = [
  {
    id: 'prn-1',
    role: 'parent',
    name: 'Bapak Hendra Santoso (Orang Tua Aqeela)',
    nik: '3171011505750001',
    childNisn: '0082341234',
    childName: 'Aqeela Nahdasasfia (8B)',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_AMBASSADORS: UserAmbassador[] = [
  {
    id: 'amb-1',
    role: 'ambassador',
    name: 'Fajar Ramadhan',
    nik: '3171011403080002',
    nisn: '0082345679',
    roleTitle: 'Duta Anti-Perundungan',
    className: '9B',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcabd9c?auto=format&fit=crop&w=200&q=80',
    streakDays: 14
  }
];

export const DEMO_SATGAS: UserSatgas[] = [
  {
    id: 'sat-1',
    role: 'satgas',
    name: 'Bapak H. Dedi Mulyadi, S.H.',
    nik: '3201011505750001',
    institutionId: 'SATGAS-PPKSP-KAB-001',
    roleTitle: 'Ketua Satgas PPKSP Kabupaten',
    schoolName: 'Satgas PPKSP Kabupaten Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_TP2K: UserTP2K[] = [
  {
    id: 'tp2k-1',
    role: 'tp2k',
    name: 'Ibu Ratna Dewi, S.Pd (Tim TP2K)',
    nik: '3173014208820005',
    institutionId: 'TP2K-SMA-001',
    roleTitle: 'Ketua Tim Pencegahan & Penanganan Kekerasan (TP2K)',
    schoolName: 'SMA Milbos Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_GOVERNMENT: UserGovernment[] = [
  {
    id: 'gov-1',
    role: 'government',
    name: 'Bapak Dr. H. Ahmad Fauzi, M.Si',
    nik: '3174011204720008',
    institutionId: 'DINAS-KAB-8821',
    roleTitle: 'Pengawas Dinas Pendidikan Kabupaten Bogor',
    schoolName: 'Dinas Pendidikan Kabupaten Bogor',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

export const DEMO_PROFESSIONALS: ProfessionalContact[] = [
  {
    id: 'prof-1',
    name: 'Ibu Fitri Handayani, M.Pd',
    role: 'Guru BK',
    institution: 'Ruang BK SMA Milbos Bogor',
    distance: 'Ruang BK Lt. 2 Sekolah',
    phone: '0812-3456-7890',
    status: 'Tersedia',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prof-2',
    name: 'Dr. Farida Aksara, M.Psi',
    role: 'Psikolog Klinis',
    institution: 'Pusat Layanan Psikologi Anak & Remaja Sehat',
    distance: '1.2 km dari sekolah',
    phone: '0811-9876-5432',
    status: 'Tersedia',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prof-3',
    name: 'Dr. Hendra Wijaya, Sp.KJ',
    role: 'Psikiater Anak',
    institution: 'RSUD Medika Remaja / Klinik Mitra',
    distance: '2.5 km dari sekolah',
    phone: '0813-1122-3344',
    status: 'Panggilan Darurat',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prof-4',
    name: 'Tim Satgas TP2K Sekolah',
    role: 'Tim TP2K',
    institution: 'Sekretariat TP2K SMA Milbos Bogor',
    distance: 'Gedung Kesiswaan Lt. 1',
    phone: '0815-5544-3322',
    status: 'Tersedia',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  }
];

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'sangat_baik',
    label: 'Sangat Baik',
    iconName: 'SmilePlus',
    color: '#0284c7', // sea blue
    bgColor: 'bg-sky-50 hover:bg-sky-100',
    borderColor: 'border-sky-300 hover:border-sky-500',
    textColor: 'text-sky-800',
    description: 'Enerjik, ceria & siap beraktivitas',
    supportMsg: 'Luar biasa! Pertahankan energi positifmu dan sebarkan kebaikan kepada teman-teman di sekitarmu hari ini.'
  },
  {
    id: 'baik',
    label: 'Baik',
    iconName: 'Smile',
    color: '#0ea5e9',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100',
    borderColor: 'border-cyan-300 hover:border-cyan-500',
    textColor: 'text-cyan-800',
    description: 'Tenang, nyaman & fokus',
    supportMsg: 'Hari yang tenang dan menyenangkan. Tetap jaga semangat belajar dan saling merangkul sesama teman.'
  },
  {
    id: 'biasa',
    label: 'Biasa',
    iconName: 'Meh',
    color: '#64748b',
    bgColor: 'bg-slate-50 hover:bg-slate-100',
    borderColor: 'border-slate-300 hover:border-slate-500',
    textColor: 'text-slate-800',
    description: 'Biasa saja, netral',
    supportMsg: 'Tidak apa-apa merasa biasa saja hari ini. Ambil napas dalam-dalam, minum air putih, dan nikmati harimu secara santai.'
  },
  {
    id: 'buruk',
    label: 'Buruk',
    iconName: 'Frown',
    color: '#d97706',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
    borderColor: 'border-amber-300 hover:border-amber-500',
    textColor: 'text-amber-900',
    description: 'Lelah, cemas, atau tertekan',
    supportMsg: 'Perasaanmu sangat valid. Jika ada hal yang mengganggu hatimu atau merasa tertekan, ingat kamu tidak sendirian di NABIS.'
  },
  {
    id: 'sangat_buruk',
    label: 'Sangat Buruk',
    iconName: 'AlertCircle',
    color: '#dc2626',
    bgColor: 'bg-red-50 hover:bg-red-100',
    borderColor: 'border-red-300 hover:border-red-500',
    textColor: 'text-red-900',
    description: 'Sangat sedih, takut, atau terancam',
    supportMsg: 'Kamu aman di sini. Kami sangat peduli padamu. Jika kamu mengalami atau melihat perundungan, klik tombol Lapor Aku atau hubungi Konselor Sekolah sekarang.'
  }
];

export const DEMO_MOOD_RAPOTS: MoodRapot[] = [
  {
    id: 'rpt-1',
    studentId: 'stu-1',
    studentName: 'Aqeela Nahdasasfia',
    className: '8B',
    period: 'Juli 2026',
    level: '1',
    levelTitle: 'Tingkat 1: Kesejahteraan Emosional Stabil & Positif',
    averageScore: 4.3,
    totalCheckIns: 18,
    dominantMood: 'Baik & Sangat Baik',
    triggerFactors: ['Tugas Sekolah Terkendali', 'Dukungan Teman', 'Kegiatan Olahraga'],
    aiSummary: 'Aqeela menunjukkan tren kestabilan emosi yang sangat memuaskan sepanjang bulan Juli. Aktivitas check-in harian berjalan konsisten. Terdeteksi lonjakan motivasi tinggi usai mengikuti kegiatan ekstrakurikuler.',
    recommendations: [
      'Pertahankan kebiasaan N-Mood harian.',
      'Jadilah pahlawan Upstander di kelas untuk merangkul teman yang menyendiri.',
      'Lanjutkan komunikasi terbuka dengan orang tua dan guru.'
    ],
    weeklyScores: [
      { week: 'Minggu 1', score: 4.2 },
      { week: 'Minggu 2', score: 4.5 },
      { week: 'Minggu 3', score: 4.0 },
      { week: 'Minggu 4', score: 4.5 }
    ],
    lastUpdated: '24 Juli 2026'
  },
  {
    id: 'rpt-2',
    studentId: 'stu-2',
    studentName: 'Siti Rahmawati',
    className: '9A',
    period: 'Juli 2026',
    level: '2',
    levelTitle: 'Tingkat 2: Perlu Pemantauan Ringan Konselor',
    averageScore: 3.1,
    totalCheckIns: 14,
    dominantMood: 'Biasa & Buruk',
    triggerFactors: ['Tekanan Ujian Kelas 9', 'Dinamika Grup WhatsApp'],
    aiSummary: 'Siti mengalami fluktuasi suasana hati menjelang pertengahan minggu, terutama pada hari Rabu dan Kamis. Catatan jurnal menunjukkan kecemasan akademis dan interaksi di media sosial.',
    recommendations: [
      'Gunakan fitur panduan latihan pernapasan dan artikel kesehatan mental.',
      'Jadwalkan sesi konsultasi santai 1-on-1 dengan Guru BK (Ibu Fitri).',
      'Kurangi akses ke grup chat non-resmi pada malam hari.'
    ],
    weeklyScores: [
      { week: 'Minggu 1', score: 3.8 },
      { week: 'Minggu 2', score: 2.9 },
      { week: 'Minggu 3', score: 3.0 },
      { week: 'Minggu 4', score: 2.7 }
    ],
    lastUpdated: '23 Juli 2026'
  },
  {
    id: 'rpt-3',
    studentId: 'stu-3',
    studentName: 'Andi Pratama',
    className: '7C',
    period: 'Juli 2026',
    level: '3',
    levelTitle: 'Tingkat 3: Perlu Pendampingan Khusus BK (Prioritas)',
    averageScore: 2.1,
    totalCheckIns: 9,
    dominantMood: 'Buruk & Sangat Buruk',
    triggerFactors: ['Ejekan Verbal Saat Istirahat', 'Penyesuaian Lingkungan Baru'],
    aiSummary: 'Andi mencatat mood rendah secara berturut-turut pada 3 hari terakhir. Terdapat catatan ringkas terkait keengganan ke kantin karena merasa cemas berinteraksi dengan senior.',
    recommendations: [
      'Prioritas pendampingan langsung oleh tim Konselor BK minggu ini.',
      'Koordinasi dengan Wali Kelas 7C untuk pengamatan interaksi antarsiswa.',
      'Fasilitasi ruang aman dan perlindungan penuh dari perundungan.'
    ],
    weeklyScores: [
      { week: 'Minggu 1', score: 2.8 },
      { week: 'Minggu 2', score: 2.2 },
      { week: 'Minggu 3', score: 1.9 },
      { week: 'Minggu 4', score: 1.5 }
    ],
    lastUpdated: '24 Juli 2026'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Panduan Upstander 5D: Langkah Nyata & Safe Menghentikan Perundungan',
    category: 'Panduan Upstander',
    readTime: '3 min baca',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    author: 'Tim Bimbingan Konseling NABIS',
    date: '24 Juli 2026',
    summary: 'Sains psikologi membuktikan bahwa tindakan Upstander dalam 10 detik pertama dapat menghentikan 57% kasus perundungan di sekolah.',
    content: [
      'Bystander adalah penonton pasif. Sebaliknya, Upstander adalah pahlawan yang bertindak cerdas demi keamanan bersama.',
      'Gunakan metode 5D berbasis penelitian psikologi pendidikan:',
      '• Direct (Tegur Langsung): Katakan dengan tenang namun tegas: "Hentikan, itu tidak lucu dan melanggar aturan."',
      '• Distract (Alihkan Perhatian): Ajak korban mengobrol topik lain, atau panggil untuk tugas guru.',
      '• Delegate (Minta Bantuan): Hubungi Wali Kelas, Guru BK, atau gunakan tombol Lapor Aku.',
      '• Delay (Dampingi Setelahnya): Temui korban setelah kejadian dan tunjukkan dukungan penuh.',
      '• Document (Catat Bukti): Catat tanggal, lokasi, dan saksi untuk pelaporan resmi.'
    ],
    featured: true
  },
  {
    id: 'art-2',
    title: 'Cyberbullying & Etika Digital: Cara Aman Menyimpan Bukti & Menjaga Privasi',
    category: 'Cyberbullying',
    readTime: '4 min baca',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    author: 'Tim Siber Sehat Sekolah',
    date: '22 Juli 2026',
    summary: 'Ujaran kebencian di grup chat dan komentar buruk bisa melukai emosi. Simak prosedur tangkap layar dan pelaporan rahasia.',
    content: [
      'Perundungan di media sosial sering melintasi batas jam sekolah.',
      'Prosedur Penanganan Cyberbullying:',
      '• Tangkap layar (screenshot) bukti percakapan lengkap beserta tanggal & jam.',
      '• Amankan akun dengan memperbarui kata sandi dan membatasi komentar asing.',
      '• Kirimkan laporan terenkripsi ke Guru BK melalui portal NABIS.',
      '• Batasi merespons provokasi di kolom komentar.'
    ],
    featured: true
  },
  {
    id: 'art-3',
    title: 'Kesehatan Mental Remaja: Mengapa Mengenali Perasaan Harian Sangat Penting',
    category: 'Kesehatan Mental',
    readTime: '5 min baca',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Rina Saraswati, M.Psi',
    date: '20 Juli 2026',
    summary: 'Pencatatan emosi harian membantu meningkatkan kecerdasan emosional dan mencegah akumulasi stres.',
    content: [
      'Menyimpan kesedihan sendirian dapat memicu keletihan mental.',
      'Manfaat N-Mood:',
      '• Membantu merefleksikan pemicu stres harian.',
      '• Memberikan gambaran rapot mood berkala kepada tim konselor.',
      '• Membuka akses bantuan emosional secara berkala.'
    ],
    featured: false
  },
  {
    id: 'art-4',
    title: 'Mengenali Bullying Relasional: Pengucilan & Penyebaran Rumor di Sekolah',
    category: 'Edukasi',
    readTime: '3 min baca',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    author: 'Tim Psikologi Sekolah',
    date: '18 Juli 2026',
    summary: 'Pengucilan dan penyebaran gosip palsu termasuk tindakan pelanggaran berat tata tertib sekolah.',
    content: [
      'Perundungan tidak selalu berbentuk kontak fisik.',
      'Ciri-Ciri Bullying Relasional:',
      '• Sengaja menolak teman dalam kerja kelompok tanpa alasan objektif.',
      '• Menyebarkan desas-desus palsu untuk merusak reputasi.',
      '• Memaksa orang lain untuk menjauhi seseorang.'
    ],
    featured: false
  }
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    type: 'myth_fact',
    question: 'Mitos atau Fakta: Ejekan berulang mengenai fisik yang membuat siswa cemas pergi ke sekolah hanyalah sebatas becandaan wajar.',
    statement: 'Mengejek terus menerus hanya candaan biasa.',
    correctAnswer: false, // MITOS
    explanation: 'MITOS! Ejekan berulang yang menimbulkan rasa tertekan adalah Bullying Verbal yang dilarang keras oleh sekolah.',
    category: 'Bullying Verbal'
  },
  {
    id: 2,
    type: 'myth_fact',
    question: 'Mitos atau Fakta: Fitur Lapor Aku di NABIS menjamin privasi dan kerahasiaan identitas pelapor 100%.',
    statement: 'Laporan di NABIS dijamin rahasia.',
    correctAnswer: true, // FAKTA
    explanation: 'FAKTA! Sistem dirancang terenkripsi untuk melindungi pelapor agar merasa aman saat menyuarakan kebenaran.',
    category: 'Sistem Laporan'
  },
  {
    id: 3,
    type: 'myth_fact',
    question: 'Mitos atau Fakta: Pengucilan sengaja di grup media sosial kelas tidak termasuk dalam kategori perundungan.',
    statement: 'Pengucilan grup online bukan bullying.',
    correctAnswer: false, // MITOS
    explanation: 'MITOS! Pengucilan di ruang siber adalah bentuk Cyber-exclusion yang dapat merusak kesehatan mental siswa.',
    category: 'Cyberbullying'
  },
  {
    id: 4,
    type: 'myth_fact',
    question: 'Mitos atau Fakta: Menjadi Upstander dapat dilakukan secara aman tanpa harus menggunakan kekerasan fisik.',
    statement: 'Upstander bertindak secara aman & bijak.',
    correctAnswer: true, // FAKTA
    explanation: 'FAKTA! Upstander mengutamakan keamanan melalui metode pengalihan, dukungan korban, dan koordinasi dengan Guru BK.',
    category: 'Sikap Upstander'
  }
];

export const MOCK_GAMES: GameScenario[] = [
  {
    id: 'game-1',
    title: 'Misi 1: Area Kantin Sekolah',
    description: 'Kamu melihat Doni duduk sendirian di sudut kantin sambil menunduk. Beberapa siswa lain menunjuk-nunjuknya dan menyembunyikan tas sekolah Doni.',
    character: 'Doni (Siswa Kelas 8)',
    situation: 'Tas Doni disembunyikan dan dia diejek saat jam istirahat.',
    choices: [
      {
        id: 'c1',
        text: 'Menghampiri Doni, mengajaknya duduk bersama, dan membantu mencari tasnya secara tenang.',
        isUpstander: true,
        feedback: 'Sangat Baik! Tindakan empati ini meredakan kecemasan Doni dan menghentikan perundungan secara damai.',
        points: 100
      },
      {
        id: 'c2',
        text: 'Memfoto kejadian tersebut dan mengunggahnya ke media sosial.',
        isUpstander: false,
        feedback: 'Kurang Tepat. Memfoto tanpa membantu justru memperluas dampak negatif bagi korban.',
        points: 10
      },
      {
        id: 'c3',
        text: 'Melaporkan kejadian secara langsung ke Ruang BK atau melalui tombol Lapor Aku.',
        isUpstander: true,
        feedback: 'Bagus Sekali! Melaporkan ke pendamping BK adalah langkah teratur dan aman.',
        points: 90
      }
    ]
  },
  {
    id: 'game-2',
    title: 'Misi 2: Grup WhatsApp Kelas',
    description: 'Di grup percakapan kelas, ada siswa yang mengirim gambar editan wajah Siska bernada mengolok-olok.',
    character: 'Siska (Teman Sekelas)',
    situation: 'Pesan bernada ejekan dikirim di grup percakapan kelas.',
    choices: [
      {
        id: 'g2-c1',
        text: 'Mengirim pesan tegas di grup: "Teman-teman, mari kita stop menyebarkan gambar ejekan dan hargai perasaan sesama."',
        isUpstander: true,
        feedback: 'Luar Biasa! Sikap tegas dan santun ini mengingatkan seluruh anggota grup.',
        points: 100
      },
      {
        id: 'g2-c2',
        text: 'Ikut-ikutan mengirimkan tanggapan tertawa.',
        isUpstander: false,
        feedback: 'Tindakan ini memperkuat perundungan siber. Selalu posisikan dirimu pada kondisi korban.',
        points: 0
      },
      {
        id: 'g2-c3',
        text: 'Mengirim pesan pribadi kepada Siska untuk memberikan semangat dan dukungan.',
        isUpstander: true,
        feedback: 'Sikap empati yang sangat bernilai. Siska merasa dihargai dan didukung.',
        points: 85
      }
    ]
  }
];

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: 'rep-101',
    ticketNumber: 'NBS-2026-0042',
    incidentType: 'Verbal',
    triagePriority: 'Tinggi',
    dateOccurred: '2026-07-23',
    location: 'Area Lapangan Basket Sekolah',
    description: 'Ejekan berulang mengenai fisik dan ancaman verbal saat jam istirahat kedua.',
    isAnonymous: true,
    reporterClass: 'Kelas 8B',
    status: 'Dalam Penanganan',
    createdAt: '23 Juli 2026, 14:20 WIB',
    responseNote: 'Laporan diverifikasi oleh Ibu Fitri, M.Pd. Tim Konselor telah menjadwalkan konseling individu dan mediasi terpandu.',
    assignedTeacher: 'Ibu Fitri Handayani, M.Pd',
    currentStage: 'investigation',
    stages: [
      { stage: 'reported', label: 'Laporan Diterima', completedAt: '23 Juli 2026', dueDays: 0, assignedTo: 'Sistem NABIS', notes: 'Laporan berhasil dikirim dan tercatat dalam sistem.' },
      { stage: 'observation', label: 'Observasi Agen Perubahan Roots', completedAt: '24 Juli 2026', dueDays: 2, assignedTo: 'Agen Perubahan Roots', notes: 'Observasi lingkungan telah dilakukan.' },
      { stage: 'assessment', label: 'Assessment Guru BK', completedAt: '25 Juli 2026', dueDays: 3, assignedTo: 'Ibu Fitri Handayani, M.Pd', notes: 'Asesmen oleh Guru BK telah selesai dilaksanakan.' },
      { stage: 'investigation', label: 'Investigasi TPPK Sekolah', dueDays: 14, assignedTo: 'TPPK Sekolah', notes: 'Investigasi oleh TPPK Sekolah sedang berlangsung.' }
    ],
    deadline: '22 Agustus 2026'
  },
  {
    id: 'rep-102',
    ticketNumber: 'NBS-2026-0045',
    incidentType: 'Fisik',
    triagePriority: 'Tinggi',
    dateOccurred: '2026-07-24',
    location: 'Samping Koridor Laboratorium',
    description: 'Siswa kelas 7 didorong hingga bukunya terjatuh secara sengaja oleh sekelompok siswa.',
    isAnonymous: false,
    reporterName: 'Andi Pratama',
    reporterClass: 'Kelas 7C',
    status: 'Diverifikasi Konselor',
    createdAt: '24 Juli 2026, 09:15 WIB',
    responseNote: 'Saksi dan laporan sudah dicatat. Panggilan Wali Kelas sedang diproses.',
    assignedTeacher: 'Bapak Drs. Sugeng Santoso',
    currentStage: 'assessment',
    stages: [
      { stage: 'reported', label: 'Laporan Diterima', completedAt: '24 Juli 2026', dueDays: 0, assignedTo: 'Sistem NABIS', notes: 'Laporan berhasil dikirim dan tercatat dalam sistem.' },
      { stage: 'observation', label: 'Observasi Agen Perubahan Roots', completedAt: '25 Juli 2026', dueDays: 2, assignedTo: 'Agen Perubahan Roots', notes: 'Observasi lingkungan telah dilakukan.' },
      { stage: 'assessment', label: 'Assessment Guru BK', dueDays: 3, assignedTo: 'Bapak Drs. Sugeng Santoso', notes: 'Proses asesmen oleh Guru BK sedang berlangsung.' }
    ],
    deadline: '23 Agustus 2026'
  },
  {
    id: 'rep-100',
    ticketNumber: 'NBS-2026-0018',
    incidentType: 'Cyberbullying',
    triagePriority: 'Sedang',
    dateOccurred: '2026-07-15',
    location: 'Grup Chat Angkatan',
    description: 'Penyebaran komentar rumor kurang menyenangkan di grup chat.',
    isAnonymous: false,
    reporterName: 'Siti Rahmawati',
    reporterClass: 'Kelas 9A',
    status: 'Selesai Dampak Positif',
    createdAt: '15 Juli 2026, 19:00 WIB',
    responseNote: 'Kasus diselesaikan secara kekeluargaan. Pelaku telah meminta maaf dan menandatangani komitmen anti-bullying.',
    assignedTeacher: 'Ibu Fitri Handayani, M.Pd',
    currentStage: 'reported',
    stages: [
      { stage: 'reported', label: 'Laporan Diterima', completedAt: '15 Juli 2026', dueDays: 0, assignedTo: 'Sistem NABIS', notes: 'Laporan berhasil dikirim dan tercatat dalam sistem.' }
    ],
    deadline: '14 Agustus 2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Pengingat N-Mood',
    message: 'Bagaimana perasaanmu hari ini? Ambil waktu 10 detik untuk melakukan refleksi harian di NABIS.',
    time: '08:00 WIB Hari ini',
    type: 'reminder',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Pembaruan Status Laporan',
    message: 'Tiket NBS-2026-0042 dalam status Dalam Penanganan oleh Ibu Fitri, M.Pd (Konselor BK).',
    time: 'Kemarin, 14:30 WIB',
    type: 'report_update',
    read: true
  },
  {
    id: 'notif-3',
    title: 'Lencana Pemahaman Anti-Bullying',
    message: 'Selamat! Kamu telah menyelesaikan Edukasi Kuis Mitos vs Fakta.',
    time: '2 Hari lalu',
    type: 'badge',
    read: true
  }
];

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  time: '08:00',
  days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
  sound: true,
  motivationalQuote: true,
  lastTriggered: '24 Juli 2026'
};

export const DEMO_SCHOOL_STATS: SchoolBullyingStat[] = [
  { schoolName: 'SMA Milbos Bogor', province: 'Jawa Barat', totalCases: 12, activeCases: 3, resolvedCases: 9, avgResolutionDays: 18 },
  { schoolName: 'SMA Negeri 1 Jakarta', province: 'DKI Jakarta', totalCases: 8, activeCases: 2, resolvedCases: 6, avgResolutionDays: 22 },
  { schoolName: 'SMA Negeri 2 Bandung', province: 'Jawa Barat', totalCases: 15, activeCases: 5, resolvedCases: 10, avgResolutionDays: 25 },
  { schoolName: 'SMA Negeri 5 Surabaya', province: 'Jawa Timur', totalCases: 20, activeCases: 7, resolvedCases: 13, avgResolutionDays: 20 },
  { schoolName: 'SMA Negeri 3 Medan', province: 'Sumatera Utara', totalCases: 10, activeCases: 4, resolvedCases: 6, avgResolutionDays: 28 },
  { schoolName: 'SMA Negeri 1 Makassar', province: 'Sulawesi Selatan', totalCases: 6, activeCases: 1, resolvedCases: 5, avgResolutionDays: 15 },
  { schoolName: 'SMA Negeri 4 Semarang', province: 'Jawa Tengah', totalCases: 14, activeCases: 6, resolvedCases: 8, avgResolutionDays: 24 },
  { schoolName: 'SMA Negeri 8 Denpasar', province: 'Bali', totalCases: 5, activeCases: 1, resolvedCases: 4, avgResolutionDays: 16 },
  { schoolName: 'SMA Negeri 1 Yogyakarta', province: 'DI Yogyakarta', totalCases: 7, activeCases: 2, resolvedCases: 5, avgResolutionDays: 19 },
  { schoolName: 'SMA Negeri 2 Palembang', province: 'Sumatera Selatan', totalCases: 9, activeCases: 3, resolvedCases: 6, avgResolutionDays: 26 },
];

export const DEMO_PROVINCE_STATS = [
  { province: 'Jawa Barat', totalCases: 27, activeCases: 8, resolvedCases: 19, avgResolutionDays: 22 },
  { province: 'Jawa Timur', totalCases: 20, activeCases: 7, resolvedCases: 13, avgResolutionDays: 20 },
  { province: 'DKI Jakarta', totalCases: 8, activeCases: 2, resolvedCases: 6, avgResolutionDays: 22 },
  { province: 'Jawa Tengah', totalCases: 14, activeCases: 6, resolvedCases: 8, avgResolutionDays: 24 },
  { province: 'Sumatera Utara', totalCases: 10, activeCases: 4, resolvedCases: 6, avgResolutionDays: 28 },
  { province: 'Sulawesi Selatan', totalCases: 6, activeCases: 1, resolvedCases: 5, avgResolutionDays: 15 },
  { province: 'Bali', totalCases: 5, activeCases: 1, resolvedCases: 4, avgResolutionDays: 16 },
  { province: 'DI Yogyakarta', totalCases: 7, activeCases: 2, resolvedCases: 5, avgResolutionDays: 19 },
  { province: 'Sumatera Selatan', totalCases: 9, activeCases: 3, resolvedCases: 6, avgResolutionDays: 26 },
];


