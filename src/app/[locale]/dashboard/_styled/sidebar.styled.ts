import tw from 'tailwind-styled-components'

export function Loading() {}
export function Page() {}
export function Placeholder() {}
export function Row() {}
export function Top() {}

Loading.Container = tw.div`
  flex
  w-full
  max-w-3xl
  flex-col
  self-start
  justify-self-center
  p-1.5
`

Loading.Content = tw.div`
  flex
  items-center
  gap-1.5
`

Loading.Right = tw.div`
  flex
  flex-col
  gap-4
`

Page.Container = tw.aside`
  w-full
  max-w-3xl
  self-start
  justify-self-center
  [&_img]:object-cover
  [&_img]:object-center
  [&_img]:contrast-125
`

Page.ListTitle = tw.span`
  p-4
  pb-2
  text-xs
  font-semibold
  tracking-wide
  italic
`

Placeholder.Container = tw.div`
  w-20
  rounded-full
  bg-primary
  text-primary-content
`

Placeholder.Content = tw.span`
  text-2xl
  font-bold
  select-none
`

Row.Center = tw.div`
  grow
`

Row.Email = tw.span`
  text-xs
  font-semibold
  uppercase
  opacity-60
`

Row.Left = tw.div`
  relative
  size-12
  overflow-hidden
  rounded-md
`

Row.Name = tw.div`
  font-bold
`

Row.Placeholder = tw.div`
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

Top.Container = tw.section`
  flex
  items-center
  gap-1.5
  p-1.5
`

Top.Email = tw.span`
  text-sm
  font-semibold
  italic
`

Top.Name = tw.span`
  font-bold
`

Top.Right = tw.div`
  flex
  flex-col
  items-start
  truncate
`
