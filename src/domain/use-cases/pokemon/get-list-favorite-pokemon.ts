import { type HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => GetListFavoritePokemon
export type GetListFavoritePokemon = () => Promise<void>

export const GetListFavoritePokemonUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'get' })
  switch (statusCode) {
    case 403: throw new AccessDeniedError()
    default: return undefined
  }
}
