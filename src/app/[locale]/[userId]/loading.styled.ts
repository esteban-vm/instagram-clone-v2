import tw from 'tailwind-styled-components'

export function loading() {}

loading.container = tw.div`
  mx-auto
  mt-20
  max-w-screen-2xl
  border
  border-primary
`

loading.content = tw.div`
  flex
  items-center
  gap-3.5
  p-3.5
  pb-8
`

loading.right = tw.div`
  flex
  max-w-lg
  flex-col
  gap-3.5
  p-3.5
`
