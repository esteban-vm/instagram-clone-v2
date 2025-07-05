import Link from 'next/link'
import { Button, Navbar } from 'rsc-daisyui'
import { useScrollPosition } from '@/hooks'
import { APP_ROUTES } from '@/lib/constants'
import { cn } from '@/lib/tw-utils'

export function AppNavigation() {
  const { scrollPosition } = useScrollPosition()

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
        <Button as={Link} href={APP_ROUTES.HOME}>
          Button
        </Button>
      </Navbar.End>
    </Navbar>
  )
}
