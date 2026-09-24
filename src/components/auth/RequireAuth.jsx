import { useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import AuthPending from './AuthPending'
import SignInScreen from './SignInScreen'

/*
 * The gate in front of the app shell.
 *
 * It renders the sign-in screen in place rather than redirecting to a route of
 * its own, so the URL the user asked for survives the sign-in and there is no
 * extra history entry to back into.
 *
 * With auth off this is a pass-through — which is what lets `npm run dev` and
 * both smoke scripts drive the app with no Entra tenant behind them.
 *
 * It also gates the first data fetch, and that is not incidental: every query
 * below it needs a token, and MSAL cannot mint one until it has finished
 * starting up. Holding the tree here means no request can leave early and get
 * itself a 401.
 */
export default function RequireAuth({ children }) {
  const { enabled, isReady, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!enabled) return children
  if (!isReady) return <AuthPending title="Checking your sign-in…" />
  if (!isAuthenticated) return <SignInScreen returnTo={location.pathname} />

  return children
}
