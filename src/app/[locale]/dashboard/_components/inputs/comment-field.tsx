import { FaPen } from 'react-icons/fa6'
import { Join, Validator } from 'rsc-daisyui'

export function CommentField() {
  return (
    <Join as='form' className='mt-1.5 flex w-full max-w-2xl gap-1.5' onSubmit={(event) => event.preventDefault()}>
      <div className='grow'>
        <Join.Input as='label' className='w-full' size='sm' validator>
          <FaPen />
          <input placeholder='mail@site.com' type='email' required />
        </Join.Input>
        <Validator.Hint>Enter valid email address</Validator.Hint>
      </div>
      <Join.Button color='neutral' size='sm'>
        Comment
      </Join.Button>
    </Join>
  )
}
