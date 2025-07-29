import { useAction } from 'next-safe-action/hooks'
import { FaRegHeart } from 'react-icons/fa'
import { Button } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'

export function LikeButton({ photoId }: LikeButtonProps) {
  const { execute, isExecuting } = useAction(PhotoActions.giveLike)
  const handleClick = () => execute({ id: photoId })

  return (
    <Button disabled={isExecuting} shape='square' size='sm' link onClick={handleClick}>
      <FaRegHeart className='size-4/5 text-pink-500' />
    </Button>
  )
}

export interface LikeButtonProps {
  photoId: string
}
