import type { FormEventHandler, ReactNode } from 'react'
import { Fieldset } from 'rsc-daisyui'

export interface FormWrapperProps {
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function FormWrapper({ children, onSubmit }: FormWrapperProps) {
  return (
    <Fieldset as='form' noValidate onSubmit={onSubmit}>
      {children}
    </Fieldset>
  )
}
