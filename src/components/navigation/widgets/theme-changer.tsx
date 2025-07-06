import { useTheme } from 'next-themes'
import { FaRegMoon, FaRegSun } from 'react-icons/fa6'
import { Toggle } from 'rsc-daisyui'

export function ThemeChanger() {
  const { theme, themes, setTheme } = useTheme()

  const changeTheme = () => {
    const newTheme = themes.find((t) => t !== theme)
    if (newTheme) setTheme(newTheme)
  }

  return (
    <label className='Navigation__changer'>
      <FaRegMoon className='size-6 fill-primary' />
      <Toggle className='Navigation__toggle' defaultChecked={theme === 'light'} onChange={changeTheme} />
      <FaRegSun className='size-6 fill-primary' />
    </label>
  )
}
