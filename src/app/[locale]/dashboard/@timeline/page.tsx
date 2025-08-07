import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Card, Link, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { Buttons, Feedbacks, Forms } from '@/app/[locale]/dashboard/_components'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import * as styled from './page.styled'

export default async function TimelinePage() {
  const { user } = await verifySession()
  const { id: userId } = user

  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data ?? []
  const hasPhotos = photos.length > 0

  return (
    <styled.page.container>
      {!hasPhotos ? (
        <Feedbacks.NoResultsAlert
          className='col-span-2 self-start justify-self-center'
          prefix='timeline.photos_alert'
        />
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
                      <styled.placeholder.container>
                        <styled.placeholder.content>{Texts.Transformations.truncate(name)}</styled.placeholder.content>
                      </styled.placeholder.container>
                    )}
                  </Avatar>
                  <styled.right.container>
                    <NextLink href={`/${ownerId}`}>
                      <Link as='span' className='text-sm font-bold uppercase' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                  </styled.right.container>
                </Card.Title>
              </Card.Body>
              <styled.card.image>
                <Image alt={caption} className='object-cover contrast-125' src={image} fill />
              </styled.card.image>
              <Card.Body className='h-full items-start justify-around gap-0.5 p-2.5 pb-0'>
                <Card.Actions className='gap-3.5'>
                  <Buttons.LikeButton count={_count.likes} likes={likes} photoId={photoId} userId={userId} />
                  <Buttons.CommentButton count={_count.comments} photoId={photoId} />
                </Card.Actions>
                <styled.card.list>
                  {comments.map((comment) => {
                    const { id, content, author } = comment
                    return (
                      <styled.card.item key={id}>
                        <styled.card.username>{author.name}:</styled.card.username> {content}
                      </styled.card.item>
                    )
                  })}
                  {Array(3 - comments.length)
                    .fill(null)
                    .map(() => (
                      <br key={crypto.randomUUID()} />
                    ))}
                </styled.card.list>
                <Feedbacks.PhotoCardDate date={createdAt} />
                <Forms.CommentForm photoId={photoId} />
              </Card.Body>
            </Card>
          )
        })
      )}
    </styled.page.container>
  )
}
