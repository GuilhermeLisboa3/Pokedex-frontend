import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { type AddPokemon, AddPokemonUseCase } from '@/domain/use-cases/pokemon'

export const makeAddPokemon = (): AddPokemon =>
  AddPokemonUseCase(makeApiUrl('/pokemon'), makeAuthorizeHttpClientDecorator())
