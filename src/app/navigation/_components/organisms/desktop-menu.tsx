import { Menu } from 'rsc-daisyui'
import { Molecules } from '@/app/navigation/_components'

export function DesktopMenu() {
  return (
    <Menu className='mr-1 hidden bg-base-100 p-1 lg:flex' horizontal>
      <Molecules.ThemeChanger />
      <Molecules.LanguageChanger />
    </Menu>
  )
}
