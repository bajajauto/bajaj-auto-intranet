const IMPACT = {
  livesTouched: '2.4M',
  villagesReached: 480,
  volunteerHours: '38,200',
  activeProjects: 18,
  fiscalYear: 'FY26',
}

const PROGRAMS = [
  {
    id: 'skill-development',
    title: 'Skill Development',
    icon: 'GraduationCap',
    summary:
      'Bajaj Skill Development Centres train rural youth in industry-ready trades — automotive, electrical, IT, and hospitality.',
    stat: '11,400 trained',
    statLabel: 'in FY26',
    accent: 'from-amber-400 to-orange-500',
  },
  {
    id: 'education',
    title: 'Education',
    icon: 'BookOpen',
    summary:
      'Adopted-school programmes upgrade infrastructure, teacher training and digital classrooms across rural Maharashtra & Uttarakhand.',
    stat: '142 schools',
    statLabel: 'adopted',
    accent: 'from-sky-400 to-blue-600',
  },
  {
    id: 'health',
    title: 'Health Initiatives',
    icon: 'HeartPulse',
    summary:
      'Mobile health units, blood donation drives, and community clinics serving villages around our plant locations.',
    stat: '186K patients',
    statLabel: 'treated FY26',
    accent: 'from-rose-400 to-red-600',
  },
  {
    id: 'livelihoods',
    title: 'Community Livelihoods',
    icon: 'HeartHandshake',
    summary:
      'The Sakhi project supports women Self-Help Groups with microfinance, market linkages and entrepreneurship training.',
    stat: '4,200 women',
    statLabel: 'enrolled',
    accent: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'environment',
    title: 'Environment',
    icon: 'Lightbulb',
    summary:
      'Tree plantation drives, watershed development and water conservation projects across drought-prone districts.',
    stat: '6.1L trees',
    statLabel: 'planted',
    accent: 'from-lime-400 to-green-600',
  },
  {
    id: 'disaster-response',
    title: 'Disaster Response',
    icon: 'LifeBuoy',
    summary:
      'Rapid relief and rebuilding support during floods, cyclones and other natural disasters in BAF presence areas.',
    stat: '14K families',
    statLabel: 'supported',
    accent: 'from-violet-400 to-purple-600',
  },
]

const OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Tree plantation drive · Akurdi',
    date: '2026-06-07',
    timeRange: '7:00 AM – 11:00 AM',
    location: 'Akurdi plant campus, Pune',
    role: 'Planting volunteer',
    slotsTotal: 60,
    slotsTaken: 42,
    coverGradient: 'linear-gradient(135deg, #34d399 0%, #059669 50%, #064e3b 100%)',
    summary:
      'Help us plant 1,200 saplings around the Akurdi campus as part of the FY26 monsoon greening drive.',
  },
  {
    id: 'opp-2',
    title: 'Reading program · Adopted School',
    date: '2026-06-10',
    timeRange: '2:00 PM – 4:00 PM',
    location: 'Zilla Parishad School, Waluj',
    role: 'Reading mentor',
    slotsTotal: 20,
    slotsTaken: 8,
    coverGradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 50%, #0c4a6e 100%)',
    summary:
      'Spend an afternoon reading with Class 4 students at our Waluj adopted school. Books supplied; just bring your enthusiasm.',
  },
  {
    id: 'opp-3',
    title: 'Blood donation camp · Chakan',
    date: '2026-06-14',
    timeRange: '9:00 AM – 4:00 PM',
    location: 'Chakan plant medical centre',
    role: 'Donor / coordination',
    slotsTotal: 120,
    slotsTaken: 71,
    coverGradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 50%, #7f1d1d 100%)',
    summary:
      'Annual blood donation drive in partnership with Jankalyan Blood Bank. Walk-ins welcome; pre-registration appreciated.',
  },
  {
    id: 'opp-4',
    title: 'Skill mentoring · BSDC Pantnagar',
    date: '2026-06-21',
    timeRange: '10:00 AM – 1:00 PM',
    location: 'Bajaj Skill Development Centre, Pantnagar',
    role: 'Industry mentor',
    slotsTotal: 15,
    slotsTaken: 9,
    coverGradient: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 50%, #7c2d12 100%)',
    summary:
      'Share your trade expertise with the next batch of BSDC trainees. Open to engineers, supervisors, and shopfloor leaders.',
  },
]

const STORIES = [
  {
    id: 'story-1',
    headline: 'How Sakhi project lifted 2,000 women out of poverty',
    excerpt:
      'A look at the SHG model that turned home-based artisans in Aurangabad into self-sustaining micro-entrepreneurs.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
    publishedOn: '2026-05-22',
    program: 'livelihoods',
  },
  {
    id: 'story-2',
    headline: 'From village to corporate engineer — a BSDC story',
    excerpt:
      'Ravi Patil joined our Aurangabad BSDC in 2023. Today he runs a CNC line at a Tier-1 supplier.',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    publishedOn: '2026-04-30',
    program: 'skill-development',
  },
  {
    id: 'story-3',
    headline: 'Flood relief in Maharashtra — 14,000 families supported',
    excerpt:
      'BAF teams deployed within 48 hours of the Kolhapur floods, distributing kits, medicines and rebuilding materials.',
    image:
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80',
    publishedOn: '2026-03-14',
    program: 'disaster-response',
  },
  {
    id: 'story-4',
    headline: 'Mobile health unit completes 10,000th visit',
    excerpt:
      'The Chakan-based mobile clinic crossed a major milestone serving villages in the surrounding 40 km radius.',
    image:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80',
    publishedOn: '2026-02-19',
    program: 'health',
  },
]

const USER_CSR_STATS = {
  hoursFiscalYear: 12,
  fiscalYear: 'FY26',
  lastVolunteeredOn: '2026-04-12',
  lastEventTitle: 'Akurdi campus cleanup drive',
  upcomingSignups: [],
}

export const csrMock = {
  getImpact() {
    return IMPACT
  },
  getPrograms() {
    return PROGRAMS
  },
  getOpportunities() {
    return OPPORTUNITIES
  },
  getOpportunityById(id) {
    return OPPORTUNITIES.find((opp) => opp.id === id) ?? null
  },
  getStories() {
    return STORIES
  },
  getUserStats() {
    return USER_CSR_STATS
  },
}
