import { useTranslation } from 'react-i18next'
import { Alert } from 'rsc-daisyui'
import { Components as $ } from '@/app/[locale]/dashboard/_styled'

export function PhotosAlert() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'timeline.photos_alert' })

  return (
    <Alert className='col-span-2 self-start justify-self-center px-3.5 py-2.5' color='warning'>
      <$.Alert.Icon />
      <div>
        <$.Alert.Title>{t('title')}</$.Alert.Title>
        <$.Alert.Separator />
        <$.Alert.Text>{t('text')}</$.Alert.Text>
      </div>
    </Alert>
  )
}
