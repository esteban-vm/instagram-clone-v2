import type { UseCommentFormProps as CommentFormProps } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { FaPaperPlane, FaPen } from 'react-icons/fa6'
import { Join, Validator } from 'rsc-daisyui'
import { useCommentForm } from '@/hooks'

export function CommentForm(props: CommentFormProps) {
  const { t } = useTranslation('dashboard', { keyPrefix: 'timeline.comment_form' })

  const { handleSubmitWithAction, form } = useCommentForm(props)
  const { register, formState } = form
  const { isSubmitting, errors } = formState
  const error = errors.content?.message

  return (
    <Join as='form' className='flex w-full max-w-2xl gap-1.5' noValidate onSubmit={handleSubmitWithAction}>
      <div className='grow pb-6'>
        <Join.Input as='label' className='w-full' color='secondary' size='sm' validator>
          <FaPen opacity={0.5} />
          <input
            {...register('content')}
            aria-invalid={error ? 'true' : 'false'}
            aria-label={t('aria_label')}
            disabled={isSubmitting}
            maxLength={50}
            minLength={4}
            placeholder={t('placeholder')}
            type='text'
          />
        </Join.Input>
        <Validator.Hint className='mt-0'>{error}</Validator.Hint>
      </div>
      <Join.Button color='secondary' disabled={isSubmitting} shape='square' size='sm'>
        <FaPaperPlane />
      </Join.Button>
    </Join>
  )
}
