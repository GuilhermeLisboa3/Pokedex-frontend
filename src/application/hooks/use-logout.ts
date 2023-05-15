import { AccountContext } from '@/application/contexts'

import { useContext } from 'react'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(AccountContext)
  return (): void => {
    setCurrentAccount(undefined as any)
    location.reload()
  }
}
