import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AUTH_ENABLED, takeReturnPath } from '@/lib/msal'
import AuthPending from './AuthPending'

/*
 * The registered redirect URI. Entra lands here after sign-in.
 *
 * It deliberately does no MSAL work: `MsalProvider` has already consumed the
 * redirect response by the time this renders, and calling
 * `handleRedirectPromise` a second time is how the result gets delivered to a
 * listener nobody is reading. All this route does is wait for startup to
 * finish and put the user back where they were.
 *
 * `replace` matters — without it, Back returns to a callback URL whose hash
 * has already been spent, which is a dead end.
 */
export default function AuthCallback() {
  const { isReady, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!AUTH_ENABLED) {
      navigate('/', { replace: true })
      return
    }
    if (!isReady) return
    navigate(isAuthenticated ? takeReturnPath() : '/', { replace: true })
  }, [isReady, isAuthenticated, navigate])

  return <AuthPending />
}
