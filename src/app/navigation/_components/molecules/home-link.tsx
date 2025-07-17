import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { FaHome } from 'react-icons/fa'
import { Button } from 'rsc-daisyui'
import { APP_ROUTES } from '@/lib/constants'

export function HomeLink() {
  const { t } = useTranslation('navigation')

  return (
    <Button
      as={Link}
      className='lg:ml-2'
      color='primary'
      href={APP_ROUTES.SCENE}
      shape='square'
      title={t('home_link')}
      outline
    >
      <FaHome className='size-3/4' />
    </Button>
  )
}
