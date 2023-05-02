import { type HttpResponse, type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon, type ListPokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient) => ListPokemons
type Input = { page: number, perPage: number }
type Output = { count?: number, pokemons: Pokemon[] }
export type ListPokemons = (input: Input) => Promise<Output>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async ({ page, perPage }) => {
  const pokemons: Pokemon[] = []
  const listNamePokemons: HttpResponse<ListPokemon> = await httpClient.request({ url: `${url}/pokemon?limit=${perPage}&offset=${page}`, method: 'get' })
  if (listNamePokemons.statusCode !== 200) throw new UnexpectedError()
  listNamePokemons.data?.results.forEach(async (pokemon) => {
    const dataPokemon = await httpClient.request({ url: `${url}/pokemon/${pokemon.name}`, method: 'get' })
    if (dataPokemon.statusCode === 200) pokemons.push(dataPokemon.data)
  })
  return { count: listNamePokemons.data?.count, pokemons }
}
