import { Skeleton } from 'rsc-daisyui'
import * as $ from './loading.styled'

export default function SidebarLoading() {
  return (
    <$.loading.container>
      <$.loading.content>
        <Skeleton className='mb-1.5 size-24 shrink-0 rounded-full' />
        <$.loading.right>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-28' />
        </$.loading.right>
      </$.loading.content>
      <Skeleton className='h-32 w-full' />
    </$.loading.container>
  )
}
