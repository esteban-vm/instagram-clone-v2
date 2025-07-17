import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { Menu, Toggle } from 'rsc-daisyui'
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
    <Menu.Item>
      <label className='Navigation__changer' title={isLight ? t('dark') : t('light')}>
        <Atoms.MoonIcon className='size-8 rounded-sm bg-indigo-200 p-0.5' />
        <Toggle className='Navigation__toggle' defaultChecked={isLight} onChange={changeTheme} />
        <Atoms.SunIcon className='size-8 rounded-sm bg-sky-200 p-0.5' />
      </label>
    </Menu.Item>
  )
}
