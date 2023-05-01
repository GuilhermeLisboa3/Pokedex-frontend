import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<{ results: Array<{ name: string }> }>) => ListPokemons
type Output = Array<{ name: string }>
export type ListPokemons = () => Promise<Output>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode, data } = await httpClient.request({ url, method: 'get' })
  switch (statusCode) {
    case 200: return data!.results
    default: throw new UnexpectedError()
  }
}
