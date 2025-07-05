import type { CUSTOM_AUTH_ERROR_TYPE } from '@/lib/constants'
import { CredentialsSignin } from 'next-auth'

export const CustomAuthError = class extends CredentialsSignin {
  code = 'custom_auth_error'
  message = ''

  constructor(message: CUSTOM_AUTH_ERROR_TYPE) {
    super()
    this.message = message
  }
}
