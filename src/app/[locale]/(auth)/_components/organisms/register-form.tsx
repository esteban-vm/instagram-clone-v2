import { useTranslation } from 'react-i18next'
import { Atoms, Molecules } from '@/app/[locale]/(auth)/_components'
import { useRegisterForm } from '@/hooks'
import { INPUT_PROPS } from '@/lib/constants'

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
        {...NAME}
        {...register('name')}
        aria-label={t('aria_labels.name')}
        disabled={isSubmitting}
        error={name?.message}
        label={t('labels.name')}
        placeholder={t('placeholders.name')}
      />

      <Molecules.FormInput
        {...PASSWORD_SIGNUP}
        {...register('password')}
        aria-label={t('aria_labels.password')}
        disabled={isSubmitting}
        error={password?.message}
        label={t('labels.password')}
      />

      <Molecules.FormInput
        {...PASSWORD_SIGNUP}
        {...register('confirmPassword')}
        aria-label={t('aria_labels.password_confirmation')}
        disabled={isSubmitting}
        error={confirmPassword?.message}
        label={t('labels.password_confirmation')}
      />

      <Atoms.FormButton isDisabled={isSubmitting} text={t('register.button')} />
      <Atoms.FormLink isDisabled={isSubmitting} route='/login' text={t('register.link')} />
    </Atoms.FormWrapper>
  )
}
