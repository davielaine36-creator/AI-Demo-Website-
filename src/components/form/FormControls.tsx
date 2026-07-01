import type { ReactNode } from 'react'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30'

interface FieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink"
      >
        {label}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

interface TextInputProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  invalid?: boolean
}

export function TextInput({
  id,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  invalid,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} ${invalid ? 'border-red-300 focus:ring-red-500/30' : ''}`}
    />
  )
}

interface TextAreaProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  invalid?: boolean
}

export function TextArea({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  invalid,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      rows={rows}
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y ${invalid ? 'border-red-300 focus:ring-red-500/30' : ''}`}
    />
  )
}

interface SelectProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  invalid?: boolean
}

export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: SelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} ${invalid ? 'border-red-300' : ''} ${
        value ? 'text-ink' : 'text-slate-400'
      }`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-ink">
          {opt}
        </option>
      ))}
    </select>
  )
}

interface CheckboxGroupProps {
  name: string
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
  columns?: 1 | 2
}

export function CheckboxGroup({
  name,
  options,
  selected,
  onToggle,
  columns = 2,
}: CheckboxGroupProps) {
  return (
    <div
      className={`grid gap-2 ${columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}
    >
      {options.map((option) => {
        const checked = selected.includes(option)
        return (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
              checked
                ? 'border-brand-300 bg-brand-50 text-ink'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={checked}
              onChange={() => onToggle(option)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>{option}</span>
          </label>
        )
      })}
    </div>
  )
}
