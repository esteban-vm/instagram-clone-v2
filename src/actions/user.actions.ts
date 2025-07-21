'use server'

import { authClient } from '@/lib/safe-action'
import { prisma } from '@/prisma'

export const getSuggestedUsers = authClient.action(async ({ ctx }): Promise<Models.User[]> => {
  const userId = ctx.user.id

  const suggestedUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { active: true, createdAt: true, updatedAt: true, password: true },
    where: { active: true, id: { not: userId }, following: { none: { followerId: userId } } },
  })

  return suggestedUsers
})
