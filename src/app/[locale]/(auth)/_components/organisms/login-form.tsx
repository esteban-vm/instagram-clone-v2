import { useTranslation } from 'react-i18next'
import { Atoms, Molecules } from '@/app/[locale]/(auth)/_components'
import { useLoginForm } from '@/hooks'
import { AUTH_INPUT_PROPS } from '@/lib/constants'

export function LoginForm() {
  const { t } = useTranslation('auth')

  const { handleSubmitWithAction, form } = useLoginForm()
  const { register, formState } = form
  const { isSubmitting, errors } = formState
  const { email, password } = errors
  const { EMAIL, PASSWORD_SIGNIN } = AUTH_INPUT_PROPS

  return (
    <Atoms.FormWrapper onSubmit={handleSubmitWithAction}>
      <Atoms.FormLegend />

      <Molecules.FormInput
        {...EMAIL}
        {...register('email')}
        aria-label={t('aria_labels.email')}
        disabled={isSubmitting}
        error={email?.message}
        label={t('labels.email')}
        placeholder={t('placeholders.email')}
      />

      <Molecules.FormInput
        {...PASSWORD_SIGNIN}
        {...register('password')}
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
