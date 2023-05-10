import { type HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient) => GetListFavoritePokemon
export type GetListFavoritePokemon = () => Promise<void>

export const GetListFavoritePokemonUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'get' })
}
