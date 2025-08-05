import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { verifySession } from '@/lib/auth-utils'

export interface Props {
  children: ReactNode
  timeline: ReactNode
  sidebar: ReactNode
}

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardLayout({ children, sidebar, timeline }: Props) {
  await verifySession()

  return (
    <div className='mx-auto mt-20 grid max-w-screen-2xl gap-1.5 lg:grid-cols-3'>
      {children}
      {timeline}
      {sidebar}
    </div>
  )
}
