import { PrivateRoute } from '@/main/proxies'
import { AccountContext } from '@/application/contexts'

import { render } from '@testing-library/react'
import React from 'react'

jest.mock('next/navigation')

describe('PrivateRoute', () => {
  const useRouter = jest.spyOn(require('next/navigation'), 'useRouter')
  const router = { push: jest.fn() }
  const Home: React.FC = () => <div />

  const getCurrentAccountMock: jest.Mock = jest.fn()

  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: getCurrentAccountMock }}>
        <PrivateRoute><Home/></PrivateRoute>
      </AccountContext.Provider>
    )
  }

  beforeAll(() => {
    useRouter.mockReturnValue(router)
  })

  it('should redirect to /login if token is empty', () => {
    makeSut()

    expect(router.push).toHaveBeenCalledWith('/login')
  })
})
