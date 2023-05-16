import { makeGetDataPokemon, makeGetListFavoritePokemon, makeDeletePokemon } from '@/main/factories/domain/use-cases'
import { Favorites } from '@/application/pages/favorites/favorites'

import React from 'react'

export const MakeFavorite: React.FC = () => (
  <Favorites
    getDataPokemon={makeGetDataPokemon()}
    getListFavoritePokemon={makeGetListFavoritePokemon()}
    deletePokemon={makeDeletePokemon()}
  />
)
