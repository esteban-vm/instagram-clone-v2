import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { RiUserFollowLine } from 'react-icons/ri'
import { Avatar, Badge, Button, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import * as $ from './page.styled'

export interface Props {
  params: Promise<{ locale: Locale; userId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, userId } = await params
  const result = await UserActions.getUserById({ id: userId })
  const user = result?.data

  if (!user) {
    return {
      title: locale === 'es' ? 'Usuario no encontrado' : 'User not found',
    }
  }

  return {
    title: `${locale === 'es' ? 'Usuario' : 'User'}: ${user.name}`,
  }
}

export default async function UserPage({ params }: Props) {
  await verifySession()

  const { userId } = await params
  const result = await UserActions.getUserById({ id: userId })
  const user = result?.data

  if (!user) notFound()

  const { name, email, avatar, _count } = user

  return (
    <$.page.container>
      <$.top.container>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-32' shape='circle'>
              <Image alt={`${name}'s avatar`} src={avatar} fill />
            </Mask>
          ) : (
            <$.placeholder.container>
              <$.placeholder.content>{Texts.Transformations.truncate(name)}</$.placeholder.content>
            </$.placeholder.container>
          )}
        </Avatar>
        <$.top.right>
          <$.right.top>
            <$.right.username>{name}</$.right.username>
            <Button color='info' size='sm' soft>
              <RiUserFollowLine className='text-base' />
              Follow
            </Button>
          </$.right.top>
          <$.right.center>
            {Object.entries(_count).map(([key, value]) => (
              <Badge key={crypto.randomUUID()} color='success' size='sm' soft>
                <strong>{value}</strong> {key}
              </Badge>
            ))}
          </$.right.center>
          <$.right.email>{email}</$.right.email>
        </$.top.right>
      </$.top.container>
      <$.page.separator />
    </$.page.container>
  )
}
