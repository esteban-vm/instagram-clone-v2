export function UserInfoData({ name, email }: UserInfoDataProps) {
  return (
    <div className='flex flex-col items-start truncate'>
      <span className='font-bold'>{name}</span>
      <span className='text-sm font-semibold italic'>{email}</span>
    </div>
  )
}

export interface UserInfoDataProps {
  name: string
  email: string
}
