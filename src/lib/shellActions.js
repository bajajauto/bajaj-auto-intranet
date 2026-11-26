/*
 * The Policies and Letters modals and the Helpline menu belong to the Header.
 * Jarvis offers them as buttons, so — as with openJarvis and openSos — it fires
 * an event naming the action and the Header runs it.
 */
export const SHELL_ACTION_EVENT = 'shell:action'

/** @param {'policies' | 'letters' | 'helpline' | 'sos'} action */
export function runShellAction(action) {
  window.dispatchEvent(new CustomEvent(SHELL_ACTION_EVENT, { detail: { action } }))
}
