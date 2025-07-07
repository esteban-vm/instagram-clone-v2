import { useTranslation } from 'react-i18next'
import { Toggle } from 'rsc-daisyui'
import { SpainFlag, UKFlag } from '@/components/navigation/icons'
import { useLanguageChanger } from '@/hooks'

export function LanguageChanger() {
  const { t } = useTranslation('navigation', { keyPrefix: 'language_changer' })
  const { currentLanguage, defaultLanguage, changeLanguage } = useLanguageChanger()
  const isChecked = currentLanguage === defaultLanguage

  return (
    <label className='Navigation__changer ml-2' title={t('title')}>
      <SpainFlag />
      <Toggle className='Navigation__toggle' defaultChecked={isChecked} onChange={changeLanguage} />
      <UKFlag />
    </label>
  )
}
