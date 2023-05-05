import { type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon>) => GetDataPokemon
type Input = { name: string }
type Output = Pokemon
export type GetDataPokemon = (input: Input) => Promise<Output>

export const GetDataPokemonUseCase: Setup = (url, httpClient) => async ({ name }) => {
  const { statusCode, data } = await httpClient.request({ url: `${url}/pokemon/${name}`, method: 'get' })
  switch (statusCode) {
    case 200: return data!
    default: throw new UnexpectedError()
  }
}
