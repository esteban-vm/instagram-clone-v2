import type { Like } from '@prisma/client'
import { useAction } from 'next-safe-action/hooks'
import { FaHeart } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { useCurrentSession } from '@/hooks'
import { cn } from '@/lib/tw-utils'

export interface LikeButtonProps {
  photoId: string
  likes: Like[]
  likesCount: number
}

export function LikeButton({ photoId, likes, likesCount }: LikeButtonProps) {
  const { currentSession } = useCurrentSession()
  const isLiked = likes.some((like) => like.userId === currentSession?.user.id)

  const { execute, isExecuting } = useAction(PhotoActions.giveOrRemoveLike)
  const handleClick = () => execute({ id: photoId })

  return (
    <Indicator>
      <Indicator.Badge color='neutral' size='xs'>
        {likesCount}
      </Indicator.Badge>
      <Button disabled={isExecuting} shape='square' size='sm' link onClick={handleClick}>
        <FaHeart className={cn('size-full', isLiked ? 'text-pink-500' : 'text-neutral-500')} />
      </Button>
    </Indicator>
  )
}
