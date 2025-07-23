'use server'

import { revalidatePath } from 'next/cache'
import { mockDelay } from '@/lib/auth-utils'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const followUser = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  await mockDelay(1_000)

  const userId = ctx.user.id
  const userToFollowId = parsedInput.id

  await prisma.user.update({
    where: { id: userToFollowId },
    data: { followers: { create: { followingId: userId } } },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
})

export const getSuggestedUsers = authClient.action(async ({ ctx }): Promise<Models.User[]> => {
  await mockDelay(2_000)
  const userId = ctx.user.id

  const suggestedUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { active: true, createdAt: true, updatedAt: true, password: true },
    where: { active: true, id: { not: userId }, followers: { none: { followingId: userId } } },
  })

  return suggestedUsers
})
