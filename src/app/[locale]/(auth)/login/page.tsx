import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { Organisms } from '@/app/[locale]/(auth)/_components'

export interface Props {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'es' ? 'Iniciar sesión' : 'Login',
  }
}

export default function LoginPage() {
  return (
    <>
      <Organisms.LoginForm />
    </>
  )
}
