import type { Metadata } from 'next'
import { Organisms } from '@/app/[locale]/(auth)/_components'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <>
      <Organisms.LoginForm />
    </>
  )
}
