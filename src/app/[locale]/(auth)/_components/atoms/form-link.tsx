import type { FormButtonProps } from '@/app/[locale]/(auth)/_components/atoms'
import Link from 'next/link'
import { Button } from 'rsc-daisyui'

export function FormLink({ text, route, isDisabled }: FormLinkProps) {
  return (
    <Button as={Link} className='mt-3' color='secondary' disabled={isDisabled} href={route} outline>
      {text}
    </Button>
  )
}

export interface FormLinkProps extends FormButtonProps {
  route: string
}
