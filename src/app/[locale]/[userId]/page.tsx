import { notFound } from 'next/navigation'
import { UserActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'

interface UserIdPageProps {
  params: Promise<{ userId: string }>
}

export default async function UserIdPage({ params }: UserIdPageProps) {
  await verifySession()

  const { userId } = await params
  const result = await UserActions.getUserById({ id: userId })
  const user = result?.data

  if (!user) notFound()

  return (
    <section className='mx-auto max-w-screen-2xl border border-primary text-center'>
      <span>{user.name}</span>
      <br />
      <span>{user.email}</span>
    </section>
  )
}
