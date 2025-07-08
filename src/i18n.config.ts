import type { Config } from 'next-i18n-router/dist/types'

export type Locale = (typeof i18nConfig.locales)[number]

export const i18nConfig = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  prefixDefault: false,
} as const satisfies Config

export default i18nConfig
