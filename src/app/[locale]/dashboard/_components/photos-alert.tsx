import { useTranslation } from 'react-i18next'
import { BsInfoCircleFill } from 'react-icons/bs'
import { Alert } from 'rsc-daisyui'

export function PhotosAlert() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'timeline' })

  return (
    <Alert className='col-span-2 h-14 justify-self-center italic'>
      <BsInfoCircleFill className='size-full' />
      <span>{t('photos_alert')}</span>
    </Alert>
  )
}
