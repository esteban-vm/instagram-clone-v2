import { Avatar } from 'rsc-daisyui'
import { Molecules } from '@/app/[locale]/dashboard/_components'
import { useCurrentSession } from '@/hooks'

export function UserInfo() {
  const { currentSession } = useCurrentSession()

  const currentUser = currentSession?.user
  if (!currentUser) return null

  const { avatar, name, email } = currentUser

  return (
    <section className='flex items-center gap-1.5 p-1.5'>
      <Avatar placeholder={!avatar}>
        {avatar ? <Molecules.UserInfoImage avatar={avatar} /> : <Molecules.UserInfoPlaceholder name={name} />}
      </Avatar>
      <Molecules.UserInfoData email={email} name={name} />
    </section>
  )
}
