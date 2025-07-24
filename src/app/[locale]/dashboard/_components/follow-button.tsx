import { useOptimisticAction } from 'next-safe-action/hooks'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button } from 'rsc-daisyui'
import { UserActions } from '@/actions'

export function FollowButton({ user, users }: FollowButtonProps) {
  const { execute, isExecuting, hasSucceeded } = useOptimisticAction(UserActions.followUser, {
    currentState: users,
    updateFn: (state) => state.filter((u) => u.id !== user.id),
  })

  const isDisabled = isExecuting || hasSucceeded
  const handleClick = () => execute({ id: user.id })

  return (
    <Button disabled={isDisabled} shape='square' ghost onClick={handleClick}>
      <RiUserFollowLine className='size-3/5' />
    </Button>
  )
}

export interface FollowButtonProps {
  user: Models.User
  users: Models.User[]
}
