import { Skeleton } from 'rsc-daisyui'
import * as $ from './loading.styled'

export default function Loading() {
  return (
    <$.loading.container>
      <$.loading.content>
        <Skeleton className='mb-1.5 size-32 shrink-0 rounded-full' />
        <$.loading.right>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-5 w-28' />
        </$.loading.right>
      </$.loading.content>
      <Skeleton className='mb-8 h-2 w-full' />
      <Skeleton className='h-40 w-full' />
    </$.loading.container>
  )
}
