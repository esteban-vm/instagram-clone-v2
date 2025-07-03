import type { Metadata } from 'next'
import { Molecules } from '@/app/[locale]/(auth)/_components'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Login',
}

export default async function LoginPage() {
  const session = await auth()

  return (
    <>
      <Molecules.LoginForm session={session} />
    </>
  )
}
