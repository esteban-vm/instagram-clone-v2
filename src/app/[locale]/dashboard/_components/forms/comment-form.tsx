import { FaPaperPlane, FaPen } from 'react-icons/fa6'
import { Join, Validator } from 'rsc-daisyui'

export function CommentForm() {
  return (
    <Join as='form' className='flex w-full max-w-2xl gap-1.5' onSubmit={(event) => event.preventDefault()}>
      <div className='grow'>
        <Join.Input as='label' className='w-full' color='secondary' size='sm' validator>
          <FaPen />
          <input placeholder='Write your comment' type='text' required />
        </Join.Input>
        <Validator.Hint className='mt-0.5 pb-1.5'>Enter a valid comment</Validator.Hint>
      </div>
      <Join.Button color='secondary' shape='square' size='sm'>
        <FaPaperPlane />
      </Join.Button>
    </Join>
  )
}
