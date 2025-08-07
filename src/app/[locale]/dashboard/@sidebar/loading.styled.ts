import tw from 'tailwind-styled-components'

export function loading() {}

loading.container = tw.div`
  flex
  w-full
  max-w-3xl
  flex-col
  self-start
  justify-self-center
  p-1.5
`

loading.content = tw.div`
  flex
  items-center
  gap-1.5
`

loading.right = tw.div`
  flex
  flex-col
  gap-4
`
