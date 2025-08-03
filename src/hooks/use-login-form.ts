import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { CUSTOM_AUTH_ERRORS } from '@/lib/constants'
import { mapAuthErrors } from '@/lib/errors'
import { Toasts } from '@/lib/toasts'
import { LoginSchema } from '@/lib/validations'

export const useLoginForm = () => {
  const { t: tToasts } = useTranslation('common', { keyPrefix: 'toasts' })
  const { t: tValidations } = useTranslation('common', { keyPrefix: 'validations' })

  mapAuthErrors(tValidations)

  const methods = useHookFormAction(AuthActions.login, zodResolver(LoginSchema), {
    formProps: {
      mode: 'onChange',
      delayError: 500,
      shouldUseNativeValidation: true,
      defaultValues: {
        email: '',
        password: '',
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
      onExecute() {
        Toasts.handleExecute(tToasts('loading'))
      },
      onSuccess() {
        Toasts.handleSuccess(tToasts('login_success'))
      },
      onError(args) {
        const error = args.error.serverError!

        switch (error) {
          case CUSTOM_AUTH_ERRORS.USER_DOES_NOT_EXIST: {
            Toasts.handleError(tToasts('login_error_email'))
            break
          }

          case CUSTOM_AUTH_ERRORS.INVALID_PASSWORD: {
            Toasts.handleError(tToasts('login_error_password'))
            break
          }

          default: {
            Toasts.handleError(error)
          }
        }
      },
    },
  })

  return methods
}
