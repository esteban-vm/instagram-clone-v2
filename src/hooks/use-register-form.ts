import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { AUTH_ERRORS } from '@/lib/constants'
import { Toasts } from '@/lib/toasts'
import { RegisterSchema, mapErrors } from '@/lib/validations'

export const useRegisterForm = () => {
  const { t: tToasts } = useTranslation('auth', { keyPrefix: 'feedbacks.toasts' })
  const { t: tValidations } = useTranslation('auth', { keyPrefix: 'feedbacks.validations' })

  mapErrors(tValidations)

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
          case AUTH_ERRORS[1]: {
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
