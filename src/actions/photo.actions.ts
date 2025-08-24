'use server'

import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const getSuggestions = authClient.action(
  cache(async ({ ctx }) => {
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
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        owner: {
          omit: { password: true },
        },
        likes: true,
        comments: {
          take: 3,
          include: { author: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    return suggestedPhotos
  })
)

export const toggleLike = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const photoToUpdateId = parsedInput.id

  const updatedPhoto = await prisma.photo.findUnique({
    where: { id: photoToUpdateId },
    include: { likes: true },
  })

  if (updatedPhoto) {
    const isLiked = updatedPhoto.likes.some((like) => like.userId === loggedInUserId)

    if (!isLiked) {
      await prisma.like.create({
        data: {
          photoId: photoToUpdateId,
          userId: loggedInUserId,
        },
      })
    } else {
      await prisma.like.delete({
        where: {
          photoId_userId: {
            photoId: photoToUpdateId,
            userId: loggedInUserId,
          },
        },
      })
    }
  }

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return updatedPhoto
})
