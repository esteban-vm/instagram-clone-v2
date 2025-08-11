'use server'

import { revalidatePath } from 'next/cache'
import { APP_ROUTES } from '@/lib/constants'
import { authClient } from '@/lib/safe-action'
import { CommentSchema } from '@/lib/validations'
import { prisma } from '@/prisma'

export const createOne = authClient.schema(CommentSchema).action(async ({ ctx, parsedInput }) => {
  const loggedInUserId = ctx.user.id
  const { content, photoId } = parsedInput

  const newComment = await prisma.comment.create({
    data: { authorId: loggedInUserId, photoId, content },
  })

  revalidatePath(APP_ROUTES.DASHBOARD, 'layout')
  return newComment
})
