import { Skeleton } from 'rsc-daisyui'
import { Sidebar as $ } from '@/app/[locale]/dashboard/_styled'

export default function SidebarLoading() {
  return (
    <$.Loading.Container>
      <$.Loading.Content>
        <Skeleton className='mb-1.5 size-24 shrink-0 rounded-full' />
        <$.Loading.Right>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-28' />
        </$.Loading.Right>
      </$.Loading.Content>
      <Skeleton className='h-32 w-full' />
    </$.Loading.Container>
  )
}
