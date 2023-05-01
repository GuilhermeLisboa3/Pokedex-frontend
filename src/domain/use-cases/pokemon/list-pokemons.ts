import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<{ results: Array<{ name: string }> }>) => ListPokemons
type Input = { page: number, perPage: number }
type Output = Array<{ name: string }>
export type ListPokemons = (input: Input) => Promise<Output>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async ({ page, perPage = 25 }) => {
  const listNamePokemons = await httpClient.request({ url: `${url}/pokemon?limit=${perPage}&offset=${page}`, method: 'get' })
  switch (listNamePokemons.statusCode) {
    case 200: return listNamePokemons.data!.results
    default: throw new UnexpectedError()
  }
}
