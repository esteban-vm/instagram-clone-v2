import { Toggle } from 'rsc-daisyui'
import { SpainFlag, UKFlag } from '@/components/navigation/icons'
import { useLanguageChanger } from '@/hooks'

export function LanguageChanger() {
  const { currentLanguage, defaultLanguage, changeLanguage } = useLanguageChanger()

  return (
    <label className='Navigation__changer ml-2'>
      <SpainFlag />
      <Toggle
        className='Navigation__toggle'
        defaultChecked={currentLanguage === defaultLanguage}
        onChange={changeLanguage}
      />
      <UKFlag />
    </label>
  )
}
