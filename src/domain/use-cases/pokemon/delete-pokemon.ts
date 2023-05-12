import { type HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient<boolean>) => DeletePokemon
type Input = { idPokemon: string }
export type DeletePokemon = (input: Input) => Promise<void>

export const DeletePokemonUseCase: Setup = (url, httpClient) => async ({ idPokemon }) => {
  await httpClient.request({ url: `${url}/${idPokemon}`, method: 'delete' })
}
