import type { Molecules } from '@/app/[locale]/dashboard/_components'

export function SuggestedUserData({ name, email }: SuggestedUserDataProps) {
  return (
    <div className='grow'>
      <div>{name}</div>
      <div className='text-xs font-semibold uppercase opacity-60'>{email}</div>
    </div>
  )
}

export type SuggestedUserDataProps = Molecules.UserInfoDataProps
