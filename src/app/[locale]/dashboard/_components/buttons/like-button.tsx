import type { Like } from '@prisma/client'
import type { Buttons } from '@/app/[locale]/dashboard/_components'
import { useAction } from 'next-safe-action/hooks'
import { FaHeart } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { cn } from '@/lib/tw-utils'

export interface LikeButtonProps extends Buttons.CommentButtonProps {
  userId: string
  likes: Like[]
}

export function LikeButton({ photoId, userId, likes, count }: LikeButtonProps) {
  const isLiked = likes.some((like) => like.userId === userId)
  const { execute, isExecuting } = useAction(PhotoActions.giveOrRemoveLike)
  const handleClick = () => execute({ id: photoId })

  return (
    <Indicator>
      <Indicator.Badge color='neutral' size='xs'>
        {count}
      </Indicator.Badge>
      <Button disabled={isExecuting} shape='square' size='sm' link onClick={handleClick}>
        <FaHeart className={cn('size-full', isLiked ? 'text-pink-500' : 'text-neutral-500')} />
      </Button>
    </Indicator>
  )
}
