import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { APP_ROUTES } from '@/lib/constants'

export const mockDelay = (ms = 2_000) => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const verifyNoSession = async () => {
  const session = await auth()
  if (session?.user) redirect(APP_ROUTES.DASHBOARD)
}

export const verifySession = async () => {
  const session = await auth()
  if (!session?.user) redirect(APP_ROUTES.LOGIN)
  return session
}
