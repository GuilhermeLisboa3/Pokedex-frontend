import { type HttpResponse, type HttpClient } from '@/domain/contracts/http'
import { UnexpectedError } from '@/domain/errors'
import { type Pokemon, type SpeciesPokemon } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient) => GetDataPokemon
type Input = { name: string }
type Output = { pokemon: Pokemon, description: string }
export type GetDataPokemon = (input: Input) => Promise<Output>

export const GetDataPokemonUseCase: Setup = (url, httpClient) => async ({ name }) => {
  const pokemon: HttpResponse<Pokemon> = await httpClient.request({ url: `${url}/pokemon/${name}`, method: 'get' })
  if (pokemon.statusCode !== 200) throw new UnexpectedError()
  const pokemonDescription: HttpResponse<SpeciesPokemon> = await httpClient.request({ url: `${pokemon.data!.species.url}`, method: 'get' })
  const description = pokemonDescription.data?.flavor_text_entries.filter(description => description.language.name === 'en')[0].flavor_text
  const removesSymbols = description!.replace('', ' ')
  return { pokemon: pokemon.data!, description: removesSymbols }
}
