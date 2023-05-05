import { type HttpClient } from '@/domain/contracts/http'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon>) => GetDataPokemon
type Input = { name: string }
export type GetDataPokemon = (input: Input) => Promise<void>

export const GetDataPokemonUseCase: Setup = (url, httpClient) => async ({ name }) => {
  await httpClient.request({ url: `${url}/pokemon/${name}`, method: 'get' })
}
