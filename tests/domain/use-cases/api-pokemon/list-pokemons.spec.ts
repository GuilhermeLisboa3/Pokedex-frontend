import { type ListPokemons, ListPokemonsUseCase } from '@/domain/use-cases/api-pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, ApiPokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { UnexpectedError } from '@/domain/errors'

describe('ListPokemonsUseCase', () => {
  const page: number = 25
  const perPage: number = 25
  let sut: ListPokemons
  const { name, id, height } = ApiPokemonParams
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: { results: [{ name, url }], count: 1 } })
  })

  beforeEach(() => {
    sut = ListPokemonsUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ page, perPage })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/pokemon?limit=${perPage}&offset=${page}`, method: 'get' })
  })

  it('should throw UnexpectedError if first HttpClient return error', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ page, perPage })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should call second HttpClient if first HttpClient returns 200', async () => {
    await sut({ page, perPage })

    expect(httpClient.request).toHaveBeenNthCalledWith(2, { url: `${url}`, method: 'get' })
  })

  it('should return listPokemons on success', async () => {
    httpClient.request
      .mockResolvedValueOnce({ statusCode: 200, data: { results: [{ name }], count: 1 } })
      .mockResolvedValueOnce({ statusCode: 200, data: { name, id, height } })
    const result = await sut({ page, perPage })

    expect(result).toEqual({ count: 1, pokemons: [{ name, id, height }] })
  })

  it('should return an empty listPokemon if the request fails', async () => {
    httpClient.request
      .mockResolvedValueOnce({ statusCode: 200, data: { results: [{ name }], count: 1 } })
      .mockResolvedValueOnce({ statusCode: 500 })
    const result = await sut({ page, perPage })

    expect(result).toEqual({ count: 1, pokemons: [] })
  })
})
