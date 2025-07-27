import tw from 'tailwind-styled-components'

export function Card() {}
export function Page() {}
export function Placeholder() {}
export function Right() {}

Card.Comments = tw.ul`
  ml-1.5
`

Card.Image = tw.figure`
  relative
  aspect-square
  w-full
`

Card.Item = tw.li`
  text-sm
`

Card.Likes = tw.small`
  ml-1.5
  text-xs
  font-semibold
`

Card.Name = tw.span`
  font-semibold
`

Page.Container = tw.section`
  grid
  grid-rows-2
  gap-1.5
  md:col-span-2
  md:grid-cols-2
`

Placeholder.Container = tw.div`
  w-14
  rounded-full
  bg-primary
  text-primary-content
`

Placeholder.Content = tw.span`
  text-xl
  font-bold
  select-none
`

Right.Container = tw.div`
  flex
  flex-col
  items-start
  truncate
`

Right.Content = tw.span`
  text-sm
  font-bold
`
