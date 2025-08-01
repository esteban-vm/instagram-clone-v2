'use client'

import type { JSX } from 'react'
import type { IconType } from 'react-icons/lib'
import { useId } from 'react'
import { Fieldset, Input, Validator } from 'rsc-daisyui'

export type FormInputBaseProps = Omit<JSX.IntrinsicElements['input'], 'id' | 'children'>

export interface FormInputProps extends FormInputBaseProps {
  icon: IconType
  label: string
  error?: string
}

export function FormInput({ icon: Icon, label, error, name, ...rest }: FormInputProps) {
  const id = useId()

  return (
    <>
      <Fieldset.Label className='fieldset-label cursor-pointer font-semibold capitalize' htmlFor={id}>
        {label}:
      </Fieldset.Label>
      <Input as='div' className='w-full' color='primary' validator>
        <Icon opacity={0.5} />
        <input {...rest} aria-invalid={error ? 'true' : 'false'} id={id} name={name} />
      </Input>
      <Validator.Hint as='small' className='mt-0' role='alert'>
        {error}
      </Validator.Hint>
    </>
  )
}
