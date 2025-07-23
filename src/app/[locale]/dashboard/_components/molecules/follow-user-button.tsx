'use client'

import { useAction } from 'next-safe-action/hooks'
import { RiUserFollowLine } from 'react-icons/ri'
import { Button } from 'rsc-daisyui'
import { UserActions } from '@/actions'

export function FollowUserButton({ id }: FollowUserButtonProps) {
  const { execute, isExecuting, hasSucceeded } = useAction(UserActions.followUser)

  return (
    <Button disabled={isExecuting || hasSucceeded} id={id} shape='square' ghost onClick={() => execute({ id })}>
      <RiUserFollowLine className='size-3/5' />
    </Button>
  )
}

export interface FollowUserButtonProps {
  id: string
}
