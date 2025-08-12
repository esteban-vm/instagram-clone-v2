import type { KeyPrefix } from 'i18next'
import { useTranslation } from 'react-i18next'
import { BsInfoCircleFill } from 'react-icons/bs'
import { Alert } from 'rsc-daisyui'
import { cn } from '@/lib/tw-utils'

export interface NoResultsAlertProps {
  type: 'users' | 'photos'
}

export function NoResultsAlert({ type }: NoResultsAlertProps) {
  let className: string
  let prefix: KeyPrefix<'dashboard'>

  switch (type) {
    case 'photos':
      prefix = 'timeline.photos_alert'
      className = 'col-span-2 self-start justify-self-center'
      break

    case 'users':
      prefix = 'sidebar.users_alert'
      className = 'mx-auto w-full max-w-fit'
  }

  const { t } = useTranslation('dashboard', { keyPrefix: prefix })

  return (
    <Alert className={cn('px-3.5 py-2.5', className)} color='info' soft>
      <BsInfoCircleFill className='text-3xl' />
      <div>
        <h3 className='text-base font-bold tracking-tight'>{t('title')}</h3>
        <hr className='text-warning-content/25' />
        <span className='text-xs font-semibold italic'>{t('text')}</span>
      </div>
    </Alert>
  )
}
