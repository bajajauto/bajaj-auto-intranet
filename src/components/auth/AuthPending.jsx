import AuthScreen from './AuthScreen'

/*
 * Shown while MSAL works out whether this page load is a fresh visit or the
 * tail end of a sign-in redirect. It is usually a single frame; it exists so
 * that the frame is not a sign-in button flashed at an already-authenticated
 * user.
 */
export default function AuthPending({ title = 'Signing you in…' }) {
  return (
    <AuthScreen title={title}>
      <div
        role="status"
        aria-live="polite"
        className="mx-auto h-6 w-6 rounded-full border-2 border-brand-light border-t-brand-primary animate-spin motion-reduce:animate-none"
      >
        <span className="sr-only">Loading</span>
      </div>
    </AuthScreen>
  )
}
