import { useAction } from 'next-safe-action/hooks'
import { useTranslation } from 'react-i18next'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button } from 'rsc-daisyui'
import { UserActions } from '@/actions'

export interface ToggleFollowProps {
  type: 'follow' | 'unfollow'
  userId: string
}

export function ToggleFollow({ type, userId }: ToggleFollowProps) {
  const { t } = useTranslation('home', { keyPrefix: 'user_detail' })

  const action = type ? UserActions.follow : UserActions.unfollow
  const { execute, isExecuting, hasSucceeded } = useAction(action)

  const isDisabled = isExecuting || hasSucceeded
  const handleClick = () => execute({ id: userId })

  return (
    <Button color='info' disabled={isDisabled} size='sm' soft onClick={handleClick}>
      <RiUserFollowLine className='text-base' />
      {type === 'follow' ? t('follow_button') : t('unfollow_button')}
    </Button>
  )
}
