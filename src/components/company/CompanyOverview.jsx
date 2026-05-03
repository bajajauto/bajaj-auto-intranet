import { useState } from 'react'
import SubsidiaryCard from './SubsidiaryCard'
import SubsidiaryDetailModal from './SubsidiaryDetailModal'

const SUBSIDIARIES = [
  {
    id: 'bal',
    code: 'BAL',
    fullName: 'Bajaj Auto Limited',
    employees: 24500,
    founded: '1945',
    description:
      'Bajaj Auto Limited is the core operating company and the heart of the group. BAL manufactures and sells two-wheelers, three-wheelers, and four-wheelers across India and global markets, serving millions of customers with iconic brands.',
    segments: [
      {
        id: 'motorcycle',
        name: 'Motorcycle Division',
        icon: '🏍️',
        focus: 'Domestic and international markets',
        highlights: ['Pulsar', 'Avenger', 'Dominar', 'Platina'],
      },
      {
        id: 'commercial-vehicle',
        name: 'Commercial Vehicle Division',
        icon: '🚙',
        focus: 'Three-wheelers and commercial mobility',
        highlights: ['RE Auto', 'Maxima', 'Qute'],
      },
      {
        id: 'electric-vehicle',
        name: 'Electric Vehicle Division',
        icon: '⚡',
        focus: 'Sustainable mobility solutions',
        highlights: ['Chetak', 'EV Future', 'Battery Tech'],
      },
      {
        id: 'finance-leasing',
        name: 'Finance & Leasing Division',
        icon: '💳',
        focus: 'Financing solutions for customers',
        highlights: ['Auto Finance', 'Leasing', 'Credit'],
      },
    ],
    keyFocus: [
      'Market leadership in two-wheelers and commercial vehicles',
      'Transition to electric and sustainable mobility',
      'Global expansion and export growth',
      'Customer-centric innovation and product development',
    ],
  },
  {
    id: 'bacl',
    code: 'BACL',
    fullName: 'Bajaj Auto Credit Limited',
    employees: 2800,
    founded: '1987',
    description:
      'Bajaj Auto Credit Limited provides specialized financial services and credit solutions. BACL facilitates vehicle purchases and enables financial access for Bajaj customers, supporting rapid growth and customer satisfaction.',
    segments: [
      {
        id: 'auto-finance',
        name: 'Auto Finance',
        icon: '💰',
        focus: 'Vehicle purchase financing',
        highlights: ['Retail Finance', 'Fleet Finance', 'Quick Processing'],
      },
      {
        id: 'credit-products',
        name: 'Credit Products',
        icon: '📊',
        focus: 'Diverse credit solutions',
        highlights: ['Personal Loans', 'Business Credit', 'Flexible Terms'],
      },
      {
        id: 'digital-banking',
        name: 'Digital Solutions',
        icon: '📱',
        focus: 'Online and mobile banking',
        highlights: ['Mobile App', 'Digital Processing', 'E-Services'],
      },
      {
        id: 'risk-management',
        name: 'Risk & Collections',
        icon: '🛡️',
        focus: 'Credit risk management',
        highlights: ['Portfolio Management', 'Analytics', 'Compliance'],
      },
    ],
    keyFocus: [
      'Increase credit penetration across customer base',
      'Digital-first financial services delivery',
      'Competitive and transparent pricing',
      'Strong risk management and compliance',
    ],
  },
  {
    id: 'batl',
    code: 'BATL',
    fullName: 'Bajaj Auto Technology Limited',
    employees: 1200,
    founded: '2015',
    description:
      'Bajaj Auto Technology Limited drives digital transformation and technology innovation for the Bajaj Group. BATL develops cutting-edge software, IoT solutions, and digital platforms for the automotive and financial services sectors.',
    segments: [
      {
        id: 'software-development',
        name: 'Software Development',
        icon: '💻',
        focus: 'Enterprise and consumer applications',
        highlights: ['Cloud Solutions', 'Mobile Apps', 'Web Platforms'],
      },
      {
        id: 'iot-analytics',
        name: 'IoT & Analytics',
        icon: '📡',
        focus: 'Connected vehicles and data insights',
        highlights: ['Vehicle Analytics', 'Telematics', 'Big Data'],
      },
      {
        id: 'digital-platforms',
        name: 'Digital Platforms',
        icon: '🌐',
        focus: 'E-commerce and customer engagement',
        highlights: ['E-Commerce', 'CRM', 'Digital Marketing'],
      },
      {
        id: 'emerging-tech',
        name: 'Emerging Technologies',
        icon: '🚀',
        focus: 'AI, ML, and blockchain',
        highlights: ['AI/ML', 'Blockchain', 'AR/VR'],
      },
    ],
    keyFocus: [
      'Drive digital transformation across the group',
      'Develop innovative technology solutions',
      'Build scalable cloud-based platforms',
      'Foster innovation culture and tech talent',
    ],
  },
]

export default function CompanyOverview() {
  const [selectedSubsidiary, setSelectedSubsidiary] = useState(null)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Section Header */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Bajaj Group Structure</h2>
        <p className="text-text-secondary text-sm">
          Hover over a subsidiary to explore. Click any card to dive deeper into its business segments.
        </p>
      </div>

      {/* Subsidiaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
        {SUBSIDIARIES.map((subsidiary, idx) => (
          <div key={subsidiary.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${150 + idx * 100}ms` }}>
            <SubsidiaryCard
              subsidiary={subsidiary}
              onClick={() => setSelectedSubsidiary(subsidiary)}
            />
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      {selectedSubsidiary && (
        <SubsidiaryDetailModal subsidiary={selectedSubsidiary} onClose={() => setSelectedSubsidiary(null)} />
      )}
    </div>
  )
}
