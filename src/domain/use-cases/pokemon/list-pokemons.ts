import { type HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient<boolean>) => ListPokemons
export type ListPokemons = () => Promise<void>

export const ListPokemonsUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'get' })
}
