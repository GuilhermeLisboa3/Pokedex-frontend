import { type ListPokemons, ListPokemonsUseCase } from '@/domain/use-cases/pokemon'
import { type HttpClient } from '@/domain/contracts/http'
import { httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('ListPokemonsUseCase', () => {
  let sut: ListPokemons
  const { url } = httpClientParams
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = ListPokemonsUseCase(url, httpClient)
  })

  it('should call HttpClient with correct values', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
