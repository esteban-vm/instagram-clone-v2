import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { APP_ROUTES, CUSTOM_AUTH_ERRORS } from '@/lib/constants'
import { CustomAuthError } from '@/lib/errors'
import { prisma } from '@/prisma'

export default {
  trustHost: true,
  pages: {
    signIn: APP_ROUTES.LOGIN,
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<Models.User> {
        const { email, password } = credentials as Schemas.Login

        const userFromDB = await prisma.user.findUnique({ where: { email } })
        if (!userFromDB) throw new CustomAuthError(CUSTOM_AUTH_ERRORS[1])

        const isLoggedIn = await compare(password, userFromDB.password)
        if (!isLoggedIn) throw new CustomAuthError(CUSTOM_AUTH_ERRORS[2])

        const { password: _, ...loggedInUser } = userFromDB
        return loggedInUser satisfies Models.User
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
