import { Organisms, Templates } from '@/app/[locale]/dashboard/_components'

export default function SidebarPage() {
  return (
    <aside>
      <Organisms.UserInfo />
      <Templates.SuggestedUsers />
    </aside>
  )
}
