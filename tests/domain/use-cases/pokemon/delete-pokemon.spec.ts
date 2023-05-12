import { type DeletePokemon, DeletePokemonUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams, PokemonParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('DeletePokemonUseCase', () => {
  let sut: DeletePokemon
  const { idPokemon } = PokemonParams
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = DeletePokemonUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut({ idPokemon })

    expect(httpClient.request).toHaveBeenCalledWith({ url: `${url}/${idPokemon}`, method: 'delete' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
