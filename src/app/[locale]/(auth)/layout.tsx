import type { ReactNode } from 'react'
import Image from 'next/image'
import { Card, Hero, PhoneMockup } from 'rsc-daisyui'
import phoneBg from '@/images/phone_bg.webp'
import { verifyNoSession } from '@/lib/auth-utils'

export interface Props {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  await verifyNoSession()

  return (
    <Hero className='min-h-screen bg-base-200'>
      <Hero.Content className='container flex-col gap-0 overflow-hidden lg:flex-row lg:gap-1'>
        <div className='-mx-16 -my-32 lg:-my-28'>
          <PhoneMockup className='scale-[65%] border-primary shadow-2xl'>
            <PhoneMockup.Camera />
            <PhoneMockup.Display className='relative'>
              <Image alt='background' className='object-cover object-center saturate-150' src={phoneBg} fill priority />
            </PhoneMockup.Display>
          </PhoneMockup>
        </div>
        <Card className='mb-8 w-full max-w-sm bg-base-100 shadow-2xl select-none lg:mb-0' vanilla>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Hero.Content>
    </Hero>
  )
}
