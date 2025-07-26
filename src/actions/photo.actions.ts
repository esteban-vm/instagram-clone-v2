'use server'

import type { Comment, Like, Photo } from '@prisma/client'
import { authClient } from '@/lib/safe-action'
import { prisma } from '@/prisma'

interface SuggestedPhoto extends Photo {
  likes: Like[]
  comments: Comment[]
}

export const getSuggestedPhotos = authClient.action(async ({ ctx }): Promise<SuggestedPhoto[]> => {
  const loggedInUserId = ctx.user.id

  const loggedInUser = await prisma.user.findUnique({
    where: { id: loggedInUserId },
    select: { following: { select: { followerId: true } } },
  })

  const followingUsers = loggedInUser?.following.map((f) => f.followerId)

  const suggestedPhotos: SuggestedPhoto[] = await prisma.photo.findMany({
    take: 3,
    where: { ownerId: { in: followingUsers } },
    include: { likes: true, comments: true },
    orderBy: { updatedAt: 'desc' },
  })

  return suggestedPhotos
})
