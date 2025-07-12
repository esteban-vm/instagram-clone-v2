'use client'

import type { Session } from 'next-auth'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Navbar } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { Molecules } from '@/app/navigation/_components'
import { useCurrentSession, useScrollPosition } from '@/hooks'
import { cn } from '@/lib/tw-utils'

export function Navigation({ session }: NavigationProps) {
  const { t } = useTranslation('navigation')
  const { scrollPosition } = useScrollPosition()
  const [isClient, setIsClient] = useState(false)
  const { setCurrentSession } = useCurrentSession()
  const { execute, isExecuting } = useAction(AuthActions.logout)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setCurrentSession(session)
  }, [session, setCurrentSession])

  const onLogout = () => {
    const willLogout = isClient && confirm('Are you sure?')
    if (willLogout) execute()
  }

  return (
    <Navbar
      className={cn(
        'fixed top-0 z-10 rounded-b-xl text-neutral-content',
        scrollPosition > 40 ? 'bg-neutral' : 'bg-transparent'
      )}
    >
      <div className='container mx-auto flex w-full items-center'>
        <Navbar.Start>
          <Molecules.AppLogo />
        </Navbar.Start>
        <Navbar.End>
          {isClient && (
            <>
              <Molecules.ThemeChanger />
              <Molecules.LanguageChanger />
            </>
          )}
          {session && (
            <Button className='ml-2' color='accent' disabled={isExecuting} size='sm' onClick={onLogout}>
              {t('buttons.logout')}
            </Button>
          )}
        </Navbar.End>
      </div>
    </Navbar>
  )
}

export interface NavigationProps {
  session: Session | null
}
