'use client'

import { useClickOutside } from '@react-hooks-hub/use-click-outside'
import { useRef } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Dropdown } from 'rsc-daisyui'
import { Molecules } from '@/app/navigation/_components'

export function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null!)

  useClickOutside([menuRef], (isOutside) => {
    if (isOutside) menuRef.current.open = false
  })

  return (
    <Dropdown ref={menuRef} className='dropdown lg:hidden'>
      <Dropdown.Button className='ml-2' color='accent' shape='square' outline>
        <HiMenuAlt1 className='size-3/4' />
      </Dropdown.Button>
      <Dropdown.Menu className='z-1 mt-3 gap-2 bg-base-100 p-1 shadow' size='sm'>
        <Molecules.ThemeChanger />
        <Molecules.LanguageChanger />
      </Dropdown.Menu>
    </Dropdown>
  )
}
