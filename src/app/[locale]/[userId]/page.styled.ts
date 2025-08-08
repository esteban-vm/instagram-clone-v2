import tw from 'tailwind-styled-components'

export function page() {}
export function placeholder() {}
export function right() {}
export function top() {}

page.container = tw.section`
  mx-auto
  mt-20
  max-w-screen-2xl
`

page.separator = tw.hr`
  opacity-50
`

placeholder.container = tw.div`
  w-32
  rounded-full
  bg-primary
  text-primary-content
`

placeholder.content = tw.span`
  text-4xl
  font-bold
  select-none
`

right.center = tw.div`
  my-1
  flex
  w-full
  justify-between
`

right.email = tw.span`
  font-semibold
  italic
`

right.top = tw.div`
  flex
  gap-4
`

right.username = tw.span`
  align-middle
  text-lg
  font-bold
`

top.container = tw.section`
  flex
  max-w-lg
  items-center
  gap-3.5
  p-3.5
  pb-8
`

top.right = tw.div`
  grow
  text-sm
`
