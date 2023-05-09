import { makeHttpClient, makeApiUrlPokemon } from '@/main/factories/infra/http'
import { type GetDataPokemon, GetDataPokemonUseCase } from '@/domain/use-cases/api-pokemon'

export const makeGetDataPokemon = (): GetDataPokemon =>
  GetDataPokemonUseCase(makeApiUrlPokemon(), makeHttpClient())
