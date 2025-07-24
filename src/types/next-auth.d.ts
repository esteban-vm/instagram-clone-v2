import type { Role } from '@prisma/client'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User extends Models.User {
    id: string
    name: string
    email: string
  }

  interface Session {
    user: Models.User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role | null
    avatar?: string | null
  }
}
