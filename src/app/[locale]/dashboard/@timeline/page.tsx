import Image from 'next/image'
import { Avatar, Card, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { Actions, Feedbacks, Inputs } from '@/app/[locale]/dashboard/_components'
import { Timeline as Styled } from '@/app/[locale]/dashboard/_styled'
import { Texts } from '@/lib/texts'

export default async function TimelinePage() {
  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data ?? []
  const hasPhotos = photos.length > 0

  return (
    <Styled.Page.Container>
      {!hasPhotos ? (
        <Feedbacks.PhotosAlert />
      ) : (
        photos.map((photo) => {
          const { id, image, caption, comments, likes, owner, createdAt, _count } = photo
          const { name, avatar } = owner
          return (
            <Card key={id} className='mx-auto w-full max-w-2xl shadow-md' border>
              <Card.Body className='items-start'>
                <Card.Title>
                  <Avatar placeholder={!avatar}>
                    {avatar ? (
                      <Mask as='div' className='relative w-16' shape='circle'>
                        <Image alt={`${name}'s avatar`} src={avatar} fill />
                      </Mask>
                    ) : (
                      <Styled.Placeholder.Container>
                        <Styled.Placeholder.Content>{Texts.Transformations.truncate(name)}</Styled.Placeholder.Content>
                      </Styled.Placeholder.Container>
                    )}
                  </Avatar>
                  <Styled.Right.Container>
                    <Styled.Right.Content>{name}</Styled.Right.Content>
                  </Styled.Right.Container>
                </Card.Title>
              </Card.Body>
              <Styled.Card.Image>
                <Image alt={caption} className='object-cover contrast-125' src={image} fill />
              </Styled.Card.Image>
              <Card.Body className='h-full items-start justify-around'>
                <Card.Actions className='gap-3.5'>
                  <Actions.LikeButton likes={likes} likesCount={_count.likes} photoId={id} />
                  <Actions.CommentButton commentsCount={_count.comments} />
                </Card.Actions>
                <Styled.Card.List>
                  {comments.map((comment) => {
                    const { id, content, author } = comment
                    return (
                      <Styled.Card.Item key={id}>
                        <Styled.Card.Name>{author.name}:</Styled.Card.Name> {content}
                      </Styled.Card.Item>
                    )
                  })}
                  {Array(3 - _count.comments)
                    .fill(null)
                    .map(() => (
                      <br key={crypto.randomUUID()} />
                    ))}
                </Styled.Card.List>
                <Card.Actions>
                  <Feedbacks.PhotoDate date={createdAt} />
                </Card.Actions>
                <Inputs.CommentField />
              </Card.Body>
            </Card>
          )
        })
      )}
    </Styled.Page.Container>
  )
}
