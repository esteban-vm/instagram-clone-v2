import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { List } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { Organisms } from '@/app/[locale]/dashboard/_components'

export function SuggestedUsers() {
  const { execute, result } = useAction(UserActions.getSuggestedUsers)

  useEffect(execute, [execute])

  return (
    <section className='text-start'>
      <List>
        <li className='p-4 pb-2 text-xs font-semibold tracking-wide italic'>Suggestions for you</li>
        {result.data?.map((user) => <Organisms.SuggestedUser key={user.id} user={user} />)}
      </List>
    </section>
  )
}
