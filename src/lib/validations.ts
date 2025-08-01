import { z } from 'zod'
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
      if (Texts.Validations.isNotCorrectLength(value)) {
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
export type SchemaWithIdType = z.infer<typeof SchemaWithId>
