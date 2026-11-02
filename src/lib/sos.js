/*
 * The SOS sheet is offered from two places — the top bar's Helpline menu and
 * the footer's Emergency button — and mounted once in the shell. Callers fire
 * this event and SosModal listens, the same pattern as openJarvis.
 */
export const SOS_OPEN_EVENT = 'sos:open'

export function openSos() {
  window.dispatchEvent(new Event(SOS_OPEN_EVENT))
}
