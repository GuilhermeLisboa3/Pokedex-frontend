import { makeAuthentication } from '@/main/factories/domain/use-cases'
import { makeLoginValidation } from '@/main/factories/application/validation'
import { Login } from '@/application/pages/login/login'

import React from 'react'

export const MakeLogin: React.FC = () => (
  <Login authentication={makeAuthentication()} validator={makeLoginValidation()} />
)
