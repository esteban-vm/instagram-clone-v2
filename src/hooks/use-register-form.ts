import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { CUSTOM_AUTH_ERRORS } from '@/lib/constants'
import { mapAuthErrors } from '@/lib/errors'
import { Toasts } from '@/lib/toasts'
import { RegisterSchema } from '@/lib/validations'

export const useRegisterForm = () => {
  const { t: tToasts } = useTranslation('common', { keyPrefix: 'toasts' })
  const { t: tValidations } = useTranslation('common', { keyPrefix: 'validations' })

  mapAuthErrors(tValidations)

  const methods = useHookFormAction(AuthActions.register, zodResolver(RegisterSchema), {
    formProps: {
      mode: 'onChange',
      shouldUseNativeValidation: true,
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        Toasts.handleSuccess(tToasts('register_success'))
      },
      onError(args) {
        const error = args.error.serverError!

        switch (error) {
          case CUSTOM_AUTH_ERRORS.USER_ALREADY_EXISTS: {
            Toasts.handleError(tToasts('register_error'))
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
