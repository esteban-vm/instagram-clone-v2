import type { CommentFormProps } from '../forms'
import { FaCommentAlt } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'

export interface AddCommentProps extends CommentFormProps {
  count: number
}

export function AddComment({ photoId, count }: AddCommentProps) {
  const handleClick = () => {
    const formField = document.getElementById(photoId)
    formField?.focus()
  }

  return (
    <Indicator>
      <Indicator.Badge color='neutral' size='xs'>
        {count}
      </Indicator.Badge>
      <Button shape='square' size='sm' link onClick={handleClick}>
        <FaCommentAlt className='size-full text-info' />
      </Button>
    </Indicator>
  )
}
