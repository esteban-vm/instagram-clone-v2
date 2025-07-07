import type { Namespace, Resource } from 'i18next'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTranslations } from '@/app/init-translations'

export function TranslationProvider({ children, locale, namespaces, resource }: TranslationProviderProps) {
  const i18nInstance = createInstance()
  initTranslations(locale, namespaces, i18nInstance, resource)

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}

export interface TranslationProviderProps extends Props.WithChildren {
  locale: string
  namespaces: Namespace[]
  resource: Resource
}
