import bajajSquareLogo from '@/assets/bajaj-square-logo.png'
import { productBrand } from '@/config/brand.config'

/*
 * The shell every pre-sign-in screen sits in.
 *
 * These three screens render before the app shell exists — no header, no
 * sidebar, no data — so they carry their own centred layout rather than
 * borrowing one that assumes a signed-in user.
 */
export default function AuthScreen({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main px-4 py-10">
      <div className="w-full max-w-sm rounded-modal bg-white dark:bg-[#161f33] border border-gray-100 dark:border-white/10 shadow-modal p-8 text-center animate-fade-up">
        {/* The square lockup, not the header's — that one is a white knockout
            meant for the dark header bar and disappears on this card. This one
            carries its own blue ground and reads in both themes. */}
        <img
          src={bajajSquareLogo}
          alt="Bajaj Auto"
          className="h-14 w-14 mx-auto mb-6 rounded-card object-contain"
        />
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        <p className="mt-1 text-xs text-text-secondary">
          {productBrand.name} — {productBrand.tagline}
        </p>
        <div className="mt-6">{children}</div>
      </div>
      <p className="mt-6 text-[11px] text-text-secondary">{productBrand.developedBy}</p>
    </div>
  )
}
