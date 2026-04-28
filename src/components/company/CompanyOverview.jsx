import { useState } from 'react'
import BusinessUnitCard from './BusinessUnitCard'

const BUS = [
  {
    id: 'motorcycle',
    name: 'Motorcycle Business Unit',
    leader: 'BU Leader Name',
    description:
      'The Motorcycle BU drives Bajaj Auto\'s largest revenue segment, spanning domestic and international markets with a portfolio of iconic brands.',
    teams: ['R&D', 'Sales', 'Marketing & Comms', 'Public Policy', 'Supply Chain'],
    products: ['Pulsar', 'Avenger', 'Dominar', 'CT Series', 'Platina'],
  },
  {
    id: 'commercial-vehicle',
    name: 'Commercial Vehicle Business Unit',
    leader: 'BU Leader Name',
    description:
      'The Commercial Vehicle BU leads Bajaj Auto\'s three-wheeler and commercial mobility segment across India and global export markets.',
    teams: ['Engineering', 'Sales & Distribution', 'After-Sales', 'Finance', 'Operations'],
    products: ['RE Auto', 'Maxima', 'Compact 4W', 'Qute'],
  },
  {
    id: 'electric-vehicle',
    name: 'Electric Vehicle Business Unit',
    leader: 'BU Leader Name',
    description:
      'The EV BU spearheads Bajaj Auto\'s transition to sustainable mobility, leading the Chetak EV platform and developing future electric products.',
    teams: ['EV R&D', 'Battery Technology', 'Software', 'Sales', 'Charging Infrastructure'],
    products: ['Chetak', 'Upcoming EV Platforms'],
  },
]

export default function CompanyOverview() {
  const [openId, setOpenId] = useState(BUS[0].id)

  return (
    <div className="space-y-3">
      {BUS.map((bu) => (
        <BusinessUnitCard
          key={bu.id}
          bu={bu}
          isOpen={openId === bu.id}
          onToggle={() => setOpenId(openId === bu.id ? null : bu.id)}
        />
      ))}
    </div>
  )
}
