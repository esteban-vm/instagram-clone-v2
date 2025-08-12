import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaCommentAlt, FaHeart } from 'react-icons/fa'
import { Avatar, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import { Buttons, Feedbacks } from './_components'
import * as $ from './page.styled'

export interface Props {
  params: Promise<{ locale: Locale; userId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, userId } = await params
  const result = await UserActions.getById({ id: userId })
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

export default async function Page({ params }: Props) {
  await verifySession()

  const { userId } = await params
  const result = await UserActions.getById({ id: userId })
  const user = result?.data

  if (!user) notFound()

  const { id, name, email, avatar, photos, followers, _count } = user

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
            <Buttons.ToggleFollow followers={followers} userId={id} />
          </$.right.top>
          <$.right.center>
            <Feedbacks.InfoBadge type='photos' value={_count.photos} />
            <Feedbacks.InfoBadge type='followers' value={_count.followers} />
            <Feedbacks.InfoBadge type='following' value={_count.following} />
          </$.right.center>
          <$.right.email>{email}</$.right.email>
        </$.top.right>
      </$.top.container>
      <$.page.separator />
      <$.grid.container>
        {photos.map((photo) => {
          const { id, caption, image, _count } = photo
          return (
            <$.item.container key={id}>
              <Image alt={caption} src={image} fill />
              <$.item.content>
                <$.item.icon>
                  <FaHeart />
                  <span>{_count.likes}</span>
                </$.item.icon>
                <$.item.icon>
                  <FaCommentAlt />
                  <span>{_count.comments}</span>
                </$.item.icon>
              </$.item.content>
            </$.item.container>
          )
        })}
      </$.grid.container>
    </$.page.container>
  )
}
