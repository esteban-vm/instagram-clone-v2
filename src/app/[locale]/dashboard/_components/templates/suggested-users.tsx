'use client'

import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { List } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { Atoms, Organisms } from '@/app/[locale]/dashboard/_components'

export function SuggestedUsers() {
  const { execute, result } = useAction(UserActions.getSuggestedUsers)

  useEffect(execute, [execute])

  return (
    <section className='text-start'>
      <List>
        <Atoms.SuggestedUsersTitle />
        {result.data?.map((user) => <Organisms.SuggestedUser key={user.id} user={user} />)}
      </List>
    </section>
  )
}
