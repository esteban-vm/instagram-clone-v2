'use client'

import { useAction } from 'next-safe-action/hooks'
import { useTranslation } from 'react-i18next'
import { FaRightFromBracket } from 'react-icons/fa6'
import { Button, Tooltip } from 'rsc-daisyui'
import { AuthActions } from '@/actions'

export function LogoutButton() {
  const { t } = useTranslation('navigation')
  const { execute, isExecuting, hasSucceeded } = useAction(AuthActions.logout)

  const onLogout = () => {
    const willLogout = confirm('Proceed?')
    if (willLogout) execute()
  }

  return (
    <Tooltip position='bottom' tip={t('logout_button')}>
      <Button
        className='mr-2'
        color='secondary'
        disabled={isExecuting || hasSucceeded}
        shape='square'
        outline
        onClick={onLogout}
      >
        <FaRightFromBracket className='size-3/4' />
      </Button>
    </Tooltip>
  )
}
