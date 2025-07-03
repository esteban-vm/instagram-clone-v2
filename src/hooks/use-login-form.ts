import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { Toasts } from '@/lib/toasts'
import { LoginSchema, mapErrors } from '@/lib/validations'

export const useLoginForm = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'errors.validation' })
  mapErrors(t)

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
        Toasts.handleExecute()
      },
      onSuccess() {
        Toasts.handleSuccess("Welcome back. You've successfully logged in!")
      },
      onError(args) {
        Toasts.handleError(args.error.serverError!)
      },
    },
  })

  return methods
}
