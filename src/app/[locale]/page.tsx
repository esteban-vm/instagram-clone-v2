import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { APP_ROUTES } from '@/lib/constants'

export default async function HomePage() {
  const session = await auth()
  if (!session?.user) redirect(APP_ROUTES.LOGIN)

  return (
    <>
      <div>Home Page</div>
    </>
  )
}
