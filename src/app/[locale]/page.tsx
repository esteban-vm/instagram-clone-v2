import type { Namespace } from 'i18next'
import initTranslations from '@/app/init-translations'
import { TranslationProvider } from '@/components'
import { verifySession } from '@/lib/auth-utils'

export default async function HomePage({ params }: Props.WithParams) {
  await verifySession()

  const { locale } = await params
  const namespace: Namespace = 'home'
  const { t, resource: resources } = await initTranslations(locale, namespace)

  return (
    <TranslationProvider locale={locale} namespace={namespace} resource={resources}>
      <div>Home Page</div>
      <span>{t('title')} </span>
    </TranslationProvider>
  )
}
