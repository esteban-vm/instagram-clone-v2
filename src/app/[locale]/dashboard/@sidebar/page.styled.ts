import tw from 'tailwind-styled-components'

export function page() {}
export function placeholder() {}
export function row() {}
export function top() {}

page.container = tw.aside`
  order-first
  w-full
  max-w-2xl
  justify-self-center
  lg:order-last
  [&_img]:object-cover
  [&_img]:object-center
  [&_img]:contrast-125
`

placeholder.container = tw.div`
  w-20
  rounded-full
  bg-primary
  text-primary-content
`

placeholder.content = tw.span`
  text-2xl
  font-bold
  select-none
`

row.center = tw.div`
  grow
`

row.email = tw.span`
  text-xs
  font-semibold
  uppercase
  opacity-60
`

row.left = tw.div`
  relative
  size-12
  overflow-hidden
  rounded-md
`

row.placeholder = tw.div`
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

top.container = tw.section`
  flex
  items-center
  gap-1.5
  p-1.5
`

top.email = tw.span`
  text-sm
  font-semibold
  italic
`

top.right = tw.div`
  flex
  flex-col
  items-start
  truncate
`

top.username = tw.span`
  font-bold
`
