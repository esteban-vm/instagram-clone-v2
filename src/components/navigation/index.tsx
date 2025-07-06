import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Navbar } from 'rsc-daisyui'
import { LanguageChanger, ThemeChanger } from '@/components/navigation/widgets'
import { useScrollPosition } from '@/hooks'
import { APP_ROUTES } from '@/lib/constants'
import { cn } from '@/lib/tw-utils'

export function Navigation() {
  const [isClient, setIsClient] = useState(false)
  const { scrollPosition } = useScrollPosition()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Navbar
      className={cn('fixed top-0 z-10 text-neutral-content', scrollPosition > 40 ? 'bg-neutral' : 'bg-transparent')}
    >
      <Navbar.Start>
        <Button as={Link} href={APP_ROUTES.SCENE} ghost>
          daisyUI
        </Button>
      </Navbar.Start>
      <Navbar.End>
        {isClient ? (
          <>
            <ThemeChanger />
            <LanguageChanger />
          </>
        ) : null}
      </Navbar.End>
    </Navbar>
  )
}
