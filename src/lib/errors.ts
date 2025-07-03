import { CredentialsSignin } from 'next-auth'

export const CustomAuthError = class extends CredentialsSignin {
  code = 'custom_auth_error'
  message = ''

  constructor(message: string) {
    super()
    this.message = message
  }
}
