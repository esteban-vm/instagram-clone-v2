import type { Namespace } from 'i18next'
import initTranslations from '@/app/init-translations'
import { TranslationProvider } from '@/components'
import { verifySession } from '@/lib/auth-utils'

export default async function HomePage({ params }: Props.WithParams) {
  await verifySession()

  const namespace: Namespace = 'home'
  const { locale } = await params
  const { t, resource } = await initTranslations(locale, namespace)

  return (
    <TranslationProvider locale={locale} namespace={namespace} resource={resource}>
      <div>Home Page</div>
      <span>{t('title')} </span>
    </TranslationProvider>
  )
}
