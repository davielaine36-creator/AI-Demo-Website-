/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_INTAKE_WEBHOOK_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
