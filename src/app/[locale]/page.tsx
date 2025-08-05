import { verifySession } from '@/lib/auth-utils'

export default async function HomePage() {
  const { user } = await verifySession()

  return (
    <section className='mx-auto max-w-screen-2xl border border-primary text-center'>
      <span>{user.name}</span>
      <br />
      <span>{user.email}</span>
    </section>
  )
}
