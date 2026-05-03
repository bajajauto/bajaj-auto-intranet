import { Bell, CalendarDays } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { notificationService } from '@/services/notificationService'

function getHeroMoment() {
  const h = new Date().getHours()

  if (h >= 0 && h < 7) {
    return {
      greeting: 'Good night',
      scene: 'cuddle',
      title: 'Cuddling warm and tight',
      description: 'Wrapped close, warm and safe, while the world stays quiet for a little longer.',
    }
  }

  if (h >= 7 && h < 11) {
    return {
      greeting: 'Good morning',
      scene: 'morning-hug',
      title: 'Morning hug',
      description: 'A soft morning hug before the day begins.',
    }
  }

  if (h >= 11 && h < 14) {
    return {
      greeting: 'Good afternoon',
      scene: 'hand-hug',
      title: 'A quick hand-hold hug',
      description: 'Just a small pause in the day, holding hands before you get back to everything.',
    }
  }

  if (h >= 14 && h < 19) {
    return {
      greeting: 'Good evening',
      scene: 'shoulder-talk',
      title: 'Holding hands and talking',
      description: "What are you doing here without talking to your husband, who's always thinking about you?",
    }
  }

  if (h >= 19) {
    return {
      greeting: 'Good evening',
      scene: 'twirl',
      title: 'Hug, lift, and twirl',
      description: 'The evening hug that turns into a little lift and a happy twirl.',
    }
  }

  return {
    greeting: 'Good morning',
    scene: 'morning-hug',
    title: 'Morning hug',
    description: 'A soft morning hug before the day begins.',
  }
}

function AffectionScene({ scene }) {
  return (
    <div className={`affection-scene affection-scene-${scene}`} aria-hidden="true">
      <div className="affection-heart affection-heart-one" />
      <div className="affection-heart affection-heart-two" />

      <div className="affection-person affection-person-left">
        <span className="affection-head" />
        <span className="affection-body" />
        <span className="affection-arm affection-arm-left" />
      </div>

      <div className="affection-person affection-person-right">
        <span className="affection-head" />
        <span className="affection-body" />
        <span className="affection-arm affection-arm-right" />
      </div>

      <span className="affection-hands" />
      <span className="affection-shoulder" />
      <span className="affection-speech affection-speech-one" />
      <span className="affection-speech affection-speech-two" />
    </div>
  )
}

export default function HeroBanner() {
  const user = useUser()
  const moment = getHeroMoment()
  const unreadCount = notificationService.getAll().length
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand-primary to-violet-700 p-6 text-white animate-fade-up md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/10 blur-2xl" />
      <AffectionScene scene={moment.scene} />

      <div className="relative z-10 max-w-xl">
        <p className="mb-1 text-sm font-medium tracking-wide text-white/60">{moment.greeting}</p>
        <h1 className="mb-1 font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
          {user.name}
        </h1>
        <p className="text-sm font-medium text-white/55">
          {user.designation} &middot; {user.department}
        </p>

        <div className="mt-5 max-w-md rounded-card border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">{moment.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/65">{moment.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
            <Bell size={12} className="text-amber-300" />
            <span className="text-amber-200">{unreadCount} new</span>
            <span className="text-white/50">notifications</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
            <CalendarDays size={12} />
            {today}
          </div>
        </div>
      </div>
    </div>
  )
}
