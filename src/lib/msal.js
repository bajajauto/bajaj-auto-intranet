import {
  BrowserCacheLocation,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser'
import {
  AUTH_CALLBACK_PATH,
  AUTH_MODE,
  AZURE_API_SCOPE,
  AZURE_CLIENT_ID,
  AZURE_TENANT_ID,
  SIGNED_OUT_PATH,
} from './env'

/*
 * The MSAL singleton, and the only file that constructs it.
 *
 * It lives outside React because two callers need it and only one of them is a
 * component: `AuthContext` drives sign-in, and `adapters/api/_client` needs a
 * token on every request from inside a plain async function. Both import this.
 *
 * With `VITE_AUTH_MODE=off` the instance is null and every export below
 * degrades to a no-op, so nothing downstream has to branch on the environment.
 */

export const AUTH_ENABLED = AUTH_MODE === 'msal'

/** Where the app was before sign-in, so the callback can put the user back. */
const RETURN_TO_KEY = 'auth:returnTo'

/*
 * Launched from a home-screen icon rather than a browser tab. On Android that
 * is the work-profile app, on one person's managed phone — a different device
 * from the shared plant terminal the session-storage rule below exists for.
 */
const RUNNING_INSTALLED = ['standalone', 'fullscreen', 'minimal-ui'].some(
  (mode) => window.matchMedia?.(`(display-mode: ${mode})`).matches,
)

/*
 * Delegated scopes for the sign-in itself. `User.Read` is here so the header
 * can show a name and photo without a server round-trip; every field a *letter*
 * certifies comes from the API instead.
 */
export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
}

/** The token the intranet API accepts. Empty until IT exposes the API scope. */
export const apiRequest = {
  scopes: AZURE_API_SCOPE ? [AZURE_API_SCOPE] : [],
}

export const msalInstance = AUTH_ENABLED
  ? new PublicClientApplication({
      auth: {
        clientId: AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
        redirectUri: `${window.location.origin}${AUTH_CALLBACK_PATH}`,
        postLogoutRedirectUri: `${window.location.origin}${SIGNED_OUT_PATH}`,
        /*
         * MSAL stays on the callback route instead of restoring the pre-login
         * URL itself. `AuthCallback` does that from `RETURN_TO_KEY`, which
         * keeps one component responsible for where sign-in lands.
         */
        navigateToLoginRequestUrl: false,
      },
      cache: {
        /*
         * Session, not local. Plant and shop-floor machines are shared, and a
         * token in localStorage outlives the person who signed in — the next
         * user at that terminal would be issued letters in someone else's
         * name. The cost is a silent re-auth per new tab, which is invisible
         * on a domain-joined device.
         *
         * The installed app is the exception. Android can kill it whenever it
         * is in the background, which wipes sessionStorage, and on a phone
         * that means a full sign-in almost every time it is opened.
         */
        cacheLocation: RUNNING_INSTALLED
          ? BrowserCacheLocation.LocalStorage
          : BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false,
      },
    })
  : null

export function rememberReturnPath(path) {
  if (!AUTH_ENABLED) return
  try {
    sessionStorage.setItem(RETURN_TO_KEY, path)
  } catch {
    // Storage blocked by policy — the callback falls back to "/".
  }
}

export function takeReturnPath() {
  try {
    const path = sessionStorage.getItem(RETURN_TO_KEY)
    sessionStorage.removeItem(RETURN_TO_KEY)
    // Only same-origin paths: an absolute URL here would be an open redirect.
    return path && path.startsWith('/') && !path.startsWith('//') ? path : '/'
  } catch {
    return '/'
  }
}

/** The signed-in account, however MSAL happens to be tracking it. */
export function currentAccount() {
  if (!msalInstance) return null
  return msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0] ?? null
}

/*
 * A bearer token for the intranet API, or null when there is nothing to attach.
 *
 * Null covers three ordinary cases — auth is off, nobody is signed in yet, or
 * IT has not exposed the API scope — and in all three the request goes out
 * unauthenticated and the server decides. It only throws on a real token
 * failure, which is a broken configuration worth surfacing.
 *
 * When the refresh token has expired MSAL cannot renew silently, so this hands
 * off to a full redirect. The page is navigating away at that point; the null
 * return exists so the in-flight request stops rather than retrying.
 */
export async function getApiToken() {
  if (!msalInstance || apiRequest.scopes.length === 0) return null

  const account = currentAccount()
  if (!account) return null

  try {
    const result = await msalInstance.acquireTokenSilent({ ...apiRequest, account })
    return result.accessToken
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      rememberReturnPath(window.location.pathname)
      await msalInstance.acquireTokenRedirect({ ...apiRequest, account })
      return null
    }
    throw err
  }
}
