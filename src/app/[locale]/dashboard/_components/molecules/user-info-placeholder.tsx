import { Texts } from '@/lib/texts'

export function UserInfoPlaceholder({ name }: UserInfoPlaceholderProps) {
  return (
    <div className='w-24 rounded-full bg-primary text-primary-content'>
      <span className='text-3xl font-bold select-none'>{Texts.truncate(name)}</span>
    </div>
  )
}

export interface UserInfoPlaceholderProps {
  name: string
}
