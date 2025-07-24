import { Avatar, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { FollowButton, ListTitle } from '@/app/[locale]/dashboard/_components'
import { Sidebar } from '@/app/[locale]/dashboard/_styled'
import { auth } from '@/auth'
import { Texts } from '@/lib/texts'

export default async function SidebarPage() {
  const session = await auth()

  if (!session) return null
  const { avatar, name, email } = session.user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data

  return (
    <aside>
      <Sidebar.TopContainer>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-20' shape='circle'>
              <Sidebar.StyledImage alt='avatar' src={avatar} fill />
            </Mask>
          ) : (
            <Sidebar.TopPlaceholderContainer>
              <Sidebar.TopPlaceholderContent>{Texts.truncate(name)}</Sidebar.TopPlaceholderContent>
            </Sidebar.TopPlaceholderContainer>
          )}
        </Avatar>
        <Sidebar.TopRight>
          <Sidebar.TopName>{name}</Sidebar.TopName>
          <Sidebar.TopEmail>{email}</Sidebar.TopEmail>
        </Sidebar.TopRight>
      </Sidebar.TopContainer>
      <section>
        <List>
          <ListTitle />
          {users?.map((user) => {
            const { id, name, email, avatar } = user
            return (
              <List.Row key={id} className='flex items-center justify-between'>
                <Sidebar.BottomLeft>
                  {avatar ? (
                    <Sidebar.StyledImage alt='avatar' src={avatar} fill />
                  ) : (
                    <Sidebar.BottomPlaceholder>{Texts.truncate(name)}</Sidebar.BottomPlaceholder>
                  )}
                </Sidebar.BottomLeft>
                <Sidebar.BottomCenter>
                  <Sidebar.BottomName>{name}</Sidebar.BottomName>
                  <Sidebar.BottomEmail>{email}</Sidebar.BottomEmail>
                </Sidebar.BottomCenter>
                <FollowButton user={user} users={users} />
              </List.Row>
            )
          })}
        </List>
      </section>
    </aside>
  )
}
