import { type Authentication, AuthenticationUseCase } from '@/domain/use-cases/account'
import { type HttpClient } from '@/domain/contracts/http'
import { AccountParams, httpClientParams } from '@/tests/mocks'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('AuthenticationUseCase', () => {
  let sut: Authentication
  const { url } = httpClientParams
  const { email, password } = AccountParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200 })
  })

  beforeEach(() => {
    sut = AuthenticationUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ email, password })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: { email, password } })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidCredentialsError if HttpClient return 401', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 401 })

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpClient return 400', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 400 })

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient return 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ email, password })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
