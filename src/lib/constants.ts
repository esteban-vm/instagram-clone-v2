import type { FormInputProps } from '@/app/[locale]/(auth)/_components/atoms'
import { FaEnvelope, FaLock, FaUnlock, FaUser } from 'react-icons/fa6'

export const APP_DATA = <const>{
  APP_NAME: 'Instagram Clone',
  AUTHOR_NAME: 'Esteban V.M.',
}

export const APP_ROUTES = <const>{
  HOME: '/',
  SCENE: `/scene`,
  LOGIN: '/login',
  REGISTER: '/register',
}

export const CUSTOM_AUTH_ERRORS = <const>[
  'Email already taken',
  'Email not existing',
  'Invalid password',
  'User not logged in',
]

export type CUSTOM_AUTH_ERROR_TYPE = (typeof CUSTOM_AUTH_ERRORS)[number]

export const INPUT_PROPS = (<const>{
  EMAIL: {
    type: 'email',
    icon: FaEnvelope,
    autoFocus: true,
  },
  NAME: {
    type: 'text',
    icon: FaUser,
    spellCheck: false,
    maxLength: 50,
    autoComplete: 'given-name webauthn',
  },
  PASSWORD_SIGNIN: {
    type: 'password',
    icon: FaUnlock,
    spellCheck: false,
    placeholder: '•••••••••••••',
    autoComplete: 'current-password webauthn',
  },
  PASSWORD_SIGNUP: {
    type: 'password',
    icon: FaLock,
    spellCheck: false,
    placeholder: '•••••••••••••',
    autoComplete: 'new-password webauthn',
  },
}) satisfies Record<string, Partial<FormInputProps>>
