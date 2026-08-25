// Benefits & policy buckets shown in the Policies modal (Self-Service / pitstop).
// Source: ref/Copy of Benefits Buckets.xlsx — hierarchy is Bucket → Category → Benefits.
// `icon` keys map to src/components/shared/iconMap.js. Data only, no React.

export const benefitBuckets = [
  {
    id: 'pay-compensation-finance',
    title: 'Pay, Compensation & Finance',
    icon: 'IndianRupee',
    gradient: 'from-[#1248A2] to-[#0C2E6A]',
    categories: [
      {
        name: 'Salary & Allowances',
        items: ['Vehicle fuel', 'Transport', 'Accommodation'],
      },
      {
        name: 'Savings & Retirement',
        items: [
          'Superannuation',
          'NPS',
          'PF',
          'PF Advance',
          'Retirement benefits',
          'Post-retirement support',
        ],
      },
      {
        name: 'Financial Wellbeing',
        items: ['Financial planning'],
      },
      {
        name: 'Others',
        items: ['Car Lease'],
      },
    ],
  },
  {
    id: 'health-insurance-safety',
    title: 'Health, Insurance & Safety',
    icon: 'HeartPulse',
    gradient: 'from-[#1665C0] to-[#0E3E88]',
    categories: [
      {
        name: 'Medical Coverage',
        items: ['CHBS', 'Top-up'],
      },
      {
        name: 'Insurance',
        items: [
          'GPA',
          'Life insurance',
          'Rider insurance',
          'Trainees insurance',
          'Parental insurance',
        ],
      },
      {
        name: 'Preventive Care',
        items: ['Annual health checkup'],
      },
      {
        name: 'Health Support Programs',
        items: ['HIV support'],
      },
    ],
  },
  {
    id: 'family-parenting-life-events',
    title: 'Family, Parenting & Life Events',
    icon: 'HeartHandshake',
    gradient: 'from-[#1A56A8] to-[#133E82]',
    categories: [
      {
        name: 'Parental Support',
        items: ['Parental benefits'],
      },
      {
        name: 'Childcare',
        items: ['Crèche / day care'],
      },
      {
        name: 'Family Support',
        items: ['Children & family member benefits', 'Career of children'],
      },
    ],
  },
  {
    id: 'leave-travel-flexibility',
    title: 'Leave, Travel & Work Flexibility',
    icon: 'Plane',
    gradient: 'from-[#0D7E98] to-[#09576C]',
    categories: [
      {
        name: 'Leave & Time Off',
        items: ['Leave & attendance', 'WFH'],
      },
      {
        name: 'Extended Leave',
        items: ['Sabbatical'],
      },
      {
        name: 'Mobility & Transfers',
        items: ['Transfer Assistance Policy', 'Expat separation'],
      },
      {
        name: 'Travel Benefits',
        items: ['Domestic travel', 'Foreign travel'],
      },
      {
        name: 'Work Flexibility',
        items: ['Flexiwork', '5-day work week'],
      },
      {
        name: 'Leisure & Vacation',
        items: ['Holidays club'],
      },
      {
        name: 'Parental Support',
        items: ['Maternity leave', 'Paternity leave'],
      },
      {
        name: 'Life Events',
        items: ['Compassionate leave'],
      },
      {
        name: 'Travel Claims',
        items: [
          'MakemyTrip User Guides',
          'FAQs',
          'Process Flow MyClaims',
          'Process Flow MyBiz',
          'User Guide for Approvals',
          'Bajaj Auto Signup',
        ],
      },
      {
        name: 'Reimbursement for transfer and new joiners',
        items: ['Reimbursement Process'],
      },
    ],
  },
  {
    id: 'vehicle-mobility',
    title: 'Vehicle & Mobility',
    icon: 'Car',
    gradient: 'from-[#0F6E5C] to-[#08453A]',
    categories: [
      {
        name: 'Vehicle & Asset Benefits',
        items: [
          'Company car lease',
          'Fuel & maintenance (Pluxee)',
          'Bajaj vehicle purchase benefit',
        ],
      },
    ],
  },
  {
    id: 'wellness-lifestyle',
    title: 'Wellness & Lifestyle',
    icon: 'Heart',
    gradient: 'from-[#0A8FA8] to-[#076878]',
    categories: [
      {
        name: 'Physical & Mental Wellness',
        items: ['Gym', 'Yoga', 'Prana'],
      },
      {
        name: 'Sports & Fitness',
        items: ['Sports'],
      },
      {
        name: 'Social & Hobby',
        items: ['Hobby clubs', 'Club'],
      },
      {
        name: 'Other Resources',
        items: ['Library'],
      },
    ],
  },
  {
    id: 'rewards-recognition-perks',
    title: 'Rewards, Recognition & Perks',
    icon: 'Award',
    gradient: 'from-[#BF7C08] to-[#7A4D02]',
    categories: [
      {
        name: 'Recognition Programs',
        items: ['GEM', 'Silver jubilee', 'Retirement function'],
      },
      {
        name: 'Office Facilities',
        items: ['Corporate discount offers / Vehicle Policy'],
      },
    ],
  },
  {
    id: 'workplace-essentials',
    title: 'Workplace Essentials',
    icon: 'Briefcase',
    gradient: 'from-[#3B4E6A] to-[#1C2D42]',
    categories: [
      {
        name: 'Work Resources',
        items: ['Mobile', 'Uniform'],
      },
      {
        name: 'Office Facilities',
        items: ['Canteen'],
      },
    ],
  },
  {
    id: 'workplace-governance-compliance',
    title: 'Workplace Governance & Compliance',
    icon: 'Shield',
    gradient: 'from-[#334460] to-[#192838]',
    categories: [
      {
        name: 'Workplace Conduct & Ethics',
        items: ['Code of Conduct (COC)', 'Human rights', 'Standing orders'],
      },
      {
        name: 'Workplace Safety',
        items: ['POSH'],
      },
      {
        name: 'Governance',
        items: ['Whistleblower policy'],
      },
      {
        name: 'Diversity & Inclusion',
        items: ['Transgender policy', 'Policies for differently abled', 'Equal opportunity'],
      },
      {
        name: 'Employment Rules',
        items: ['Notice period policy'],
      },
    ],
  },
  {
    id: 'career-growth-development',
    title: 'Career Growth & Development',
    icon: 'GraduationCap',
    gradient: 'from-[#B07008] to-[#6E4302]',
    categories: [
      {
        name: 'Learning & Development',
        items: ['LEAP'],
      },
      {
        name: 'Internal Transfer',
        items: ['IJP'],
      },
    ],
  },
  {
    id: 'management-information-systems',
    title: 'Management Information Systems (MIS)',
    icon: 'Monitor',
    gradient: 'from-[#1B5DB8] to-[#0E3368]',
    categories: [
      {
        name: 'MIS',
        items: [
          'Email policy',
          'Internet policy',
          'O365 policy',
          'Password policy',
          'Data protection',
          'Data processing agreement',
          'Antivirus',
          'Physical security',
          'Mass mailing',
        ],
      },
    ],
  },
]
