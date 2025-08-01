import Image from 'next/image'
import { Avatar, Card, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { CommentButton, LikeButton, PhotoDate, PhotosAlert } from '@/app/[locale]/dashboard/_components'
import { Timeline as $ } from '@/app/[locale]/dashboard/_styled'
import { Texts } from '@/lib/texts'

export default async function TimelinePage() {
  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data ?? []
  const hasPhotos = photos.length > 0

  return (
    <$.Page.Container>
      {!hasPhotos ? (
        <PhotosAlert />
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
                      <$.Placeholder.Container>
                        <$.Placeholder.Content>{Texts.Transformations.truncate(name)}</$.Placeholder.Content>
                      </$.Placeholder.Container>
                    )}
                  </Avatar>
                  <$.Right.Container>
                    <$.Right.Content>{name}</$.Right.Content>
                  </$.Right.Container>
                </Card.Title>
              </Card.Body>
              <$.Card.Image>
                <Image alt={caption} className='object-cover contrast-125' src={image} fill />
              </$.Card.Image>
              <Card.Body className='h-full items-start justify-around'>
                <Card.Actions className='gap-3.5'>
                  <LikeButton likes={likes} likesCount={_count.likes} photoId={id} />
                  <CommentButton commentsCount={_count.comments} />
                </Card.Actions>
                <$.Card.List>
                  {comments.map((comment) => {
                    const { id, content, author } = comment
                    return (
                      <$.Card.Item key={id}>
                        <$.Card.Name>{author.name}:</$.Card.Name> {content}
                      </$.Card.Item>
                    )
                  })}
                  {Array(3 - _count.comments)
                    .fill(null)
                    .map(() => (
                      <br key={crypto.randomUUID()} />
                    ))}
                </$.Card.List>
                <Card.Actions>
                  <PhotoDate date={createdAt} />
                </Card.Actions>
              </Card.Body>
            </Card>
          )
        })
      )}
    </$.Page.Container>
  )
}
