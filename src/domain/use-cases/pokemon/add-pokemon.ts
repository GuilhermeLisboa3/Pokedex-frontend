import { type HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<boolean>) => AddPokemon
type Input = Pokemon
type Output = boolean
export type AddPokemon = (input: Input) => Promise<Output>

export const AddPokemonUseCase: Setup = (url, httpClient) => async (pokemon) => {
  const { statusCode, data } = await httpClient.request({ url, method: 'post', body: pokemon })
  switch (statusCode) {
    case 200: return data!
    case 403: throw new AccessDeniedError()
    default: throw new UnexpectedError()
  }
}
