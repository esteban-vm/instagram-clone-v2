import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { AuthActions } from '@/actions'
import { Toasts } from '@/lib/toasts'
import { RegisterSchema, mapErrors } from '@/lib/validations'

export const useRegisterForm = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'errors.validation' })
  mapErrors(t)

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
        Toasts.handleExecute()
      },
      onSuccess() {
        Toasts.handleSuccess("Welcome. You've successfully registered!")
      },
      onError(args) {
        Toasts.handleError(args.error.serverError!)
      },
    },
  })

  return methods
}
