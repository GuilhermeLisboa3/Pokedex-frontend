import { type DeleteAccount, DeleteAccountUseCase } from '@/domain/use-cases/account'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('DeleteAccountUseCase', () => {
  let sut: DeleteAccount
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = DeleteAccountUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
