import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa6'
import { APP_ROUTES } from '@/lib/constants'

export function AppLogo() {
  return (
    <Link className='pb-3 font-playwrite text-xl font-bold text-primary' href={APP_ROUTES.SCENE}>
      <FaInstagram className='inline size-6' /> <span className='align-middle'>Instagram</span>
    </Link>
  )
}
