import { productBrand } from '@/config/brand.config'
import { openSos } from '@/lib/sos'

const CURRENT_YEAR = new Date().getFullYear()

/*
 * A single line under the last card: copyright, who built it, and Emergency — the same SOS sheet the Helpline menu opens,
 * kept within reach at the bottom of a long page.
 */
export default function Footer() {
  return (
    <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#dfe7ef] py-6 text-[12.5px] text-[#4e6163]">
      <p>© {CURRENT_YEAR} Bajaj Auto Ltd. All rights reserved.</p>
      <div className="flex flex-wrap items-center gap-5">
        <p className="text-[#4e6365]">
          {productBrand.name} · {productBrand.developedBy}
        </p>
        <button
          type="button"
          onClick={openSos}
          className="h-10 rounded-[10px] bg-gradient-to-r from-[#083046] to-[#2289aa] px-6 text-[13px] font-semibold text-white hover:brightness-110 focus-ring"
        >
          Emergency
        </button>
      </div>
    </footer>
  )
}
