import { useTranslation } from 'react-i18next'
import { Badge } from 'rsc-daisyui'

export interface InfoBadgeProps {
  value: number
  type: 'followers' | 'following' | 'photos'
}

export function InfoBadge({ value, type }: InfoBadgeProps) {
  const { t } = useTranslation('home', { keyPrefix: 'user_detail.feedbacks' })

  return (
    <Badge color='success' size='sm' soft>
      <strong>{value}</strong> {t(type)}
    </Badge>
  )
}
