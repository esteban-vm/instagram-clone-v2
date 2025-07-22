import { Organisms, Templates } from '@/app/[locale]/dashboard/_components'
import { mockDelay } from '@/lib/auth-utils'

export default async function SidebarPage() {
  await mockDelay()

  return (
    <aside>
      <Organisms.UserInfo />
      <Templates.SuggestedUsers />
    </aside>
  )
}
