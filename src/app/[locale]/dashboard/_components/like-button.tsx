import type { Like } from '@prisma/client'
import { useAction } from 'next-safe-action/hooks'
import { FaRegHeart } from 'react-icons/fa'
import { Button } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { useCurrentSession } from '@/hooks'
import { cn } from '@/lib/tw-utils'

export function LikeButton({ photoId, likes }: LikeButtonProps) {
  const { currentSession } = useCurrentSession()
  const isLiked = likes.some((like) => like.userId === currentSession?.user.id)

  const { execute, isExecuting } = useAction(PhotoActions.giveOrRemoveLike)
  const handleClick = () => execute({ id: photoId })

  return (
    <Button disabled={isExecuting} shape='square' size='sm' link onClick={handleClick}>
      <FaRegHeart className={cn('size-4/5', isLiked ? 'text-pink-500' : 'text-neutral-500')} />
    </Button>
  )
}

export interface LikeButtonProps {
  photoId: string
  likes: Like[]
}
