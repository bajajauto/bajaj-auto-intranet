import { services } from '@/config/services.config'
import navPitstop from '@/assets/icons/ocean/nav-pitstop.webp'
import Panel from '@/components/shared/Panel'
import PanelTitle from '@/components/shared/PanelTitle'
import ServiceTile from './ServiceTile'

/*
 * All fifteen services in three rows of five, most-used first. A disabled
 * service simply drops out.
 */
const ORDER = [
  'team-directory',
  'leave-attendance',
  'holiday-calendar',
  'travel',
  'policies',
  'compensation',
  'benefits',
  'documents',
  'mediclaim',
  'health-wellness',
  'recognition-gem',
  'idea-hub',
  'bolt-learning',
  'performance-management',
  'it-summit',
]

const shown = ORDER.map((id) => services.find((service) => service.id === id && service.enabled)).filter(Boolean)

export default function ServiceGrid() {
  return (
    <Panel as="section" id="pitstop" aria-labelledby="pitstop-heading" className="scroll-mt-20 px-5 py-4 sm:px-6">
      <PanelTitle id="pitstop-heading" icon={navPitstop} title="Pitstop" />
      <ul className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3 md:grid-cols-5">
        {shown.map((service) => (
          <li key={service.id}>
            <ServiceTile {...service} />
          </li>
        ))}
      </ul>
    </Panel>
  )
}
