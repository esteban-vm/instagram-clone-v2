import type { Forms } from '@/app/[locale]/dashboard/_components'
import { FaCommentAlt } from 'react-icons/fa'
import { Button, Indicator } from 'rsc-daisyui'

export interface CommentButtonProps extends Forms.CommentFormProps {
  count: number
}

export function CommentButton({ photoId, count }: CommentButtonProps) {
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
