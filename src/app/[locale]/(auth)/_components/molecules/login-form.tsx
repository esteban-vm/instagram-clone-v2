import type { Session } from 'next-auth'
import { useTranslation } from 'react-i18next'
import { Fieldset } from 'rsc-daisyui'
import { Atoms } from '@/app/[locale]/(auth)/_components'
import { useLocalePath, useLoginForm } from '@/hooks'
import { APP_ROUTES, INPUT_PROPS } from '@/lib/constants'

export function LoginForm({ session }: LoginFormProps) {
  const localePath = useLocalePath('login')
  const { t } = useTranslation('auth')

  const { handleSubmitWithAction, form } = useLoginForm()
  const { register, formState } = form
  const { isSubmitting, errors } = formState
  const { email, password } = errors
  const { EMAIL, PASSWORD_SIGNIN } = INPUT_PROPS

  const className = 'mt-2.5 text-center font-semibold italic'

  return (
    <Fieldset as='form' noValidate onSubmit={handleSubmitWithAction}>
      <Atoms.FormLegend />

      <span className={className}>{session?.user.name ?? 'not authenticated'}</span>
      <span className={className}>{localePath}</span>

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
        {...register('password')}
        {...PASSWORD_SIGNIN}
        aria-label={t('aria_labels.password')}
        disabled={isSubmitting}
        error={password?.message}
        label={t('labels.password')}
      />

      <Atoms.FormButton isDisabled={isSubmitting} text={t('login.button')} />
      <Atoms.FormLink isDisabled={isSubmitting} route={APP_ROUTES.REGISTER} text={t('login.link')} />
    </Fieldset>
  )
}

export interface LoginFormProps {
  session: Session | null
}
