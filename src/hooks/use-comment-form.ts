import type { Comment } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormOptimisticAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { useTranslation } from 'react-i18next'
import { CommentActions } from '@/actions'
import { mapAuthErrors } from '@/lib/errors'
import { CommentSchema } from '@/lib/validations'

export interface UseCommentFormProps {
  photoId: string
  comments: Partial<Comment>[]
}

export const useCommentForm = ({ photoId, comments }: UseCommentFormProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'validations' })
  mapAuthErrors(t)

  const methods = useHookFormOptimisticAction(CommentActions.leaveAComment, zodResolver(CommentSchema), {
    formProps: {
      mode: 'onChange',
      delayError: 1_000,
      shouldUseNativeValidation: true,
      defaultValues: {
        photoId,
        content: '',
      },
    },
    actionProps: {
      currentState: comments,
      updateFn(state, input) {
        return [...state, input]
      },
      onSettled() {
        methods.resetFormAndAction()
      },
    },
  })

  return methods
}
