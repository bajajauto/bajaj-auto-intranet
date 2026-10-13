/*
 * Jarvis lives in FloatingSupportButton, but more than one place offers to
 * open it — the hero's "Ask Jarvis" link among them. Rather than lift its whole
 * chat state into context, those callers fire this event and the button
 * listens for it.
 */
export const JARVIS_OPEN_EVENT = 'jarvis:open'

export function openJarvis() {
  window.dispatchEvent(new Event(JARVIS_OPEN_EVENT))
}
