import { type HttpResponse, type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type ListPokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient) => ListPokemons
type Input = { page: number, perPage: number }
export type ListPokemons = (input: Input) => Promise<void>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async ({ page, perPage }) => {
  const listNamePokemons: HttpResponse<ListPokemon> = await httpClient.request({ url: `${url}/pokemon?limit=${perPage}&offset=${page}`, method: 'get' })
  if (listNamePokemons.statusCode !== 200) throw new UnexpectedError()
  listNamePokemons.data?.results.forEach(async (pokemon) => {
    await httpClient.request({ url: `${url}/pokemon/${pokemon.name}`, method: 'get' })
  })
}
