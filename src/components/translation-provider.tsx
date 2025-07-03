'use client'

import type { Namespace, Resource } from 'i18next'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import initTranslations from '@/app/init-translations'

export function TranslationProvider({ children, locale, namespace, resource }: TranslationProviderProps) {
  const i18n = createInstance()
  initTranslations(locale, namespace, i18n, resource)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export interface TranslationProviderProps extends Props.WithChildren {
  locale: string
  namespace: Namespace
  resource: Resource
}
