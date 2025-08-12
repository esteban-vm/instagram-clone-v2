import tw from 'tailwind-styled-components'

export function card() {}
export function page() {}
export function placeholder() {}
export function right() {}

card.image = tw.figure`
  relative
  aspect-square
  w-full
`

card.item = tw.li`
  w-full
  truncate
`

card.list = tw.menu`
  w-full
  text-xs
`

card.username = tw.span`
  font-semibold
`

page.container = tw.section`
  grid
  h-fit
  gap-1.5
  p-1.5
  md:grid-cols-2
  lg:col-span-2
`

placeholder.container = tw.div`
  w-16
  rounded-full
  bg-primary
  text-primary-content
`

placeholder.content = tw.span`
  text-xl
  font-bold
  select-none
`

right.container = tw.div`
  flex
  flex-col
  items-start
  truncate
`
