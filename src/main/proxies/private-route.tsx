import { AccountContext } from '@/application/contexts'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export type Props = { children: JSX.Element }

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { push } = useRouter()
  const [lodding, setLodding] = useState(true)
  const { getCurrentAccount } = useContext(AccountContext)

  useEffect(() => {
    if (!getCurrentAccount()?.token) {
      push('/login')
    } else {
      setLodding(false)
    }
  }, [])

  return (
    <>
      {
        lodding ? <div></div> : children
      }
    </>
  )
}
