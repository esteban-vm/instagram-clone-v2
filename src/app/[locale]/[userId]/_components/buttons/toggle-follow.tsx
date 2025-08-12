import type { Follow } from '@prisma/client'
import { useAction } from 'next-safe-action/hooks'
import { useTranslation } from 'react-i18next'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { useCurrentSession } from '@/hooks'

export interface ToggleFollowProps {
  userId: string
  followers: Follow[]
}

export function ToggleFollow({ userId, followers }: ToggleFollowProps) {
  const { currentSession } = useCurrentSession()
  const { t } = useTranslation('home', { keyPrefix: 'user_detail.buttons' })
  const { execute, isExecuting, isTransitioning } = useAction(UserActions.toggleFollow)

  const isDisabled = isExecuting || isTransitioning
  const handleClick = () => execute({ id: userId })
  const isFollowed = followers.some((f) => f.followingId === currentSession?.user.id)

  return (
    <Button color='info' disabled={isDisabled} size='sm' soft onClick={handleClick}>
      <RiUserFollowLine className='text-base' />
      {!isFollowed ? t('follow') : t('unfollow')}
    </Button>
  )
}
