import { type HttpResponse, type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type ApiPokemon, type ListPokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient) => ListPokemons
type Input = { page: number, perPage: number }
type Output = { count: number, pokemons: ApiPokemon[] }
export type ListPokemons = (input: Input) => Promise<Output>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async ({ page, perPage }) => {
  const listNamePokemons: HttpResponse<ListPokemon> = await httpClient.request({ url: `${url}/pokemon?limit=${perPage}&offset=${page}`, method: 'get' })
  if (listNamePokemons.statusCode !== 200) throw new UnexpectedError()
  const listPokemons: any = listNamePokemons.data?.results.map(async (pokemon) => {
    const dataPokemon = await httpClient.request({ url: `${pokemon.url}`, method: 'get' })
    return dataPokemon.data
  })
  const pokemons = await Promise.all(listPokemons)
  return { count: listNamePokemons.data!.count, pokemons }
}
