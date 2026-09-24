/*
 * The request form — one letter type at a time, revealing only the fields that
 * type needs.
 *
 * Two rules carried over from the Jarvis bot, both load-bearing:
 *   · fields that come from the employee record are shown but locked, so the
 *     employee can check them without being able to certify their own details
 *   · "Other" as a purpose opens a free-text field rather than blocking
 *
 * Validation is required-fields-only. Anything stricter belongs with the system
 * that owns the data — a passport number regex here would reject valid
 * passports and still not make an invalid one true.
 */

import { useMemo, useState } from 'react'
import { Lock } from 'lucide-react'
import {
  letterPurposes,
  OTHER_PURPOSE,
  entities,
} from '@/config/letters.config'

const inputClass =
  'w-full rounded-btn border border-gray-200 bg-bg-main px-3 py-2 text-sm text-text-primary transition-colors duration-200 placeholder:text-text-secondary/70 focus:border-brand-primary focus-ring'

const lockedClass =
  'w-full rounded-btn border border-gray-200 bg-bg-alt px-3 py-2 pr-9 text-sm text-text-secondary'

function FieldLabel({ children, required }) {
  return (
    <span className="mb-1.5 block text-[13px] font-semibold text-text-primary">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </span>
  )
}

// Employee-record fields. Rendered as real inputs rather than plain text so the
// form reads as one thing, with the padlock carrying why they cannot be edited.
function LockedField({ label, value }) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <span className="relative block">
        <input type="text" value={value} readOnly tabIndex={-1} className={lockedClass} />
        <Lock
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
          aria-hidden="true"
        />
      </span>
    </label>
  )
}

function Field({ field, value, error, onChange, options }) {
  const id = `letter-field-${field.name}`
  const describedBy = error ? `${id}-error` : field.hint ? `${id}-hint` : undefined

  return (
    <div>
      <label htmlFor={id}>
        <FieldLabel required={field.required}>{field.label}</FieldLabel>
      </label>

      {field.type === 'select' ? (
        <select
          id={id}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {(options ?? field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.type}
          value={value ?? ''}
          onChange={(e) => onChange(field.name, e.target.value)}
          placeholder={field.type === 'date' ? undefined : 'Specify the details'}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          className={inputClass}
        />
      )}

      {field.hint && !error && (
        <span id={`${id}-hint`} className="mt-1 block text-xs text-text-secondary">
          {field.hint}
        </span>
      )}
      {error && (
        <span id={`${id}-error`} className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </div>
  )
}

export default function LetterRequestForm({
  letterType,
  employee,
  entity,
  signatories,
  onGenerate,
  submitLabel = 'Generate letter',
  declaration,
}) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [accepted, setAccepted] = useState(false)

  const usesPurpose = letterType.usesPurpose
  const isOtherPurpose = values.purpose === OTHER_PURPOSE

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  /*
   * The purpose pair behaves as one field: picking "Other" makes the free-text
   * box required and picking anything else drops both it and its error, so a
   * stale message cannot block a submit for a field that is no longer shown.
   */
  const requiredFields = useMemo(() => {
    const list = [...(letterType.fields ?? [])].filter((f) => f.required).map((f) => f.name)
    if (usesPurpose) {
      list.push('purpose')
      if (isOtherPurpose) list.push('otherPurpose')
    }
    return list
  }, [letterType.fields, usesPurpose, isOtherPurpose])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = {}
    requiredFields.forEach((name) => {
      if (!String(values[name] ?? '').trim()) nextErrors[name] = 'This field is required'
    })
    if (declaration && !accepted) {
      nextErrors.declaration = 'Please confirm before generating'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    onGenerate({
      ...values,
      // Collapse the purpose pair before it leaves the form — nothing
      // downstream should have to know "Other" was involved.
      ...(usesPurpose && {
        purpose: isOtherPurpose ? values.otherPurpose.trim() : values.purpose,
      }),
    })
  }

  const resolvedEntity = entity ?? entities[employee.entity]

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* ── Entity ─────────────────────────────────────────── */}
      <div className="flex items-start gap-3 rounded-card border border-brand-primary/20 bg-brand-light/60 px-4 py-3 dark:bg-brand-primary/10">
        <div className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-brand-primary">
            Issuing entity
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-text-primary">
            {resolvedEntity.name}
          </span>
          <span className="mt-0.5 block text-xs text-text-secondary">
            Set by your employee record — your letter carries this letterhead.
          </span>
        </div>
      </div>

      {/* ── Locked employee record ─────────────────────────── */}
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-[13px] font-bold text-text-primary">Your details</legend>
        <LockedField label="Employee Name" value={employee.name} />
        <LockedField label="Employee ID" value={employee.empId} />
        <LockedField label="Designation" value={employee.designation} />
        <LockedField label="Business Unit" value={employee.businessUnit} />
        <LockedField label="Email ID" value={employee.email} />
        <LockedField label="Phone Number" value={employee.mobile} />
      </fieldset>

      {/* ── Letter-specific fields ─────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="mb-2 text-[13px] font-bold text-text-primary">
          {letterType.label} details
        </legend>

        {usesPurpose && (
          <>
            <Field
              field={{
                name: 'purpose',
                label: 'Purpose for the letter',
                type: 'select',
                required: true,
              }}
              options={letterPurposes}
              value={values.purpose}
              error={errors.purpose}
              onChange={setValue}
            />
            {isOtherPurpose && (
              <Field
                field={{
                  name: 'otherPurpose',
                  label: 'Other Purpose',
                  type: 'text',
                  required: true,
                }}
                value={values.otherPurpose}
                error={errors.otherPurpose}
                onChange={setValue}
              />
            )}
          </>
        )}

        {(letterType.fields ?? []).map((field) => (
          <Field
            key={field.name}
            field={field}
            options={field.source === 'signatories' ? signatories : undefined}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={setValue}
          />
        ))}
      </fieldset>

      {declaration && (
        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-card border border-gray-200 bg-bg-alt px-4 py-3">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => {
                setAccepted(e.target.checked)
                setErrors((prev) => ({ ...prev, declaration: undefined }))
              }}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-primary focus-ring"
            />
            <span className="text-xs leading-relaxed text-text-secondary">{declaration}</span>
          </label>
          {errors.declaration && (
            <span className="mt-1 block text-xs font-medium text-red-600">
              {errors.declaration}
            </span>
          )}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-btn bg-gradient-to-br from-brand-primary to-brand-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card focus-ring"
      >
        {submitLabel}
      </button>
    </form>
  )
}
