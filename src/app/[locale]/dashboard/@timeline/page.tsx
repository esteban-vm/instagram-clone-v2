import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'
import { Avatar, Button, Card, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { Timeline as Styled } from '@/app/[locale]/dashboard/_styled'
import { Texts } from '@/lib/texts'

export default async function TimelinePage() {
  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data

  return (
    <Styled.PageContainer>
      {photos?.map((photo) => {
        const { id, image, caption, comments, owner, _count } = photo
        const { name, avatar } = owner

        return (
          <Card key={id} className='shadow-md' border>
            <Card.Body className='items-start gap-1 px-3.5 pt-3.5 pb-1.5'>
              <Card.Title>
                <Avatar placeholder={!avatar}>
                  {avatar ? (
                    <Mask as='div' className='relative w-14' shape='circle'>
                      <Image alt={`${name}'s avatar`} src={avatar} fill />
                    </Mask>
                  ) : (
                    <Styled.CardPlaceholderContainer>
                      <Styled.CardPlaceholderContent>
                        {Texts.Transformations.truncate(name)}
                      </Styled.CardPlaceholderContent>
                    </Styled.CardPlaceholderContainer>
                  )}
                </Avatar>
                <Styled.CardNameContainer>
                  <Styled.CardNameContent>{name}</Styled.CardNameContent>
                </Styled.CardNameContainer>
              </Card.Title>
              <Card.Actions className='gap-1'>
                <Button shape='square' size='sm' link>
                  <FaRegHeart className='size-4/5 text-pink-500' />
                </Button>
              </Card.Actions>
              <Styled.CardLikes>{_count.likes} likes</Styled.CardLikes>
              {_count.comments > 0 ? (
                <Styled.CardComments>
                  {comments.map((comment) => {
                    const { id, content, author } = comment
                    return (
                      <Styled.CardCommentItem key={id}>
                        <Styled.CardCommentName>{author.name}:</Styled.CardCommentName> {content}
                      </Styled.CardCommentItem>
                    )
                  })}
                </Styled.CardComments>
              ) : null}
            </Card.Body>
            <Styled.CardImageContainer>
              <Image alt={caption} className='object-cover' src={image} fill />
            </Styled.CardImageContainer>
          </Card>
        )
      })}
    </Styled.PageContainer>
  )
}
