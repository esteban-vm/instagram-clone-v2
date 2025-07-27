import tw from 'tailwind-styled-components'

export function Card() {}
export function Name() {}
export function Page() {}
export function Placeholder() {}

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

Name.Container = tw.div`
  flex
  flex-col
  items-start
  truncate
`

Name.Content = tw.span`
  text-sm
  font-bold
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
