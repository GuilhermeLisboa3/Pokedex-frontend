import { type AddAccount, AddAccountUseCase } from '@/domain/use-cases/account'
import { type HttpClient } from '@/domain/contracts/http'
import { AccountParams, httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { FieldInUseError, UnexpectedError } from '@/domain/errors'

describe('AddAccountUseCase', () => {
  let sut: AddAccount
  const { url } = httpClientParams
  const { name, email, password } = AccountParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: true })
  })

  beforeEach(() => {
    sut = AddAccountUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ name, email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { name, email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if HttpClient return 403', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 403 })

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new FieldInUseError('email'))
  })

  it('should throw UnexpectedError if HttpClient return 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ name, email, password })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return true if HttpClient return 200', async () => {
    const result = await sut({ name, email, password })

    expect(result).toBeTruthy()
  })
})
