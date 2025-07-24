import type { Namespace, TFunction } from 'i18next'
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'
import { Texts } from '@/lib/texts'

const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine(Texts.Validations.isNotEmpty, { params: { i18n: 'email_empty' } })
    .superRefine((value, ctx) => {
      if (Texts.Validations.isNotEmail(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, params: { i18n: 'email_invalid' } })
      }
    }),
})

const password = z
  .string()
  .trim()
  .refine(Texts.Validations.isNotEmpty, { params: { i18n: 'password_empty' } })

export const LoginSchema = EmailSchema.extend({ password })

export type LoginSchemaType = z.infer<typeof LoginSchema>

export const RegisterSchema = EmailSchema.extend({
  name: z
    .string()
    .trim()
    .refine(Texts.Validations.isNotEmpty, { params: { i18n: 'name_empty' } })
    .superRefine((value, ctx) => {
      if (Texts.Validations.isNotLength(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, params: { i18n: 'name_invalid' } })
      }
    })
    .transform(Texts.Transformations.capitalize),

  password: password.superRefine((value, ctx) => {
    if (Texts.Validations.isNotStrongPassword(value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, params: { i18n: 'password_invalid' } })
    }
  }),

  confirmPassword: z
    .string()
    .trim()
    .refine(Texts.Validations.isNotEmpty, { params: { i18n: 'password_confirmation_empty' } }),
}).refine((value) => value.password === value.confirmPassword, {
  path: ['confirmPassword'],
  params: { i18n: 'password_confirmation_invalid' },
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const SchemaWithId = z.object({ id: z.string() })

export const mapErrors = (t: TFunction<'auth'>) => {
  const ns: Namespace = 'auth'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorMap = makeZodI18nMap({ t, ns })
  z.setErrorMap(errorMap)
}
