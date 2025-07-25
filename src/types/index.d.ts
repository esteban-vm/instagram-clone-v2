import type { Photo as PhotoDB, User as UserDB } from '@prisma/client'

export type Photo = Omit<PhotoDB, 'createdAt' | 'updatedAt'>
export type User = Omit<UserDB, 'password' | 'active' | 'createdAt' | 'updatedAt'>
