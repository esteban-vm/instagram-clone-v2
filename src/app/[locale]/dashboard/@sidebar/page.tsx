import { UserActions } from '@/actions'
import { Organisms, Templates } from '@/app/[locale]/dashboard/_components'

export default async function SidebarPage() {
  const result = await UserActions.getSuggestedUsers()

  return (
    <aside>
      <Organisms.UserInfo />
      <Templates.SuggestedUsers users={result?.data} />
    </aside>
  )
}
