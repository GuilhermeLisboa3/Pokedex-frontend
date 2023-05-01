import { type ListPokemons, ListPokemonsUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, PokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { UnexpectedError } from '@/domain/errors'

describe('ListPokemonsUseCase', () => {
  let sut: ListPokemons
  const { name } = PokemonParams
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: { results: [name] } })
  })

  beforeEach(() => {
    sut = ListPokemonsUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('should throw UnexpectedError if HttpClient return error', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an pokemon if HttpClient return 200', async () => {
    const result = await sut()

    expect(result).toEqual([name])
  })
})
