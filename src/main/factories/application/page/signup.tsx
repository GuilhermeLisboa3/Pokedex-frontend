import { makeSignUpValidation } from '@/main/factories/application/validation'
import { makeAddAccount } from '@/main/factories/domain/use-cases'
import { SignUp } from '@/application/pages/signup/signup'

import React from 'react'

export const MakeSignUp: React.FC = () =>
  (<SignUp addAccount={makeAddAccount()} validator={makeSignUpValidation()} />)
