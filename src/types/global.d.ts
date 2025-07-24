import type { User as UserDB } from '@prisma/client'
import type { z } from 'zod'
import type { Locale } from '@/i18n.config'
import type { LoginSchema, RegisterSchema } from '@/lib/validations'

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }

  namespace Models {
    type User = Omit<UserDB, 'password' | 'active' | 'createdAt' | 'updatedAt'>
  }

  namespace Schemas {
    type Login = z.infer<typeof LoginSchema>
    type Register = z.infer<typeof RegisterSchema>
  }

  namespace Props {
    interface WithChildren {
      children: React.ReactNode
    }

    interface WithParams {
      params: Promise<{ locale: Locale }>
    }

    type SVGIconProps = JSX.IntrinsicElements['svg']
  }
}

export {}
