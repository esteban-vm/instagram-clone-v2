'use server'

import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const followUser = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const userId = parsedInput.id

  const user = await prisma.user.update({
    omit: { password: true },
    where: { id: userId, active: true },
    data: { followers: { create: { followingId: loggedInUserId } } },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return user
})

export const getSuggestedUsers = authClient.action(async ({ ctx }) => {
  const loggedInUserId = ctx.user.id

  const users = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { password: true },
    where: {
      active: true,
      id: { not: loggedInUserId },
      followers: { none: { followingId: loggedInUserId } },
    },
  })

  return users
})

export const getUserById = authClient.schema(SchemaWithId).action(async ({ parsedInput }) => {
  const userId = parsedInput.id

  const user = await prisma.user.findUnique({
    omit: { password: true },
    where: { id: userId, active: true },
    include: { photos: true },
  })

  return user
})
