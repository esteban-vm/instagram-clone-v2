import 'i18next'
import type auth from '@/locales/en/auth.json'
import type home from '@/locales/en/home.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home'
    resources: {
      home: typeof home
      auth: typeof auth
    }
  }
}
