import type { Namespace, TFunction } from 'i18next'
import { isEmail, isEmpty, isLength, isStrongPassword } from 'validator'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { Texts } from '@/lib/texts'

const isNotEmpty = (value: string) => !isEmpty(value)

const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine(isNotEmpty, { params: { i18n: 'email_empty' } })
    .superRefine((value, ctx) => {
      if (!isEmail(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          params: { i18n: 'email_invalid' },
        })
      }
    }),
})

const password = z
  .string()
  .trim()
  .refine(isNotEmpty, { params: { i18n: 'password_empty' } })

export const LoginSchema = EmailSchema.extend({ password })

export const RegisterSchema = EmailSchema.extend({
  name: z
    .string()
    .trim()
    .refine(isNotEmpty, { params: { i18n: 'name_empty' } })
    .superRefine((value, ctx) => {
      if (!isLength(value, { min: 4, max: 50 })) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          params: { i18n: 'name_invalid' },
        })
      }
    })
    .transform(Texts.capitalize),

  password: password.superRefine((value, ctx) => {
    if (!isStrongPassword(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'password_invalid' },
      })
    }
  }),

  confirmPassword: z
    .string()
    .trim()
    .refine(isNotEmpty, { params: { i18n: 'password_confirmation_empty' } }),
}).refine((value) => value.password === value.confirmPassword, {
  path: ['confirmPassword'],
  params: { i18n: 'password_confirmation_invalid' },
})

export const SchemaWithId = z.object({ id: z.string() })

export const mapErrors = (t: TFunction<'auth'>) => {
  const ns: Namespace = 'auth'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorMap = makeZodI18nMap({ t, ns })
  z.setErrorMap(errorMap)
}
