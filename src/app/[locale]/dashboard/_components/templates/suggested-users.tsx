import { List } from 'rsc-daisyui'
import { Atoms, Organisms } from '@/app/[locale]/dashboard/_components'

export function SuggestedUsers({ users = [] }: SuggestedUsersProps) {
  return (
    <section>
      <List>
        <Atoms.SuggestedUsersTitle />
        {users.map((user) => {
          return <Organisms.SuggestedUser key={user.id} user={user} users={users} />
        })}
      </List>
    </section>
  )
}

export interface SuggestedUsersProps {
  users?: Models.User[]
}
