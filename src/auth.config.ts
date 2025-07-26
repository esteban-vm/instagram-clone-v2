import type { NextAuthConfig } from 'next-auth'
import type { LoginSchemaType } from '@/lib/validations'
import type { UserType } from '@/types'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { APP_ROUTES } from '@/lib/constants'
import { CustomAuthError } from '@/lib/errors'
import { prisma } from '@/prisma'

export default {
  trustHost: true,
  pages: {
    signIn: APP_ROUTES.LOGIN,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.avatar = user.avatar
      }

      return token
    },
    session({ token, session }) {
      const { sub, email, name, role, avatar } = token

      if (sub) session.user.id = sub
      if (email) session.user.email = email
      if (name) session.user.name = name
      if (role) session.user.role = role
      if (avatar) session.user.avatar = avatar

      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<UserType> {
        const { email, password } = credentials as LoginSchemaType

        const savedUser = await prisma.user.findUnique({ where: { email, active: true } })
        if (!savedUser) throw new CustomAuthError('USER_DOES_NOT_EXIST')

        const isLoggedIn = await compare(password, savedUser.password)
        if (!isLoggedIn) throw new CustomAuthError('INVALID_PASSWORD')

        const { password: _, ...loggedInUser } = savedUser
        return loggedInUser satisfies UserType
      },
    }),
  ],
  logger: {
    error(error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error.name, error.message)
      }
    },
  },
} satisfies NextAuthConfig
