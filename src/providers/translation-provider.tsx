'use client'

import type { Resource } from 'i18next'
import type { Locale } from '@/i18n.config'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { initTranslations } from '@/app/init-translations'

export function TranslationProvider({ children, locale, resources }: TranslationProviderProps) {
  const i18nInstance = createInstance()
  i18nInstance.use(initReactI18next)
  initTranslations(locale, i18nInstance, resources)

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}

export interface TranslationProviderProps extends Props.WithChildren {
  locale: Locale
  resources: Resource
}
