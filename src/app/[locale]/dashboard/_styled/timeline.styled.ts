import tw from 'tailwind-styled-components'

export const CardCommentItem = tw.li`
  text-sm
`

export const CardCommentName = tw.span`
  font-semibold
`

export const CardComments = tw.ul`
  ml-1.5
`

export const CardImageContainer = tw.figure`
  relative
  aspect-square
  w-full
`

export const CardLikes = tw.small`
  ml-1.5
  text-xs
  font-semibold
`

export const CardNameContainer = tw.div`
  flex
  flex-col
  items-start
  truncate
`

export const CardNameContent = tw.span`
  text-sm
  font-bold
`

export const CardPlaceholderContainer = tw.div`
  w-14
  rounded-full
  bg-primary
  text-primary-content
`

export const CardPlaceholderContent = tw.span`
  text-xl
  font-bold
  select-none
`

export const PageContainer = tw.section`
  grid
  grid-rows-2
  gap-1.5
  md:col-span-2
  md:grid-cols-2
`
