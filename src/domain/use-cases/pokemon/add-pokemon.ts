import { type HttpClient } from '@/domain/contracts/http'
import { type Pokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Pokemon[]>) => AddPokemon
type Input = Pokemon
export type AddPokemon = (input: Input) => Promise<void>

export const AddPokemonUseCase: Setup = (url, httpClient) => async (pokemon) => {
  await httpClient.request({ url, method: 'post', body: pokemon })
}
