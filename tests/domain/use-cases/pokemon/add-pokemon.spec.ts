import { type AddPokemon, AddPokemonUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, PokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('AddPokemonUseCase', () => {
  let sut: AddPokemon
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = AddPokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut(PokemonParams)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', body: PokemonParams })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
