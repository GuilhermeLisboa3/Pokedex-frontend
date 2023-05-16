import { makeGetDataPokemon, makeGetListFavoritePokemon, makeDeletePokemon } from '@/main/factories/domain/use-cases'
import { Favorites } from '@/application/pages/favorites/favorites'

import React from 'react'
import { PrivateRoute } from '@/main/proxies/private-route'

export const MakeFavorite: React.FC = () => (
  <PrivateRoute>
    <Favorites
      getDataPokemon={makeGetDataPokemon()}
      getListFavoritePokemon={makeGetListFavoritePokemon()}
      deletePokemon={makeDeletePokemon()}
    />
  </PrivateRoute>
)
