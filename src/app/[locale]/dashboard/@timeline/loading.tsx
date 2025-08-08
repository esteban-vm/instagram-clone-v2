import { Skeleton } from 'rsc-daisyui'
import * as $ from './loading.styled'

export default function TimelineLoading() {
  return (
    <$.loading.container>
      <Skeleton className='h-40 w-full md:w-1/2' />
      <Skeleton className='hidden h-40 md:block md:w-1/2' />
    </$.loading.container>
  )
}
