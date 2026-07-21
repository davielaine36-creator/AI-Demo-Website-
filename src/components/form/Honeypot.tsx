import { useState, type ReactElement } from 'react'

/**
 * Presentational honeypot field — visually hidden, off-screen, aria-hidden, not
 * tabbable, and excluded from autofill. A human never sees or fills it; bots
 * that populate every input fill it. The value is sent as top-level `hp`, and
 * the server (n8n "Honeypot?" node) silently rejects any submission where it is
 * non-empty. Named `hp` to match the intake contract.
 */
function HoneypotField({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}): ReactElement {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      {/* Not a real field. If you can read this, leave it empty. */}
      <label>
        Leave this field empty
        <input
          type="text"
          name="hp"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}

/**
 * Honeypot hook. Render `field` inside the <form>, and pass `value` to
 * submitForm as `honeypot` so it travels to n8n as top-level `hp`.
 */
export function useHoneypot(): { value: string; field: ReactElement } {
  const [value, setValue] = useState('')
  return { value, field: <HoneypotField value={value} onChange={setValue} /> }
}
