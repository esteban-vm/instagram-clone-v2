'use server'

import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { SchemaWithId } from '@/lib/validations'
import { prisma } from '@/prisma'

export const follow = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const userToFollowId = parsedInput.id

  const followedUser = await prisma.user.update({
    omit: { password: true },
    where: { id: userToFollowId, active: true },
    data: {
      followers: {
        create: { followingId: loggedInUserId },
      },
    },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return followedUser
})

export const getById = authClient.schema(SchemaWithId).action(
  cache(async ({ parsedInput }) => {
    const userId = parsedInput.id

    const userById = await prisma.user.findUnique({
      omit: { password: true },
      where: { id: userId, active: true },
      include: {
        followers: true,
        photos: {
          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
        _count: {
          select: {
            photos: true,
            followers: true,
            following: true,
          },
        },
      },
    })

    return userById
  })
)

export const getSuggestions = authClient.action(
  cache(async ({ ctx }) => {
    const loggedInUserId = ctx.user.id

    const suggestedUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { name: 'asc' },
      omit: { password: true },
      where: {
        active: true,
        id: { not: loggedInUserId },
        followers: {
          none: { followingId: loggedInUserId },
        },
      },
    })

    return suggestedUsers
  })
)

export const toggleFollow = authClient.schema(SchemaWithId).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const userToUpdateId = parsedInput.id

  const updatedUser = await prisma.user.findUnique({
    where: { id: userToUpdateId },
    include: { followers: true },
  })

  if (updatedUser) {
    const isFollowed = updatedUser.followers.some((f) => f.followingId === loggedInUserId)

    if (!isFollowed) {
      await prisma.follow.create({
        data: {
          followerId: userToUpdateId,
          followingId: loggedInUserId,
        },
      })
    } else {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: userToUpdateId,
            followingId: loggedInUserId,
          },
        },
      })
    }
  }

  revalidatePath(APP_ROUTES.USER, 'page')
  return updatedUser
})
