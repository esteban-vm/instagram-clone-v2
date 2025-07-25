import { PhotoActions } from '@/actions'
import { verifySession } from '@/lib/auth-utils'

export default async function HomePage() {
  await verifySession()

  const result = await PhotoActions.getPhotos()
  console.log({ photos: result?.data?.map((photo) => photo.image) })

  return (
    <>
      <div>Home Page</div>
    </>
  )
}
