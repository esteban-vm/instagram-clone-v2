import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { FaChartLine } from 'react-icons/fa'
import { Button, Tooltip } from 'rsc-daisyui'
import { APP_ROUTES } from '@/lib/constants'

export function DashboardLink() {
  const { i18n, t } = useTranslation('navigation', { keyPrefix: 'nav_links' })
  const currentPathname = usePathname()
  const homeRoute = APP_ROUTES.HOME
  const dashboardRoute = APP_ROUTES.DASHBOARD

  const currentLocale = i18n.language
  const isActiveCase1 = currentPathname === homeRoute + currentLocale + dashboardRoute
  const isActiveCase2 = currentPathname === dashboardRoute

  return (
    <Tooltip position='bottom' tip={t('dashboard')}>
      <Button
        as={Link}
        className='ml-2'
        color={isActiveCase1 || isActiveCase2 ? 'primary' : 'secondary'}
        href={dashboardRoute}
        shape='square'
        outline
      >
        <FaChartLine className='size-3/4' />
      </Button>
    </Tooltip>
  )
}
