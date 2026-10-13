/*
 * Builds an Outlook on the web "new event" link for a calendar item, so "Add
 * to calendar" drops it straight into the employee's own Outlook.
 *
 * Calendar items carry their time as display text ("4:00 pm - 5:00 pm"). The
 * first two clock times in it become the start and end; when there are none —
 * a holiday — the event is all-day.
 */
const OUTLOOK_COMPOSE = 'https://outlook.office.com/calendar/0/deeplink/compose'

function to24h(match) {
  let hour = Number(match[1]) % 12
  if (match[3].toLowerCase() === 'pm') hour += 12
  return `${String(hour).padStart(2, '0')}:${match[2]}:00`
}

export function outlookEventLink({ label, date, time = '', location = '' }) {
  const params = new URLSearchParams({ path: '/calendar/action/compose', subject: label })
  if (location) params.set('location', location)

  const times = [...time.matchAll(/(\d{1,2}):(\d{2})\s*(am|pm)/gi)]
  if (times.length > 0) {
    params.set('startdt', `${date}T${to24h(times[0])}`)
    if (times[1]) params.set('enddt', `${date}T${to24h(times[1])}`)
  } else {
    params.set('startdt', date)
    params.set('allday', 'true')
  }

  return `${OUTLOOK_COMPOSE}?${params.toString()}`
}

export function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`
}
