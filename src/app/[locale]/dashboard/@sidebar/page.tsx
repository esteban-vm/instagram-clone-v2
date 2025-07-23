import { UserActions } from '@/actions'
import { Organisms, Templates } from '@/app/[locale]/dashboard/_components'
import { mockDelay } from '@/lib/auth-utils'

export default async function SidebarPage() {
  await mockDelay()

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data

  return (
    <aside>
      <Organisms.UserInfo />
      <Templates.SuggestedUsers users={users} />
    </aside>
  )
}
