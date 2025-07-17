import { useAction } from 'next-safe-action/hooks'
import { useTranslation } from 'react-i18next'
import { FaRightFromBracket } from 'react-icons/fa6'
import { Button } from 'rsc-daisyui'
import { AuthActions } from '@/actions'

export function LogoutButton() {
  const { t } = useTranslation('navigation')
  const { execute, isExecuting, hasSucceeded } = useAction(AuthActions.logout)

  const onLogout = () => {
    const willLogout = confirm('Are you sure?')
    if (willLogout) execute()
  }

  return (
    <Button
      className='mr-2'
      color='secondary'
      disabled={isExecuting || hasSucceeded}
      shape='square'
      title={t('logout_button')}
      outline
      onClick={onLogout}
    >
      <FaRightFromBracket className='size-3/4' />
    </Button>
  )
}
