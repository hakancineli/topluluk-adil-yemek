/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_USE_REAL_API?: string
  readonly VITE_EDEVLET_CLIENT_ID?: string
  readonly VITE_EDEVLET_CLIENT_SECRET?: string
  readonly VITE_EDEVLET_REDIRECT_URI?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

