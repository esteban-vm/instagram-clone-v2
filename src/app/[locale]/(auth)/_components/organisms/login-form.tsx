import type { Session } from 'next-auth'
import { useTranslation } from 'react-i18next'
import { Atoms, Molecules } from '@/app/[locale]/(auth)/_components'
import { useLoginForm } from '@/hooks'
import { INPUT_PROPS } from '@/lib/constants'

export function LoginForm({ session }: LoginFormProps) {
  const { t } = useTranslation('auth')

  const { handleSubmitWithAction, form } = useLoginForm()
  const { register, formState } = form
  const { isSubmitting, errors } = formState
  const { email, password } = errors
  const { EMAIL, PASSWORD_SIGNIN } = INPUT_PROPS

  return (
    <Atoms.FormWrapper onSubmit={handleSubmitWithAction}>
      <Atoms.FormLegend />
      <span className='mt-2.5 text-center font-semibold italic'>{session?.user.name ?? 'not authenticated'}</span>

      <Molecules.FormInput
        {...register('email')}
        {...EMAIL}
        aria-label={t('aria_labels.email')}
        disabled={isSubmitting}
        error={email?.message}
        label={t('labels.email')}
        placeholder={t('placeholders.email')}
      />

      <Molecules.FormInput
        {...register('password')}
        {...PASSWORD_SIGNIN}
        aria-label={t('aria_labels.password')}
        disabled={isSubmitting}
        error={password?.message}
        label={t('labels.password')}
      />

      <Atoms.FormButton isDisabled={isSubmitting} text={t('login.button')} />
      <Atoms.FormLink isDisabled={isSubmitting} route='/register' text={t('login.link')} />
    </Atoms.FormWrapper>
  )
}

export interface LoginFormProps {
  session: Session | null
}
