import { FaCommentAlt } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'

export interface CommentButtonProps {
  commentsCount: number
}

export function CommentButton({ commentsCount }: CommentButtonProps) {
  return (
    <Indicator>
      <Indicator.Badge color='neutral' size='xs'>
        {commentsCount}
      </Indicator.Badge>
      <Button shape='square' size='sm' link>
        <FaCommentAlt className='size-full text-info' />
      </Button>
    </Indicator>
  )
}
