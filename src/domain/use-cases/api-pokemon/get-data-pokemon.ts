import { type HttpResponse, type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient) => GetDataPokemon
type Input = { name: string }
export type GetDataPokemon = (input: Input) => Promise<void>

export const GetDataPokemonUseCase: Setup = (url, httpClient) => async ({ name }) => {
  const pokemon: HttpResponse<Pokemon> = await httpClient.request({ url: `${url}/pokemon/${name}`, method: 'get' })
  if (pokemon.statusCode !== 200) throw new UnexpectedError()
  await httpClient.request({ url: `${pokemon.data!.species.url}`, method: 'get' })
}
