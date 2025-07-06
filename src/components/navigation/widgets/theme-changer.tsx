import { FaRegMoon, FaRegSun } from 'react-icons/fa6'
import { ThemeController } from 'rsc-daisyui'

export function ThemeChanger() {
  return (
    <label className='Navigation__changer'>
      <FaRegMoon className='size-6 fill-primary' />
      <ThemeController className='Navigation__toggle' value='synthwave' />
      <FaRegSun className='size-6 fill-primary' />
    </label>
  )
}
