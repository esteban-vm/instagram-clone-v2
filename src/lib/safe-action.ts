import { CredentialsSignin } from 'next-auth'
import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action'
import { auth } from '@/auth'
import { CUSTOM_AUTH_ERRORS } from '@/lib/constants'
import { CustomAuthError } from '@/lib/errors'

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    if (error instanceof CustomAuthError || error instanceof CredentialsSignin) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const authClient = actionClient.use(async ({ next }) => {
  const session = await auth()
  if (!session?.user) throw new CustomAuthError(CUSTOM_AUTH_ERRORS[3])
  return next({ ctx: { user: session.user } })
})
