import { FaRightToBracket } from 'react-icons/fa6'
import { Button, Loading } from 'rsc-daisyui'

export function FormButton({ text, isDisabled }: FormButtonProps) {
  return (
    <Button className='mt-3' color='primary' disabled={isDisabled} type='submit'>
      {isDisabled ? <Loading /> : <FaRightToBracket />}
      {text}
    </Button>
  )
}

export interface FormButtonProps {
  text: string
  isDisabled: boolean
}
