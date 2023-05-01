import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon>) => ListPokemons
type Output = Pokemon
export type ListPokemons = () => Promise<Output>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode, data } = await httpClient.request({ url, method: 'get' })
  switch (statusCode) {
    case 200: return data!
    default: throw new UnexpectedError()
  }
}
