import { type GetListFavoritePokemon, GetListFavoritePokemonUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { PokemonParams, httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('GetListFavoritePokemonUseCase', () => {
  let sut: GetListFavoritePokemon
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: [PokemonParams] })
  })

  beforeEach(() => {
    sut = GetListFavoritePokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw AccessDeniedError HttpClient return 403', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 403 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient return 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return listFavoritePokemon if HttpClient return 200', async () => {
    const result = await sut()

    expect(result).toEqual([PokemonParams])
  })
})
