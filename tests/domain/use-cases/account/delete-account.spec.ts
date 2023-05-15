import { type DeleteAccount, DeleteAccountUseCase } from '@/domain/use-cases/account'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { AccessDeniedError } from '@/domain/errors'

describe('DeleteAccountUseCase', () => {
  let sut: DeleteAccount
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 204 })
  })

  beforeEach(() => {
    sut = DeleteAccountUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw AccessDeniedError HttpClient return 403', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 403 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
