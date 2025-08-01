import { formatDistance } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { FaRegClock } from 'react-icons/fa'
import { i18nConfig } from '@/i18n.config'

export interface PhotoDateProps {
  date: Date
}

export function PhotoDate({ date }: PhotoDateProps) {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const [enLocale, esLocale] = i18nConfig.locales

  return (
    <small className='font-semibold text-secondary/75 uppercase'>
      <FaRegClock className='inline' />
      &nbsp;
      {formatDistance(date, new Date(), {
        addSuffix: true,
        locale: currentLocale === esLocale ? es : currentLocale === enLocale ? enUS : undefined,
      })}
    </small>
  )
}
