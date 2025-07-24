import type { NextAuthConfig } from 'next-auth'
import type { LoginSchemaType } from '@/lib/validations'
import type { User } from '@/types'
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
      async authorize(credentials): Promise<User> {
        const { email, password } = credentials as LoginSchemaType

        const userFromDB = await prisma.user.findUnique({
          where: { email, active: true },
          omit: { active: true, createdAt: true, updatedAt: true },
        })

        if (!userFromDB) throw new CustomAuthError('USER_DOES_NOT_EXIST')

        const isLoggedIn = await compare(password, userFromDB.password)
        if (!isLoggedIn) throw new CustomAuthError('INVALID_PASSWORD')

        const { password: _, ...loggedInUser } = userFromDB
        return loggedInUser satisfies User
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
