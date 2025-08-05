import { Skeleton } from 'rsc-daisyui'
import { cn } from '@/lib/tw-utils'

export interface LoadingStartProps {
  hasSession: boolean
}

export function LoadingEnd() {
  return (
    <>
      <Skeleton className='hidden h-12 w-40 lg:block' />
      <Skeleton className='mx-2 hidden h-12 w-40 lg:block' />
      <Skeleton className='mr-2 size-12' />
    </>
  )
}

export function LoadingStart({ hasSession }: LoadingStartProps) {
  return (
    <>
      <Skeleton className='ml-2 size-12 lg:hidden' />
      <Skeleton className={cn('ml-2 size-12', !hasSession && 'hidden')} />
      <Skeleton className={cn('ml-2 size-12', !hasSession && 'hidden')} />
    </>
  )
}
