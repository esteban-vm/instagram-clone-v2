'use server'

import { mockDelay } from '@/lib/auth-utils'
import { authClient } from '@/lib/safe-action'
import { prisma } from '@/prisma'

export const getSuggestedUsers = authClient.action(async ({ ctx }): Promise<Models.User[]> => {
  await mockDelay()

  const userId = ctx.user.id

  const suggestedUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { name: 'asc' },
    omit: { active: true, createdAt: true, updatedAt: true, password: true },
    where: { active: true, id: { not: userId }, followers: { none: { followingId: userId } } },
  })

  return suggestedUsers
})
