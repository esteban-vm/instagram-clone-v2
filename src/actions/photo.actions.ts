'use server'

import type { Photo } from '@/types'
import { authClient } from '@/lib/safe-action'
import { prisma } from '@/prisma'

export const getSuggestedPhotos = authClient.action(async ({ ctx }): Promise<Photo[]> => {
  const loggedInUserId = ctx.user.id

  const loggedInUser = await prisma.user.findUnique({
    where: { id: loggedInUserId },
    select: { following: { select: { followerId: true } } },
  })

  const followingUsers = loggedInUser?.following.map((f) => f.followerId)
  const suggestedPhotos: Photo[] = await prisma.photo.findMany({ where: { ownerId: { in: followingUsers } } })
  return suggestedPhotos
})
