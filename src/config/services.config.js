import benefitsAnnexurePdf from '@/assets/Benefits Annexure.pdf'

export const services = [
  // Row 1: N · S · T · A · N
  {
    id: 'team-directory',
    label: 'Team Directory',
    icon: 'TeamDirectoryIcon',
    redirectUrl: '#',
    enabled: true,
  },
  {
    id: 'policies',
    label: 'Policies',
    icon: 'PoliciesIcon',
    redirectUrl: '#',
    enabled: true,
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: 'TravelIcon',
    redirectUrl: 'https://www.makemytrip.com/',
    enabled: true,
  },
  {
    id: 'recognition-gem',
    label: 'Recognition – GEM',
    icon: 'RecognitionGemIcon',
    redirectUrl: 'https://bajajauto.xoxoday.com/home/dashboard',
    enabled: true,
  },
  {
    id: 'compensation',
    label: 'Compensation',
    icon: 'CompensationIcon',
    redirectUrl: 'https://www.allsechro.com/bajajauto/common/Logout.aspx?e=SE',
    enabled: true,
  },

  // Row 2: T · N · A · N · S (Benefits↔Holiday Calendar, Documents↔Idea Hub)
  {
    id: 'leave-attendance',
    label: 'Leave / Attendance',
    icon: 'LeaveAttendanceIcon',
    redirectUrl: 'http://ep6prdn.bajajauto.co.in:50000/irj/portal',
    enabled: true,
  },
  {
    id: 'holiday-calendar',
    label: 'Holiday Calendar',
    icon: 'HolidayCalendarIcon',
    redirectUrl: '#',
    enabled: true,
  },
  {
    id: 'bolt-learning',
    label: 'BOLT – Start Learning',
    icon: 'BoltLearningIcon',
    redirectUrl: 'https://bolt.bajajauto.co.in/#!/',
    enabled: true,
  },
  {
    id: 'health-wellness',
    label: 'Health & Wellness',
    icon: 'HealthWellnessIcon',
    redirectUrl: 'https://www.alyve.health/',
    enabled: true,
  },
  {
    id: 'idea-hub',
    label: 'Idea Hub',
    icon: 'IdeaHubIcon',
    redirectUrl: 'https://idea-hub-huhqh4bndxhxcqbf.canadacentral-01.azurewebsites.net/',
    enabled: true,
  },

  // Row 3: A · T · N · S · N
  {
    id: 'documents',
    label: 'Documents / Forms',
    icon: 'DocumentsIcon',
    redirectUrl: '#',
    enabled: true,
  },
  {
    id: 'benefits',
    label: 'Benefits',
    icon: 'BenefitsIcon',
    redirectUrl: benefitsAnnexurePdf,
    enabled: true,
  },
  {
    id: 'mediclaim',
    label: 'Mediclaim Card',
    icon: 'MediclaimIcon',
    redirectUrl: '#',
    enabled: true,
  },
  {
    id: 'it-summit',
    label: 'IT Summit',
    icon: 'ItSummitIcon',
    redirectUrl: '#',
    enabled: true,
  },
]
