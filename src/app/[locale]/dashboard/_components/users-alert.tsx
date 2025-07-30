import { useTranslation } from 'react-i18next'
import { Alert } from 'rsc-daisyui'
import { Common as $ } from '@/app/[locale]/dashboard/_styled'

export function UsersAlert() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.users_alert' })

  return (
    <Alert className='mx-auto w-full max-w-fit px-3.5 py-2.5' color='info' soft>
      <$.Alert.Icon />
      <div>
        <$.Alert.Title>{t('title')}</$.Alert.Title>
        <$.Alert.Separator />
        <$.Alert.Text>{t('text')}</$.Alert.Text>
      </div>
    </Alert>
  )
}
