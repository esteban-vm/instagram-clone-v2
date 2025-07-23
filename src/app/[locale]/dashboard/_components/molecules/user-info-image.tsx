import Image from 'next/image'
import { Mask } from 'rsc-daisyui'

export function UserInfoImage({ avatar }: UserInfoImageProps) {
  return (
    <Mask as='div' className='relative w-20' shape='circle'>
      <Image alt='avatar' className='object-cover contrast-125' src={avatar} fill />
    </Mask>
  )
}

export interface UserInfoImageProps {
  avatar: string
}
