import type { Role } from '@prisma/client'
import type { User as UserType } from '@/types'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User extends UserType {
    id: string
    name: string
    email: string
  }

  interface Session {
    user: UserType
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role | null
    avatar?: string | null
  }
}
