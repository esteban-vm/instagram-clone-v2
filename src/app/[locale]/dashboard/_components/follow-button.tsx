import type { UserType } from '@/types'
import { useOptimisticAction } from 'next-safe-action/hooks'
import { useTranslation } from 'react-i18next'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button, Tooltip } from 'rsc-daisyui'
import { UserActions } from '@/actions'

export function FollowButton({ userId, users }: FollowButtonProps) {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar' })

  const { execute, isExecuting, hasSucceeded } = useOptimisticAction(UserActions.followUser, {
    currentState: users,
    updateFn: (state) => state.filter((user) => user.id !== userId),
  })

  const isDisabled = isExecuting || hasSucceeded
  const handleClick = () => execute({ id: userId })

  return (
    <Tooltip color='info' position='left' tip={t('follow_button')}>
      <Button disabled={isDisabled} shape='square' ghost onClick={handleClick}>
        <RiUserFollowLine className='size-3/5' />
      </Button>
    </Tooltip>
  )
}

export interface FollowButtonProps {
  userId: string
  users: UserType[]
}
