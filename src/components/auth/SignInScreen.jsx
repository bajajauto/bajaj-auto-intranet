import { LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import AuthScreen from './AuthScreen'

/*
 * One button, and no username field.
 *
 * The intranet never sees a password: sign-in is a redirect to Entra ID, which
 * on a domain-joined machine usually returns before the user notices they left.
 * Anything resembling a credential form here would be the wrong thing to teach
 * people to type into.
 */
export default function SignInScreen({ returnTo }) {
  const { signIn } = useAuth()

  return (
    <AuthScreen title="Sign in to continue">
      <button
        type="button"
        onClick={() => signIn(returnTo)}
        className="w-full flex items-center justify-center gap-2 rounded-btn bg-brand-primary hover:bg-brand-dark text-white text-sm font-medium px-4 py-2.5 transition-colors"
      >
        <LogIn size={16} />
        Sign in with your Bajaj account
      </button>
      <p className="mt-4 text-xs text-text-secondary">
        You will be taken to your organisation&rsquo;s Microsoft sign-in page.
      </p>
    </AuthScreen>
  )
}
