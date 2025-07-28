import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { verifySession } from '@/lib/auth-utils'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
  timeline: ReactNode
  sidebar: ReactNode
}

export default async function DashboardLayout({ children, sidebar, timeline }: DashboardLayoutProps) {
  await verifySession()

  return (
    <div className='mx-auto mt-20 mb-16 grid max-w-screen-2xl gap-1.5 lg:grid-cols-3'>
      {children}
      {timeline}
      {sidebar}
    </div>
  )
}
