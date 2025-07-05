import type { Atoms } from '@/app/[locale]/(auth)/_components'
import type { APP_ROUTES } from '@/lib/constants'
import Link from 'next/link'
import { Button } from 'rsc-daisyui'

export function FormLink({ text, route, isDisabled }: FormLinkProps) {
  return (
    <Button as={Link} className='mt-3' color='secondary' disabled={isDisabled} href={route} outline>
      {text}
    </Button>
  )
}

export interface FormLinkProps extends Atoms.FormButtonProps {
  route: (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
}
