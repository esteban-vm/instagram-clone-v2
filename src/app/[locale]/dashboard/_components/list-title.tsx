import { useTranslation } from 'react-i18next'
import { Sidebar } from '@/app/[locale]/dashboard/_styled'

export function ListTitle() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar' })
  return <Sidebar.StyledListTitle>{t('list_title')}</Sidebar.StyledListTitle>
}
