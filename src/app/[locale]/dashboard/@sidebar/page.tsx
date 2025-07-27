import Image from 'next/image'
import { Avatar, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { FollowButton, ListTitle } from '@/app/[locale]/dashboard/_components'
import { Sidebar as $ } from '@/app/[locale]/dashboard/_styled'
import { auth } from '@/auth'
import { Texts } from '@/lib/texts'

export default async function SidebarPage() {
  const session = await auth()

  if (!session) return null
  const { avatar, name, email } = session.user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data

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
        <List>
          <ListTitle />
          {users?.map((user) => {
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
                  <$.Row.Name>{name}</$.Row.Name>
                  <$.Row.Email>{email}</$.Row.Email>
                </$.Row.Center>
                <FollowButton user={user} users={users} />
              </List.Row>
            )
          })}
        </List>
      </section>
    </$.Page.Container>
  )
}
