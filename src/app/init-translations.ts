import type { Namespace, Resource, i18n } from 'i18next'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { i18nConfig } from '@/i18n.config'

export async function initTranslations(
  locale: string,
  namespaces: Namespace[],
  i18nInstance?: i18n,
  resource?: Resource
) {
  i18nInstance = i18nInstance ?? createInstance()
  i18nInstance.use(initReactI18next)

  if (!resource) {
    i18nInstance.use(
      resourcesToBackend((lng: string, ns: Namespace) => {
        return import(`@/locales/${lng}/${ns}.json`)
      })
    )
  }

  await i18nInstance.init({
    lng: locale,
    ns: namespaces as string[],
    resources: resource,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    preload: resource ? [] : i18nConfig.locales,
    // debug: process.env.NODE_ENV === 'development',
  })

  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
    resource: i18nInstance.services.resourceStore.data,
  }
}
