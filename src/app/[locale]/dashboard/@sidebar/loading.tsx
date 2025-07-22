import { Skeleton } from 'rsc-daisyui'

export default function SidebarLoading() {
  return (
    <div className='m-1.5 flex size-full flex-col gap-1.5 p-1.5'>
      <div className='flex items-center gap-1.5'>
        <Skeleton className='size-24 shrink-0 rounded-full' />
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-28' />
        </div>
      </div>
      <Skeleton className='h-32 w-full' />
    </div>
  )
}
