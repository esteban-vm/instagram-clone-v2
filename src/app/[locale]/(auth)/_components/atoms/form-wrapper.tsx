import type { FormEventHandler } from 'react'
import { Fieldset } from 'rsc-daisyui'

export function FormWrapper({ children, onSubmit }: FormWrapperProps) {
  return (
    <Fieldset as='form' noValidate onSubmit={onSubmit}>
      {children}
    </Fieldset>
  )
}

export interface FormWrapperProps extends Props.WithChildren {
  onSubmit: FormEventHandler<HTMLFormElement>
}
