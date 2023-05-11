import { makeListPokemon, makeGetDataPokemon, makeGetListFavoritePokemon } from '@/main/factories/domain/use-cases'
import { Home } from '@/application/pages/home/home'

import React from 'react'

export const MakeHome: React.FC = () => (
  <Home listPokemons={makeListPokemon()} getDataPokemon={makeGetDataPokemon()} getListFavoritePokemon={makeGetListFavoritePokemon()} />
)
