import { useState } from 'react'
import navResources from '@/assets/icons/ocean/nav-resources.webp'
import utsahArt from '@/assets/icons/ocean/utsah.webp'
import crecheArt from '@/assets/icons/ocean/creche.webp'
import deliciaArt from '@/assets/icons/ocean/delicia.webp'
import raiseItArt from '@/assets/icons/ocean/raise-it.webp'
import intercomArt from '@/assets/icons/ocean/intercom.webp'
import gatepassArt from '@/assets/icons/ocean/gatepass.webp'
import { services } from '@/config/services.config'
import Panel from '@/components/shared/Panel'
import PanelTitle from '@/components/shared/PanelTitle'
import VisitorGatepassWizard from './VisitorGatepassWizard'

const itRequestUrl = services.find((s) => s.id === 'it-summit')?.redirectUrl

/*
 * The campus facilities and the two support desks. `href: '#'` marks a
 * destination nobody has given us yet: that item shows but is not a link.
 * The gatepass opens its own wizard rather than a page.
 */
const RESOURCES = [
  { id: 'raise-request', label: 'Raise IT Request', art: raiseItArt, href: itRequestUrl },
  { id: 'intercom', label: 'Intercom Support', art: intercomArt, href: '#' },
  { id: 'visitor-gatepass', label: 'Visitor Gatepass', art: gatepassArt, opensGatepass: true },
  { id: 'utsah', label: 'Utsah', art: utsahArt, href: '#' },
  { id: 'delicia', label: 'Delicia', art: deliciaArt, href: '#' },
  { id: 'creche', label: 'Crèche', art: crecheArt, href: '#' },
]

const ITEM =
  'group flex w-full flex-col items-center gap-1 rounded-2xl px-1 pb-1 pt-1.5 text-center focus-ring'

function ItemBody({ label, art, linked }) {
  return (
    <>
      <span className="flex h-[48px] items-end justify-center" aria-hidden="true">
        <img
          src={art}
          alt=""
          className="max-h-[48px] max-w-[64px] object-contain transition-transform duration-[250ms] group-hover:-translate-y-1.5"
        />
      </span>
      <span
        className={`text-[12.5px] font-semibold leading-tight text-[#071733] ${linked ? 'group-hover:text-ocean-700' : ''}`}
      >
        {label}
      </span>
    </>
  )
}

export default function ITResources() {
  const [gatepassOpen, setGatepassOpen] = useState(false)

  return (
    <Panel as="section" id="resources" aria-labelledby="resources-heading" className="scroll-mt-20 px-5 py-4 sm:px-6">
      <PanelTitle id="resources-heading" icon={navResources} title="Resources & Support Services" />

      <ul className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {RESOURCES.map(({ id, href, opensGatepass, ...item }) => {
          let content
          if (opensGatepass) {
            content = (
              <button type="button" onClick={() => setGatepassOpen(true)} className={ITEM}>
                <ItemBody {...item} linked />
              </button>
            )
          } else if (href && href !== '#') {
            content = (
              <a href={href} target="_blank" rel="noreferrer" className={ITEM}>
                <ItemBody {...item} linked />
              </a>
            )
          } else {
            content = (
              <div className={ITEM} title="Link coming soon">
                <ItemBody {...item} />
              </div>
            )
          }
          return <li key={id}>{content}</li>
        })}
      </ul>

      <VisitorGatepassWizard isOpen={gatepassOpen} onClose={() => setGatepassOpen(false)} />
    </Panel>
  )
}
