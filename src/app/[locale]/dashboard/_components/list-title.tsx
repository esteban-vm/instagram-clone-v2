import { useTranslation } from 'react-i18next'
import { Sidebar as $ } from '@/app/[locale]/dashboard/_styled'

export function ListTitle() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar' })
  return <$.Page.ListTitle>{t('list_title')}</$.Page.ListTitle>
}
