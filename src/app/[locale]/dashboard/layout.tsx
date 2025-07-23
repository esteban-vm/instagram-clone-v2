import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { verifySession } from '@/lib/auth-utils'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  timeline: ReactNode
}

export default async function DashboardLayout({ children: _, sidebar, timeline }: DashboardLayoutProps) {
  await verifySession()

  return (
    <div className='mx-auto mt-16 grid max-w-screen-2xl lg:grid-cols-3'>
      {timeline}
      {sidebar}
    </div>
  )
}
