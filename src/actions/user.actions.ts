'use server'

import type { User } from '@/types'
import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const followUser = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }): Promise<User> => {
  const loggedInUserId = ctx.user.id
  const userToFollowId = parsedInput.id

  const followedUser: User = await prisma.user.update({
    omit: { password: true },
    where: { id: userToFollowId },
    data: { followers: { create: { followingId: loggedInUserId } } },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return followedUser
})

export const getSuggestedUsers = authClient.action(async ({ ctx }): Promise<User[]> => {
  const loggedInUserId = ctx.user.id

  const suggestedUsers: User[] = await prisma.user.findMany({
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
