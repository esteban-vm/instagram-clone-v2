import { CredentialsSignin } from 'next-auth'
import { CUSTOM_AUTH_ERRORS } from '@/lib/constants'

type CUSTOM_AUTH_ERROR_TYPE = keyof typeof CUSTOM_AUTH_ERRORS

export const CustomAuthError = class extends CredentialsSignin {
  code = 'custom_auth_error'
  message = ''

  constructor(key: CUSTOM_AUTH_ERROR_TYPE) {
    super()
    this.message = CUSTOM_AUTH_ERRORS[key]
  }
}
