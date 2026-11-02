import { useUser } from '@/context/UserContext'

function greetingFor(date) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// The page opens on one line, the user's name, and goes straight into Pitstop.
export default function Greeting() {
  const user = useUser()
  const firstName = user.name.split(/\s+/)[0]

  return (
    <section id="top" aria-label="Greeting" className="scroll-mt-20 px-1">
      <h1 className="text-[22px] font-bold tracking-[-0.02em] text-[#00151a]">
        {greetingFor(new Date())}, {firstName}
      </h1>
    </section>
  )
}
