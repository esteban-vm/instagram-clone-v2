import type { Prisma } from '@prisma/client'
import type { Molecules } from '@/app/[locale]/(auth)/_components'
import { FaEnvelope, FaLock, FaUnlock, FaUser } from 'react-icons/fa6'

export const APP_DATA = {
  APP_NAME: 'Instagram Clone',
  AUTHOR_NAME: 'Esteban V.M.',
} as const satisfies Record<Uppercase<string>, string>

export const APP_ROUTES = {
  HOME: '/',
  SCENE: `/scene`,
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const satisfies Record<Uppercase<string>, `/${string}`>

export const CUSTOM_AUTH_ERRORS = {
  USER_ALREADY_EXISTS: 'User already exists',
  USER_DOES_NOT_EXIST: 'User does not exist',
  INVALID_PASSWORD: 'Invalid password',
  USER_NOT_LOGGED_IN: 'User not logged in',
} as const satisfies Record<Uppercase<string>, string>

export const INPUT_PROPS = {
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
} as const satisfies Record<Uppercase<string>, Partial<Molecules.FormInputProps>>

export const MOCK_USERS = [
  {
    email: 'user1@example.com',
    name: 'Daniel',
    password: 'Abcd123*',
    avatar: '/images/avatars/male1.webp',
  },
  {
    email: 'user2@example.com',
    name: 'Ana',
    password: 'Abcd123*',
    avatar: '/images/avatars/female1.webp',
  },
  {
    email: 'user3@example.com',
    name: 'Clara',
    password: 'Abcd123*',
    avatar: '/images/avatars/female2.webp',
  },
  {
    email: 'user4@example.com',
    name: 'Sergio',
    password: 'Abcd123*',
    avatar: '/images/avatars/male2.webp',
  },
  {
    email: 'user5@example.com',
    name: 'Helena',
    password: 'Abcd123*',
    avatar: '/images/avatars/female3.webp',
  },
  {
    email: 'user6@example.com',
    name: 'Fernando',
    password: 'Abcd123*',
    avatar: '/images/avatars/male3.webp',
  },
  {
    email: 'user7@example.com',
    name: 'Antonio',
    password: 'Abcd123*',
  },
  {
    email: 'user8@example.com',
    name: 'Laura',
    password: 'Abcd123*',
    avatar: '/images/avatars/female4.webp',
  },
  {
    email: 'user9@example.com',
    name: 'María',
    password: 'Abcd123*',
    avatar: '/images/avatars/female5.webp',
  },
  {
    email: 'user10@example.com',
    name: 'Francisco',
    password: 'Abcd123*',
  },
  {
    email: 'user11@example.com',
    name: 'Esteban',
    password: 'Abcd123*',
  },
  {
    email: 'user12@example.com',
    name: 'Aldo',
    password: 'Abcd123*',
  },
] as const satisfies Prisma.UserCreateManyInput[]
