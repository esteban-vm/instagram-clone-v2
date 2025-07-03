import { useTranslation } from 'react-i18next'
import { Atoms } from '@/app/[locale]/(auth)/_components'
import { useRegisterForm } from '@/hooks'
import { APP_ROUTES, INPUT_PROPS } from '@/lib/constants'

export function RegisterForm() {
  const { t } = useTranslation('auth')

  const { handleSubmitWithAction, form } = useRegisterForm()
  const { register, formState } = form
  const { isSubmitting, errors } = formState
  const { email, name, password, confirmPassword } = errors
  const { EMAIL, NAME, PASSWORD_SIGNUP } = INPUT_PROPS

  return (
    <Atoms.FormWrapper onSubmit={handleSubmitWithAction}>
      <Atoms.FormLegend />

      <Atoms.FormInput
        {...register('email')}
        {...EMAIL}
        aria-label={t('aria_labels.email')}
        disabled={isSubmitting}
        error={email?.message}
        label={t('labels.email')}
        placeholder={t('placeholders.email')}
      />

      <Atoms.FormInput
        {...register('name')}
        {...NAME}
        aria-label={t('aria_labels.name')}
        disabled={isSubmitting}
        error={name?.message}
        label={t('labels.name')}
        placeholder={t('placeholders.name')}
      />

      <Atoms.FormInput
        {...register('password')}
        {...PASSWORD_SIGNUP}
        aria-label={t('aria_labels.password')}
        disabled={isSubmitting}
        error={password?.message}
        label={t('labels.password')}
      />

      <Atoms.FormInput
        {...register('confirmPassword')}
        {...PASSWORD_SIGNUP}
        aria-label={t('aria_labels.password_confirmation')}
        disabled={isSubmitting}
        error={confirmPassword?.message}
        label={t('labels.password_confirmation')}
      />

      <Atoms.FormButton isDisabled={isSubmitting} text={t('register.button')} />
      <Atoms.FormLink isDisabled={isSubmitting} route={APP_ROUTES.LOGIN} text={t('register.link')} />
    </Atoms.FormWrapper>
  )
}
