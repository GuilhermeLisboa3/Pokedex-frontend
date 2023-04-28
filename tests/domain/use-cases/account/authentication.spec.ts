import { type Authentication, AuthenticationUseCase } from '@/domain/use-cases/account'
import { type HttpClient } from '@/domain/contracts/http'
import { AccountParams, httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('AuthenticationUseCase', () => {
  let sut: Authentication
  const { url } = httpClientParams
  const { email, password } = AccountParams
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = AuthenticationUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
