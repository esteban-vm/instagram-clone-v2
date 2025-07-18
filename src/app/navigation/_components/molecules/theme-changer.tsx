import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Toggle } from 'rsc-daisyui'
import { Atoms } from '@/app/navigation/_components'

export function ThemeChanger() {
  const { t } = useTranslation('navigation', { keyPrefix: 'theme_changer' })
  const { theme, themes, setTheme } = useTheme()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(theme === 'light')
  }, [theme])

  const changeTheme = () => {
    const newTheme = themes.find((t) => t !== theme)
    if (newTheme) setTheme(newTheme)
  }

  return (
    <Menu.Item>
      <label className='Navigation__changer' title={isChecked ? t('dark') : t('light')}>
        <Atoms.MoonIcon className='size-8 rounded-sm bg-indigo-200 p-0.5' />
        <Toggle checked={isChecked} className='Navigation__toggle' onChange={changeTheme} />
        <Atoms.SunIcon className='size-8 rounded-sm bg-sky-200 p-0.5' />
      </label>
    </Menu.Item>
  )
}
