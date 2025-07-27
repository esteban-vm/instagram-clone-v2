import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'
import { Avatar, Button, Card, Mask } from 'rsc-daisyui'
import { PhotoActions } from '@/actions'
import { Timeline as $ } from '@/app/[locale]/dashboard/_styled'
import { Texts } from '@/lib/texts'

export default async function TimelinePage() {
  const result = await PhotoActions.getSuggestedPhotos()
  const photos = result?.data

  return (
    <$.Page.Container>
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
                    <$.Placeholder.Container>
                      <$.Placeholder.Content>{Texts.Transformations.truncate(name)}</$.Placeholder.Content>
                    </$.Placeholder.Container>
                  )}
                </Avatar>
                <$.Right.Container>
                  <$.Right.Content>{name}</$.Right.Content>
                </$.Right.Container>
              </Card.Title>
              <Card.Actions className='gap-1'>
                <Button shape='square' size='sm' link>
                  <FaRegHeart className='size-4/5 text-pink-500' />
                </Button>
              </Card.Actions>
              <$.Card.Likes>{_count.likes} likes</$.Card.Likes>
              {_count.comments > 0 ? (
                <$.Card.Comments>
                  {comments.map((comment) => {
                    const { id, content, author } = comment

                    return (
                      <$.Card.Item key={id}>
                        <$.Card.Name>{author.name}:</$.Card.Name> {content}
                      </$.Card.Item>
                    )
                  })}
                </$.Card.Comments>
              ) : null}
            </Card.Body>
            <$.Card.Image>
              <Image alt={caption} className='object-cover' src={image} fill />
            </$.Card.Image>
          </Card>
        )
      })}
    </$.Page.Container>
  )
}
