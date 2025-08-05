import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Card, Link, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { Actions, Feedbacks, Forms } from '@/app/[locale]/dashboard/_components'
import { Timeline as $ } from '@/app/[locale]/dashboard/_styled'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'

export default async function TimelinePage() {
  const { user } = await verifySession()
  const { id: userId } = user

  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data ?? []
  const hasPhotos = photos.length > 0

  return (
    <$.Page.Container>
      {!hasPhotos ? (
        <Feedbacks.PhotosAlert />
      ) : (
        photos.map((photo) => {
          const { id: photoId, image, caption, comments, likes, owner, createdAt, _count } = photo
          const { id: ownerId, name, avatar } = owner
          return (
            <Card key={photoId} className='mx-auto h-fit w-full max-w-2xl pt-2.5 shadow-md' border>
              <Card.Body className='items-start p-2.5'>
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
                    <NextLink href={`/${ownerId}`}>
                      <Link as='span' className='text-sm font-bold uppercase' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                  </$.Right.Container>
                </Card.Title>
              </Card.Body>
              <$.Card.Image>
                <Image alt={caption} className='object-cover contrast-125' src={image} fill />
              </$.Card.Image>
              <Card.Body className='h-full items-start justify-around gap-0.5 p-2.5 pb-0'>
                <Card.Actions className='gap-3.5'>
                  <Actions.LikeButton count={_count.likes} likes={likes} photoId={photoId} userId={userId} />
                  <Actions.CommentButton count={_count.comments} photoId={photoId} />
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
                  {Array(3 - comments.length)
                    .fill(null)
                    .map(() => (
                      <br key={crypto.randomUUID()} />
                    ))}
                </$.Card.List>
                <Feedbacks.PhotoDate date={createdAt} />
                <Forms.CommentForm photoId={photoId} />
              </Card.Body>
            </Card>
          )
        })
      )}
    </$.Page.Container>
  )
}
