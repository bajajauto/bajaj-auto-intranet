import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { CalendarClock, CheckCircle2, Copy, DoorOpen, X } from 'lucide-react'

const MODAL_TRANSITION_MS = 500

const INITIAL_FORM = {
  visitorName: '',
  phone: '',
  email: '',
  balPoc: '',
  visitDate: '',
  visitTime: '',
}

function createAppointmentCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function Field({ id, label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-brand-primary" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-btn border border-gray-200 bg-white px-3 py-2 text-sm text-text-primary shadow-sm transition-all placeholder:text-text-secondary/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25'

export default function VisitorGatepassWizard({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [appointmentCode, setAppointmentCode] = useState('')
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  useEffect(() => {
    if (!isOpen) return undefined

    document.body.style.overflow = 'hidden'
    document.getElementById('root')?.classList.add('modal-open')
    setVisible(true)

    return () => {
      document.body.style.overflow = ''
      document.getElementById('root')?.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleClose() {
    setVisible(false)
    setTimeout(() => {
      onClose()
      setForm(INITIAL_FORM)
      setAppointmentCode('')
    }, MODAL_TRANSITION_MS)
  }

  function handleGenerateCode(e) {
    e.preventDefault()
    setAppointmentCode(createAppointmentCode())
  }

  function handleCopyCode() {
    if (appointmentCode) navigator.clipboard?.writeText(appointmentCode)
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-500 ${
        visible ? 'bg-black/25' : 'pointer-events-none bg-transparent'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-out ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-brand-primary to-brand-dark px-6 py-5 text-white sm:px-8 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm">
                <DoorOpen size={24} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold leading-tight sm:text-2xl">Visitor Gatepass</h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock size={12} />
                    Guest entry appointment
                  </span>
                  {appointmentCode && (
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      Code generated
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="flex-shrink-0 rounded-lg p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 hover:bg-white/20 focus-ring"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <form onSubmit={handleGenerateCode} className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1.35fr_0.9fr] lg:divide-x lg:divide-gray-100">
          <div className="space-y-5 p-5 sm:p-6">
            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-primary">
                Visitor details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="visitorName" label="Visitor name">
                  <input
                    id="visitorName"
                    type="text"
                    value={form.visitorName}
                    onChange={(e) => updateField('visitorName', e.target.value)}
                    required
                    placeholder="Enter full name"
                    className={inputClass}
                  />
                </Field>
                <Field id="phone" label="Phone number">
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                    placeholder="10 digit mobile number"
                    className={inputClass}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="email" label="Email ID">
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                      placeholder="visitor@example.com"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-primary">
                Appointment details
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field id="balPoc" label="BAL POC">
                    <input
                      id="balPoc"
                      type="text"
                      value={form.balPoc}
                      onChange={(e) => updateField('balPoc', e.target.value)}
                      required
                      placeholder="Employee name or email"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field id="visitDate" label="Date">
                  <input
                    id="visitDate"
                    type="date"
                    min={today}
                    value={form.visitDate}
                    onChange={(e) => updateField('visitDate', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
                <Field id="visitTime" label="Time">
                  <input
                    id="visitTime"
                    type="time"
                    min="09:00"
                    max="18:00"
                    step="900"
                    value={form.visitTime}
                    onChange={(e) => updateField('visitTime', e.target.value)}
                    required
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-btn border border-gray-200 px-4 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-alt focus-ring"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-btn bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-ring"
              >
                <DoorOpen size={16} />
                Generate appointment code
              </button>
            </div>
          </div>

          <aside className="bg-gradient-to-b from-brand-light/55 via-white to-white p-5 sm:p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              Appointment code
            </h3>
            <div className="mt-3 rounded-card border border-brand-primary/15 bg-white p-5 shadow-card">
              {appointmentCode ? (
                <>
                  <p className="break-words text-3xl font-bold tracking-wide text-brand-primary">
                    {appointmentCode}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Share this code with the visitor and security desk for entry validation.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="mt-4 inline-flex items-center gap-2 rounded-btn border border-brand-primary/20 bg-brand-light px-3 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white focus-ring"
                  >
                    <Copy size={15} />
                    Copy code
                  </button>
                </>
              ) : (
                <div className="flex min-h-[170px] flex-col items-center justify-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand-primary">
                    <CheckCircle2 size={22} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-text-primary">Ready to generate</p>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    Complete the visitor and appointment details, then generate the entry code.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 rounded-card border border-gray-100 bg-white/70 p-3 text-xs text-text-secondary">
              <p><span className="font-semibold text-text-primary">Visitor:</span> {form.visitorName || '-'}</p>
              <p><span className="font-semibold text-text-primary">BAL POC:</span> {form.balPoc || '-'}</p>
              <p><span className="font-semibold text-text-primary">Date:</span> {form.visitDate || '-'}</p>
              <p><span className="font-semibold text-text-primary">Time:</span> {form.visitTime || '-'}</p>
            </div>
          </aside>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}
