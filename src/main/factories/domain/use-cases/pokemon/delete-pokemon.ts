import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { type DeletePokemon, DeletePokemonUseCase } from '@/domain/use-cases/pokemon'

export const makeDeletePokemon = (): DeletePokemon =>
  DeletePokemonUseCase(makeApiUrl('/pokemon'), makeAuthorizeHttpClientDecorator())
