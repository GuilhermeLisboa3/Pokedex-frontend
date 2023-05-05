import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon>) => GetDataPokemon
type Input = { name: string }
export type GetDataPokemon = (input: Input) => Promise<void>

export const GetDataPokemonUseCase: Setup = (url, httpClient) => async ({ name }) => {
  const { statusCode } = await httpClient.request({ url: `${url}/pokemon/${name}`, method: 'get' })
  switch (statusCode) {
    case 200: return undefined
    default: throw new UnexpectedError()
  }
}
