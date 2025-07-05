import type { Metadata } from 'next'
import { Organisms } from '@/app/[locale]/(auth)/_components'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterPage() {
  return (
    <>
      <Organisms.RegisterForm />
    </>
  )
}
