import { useTranslation } from 'react-i18next'
import { Menu, Toggle, Tooltip } from 'rsc-daisyui'
import { Atoms } from '@/app/navigation/_components'
import { useLanguageChanger } from '@/hooks'

export function LanguageChanger() {
  const { t } = useTranslation('navigation')
  const { currentLanguage, defaultLanguage, changeLanguage } = useLanguageChanger()
  const isChecked = currentLanguage === defaultLanguage

  return (
    <Tooltip position='bottom' tip={t('language_changer')}>
      <Menu.Item>
        <label className='Navigation__changer'>
          <Atoms.SpainFlag className='size-8' />
          <Toggle className='Navigation__toggle' defaultChecked={isChecked} role='switch' onChange={changeLanguage} />
          <Atoms.UKFlag className='size-8' />
        </label>
      </Menu.Item>
    </Tooltip>
  )
}
