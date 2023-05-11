import { type GetDataPokemon, GetDataPokemonUseCase } from '@/domain/use-cases/api-pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, ApiPokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'
import { UnexpectedError } from '@/domain/errors'

describe('GetDataPokemonUseCase', () => {
  let sut: GetDataPokemon
  const { url } = httpClientParams
  const { name, abilities, height, species } = ApiPokemonParams
  const httpClient = mock<HttpClient>()
  const returnFirstRequest = { statusCode: 200, data: { name, abilities, height, species } }
  const returnSecondRequest = { statusCode: 200, data: { flavor_text_entries: [{ flavor_text: 'Capable of copying an enemys genetic code to instantlytransform itself into a duplicate of the enemy', language: { name: 'en' } }] } }

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 200, data: { name, abilities, height, species } })
  })

  beforeEach(() => {
    sut = GetDataPokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    httpClient.request.mockResolvedValueOnce(returnFirstRequest).mockResolvedValueOnce(returnSecondRequest)
    await sut({ name })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/pokemon/${name}`, method: 'get' })
  })

  it('should throw UnexpectedError if HttpClient return 500', async () => {
    httpClient.request.mockResolvedValueOnce({ statusCode: 500 })

    const promise = sut({ name })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should call HttpClient if first HttpClient return 200', async () => {
    httpClient.request.mockResolvedValueOnce(returnFirstRequest).mockResolvedValueOnce(returnSecondRequest)
    await sut({ name })

    expect(httpClient.request).toHaveBeenNthCalledWith(2, { url: `${species.url}`, method: 'get' })
  })

  it('should return pokemons on success', async () => {
    httpClient.request.mockResolvedValueOnce(returnFirstRequest).mockResolvedValueOnce(returnSecondRequest)
    const result = await sut({ name })

    expect(result).toEqual({ pokemon: { name, abilities, height, species }, description: 'Capable of copying an enemys genetic code to instantly transform itself into a duplicate of the enemy' })
  })
})
