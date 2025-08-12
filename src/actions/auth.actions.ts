'use server'

import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { signIn, signOut } from '@/auth'
import { mockDelay } from '@/lib/auth-utils'
import { APP_ROUTES } from '@/lib/constants'
import { CustomAuthError } from '@/lib/errors'
import { actionClient, authClient } from '@/lib/safe-action'
import { LoginSchema, RegisterSchema } from '@/lib/validations'
import { prisma } from '@/prisma'

export const login = actionClient.schema(LoginSchema).action(async ({ parsedInput }) => {
  await mockDelay()
  const { email, password } = parsedInput
  await signIn('credentials', { email, password, redirectTo: APP_ROUTES.DASHBOARD })
})

export const logout = authClient.action(async () => {
  await mockDelay(1_000)
  await signOut({ redirectTo: APP_ROUTES.LOGIN })
})

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput }) => {
  await mockDelay()
  const { email, name, password } = parsedInput

  const userFromDB = await prisma.user.findUnique({ where: { email, active: true } })
  if (userFromDB) throw new CustomAuthError('USER_ALREADY_EXISTS')

  const hashedPassword = await hash(password, 10)
  await prisma.user.create({ data: { email, name, password: hashedPassword } })
  redirect(APP_ROUTES.LOGIN)
})
