import type { User as UserDB } from '@prisma/client'
import type { ReactNode } from 'react'
import type { z } from 'zod'
import type { Locale } from '@/i18n.config'
import type { LoginSchema, RegisterSchema } from '@/lib/validations'

declare global {
  namespace Models {
    type User = Omit<UserDB, 'password' | 'active' | 'createdAt' | 'updatedAt'>
  }

  namespace Schemas {
    type Login = z.infer<typeof LoginSchema>
    type Register = z.infer<typeof RegisterSchema>
  }

  namespace Props {
    interface WithChildren {
      children: ReactNode
    }

    interface WithParams {
      params: Promise<{ locale: Locale }>
    }
  }
}

export {}
