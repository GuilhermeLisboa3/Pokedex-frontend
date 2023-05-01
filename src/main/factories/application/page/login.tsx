import { makeAuthentication } from '@/main/factories/domain/use-cases'
import { makeLoginValidation } from '@/main/factories/application/validation'
import { setCurrentAccountAdapter } from '@/main/adapters'
import { AccountContext } from '@/application/contexts'
import { Login } from '@/application/pages/login/login'

import React from 'react'

export const MakeLogin: React.FC = () => (
  <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
    <Login authentication={makeAuthentication()} validator={makeLoginValidation()} />
  </AccountContext.Provider>
)
