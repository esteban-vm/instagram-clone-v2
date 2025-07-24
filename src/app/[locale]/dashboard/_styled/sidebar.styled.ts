import Image from 'next/image'
import tw from 'tailwind-styled-components'

export const BottomCenter = tw.div`
  grow
`

export const BottomEmail = tw.span`
  text-xs
  font-semibold
  uppercase
  opacity-60
`

export const BottomLeft = tw.div`
  relative
  size-12
  overflow-hidden
  rounded-md
`

export const BottomName = tw.div`
  font-bold
`

export const BottomPlaceholder = tw.div`
  absolute
  inset-0
  flex
  items-center
  justify-center
  bg-secondary
  text-xl
  font-bold
  text-secondary-content
  select-none
`

export const StyledImage = tw(Image)`
  object-cover
  contrast-125
`

export const StyledListTitle = tw.span`
  p-4
  pb-2
  text-xs
  font-semibold
  tracking-wide
  italic
`

export const TopContainer = tw.section`
  flex
  items-center
  gap-1.5
  p-1.5
`

export const TopEmail = tw.span`
  text-sm
  font-semibold
  italic
`

export const TopName = tw.span`
  font-bold
`

export const TopPlaceholderContainer = tw.div`
  w-20
  rounded-full
  bg-primary
  text-primary-content
`

export const TopPlaceholderContent = tw.span`
  text-2xl
  font-bold
  select-none
`

export const TopRight = tw.div`
  flex
  flex-col
  items-start
  truncate
`
