import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { APP_ROUTES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dashboard',
}

interface DashboardLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  timeline: ReactNode
}

export default async function DashboardLayout({ children, sidebar, timeline }: DashboardLayoutProps) {
  const session = await auth()
  if (!session?.user) redirect(APP_ROUTES.LOGIN)

  return (
    <div className='mt-16'>
      {children}
      {timeline}
      {sidebar}
    </div>
  )
}
