import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { CommentActions } from '@/actions'
import { mapAuthErrors } from '@/lib/errors'
import { CommentSchema } from '@/lib/validations'

export const useCommentForm = () => {
  const { t } = useTranslation('common', { keyPrefix: 'validations' })
  mapAuthErrors(t)

  const methods = useHookFormAction(CommentActions.leaveAComment, zodResolver(CommentSchema), {
    formProps: {
      mode: 'onChange',
      delayError: 1_000,
      shouldUseNativeValidation: true,
      defaultValues: {
        photoId: '',
        content: '',
      },
    },
    actionProps: {
      onSettled() {
        methods.resetFormAndAction()
      },
    },
  })

  return methods
}
