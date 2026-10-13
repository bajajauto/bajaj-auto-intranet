export const emergencyContacts = [
  {
    id: 'fire',
    label: 'Fire',
    phone: 'XXXX-XXXXXX',
    icon: 'Flame',
    tone: 'red',
  },
  {
    id: 'dispensary',
    label: 'Dispensary & Medical',
    phone: 'XXXX-XXXXXX',
    icon: 'Stethoscope',
    tone: 'green',
  },
  {
    id: 'security',
    label: 'Security Control',
    phone: 'XXXX-XXXXXX',
    icon: 'Shield',
    tone: 'blue',
  },
  {
    id: 'hr-helpline',
    label: 'Support Services',
    phone: 'XXXX-XXXXXX',
    icon: 'HeadphonesIcon',
    tone: 'amber',
  },
]

// The two help routes that are not phone numbers. `href: '#'` until the
// destinations are confirmed; the card says so rather than linking nowhere.
export const helpLinks = [
  {
    id: 'ethics',
    eyebrow: 'INTEGRITY MATTERS',
    label: 'Ethics Helpline',
    description: 'Raise a concern confidentially.',
    href: '#',
    featured: true,
  },
  {
    id: 'posh',
    eyebrow: 'A SAFE WORKPLACE',
    label: 'POSH Information',
    description: 'Policy, committee and how to report.',
    href: '#',
  },
]
