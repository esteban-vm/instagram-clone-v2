'use server'

import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const getSuggestedPhotos = authClient.action(async ({ ctx }) => {
  const loggedInUserId = ctx.user.id

  const loggedInUser = await prisma.user.findUnique({
    where: { id: loggedInUserId },
    select: { following: { select: { followerId: true } } },
  })

  const followingUserIds = loggedInUser?.following.map((f) => f.followerId)

  const suggestedPhotos = await prisma.photo.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    where: { ownerId: { in: followingUserIds } },
    include: {
      _count: { select: { likes: true, comments: true } },
      owner: { omit: { password: true } },
      comments: {
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          content: true,
          author: { select: { name: true } },
        },
      },
    },
  })

  return suggestedPhotos
})

export const giveLike = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const photoToLikeId = parsedInput.id

  console.log({ loggedInUserId, photoToLikeId })
})
