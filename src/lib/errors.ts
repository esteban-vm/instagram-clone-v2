import type { Namespace, TFunction } from 'i18next'
import { CredentialsSignin } from 'next-auth'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { CUSTOM_AUTH_ERRORS } from '@/lib/constants'

export type CUSTOM_AUTH_ERROR_TYPE = keyof typeof CUSTOM_AUTH_ERRORS

export const CustomAuthError = class extends CredentialsSignin {
  code = 'custom_auth_error'
  message = ''

  constructor(key: CUSTOM_AUTH_ERROR_TYPE) {
    super()
    this.message = CUSTOM_AUTH_ERRORS[key]
  }
}

export const mapAuthErrors = (t: TFunction<'common'>) => {
  const ns: Namespace = 'common'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorMap = makeZodI18nMap({ t, ns })
  z.setErrorMap(errorMap)
}
