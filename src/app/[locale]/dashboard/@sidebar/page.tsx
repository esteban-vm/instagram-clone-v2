import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Link, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { Buttons, Feedbacks } from '@/app/[locale]/dashboard/_components'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import * as styled from './page.styled'

export default async function SidebarPage() {
  const { user } = await verifySession()
  const { avatar, name, email } = user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data ?? []
  const hasUsers = users.length > 0

  return (
    <styled.page.container>
      <styled.top.container>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-20' shape='circle'>
              <Image alt={`${name}'s avatar`} src={avatar} fill />
            </Mask>
          ) : (
            <styled.placeholder.container>
              <styled.placeholder.content>{Texts.Transformations.truncate(name)}</styled.placeholder.content>
            </styled.placeholder.container>
          )}
        </Avatar>
        <styled.top.right>
          <styled.top.username>{name}</styled.top.username>
          <styled.top.email>{email}</styled.top.email>
        </styled.top.right>
      </styled.top.container>
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
                  <styled.row.left>
                    {avatar ? (
                      <Image alt={`${name}'s avatar`} src={avatar} fill />
                    ) : (
                      <styled.row.placeholder>{Texts.Transformations.truncate(name)}</styled.row.placeholder>
                    )}
                  </styled.row.left>
                  <styled.row.center>
                    <NextLink href={`/${id}`}>
                      <Link as='span' className='block font-semibold' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                    <styled.row.email>{email}</styled.row.email>
                  </styled.row.center>
                  <Buttons.FollowButton userId={id} users={users} />
                </List.Row>
              )
            })}
          </List>
        )}
      </section>
    </styled.page.container>
  )
}
