import type { Metadata } from 'next'
import { Molecules } from '@/app/[locale]/(auth)/_components'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterPage() {
  return (
    <>
      <Molecules.RegisterForm />
    </>
  )
}
