'use client'

import { useOptimisticAction } from 'next-safe-action/hooks'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button } from 'rsc-daisyui'
import { UserActions } from '@/actions'

export function FollowUserButton({ user, users }: FollowUserButtonProps) {
  const { execute, isExecuting, hasSucceeded } = useOptimisticAction(UserActions.followUser, {
    currentState: users,
    updateFn(state) {
      return state.filter((u) => u.id !== user.id)
    },
  })

  return (
    <Button disabled={isExecuting || hasSucceeded} shape='square' ghost onClick={() => execute({ id: user.id })}>
      <RiUserFollowLine className='size-3/5' />
    </Button>
  )
}

export interface FollowUserButtonProps {
  user: Models.User
  users: Models.User[]
}
