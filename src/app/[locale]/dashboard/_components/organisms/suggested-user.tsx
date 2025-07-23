import Image from 'next/image'
import { List } from 'rsc-daisyui'
import { Atoms, Molecules } from '@/app/[locale]/dashboard/_components'

export function SuggestedUser({ user }: SuggestedUserProps) {
  const { id, name, email, avatar } = user

  return (
    <List.Row className='flex items-center justify-between'>
      <div className='relative size-12 overflow-hidden rounded-md'>
        {avatar ? (
          <Image alt='' className='object-cover contrast-125' src={avatar} fill />
        ) : (
          <Atoms.SuggestedUserPlaceholder name={name} />
        )}
      </div>
      <Molecules.SuggestedUserData email={email} name={name} />
      <Molecules.FollowUserButton id={id} />
    </List.Row>
  )
}

export interface SuggestedUserProps {
  user: Models.User
}
