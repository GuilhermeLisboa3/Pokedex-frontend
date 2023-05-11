import { type AddPokemon, AddPokemonUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, PokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

describe('AddPokemonUseCase', () => {
  let sut: AddPokemon
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: true })
  })

  beforeEach(() => {
    sut = AddPokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut(PokemonParams)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: PokemonParams })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw AccessDeniedError HttpClient return 403', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 403 })

    const promise = sut(PokemonParams)

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw UnexpectedError if HttpClient return 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut(PokemonParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return true if HttpClient return 200', async () => {
    const result = await sut(PokemonParams)

    expect(result).toBeTruthy()
  })
})
