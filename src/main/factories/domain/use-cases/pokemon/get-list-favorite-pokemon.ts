import { makeApiUrl } from '@/main/factories/infra/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'
import { type GetListFavoritePokemon, GetListFavoritePokemonUseCase } from '@/domain/use-cases/pokemon'

export const makeGetListFavoritePokemon = (): GetListFavoritePokemon =>
  GetListFavoritePokemonUseCase(makeApiUrl('/pokemons'), makeAuthorizeHttpClientDecorator())
