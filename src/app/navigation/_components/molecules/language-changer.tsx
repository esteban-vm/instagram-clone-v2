import { useTranslation } from 'react-i18next'
import { Toggle } from 'rsc-daisyui'
import { Atoms } from '@/app/navigation/_components'
import { useLanguageChanger } from '@/hooks'

export function LanguageChanger() {
  const { t } = useTranslation('navigation', { keyPrefix: 'language_changer' })
  const { currentLanguage, defaultLanguage, changeLanguage } = useLanguageChanger()
  const isChecked = currentLanguage === defaultLanguage

  return (
    <label className='Navigation__changer ml-2' title={t('title')}>
      <Atoms.SpainFlag />
      <Toggle className='Navigation__toggle' defaultChecked={isChecked} onChange={changeLanguage} />
      <Atoms.UKFlag />
    </label>
  )
}
