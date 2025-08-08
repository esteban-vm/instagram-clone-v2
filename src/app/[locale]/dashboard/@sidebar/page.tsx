import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Link, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { Buttons, Feedbacks } from '@/app/[locale]/dashboard/_components'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import * as $ from './page.styled'

export default async function SidebarPage() {
  const { user } = await verifySession()
  const { avatar, name, email } = user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data ?? []
  const hasUsers = users.length > 0

  return (
    <$.page.container>
      <$.top.container>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-20' shape='circle'>
              <Image alt={`${name}'s avatar`} src={avatar} fill />
            </Mask>
          ) : (
            <$.placeholder.container>
              <$.placeholder.content>{Texts.Transformations.truncate(name)}</$.placeholder.content>
            </$.placeholder.container>
          )}
        </Avatar>
        <$.top.right>
          <$.top.username>{name}</$.top.username>
          <$.top.email>{email}</$.top.email>
        </$.top.right>
      </$.top.container>
      <section>
        {!hasUsers ? (
          <Feedbacks.NoResultsAlert className='mx-auto w-full max-w-fit' prefix='sidebar.users_alert' />
        ) : (
          <List>
            <Feedbacks.UserListTitle />
            {users.map((user) => {
              const { id, name, email, avatar } = user
              return (
                <List.Row key={id} className='flex items-center justify-between'>
                  <$.row.left>
                    {avatar ? (
                      <Image alt={`${name}'s avatar`} src={avatar} fill />
                    ) : (
                      <$.row.placeholder>{Texts.Transformations.truncate(name)}</$.row.placeholder>
                    )}
                  </$.row.left>
                  <$.row.center>
                    <NextLink href={`/${id}`}>
                      <Link as='span' className='block font-semibold' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                    <$.row.email>{email}</$.row.email>
                  </$.row.center>
                  <Buttons.FollowButton userId={id} users={users} />
                </List.Row>
              )
            })}
          </List>
        )}
      </section>
    </$.page.container>
  )
}
