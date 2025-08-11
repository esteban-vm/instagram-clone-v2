import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { Locale } from '@/i18n.config'
import { verifySession } from '@/lib/auth-utils'

export interface Props {
  children: ReactNode
  timeline: ReactNode
  sidebar: ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'es' ? 'Panel de control' : 'Dashboard',
  }
}

export default async function Layout({ children, sidebar, timeline }: Props) {
  await verifySession()

  return (
    <div className='mx-auto mt-20 grid max-w-screen-2xl gap-1.5 lg:grid-cols-3'>
      {children}
      {timeline}
      {sidebar}
    </div>
  )
}
