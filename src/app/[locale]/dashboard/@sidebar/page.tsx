import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Link, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { Actions, Feedbacks } from '@/app/[locale]/dashboard/_components'
import { Sidebar as $ } from '@/app/[locale]/dashboard/_styled'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'

export default async function SidebarPage() {
  const { user } = await verifySession()
  const { avatar, name, email } = user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data ?? []
  const hasUsers = users.length > 0

  return (
    <$.Page.Container>
      <$.Top.Container>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-20' shape='circle'>
              <Image alt={`${name}'s avatar`} src={avatar} fill />
            </Mask>
          ) : (
            <$.Placeholder.Container>
              <$.Placeholder.Content>{Texts.Transformations.truncate(name)}</$.Placeholder.Content>
            </$.Placeholder.Container>
          )}
        </Avatar>
        <$.Top.Right>
          <$.Top.Name>{name}</$.Top.Name>
          <$.Top.Email>{email}</$.Top.Email>
        </$.Top.Right>
      </$.Top.Container>
      <section>
        {!hasUsers ? (
          <Feedbacks.UsersAlert />
        ) : (
          <List>
            <Feedbacks.ListTitle />
            {users.map((user) => {
              const { id, name, email, avatar } = user
              return (
                <List.Row key={id} className='flex items-center justify-between'>
                  <$.Row.Left>
                    {avatar ? (
                      <Image alt={`${name}'s avatar`} src={avatar} fill />
                    ) : (
                      <$.Row.Placeholder>{Texts.Transformations.truncate(name)}</$.Row.Placeholder>
                    )}
                  </$.Row.Left>
                  <$.Row.Center>
                    <NextLink href={`/${id}`}>
                      <Link as='span' className='block font-semibold' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                    <$.Row.Email>{email}</$.Row.Email>
                  </$.Row.Center>
                  <Actions.FollowButton userId={id} users={users} />
                </List.Row>
              )
            })}
          </List>
        )}
      </section>
    </$.Page.Container>
  )
}
