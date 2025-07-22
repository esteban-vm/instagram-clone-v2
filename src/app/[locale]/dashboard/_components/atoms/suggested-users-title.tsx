'use client'

import { useTranslation } from 'react-i18next'

export function SuggestedUsersTitle() {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar' })

  return <li className='p-4 pb-2 text-xs font-semibold tracking-wide italic'>{t('suggested_users')}</li>
}
