import 'i18next'
import type auth from '@/locales/en/auth.json'
import type common from '@/locales/en/common.json'
import type dashboard from '@/locales/en/dashboard.json'
import type home from '@/locales/en/home.json'
import type navigation from '@/locales/en/navigation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'home'
    resources: {
      auth: typeof auth
      common: typeof common
      home: typeof home
      dashboard: typeof dashboard
      navigation: typeof navigation
    }
  }
}
