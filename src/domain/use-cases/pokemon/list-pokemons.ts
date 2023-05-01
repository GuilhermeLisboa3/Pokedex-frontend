import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<boolean>) => ListPokemons
export type ListPokemons = () => Promise<void>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'get' })
  switch (statusCode) {
    case 200: return undefined
    default: throw new UnexpectedError()
  }
}
