import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { notFound } from 'next/navigation'
import { UserActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'

interface UserPageProps {
  params: Promise<{ locale: Locale; userId: string }>
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { locale, userId } = await params
  const result = await UserActions.getUserById({ id: userId })
  const user = result?.data

  if (!user) {
    return {
      title: locale === 'es' ? 'Usuario no encontrado' : 'User not found',
    }
  }

  return {
    title: `${locale === 'es' ? 'Usuario' : 'User'}: ${user.name}`,
  }
}

export default async function UserPage({ params }: UserPageProps) {
  await verifySession()

  const { userId } = await params
  const result = await UserActions.getUserById({ id: userId })
  const user = result?.data

  if (!user) notFound()

  return (
    <section className='mx-auto mt-20 max-w-screen-2xl border border-primary text-center'>
      <span>{user.name}</span>
      <br />
      <span>{user.email}</span>
    </section>
  )
}
