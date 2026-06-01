const VOLUMES = [
  {
    id: 'vol-7',
    label: 'Volume 7',
    month: 'May 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol7-brochure',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 30%, #ec4899 62%, #4c1d95 100%)',
    accent: 'rgba(244, 114, 182, 0.28)',
  },
  {
    id: 'vol-6',
    label: 'Volume 6',
    month: 'April 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #115e59 48%, #0f172a 100%)',
    accent: 'rgba(245, 158, 11, 0.28)',
  },
  {
    id: 'vol-5',
    label: 'Volume 5',
    month: 'March 2026',
    href: 'https://ting-brochures.netlify.app/bajaj-bytes-vol6-brochure',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1f0b37 100%)',
    accent: 'rgba(251, 113, 133, 0.28)',
  },
]

export const bajajBytesMock = {
  getAll() {
    return VOLUMES
  },
  getById(id) {
    return VOLUMES.find((v) => v.id === id) ?? null
  },
}
