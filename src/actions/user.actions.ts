'use server'

import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const followUser = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }): Promise<Models.User> => {
  const loggedInUserId = ctx.user.id
  const userToFollowId = parsedInput.id

  const followedUser = await prisma.user.update({
    where: { id: userToFollowId },
    data: { followers: { create: { followingId: loggedInUserId } } },
    omit: { active: true, createdAt: true, updatedAt: true, password: true },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return followedUser
})

export const getSuggestedUsers = authClient.action(async ({ ctx }): Promise<Models.User[]> => {
  const loggedInUserId = ctx.user.id

  const suggestedUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { active: true, createdAt: true, updatedAt: true, password: true },
    where: { active: true, id: { not: loggedInUserId }, followers: { none: { followingId: loggedInUserId } } },
  })

  return suggestedUsers
})
