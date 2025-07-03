import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export const verifySession = async () => {
  const session = await auth()
  if (!session?.user) redirect(`/login`)
}
