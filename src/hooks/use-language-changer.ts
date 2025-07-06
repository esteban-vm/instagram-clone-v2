import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18n.config'

export const useLanguageChanger = () => {
  const { i18n } = useTranslation()
  const { push, refresh } = useRouter()
  const currentPathname = usePathname()

  const currentLocale = i18n.language
  const { defaultLocale, prefixDefault, locales } = i18nConfig

  const changeLanguage = () => {
    const newLocale = locales.find((locale) => locale !== currentLocale)

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    const expires = date.toUTCString()

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1_000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // redirect to the new locale path
    if (currentLocale === defaultLocale && !prefixDefault) {
      push('/' + newLocale + currentPathname)
    } else {
      push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    refresh()
  }

  return {
    changeLanguage,
    currentLanguage: currentLocale,
    defaultLanguage: defaultLocale,
  }
}
