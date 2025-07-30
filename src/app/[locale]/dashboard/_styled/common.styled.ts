import { BsInfoCircleFill } from 'react-icons/bs'
import tw from 'tailwind-styled-components'

export function Alert() {}

Alert.Icon = tw(BsInfoCircleFill)`
  text-3xl
`

Alert.Separator = tw.hr`
  text-warning-content/25
`

Alert.Title = tw.h3`
  text-base
  font-bold
  tracking-tight
`

Alert.Text = tw.span`
  text-xs
  font-semibold
  italic
`
