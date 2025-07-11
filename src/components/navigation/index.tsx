import type { Session } from 'next-auth'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Navbar } from 'rsc-daisyui'
import { AuthActions } from '@/actions'
import { LanguageChanger, ThemeChanger } from '@/components/navigation/widgets'
import { useCurrentSession, useScrollPosition } from '@/hooks'
import { APP_ROUTES } from '@/lib/constants'
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
    const willLogout = isClient ? confirm('Are you sure?') : undefined
    if (willLogout) execute()
  }

  return (
    <Navbar
      className={cn('fixed top-0 z-10 text-neutral-content', scrollPosition > 40 ? 'bg-neutral' : 'bg-transparent')}
    >
      <Navbar.Start>
        <Button as={Link} disabled={isExecuting} href={APP_ROUTES.SCENE} ghost>
          daisyUI
        </Button>
      </Navbar.Start>
      <Navbar.End>
        {isClient && (
          <>
            <ThemeChanger />
            <LanguageChanger />
          </>
        )}
        {session && (
          <Button className='ml-2' color='accent' disabled={isExecuting} size='sm' onClick={onLogout}>
            {t('buttons.logout')}
          </Button>
        )}
      </Navbar.End>
    </Navbar>
  )
}

export interface NavigationProps {
  session: Session | null
}
