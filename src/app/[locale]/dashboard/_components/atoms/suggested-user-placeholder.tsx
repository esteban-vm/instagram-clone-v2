import type { Molecules } from '@/app/[locale]/dashboard/_components'
import { Texts } from '@/lib/texts'

export function SuggestedUserPlaceholder({ name }: SuggestedUserPlaceholderProps) {
  return (
    <div
      className='absolute inset-0 flex items-center justify-center bg-secondary text-xl font-bold text-secondary-content
        select-none'
    >
      {Texts.truncate(name)}
    </div>
  )
}

export type SuggestedUserPlaceholderProps = Molecules.UserInfoPlaceholderProps
