'use server'

import type { Photo } from '@/types'
import { authClient } from '@/lib/safe-action'
import { prisma } from '@/prisma'

export const getPhotos = authClient.action(async ({ ctx }): Promise<Photo[]> => {
  const loggedInUserId = ctx.user.id

  const loggedInUser = await prisma.user.findUnique({
    omit: { password: true },
    include: { following: true },
    where: { id: loggedInUserId },
  })

  const following = loggedInUser?.following.map((f) => f.followerId)
  const photos: Photo[] = await prisma.photo.findMany({ where: { ownerId: { in: following } } })
  return photos
})
