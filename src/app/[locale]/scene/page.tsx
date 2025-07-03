import type { Metadata } from 'next'
import { Organisms } from '@/app/[locale]/scene/_components'

export const metadata: Metadata = {
  title: 'Scene',
}

export default function ScenePage() {
  return (
    <>
      <Organisms.SolarSystem />
    </>
  )
}
