'use client'

import type { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { Navbar } from 'rsc-daisyui'
import { Molecules, Organisms } from '@/app/navigation/_components'
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
    <Navbar className={cn('Navigation', scrollPosition > 40 ? 'bg-neutral' : 'bg-transparent')}>
      <Navbar.Start>
        {isClient ? (
          <>
            <Organisms.MobileMenu />
            <Molecules.HomeLink />
          </>
        ) : null}
      </Navbar.Start>
      <Navbar.End>
        {isClient ? (
          <>
            <Organisms.DesktopMenu />
            {session && <Molecules.LogoutButton />}
          </>
        ) : null}
      </Navbar.End>
    </Navbar>
  )
}

export interface NavigationProps {
  session: Session | null
}
