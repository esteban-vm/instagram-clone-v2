import Image from 'next/image'
import { Avatar, List, Mask } from 'rsc-daisyui'
import { UserActions } from '@/actions'
import { FollowButton, ListTitle } from '@/app/[locale]/dashboard/_components'
import { Sidebar as Styled } from '@/app/[locale]/dashboard/_styled'
import { auth } from '@/auth'
import { Texts } from '@/lib/texts'

export default async function SidebarPage() {
  const session = await auth()

  if (!session) return null
  const { avatar, name, email } = session.user

  const result = await UserActions.getSuggestedUsers()
  const users = result?.data

  return (
    <Styled.PageContainer>
      <Styled.TopContainer>
        <Avatar placeholder={!avatar}>
          {avatar ? (
            <Mask as='div' className='relative w-20' shape='circle'>
              <Image alt={`${name}'s avatar`} src={avatar} fill />
            </Mask>
          ) : (
            <Styled.TopPlaceholderContainer>
              <Styled.TopPlaceholderContent>{Texts.Transformations.truncate(name)}</Styled.TopPlaceholderContent>
            </Styled.TopPlaceholderContainer>
          )}
        </Avatar>
        <Styled.TopRight>
          <Styled.TopName>{name}</Styled.TopName>
          <Styled.TopEmail>{email}</Styled.TopEmail>
        </Styled.TopRight>
      </Styled.TopContainer>
      <section>
        <List>
          <ListTitle />
          {users?.map((user) => {
            const { id, name, email, avatar } = user
            return (
              <List.Row key={id} className='flex items-center justify-between'>
                <Styled.RowLeft>
                  {avatar ? (
                    <Image alt={`${name}'s avatar`} src={avatar} fill />
                  ) : (
                    <Styled.RowPlaceholder>{Texts.Transformations.truncate(name)}</Styled.RowPlaceholder>
                  )}
                </Styled.RowLeft>
                <Styled.RowCenter>
                  <Styled.RowName>{name}</Styled.RowName>
                  <Styled.RowEmail>{email}</Styled.RowEmail>
                </Styled.RowCenter>
                <FollowButton user={user} users={users} />
              </List.Row>
            )
          })}
        </List>
      </section>
    </Styled.PageContainer>
  )
}
