import { type HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon[]>) => AddPokemon
type Input = Pokemon
export type AddPokemon = (input: Input) => Promise<void>

export const AddPokemonUseCase: Setup = (url, httpClient) => async (pokemon) => {
  const { statusCode } = await httpClient.request({ url, method: 'post', body: pokemon })
  switch (statusCode) {
    case 200: return undefined
    case 403: throw new AccessDeniedError()
    default: throw new UnexpectedError()
  }
}
