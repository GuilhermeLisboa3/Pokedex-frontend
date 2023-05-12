import { type DeletePokemon, DeletePokemonUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, PokemonParams } from '@/tests/mocks'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('DeletePokemonUseCase', () => {
  let sut: DeletePokemon
  const { idPokemon } = PokemonParams
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    httpClient.request.mockResolvedValue({ statusCode: 204 })
  })

  beforeEach(() => {
    sut = DeletePokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ idPokemon })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/${idPokemon}`, method: 'delete' })
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

  it('should delete an pokemon if HttpClient return 204', async () => {
    const result = await sut(PokemonParams)

    expect(result).toBeUndefined()
  })
})
