import { useTranslation } from 'react-i18next'

export function UserListTitle() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar' })
  return <span className='p-4 pb-2 text-xs font-semibold tracking-wide italic'>{t('list_title')}</span>
}
