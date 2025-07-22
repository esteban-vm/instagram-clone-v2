import type { Namespace, Resource, i18n } from 'i18next'
import type { Locale } from '@/i18n.config'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { i18nConfig } from '@/i18n.config'

const namespaces = ['home', 'auth', 'dashboard', 'navigation'] as const satisfies Namespace[]

export async function initTranslations(locale: Locale, i18nInstance?: i18n, resources?: Resource) {
  i18nInstance = i18nInstance ?? createInstance()

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((lng: Locale, ns: Namespace) => {
        return import(`@/locales/${lng}/${ns}.json`)
      })
    )
  }

  await i18nInstance.init({
    resources,
    lng: locale,
    ns: namespaces,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    preload: resources ? [] : i18nConfig.locales,
    // debug: process.env.NODE_ENV === 'development',
  })

  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
  }
}
