import { Skeleton } from 'rsc-daisyui'
import * as styled from './loading.styled'

export default function SidebarLoading() {
  return (
    <styled.loading.container>
      <styled.loading.content>
        <Skeleton className='mb-1.5 size-24 shrink-0 rounded-full' />
        <styled.loading.right>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-28' />
        </styled.loading.right>
      </styled.loading.content>
      <Skeleton className='h-32 w-full' />
    </styled.loading.container>
  )
}
