import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { FaHome } from 'react-icons/fa'
import { Button, Tooltip } from 'rsc-daisyui'
import { APP_ROUTES } from '@/lib/constants'

export function HomeLink() {
  const { t } = useTranslation('navigation')

  return (
    <Tooltip position='bottom' tip={t('home_link')}>
      <Button as={Link} className='lg:ml-2' color='primary' href={APP_ROUTES.SCENE} shape='square' outline>
        <FaHome className='size-3/4' />
      </Button>
    </Tooltip>
  )
}
