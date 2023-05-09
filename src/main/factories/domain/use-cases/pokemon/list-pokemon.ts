import { makeHttpClient, makeApiUrlPokemon } from '@/main/factories/infra/http'
import { type ListPokemons, ListPokemonsUseCase } from '@/domain/use-cases/api-pokemon'

export const makeListPokemon = (): ListPokemons =>
  ListPokemonsUseCase(makeApiUrlPokemon(), makeHttpClient())
