import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPaperPlane, FaPen } from 'react-icons/fa6'
import { Join, Validator } from 'rsc-daisyui'
import { useCommentForm } from '@/hooks'

export interface CommentFormProps {
  photoId: string
}

export function CommentForm({ photoId }: CommentFormProps) {
  const [isDisabled, setIsDisabled] = useState(true)
  const { t } = useTranslation('dashboard', { keyPrefix: 'timeline.comment_form' })

  const { handleSubmitWithAction, form } = useCommentForm(photoId)
  const { register, formState } = form
  const { isSubmitting, isValid, errors } = formState
  const error = errors.content?.message

  useEffect(() => {
    const timer = setTimeout(() => setIsDisabled(false), 1_500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Join as='form' className='flex w-full max-w-2xl gap-1.5' noValidate onSubmit={handleSubmitWithAction}>
      <div className='grow pb-6'>
        <Join.Input as='label' className='w-full' color='secondary' size='sm' validator>
          <FaPen opacity={0.5} />
          <input
            {...register('content')}
            aria-invalid={error ? 'true' : 'false'}
            aria-label={t('aria_label')}
            autoComplete='off'
            disabled={isDisabled || isSubmitting}
            id={photoId}
            maxLength={50}
            minLength={4}
            placeholder={t('placeholder')}
            spellCheck='false'
            type='text'
          />
        </Join.Input>
        <Validator.Hint className='mt-0'>{error}</Validator.Hint>
      </div>
      <Join.Button color='secondary' disabled={isDisabled || !isValid} shape='square' size='sm' type='submit'>
        <FaPaperPlane />
      </Join.Button>
    </Join>
  )
}
