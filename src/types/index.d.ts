import type { User } from '@prisma/client'

export type UserType = Omit<User, 'password' | 'active' | 'createdAt' | 'updatedAt'>
