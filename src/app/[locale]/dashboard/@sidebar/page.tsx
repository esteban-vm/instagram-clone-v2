'use client'

import Image from 'next/image'
import { Avatar, Mask } from 'rsc-daisyui'
import { useCurrentSession } from '@/hooks'
import avatar1 from '@/images/avatars/female1.webp'
import { Texts } from '@/lib/texts'

export default function SidebarPage() {
  const { currentSession } = useCurrentSession()

  const user = currentSession?.user
  if (!user) return null

  const { avatar, name } = user

  return (
    <section className='border border-primary p-1.5'>
      <Avatar placeholder={!avatar}>
        {avatar ? (
          <Mask as='div' className='w-24' shape='circle'>
            <Image alt='avatar' src={avatar1} />
          </Mask>
        ) : (
          <div className='w-24 rounded-full bg-neutral text-neutral-content'>
            <span className='text-3xl'>{Texts.truncate(name)}</span>
          </div>
        )}
      </Avatar>
    </section>
  )
}
