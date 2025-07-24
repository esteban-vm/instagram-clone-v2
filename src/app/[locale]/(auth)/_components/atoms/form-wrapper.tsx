import type { FormEventHandler, ReactNode } from 'react'
import { Fieldset } from 'rsc-daisyui'

export function FormWrapper({ children, onSubmit }: FormWrapperProps) {
  return (
    <Fieldset as='form' noValidate onSubmit={onSubmit}>
      {children}
    </Fieldset>
  )
}

export interface FormWrapperProps {
  children: ReactNode
  onSubmit: FormEventHandler<HTMLFormElement>
}
