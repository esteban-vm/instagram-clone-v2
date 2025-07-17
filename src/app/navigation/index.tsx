'use client'

import type { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'
import { Dropdown, Menu, Navbar } from 'rsc-daisyui'
import { Molecules } from '@/app/navigation/_components'
import { useCurrentSession, useScrollPosition } from '@/hooks'
import { cn } from '@/lib/tw-utils'

export function Navigation({ session }: NavigationProps) {
  const { scrollPosition } = useScrollPosition()
  const [isClient, setIsClient] = useState(false)
  const { setCurrentSession } = useCurrentSession()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setCurrentSession(session)
  }, [session, setCurrentSession])

  return (
    <Navbar
      className={cn(
        'fixed top-0 left-1/2 z-10 max-w-[96rem] -translate-x-1/2 rounded-b-xl p-1 text-neutral-content',
        scrollPosition > 40 ? 'bg-neutral' : 'bg-transparent'
      )}
    >
      <Navbar.Start>
        <Dropdown className='dropdown lg:hidden'>
          <Dropdown.Button className='ml-2' color='accent' shape='square' outline>
            <HiMenuAlt1 className='size-3/4' />
          </Dropdown.Button>
          <Dropdown.Menu className='z-1 mt-3 gap-2 bg-base-100 p-1 shadow' size='sm'>
            {isClient && (
              <>
                <Molecules.ThemeChanger />
                <Molecules.LanguageChanger />
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Molecules.HomeLink />
      </Navbar.Start>
      <Navbar.End>
        <Menu className='mr-1 hidden bg-base-100 p-1 lg:flex' horizontal>
          {isClient && (
            <>
              <Molecules.ThemeChanger />
              <Molecules.LanguageChanger />
            </>
          )}
        </Menu>
        {session && isClient && <Molecules.LogoutButton />}
      </Navbar.End>
    </Navbar>
  )
}

export interface NavigationProps {
  session: Session | null
}
