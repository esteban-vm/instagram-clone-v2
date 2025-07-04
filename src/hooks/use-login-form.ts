import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { Toasts } from '@/lib/toasts'
import { LoginSchema, mapErrors } from '@/lib/validations'

export const useLoginForm = () => {
  const { t: tToasts } = useTranslation('auth', { keyPrefix: 'feedbacks.toasts' })
  const { t: tValidations } = useTranslation('auth', { keyPrefix: 'feedbacks.validations' })

  mapErrors(tValidations)

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
        Toasts.handleError(args.error.serverError!)
      },
    },
  })

  return methods
}
