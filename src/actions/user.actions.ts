'use server'

import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const followUser = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const userToFollowId = parsedInput.id

  const followedUser = await prisma.user.update({
    omit: { password: true },
    where: { id: userToFollowId, active: true },
    data: { followers: { create: { followingId: loggedInUserId } } },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return followedUser
})

export const getSuggestedUsers = authClient.action(async ({ ctx }) => {
  const loggedInUserId = ctx.user.id

  const suggestedUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { password: true },
    where: {
      active: true,
      id: { not: loggedInUserId },
      followers: { none: { followingId: loggedInUserId } },
    },
  })

  return suggestedUsers
})

export const getUserById = authClient.schema(SchemaWithId).action(async ({ parsedInput }) => {
  const userId = parsedInput.id

  const userById = await prisma.user.findUnique({
    omit: { password: true },
    where: { id: userId, active: true },
    include: {
      photos: true,
      followers: true,
      _count: {
        select: {
          photos: true,
          followers: true,
          following: true,
        },
      },
    },
  })

  return userById
})
