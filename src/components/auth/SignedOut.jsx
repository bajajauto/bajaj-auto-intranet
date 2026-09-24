import { LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import AuthScreen from './AuthScreen'

/*
 * Where Entra returns the browser after sign-out.
 *
 * A separate route rather than the sign-in screen, because landing back on
 * "Sign in" reads as if the sign-out failed. This confirms it worked, and on a
 * shared terminal that confirmation is the whole point of the page.
 */
export default function SignedOut() {
  const { signIn } = useAuth()

  return (
    <AuthScreen title={'You’re signed out'}>
      <p className="text-xs text-text-secondary">
        Close this tab if you are on a shared machine.
      </p>
      <button
        type="button"
        onClick={() => signIn('/')}
        className="mt-5 w-full flex items-center justify-center gap-2 rounded-btn bg-brand-primary hover:bg-brand-dark text-white text-sm font-medium px-4 py-2.5 transition-colors"
      >
        <LogIn size={16} />
        Sign in again
      </button>
    </AuthScreen>
  )
}
