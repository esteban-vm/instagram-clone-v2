'use server'

import { hash } from 'bcryptjs'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { APP_ROUTES, CUSTOM_AUTH_ERRORS } from '@/lib/constants'
import { CustomAuthError } from '@/lib/errors'
import { actionClient } from '@/lib/safe-action'
import { LoginSchema, RegisterSchema } from '@/lib/validations'
import { prisma } from '@/prisma'

export const login = actionClient.schema(LoginSchema).action(async ({ parsedInput }) => {
  await delay()
  const { email, password } = parsedInput
  await signIn('credentials', { email, password, redirect: false })
  redirect(APP_ROUTES.LOGIN)
})

export const register = actionClient.schema(RegisterSchema).action(async ({ parsedInput }) => {
  await delay()
  const { email, name, password } = parsedInput

  const userFromDB = await prisma.user.findUnique({ where: { email } })
  if (userFromDB) throw new CustomAuthError(CUSTOM_AUTH_ERRORS[0])

  const hashedPassword = await hash(password, 10)
  await prisma.user.create({ data: { email, name, password: hashedPassword } })
  redirect(APP_ROUTES.LOGIN)
})

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 5000))
}
