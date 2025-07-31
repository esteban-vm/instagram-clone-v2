'use server'

import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
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
      likes: true,
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

export const giveOrRemoveLike = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const photoId = parsedInput.id

  const updatedPhoto = await prisma.photo.findUnique({
    where: { id: photoId },
    include: { likes: true },
  })

  if (updatedPhoto) {
    const isLiked = updatedPhoto.likes.some((like) => like.userId === loggedInUserId)

    if (!isLiked) {
      await prisma.like.create({
        data: {
          photoId,
          userId: loggedInUserId,
        },
      })
    } else {
      await prisma.like.delete({
        where: {
          photoId_userId: {
            photoId,
            userId: loggedInUserId,
          },
        },
      })
    }
  }

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return updatedPhoto
})
