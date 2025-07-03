import type { Namespace, Resource, i18n } from 'i18next'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import i18nConfig from '@/i18n.config'

export default async function initTranslations(
  locale: string,
  namespace: Namespace,
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
    ns: namespace,
    resources: resource,
    defaultNS: namespace,
    fallbackNS: namespace,
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    debug: process.env.NODE_ENV === 'development',
    preload: resource ? [] : i18nConfig.locales,
  })

  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
  }
}
