import { FaCommentAlt } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'

export interface CommentButtonProps {
  count: number
}

export function CommentButton({ count }: CommentButtonProps) {
  return (
    <Indicator>
      <Indicator.Badge color='neutral' size='xs'>
        {count}
      </Indicator.Badge>
      <Button shape='square' size='sm' disabled link>
        <FaCommentAlt className='size-full text-info' />
      </Button>
    </Indicator>
  )
}
