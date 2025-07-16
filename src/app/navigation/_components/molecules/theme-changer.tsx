import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { Toggle } from 'rsc-daisyui'
import { Atoms } from '@/app/navigation/_components'

export function ThemeChanger() {
  const { t } = useTranslation('navigation', { keyPrefix: 'theme_changer' })
  const { theme, themes, setTheme } = useTheme()
  const isLight = theme === 'light'

  const changeTheme = () => {
    const newTheme = themes.find((currentTheme) => currentTheme !== theme)
    if (newTheme) setTheme(newTheme)
  }

  return (
    <label className='Navigation__changer' title={isLight ? t('title_dark') : t('title_light')}>
      <Atoms.MoonIcon className='size-6' />
      <Toggle className='Navigation__toggle' defaultChecked={isLight} onChange={changeTheme} />
      <Atoms.SunIcon className='size-6' />
    </label>
  )
}
