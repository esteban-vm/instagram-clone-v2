import NextAuth from 'next-auth'
import { i18nRouter } from 'next-i18n-router'
import authConfig from '@/auth.config'
import i18nConfig from '@/i18n.config'

const { auth } = NextAuth(authConfig)

export default auth((request) => i18nRouter(request, i18nConfig))

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
