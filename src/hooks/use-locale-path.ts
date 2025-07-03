import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from '@/i18n.config'
import { paths } from '@/lib/paths'

export type PagePath = 'login' | 'register' | 'scene'

export const useLocalePath = (path: PagePath) => {
  const locale = useCurrentLocale(i18nConfig)
  return paths.locale(locale!)[path].path
}
