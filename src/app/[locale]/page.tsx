import { verifySession } from '@/lib/auth-utils'

export default async function HomePage() {
  await verifySession()

  return (
    <>
      <div>Home Page</div>
    </>
  )
}
