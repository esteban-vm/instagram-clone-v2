import { PhotoActions } from '@/actions'
import { Timeline } from '@/app/[locale]/dashboard/_styled'

export default async function TimelinePage() {
  const result = await PhotoActions.getSuggestedPhotos()
  console.log({ photos: result?.data })

  return (
    <Timeline.PageContainer>
      <span>Timeline Page</span>
    </Timeline.PageContainer>
  )
}
