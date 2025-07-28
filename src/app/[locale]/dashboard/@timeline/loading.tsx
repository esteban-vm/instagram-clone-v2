import { Skeleton } from 'rsc-daisyui'
import { Timeline as $ } from '@/app/[locale]/dashboard/_styled'

export default function TimelineLoading() {
  return (
    <$.Loading.Container>
      <Skeleton className='h-40 w-full md:w-1/2' />
      <Skeleton className='hidden h-40 md:block md:w-1/2' />
    </$.Loading.Container>
  )
}
