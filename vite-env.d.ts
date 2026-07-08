/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Note: the n8n webhook URL is intentionally NOT here. It is a server-only
  // secret (N8N_INTAKE_WEBHOOK_URL, read in api/intake.ts) and must never be
  // exposed to the client bundle.
  readonly VITE_CONTACT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
