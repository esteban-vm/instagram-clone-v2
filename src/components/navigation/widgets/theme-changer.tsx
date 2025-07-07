import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { FaRegMoon, FaRegSun } from 'react-icons/fa6'
import { Toggle } from 'rsc-daisyui'

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
      <FaRegMoon className='size-6 fill-violet-500' />
      <Toggle className='Navigation__toggle' defaultChecked={isLight} onChange={changeTheme} />
      <FaRegSun className='size-6 fill-amber-500' />
    </label>
  )
}
