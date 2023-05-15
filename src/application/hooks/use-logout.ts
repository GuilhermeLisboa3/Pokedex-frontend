import { AccountContext } from '@/application/contexts'
import { useRouter } from 'next/navigation'

import { useContext } from 'react'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const router = useRouter()
  const { setCurrentAccount } = useContext(AccountContext)
  return (): void => {
    setCurrentAccount(undefined as any)
    router.push('/')
  }
}
