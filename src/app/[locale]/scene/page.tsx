import type { Metadata } from 'next'
import { Organisms } from '@/app/[locale]/scene/_components'
import { verifySession } from '@/lib/auth-utils'

export const metadata: Metadata = {
  title: 'Scene',
}

export default async function ScenePage() {
  await verifySession()

  return (
    <>
      <Organisms.SolarSystem />
    </>
  )
}
