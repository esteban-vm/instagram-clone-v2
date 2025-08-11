import Image from 'next/image'
import NextLink from 'next/link'
import { Avatar, Card, Link, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'
import { Texts } from '@/lib/texts'
import { Buttons, Feedbacks, Forms } from '../_components'
import * as $ from './page.styled'

export default async function Page() {
  const { user } = await verifySession()
  const { id: userId } = user

  const results = await PhotoActions.getSuggestions()
  const photos = results?.data ?? []
  const hasPhotos = photos.length > 0

  return (
    <$.page.container>
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
                      <$.placeholder.container>
                        <$.placeholder.content>{Texts.Transformations.truncate(name)}</$.placeholder.content>
                      </$.placeholder.container>
                    )}
                  </Avatar>
                  <$.right.container>
                    <NextLink href={`/${ownerId}`}>
                      <Link as='span' className='text-sm font-bold uppercase' color='accent' hover>
                        {name}
                      </Link>
                    </NextLink>
                  </$.right.container>
                </Card.Title>
              </Card.Body>
              <$.card.image>
                <Image alt={caption} className='object-cover contrast-125' src={image} fill />
              </$.card.image>
              <Card.Body className='h-full items-start justify-around gap-0.5 p-2.5 pb-0'>
                <Card.Actions className='gap-3.5'>
                  <Buttons.ToggleLike count={_count.likes} likes={likes} photoId={photoId} userId={userId} />
                  <Buttons.AddComment count={_count.comments} photoId={photoId} />
                </Card.Actions>
                <$.card.list>
                  {comments.map((comment) => {
                    const { id, content, author } = comment
                    return (
                      <$.card.item key={id}>
                        <$.card.username>{author.name}:</$.card.username> {content}
                      </$.card.item>
                    )
                  })}
                  {Array(3 - comments.length)
                    .fill(null)
                    .map(() => (
                      <br key={crypto.randomUUID()} />
                    ))}
                </$.card.list>
                <Feedbacks.PhotoCardDate date={createdAt} />
                <Forms.CommentForm photoId={photoId} />
              </Card.Body>
            </Card>
          )
        })
      )}
    </$.page.container>
  )
}
