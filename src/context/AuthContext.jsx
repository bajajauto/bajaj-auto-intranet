import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import {
  AUTH_ENABLED,
  loginRequest,
  msalInstance,
  rememberReturnPath,
} from '@/lib/msal'

/*
 * Sign-in state for the whole app.
 *
 * Everything MSAL-shaped stops here. Components ask `useAuth()` for four
 * things — is auth even on, has it finished starting up, who is signed in, and
 * the two actions — so that turning auth off is an environment value rather
 * than a conditional in every consumer.
 *
 * `isReady` matters more than it looks: MSAL spends its first moments parsing a
 * possible redirect response, during which "not signed in" and "not asked yet"
 * are indistinguishable. Rendering a sign-in button in that window makes the
 * page flash one at every authenticated user on every load.
 */

const AuthContext = createContext(null)

/* The shape consumers see with VITE_AUTH_MODE=off. Frozen at module level so
   it is referentially stable and never retriggers a memo downstream. */
const AUTH_DISABLED_VALUE = Object.freeze({
  enabled: false,
  isReady: true,
  isAuthenticated: true,
  account: null,
  claims: null,
  signIn: () => {},
  signOut: () => {},
})

function MsalAuthBridge({ children }) {
  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  /*
   * MSAL tracks an "active" account separately from the list it holds, and
   * `acquireTokenSilent` in `_client` reads the active one. Nothing sets it on
   * a page reload — the accounts come back from the cache without an event —
   * so it is set here once startup settles.
   */
  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return
    if (!instance.getActiveAccount() && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
    }
  }, [instance, accounts, inProgress])

  const signIn = useCallback(
    (returnTo) => {
      rememberReturnPath(returnTo ?? window.location.pathname)
      instance.loginRedirect(loginRequest)
    },
    [instance],
  )

  const signOut = useCallback(() => {
    instance.logoutRedirect({ account: instance.getActiveAccount() })
  }, [instance])

  const account = instance.getActiveAccount() ?? accounts[0] ?? null

  const value = useMemo(
    () => ({
      enabled: true,
      isReady: inProgress === InteractionStatus.None,
      isAuthenticated,
      account,
      claims: account?.idTokenClaims ?? null,
      signIn,
      signOut,
    }),
    [inProgress, isAuthenticated, account, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children }) {
  if (!AUTH_ENABLED) {
    return <AuthContext.Provider value={AUTH_DISABLED_VALUE}>{children}</AuthContext.Provider>
  }

  /*
   * MsalProvider owns `initialize()` and `handleRedirectPromise()` itself, so
   * there is no bootstrap step and no second call in the callback route —
   * doing it twice is how the redirect response gets consumed by the wrong
   * listener and sign-in silently does nothing.
   */
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthBridge>{children}</MsalAuthBridge>
    </MsalProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
