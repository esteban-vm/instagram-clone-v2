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

export default async function DashboardLayout({ children: _, sidebar, timeline }: DashboardLayoutProps) {
  const session = await auth()
  if (!session?.user) redirect(APP_ROUTES.LOGIN)

  return (
    <div className='mx-auto mt-16 grid max-w-screen-2xl gap-4 text-center lg:grid-cols-3'>
      {timeline}
      {sidebar}
    </div>
  )
}
