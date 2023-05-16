import { Favorites } from '@/application/pages/favorites/favorites'
import { PokemonParams } from '@/tests/mocks'

import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'

describe('Favorites', () => {
  const getListFavoritePokemon = jest.fn()
  const getDataPokemon = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
      <Favorites getListFavoritePokemon={getListFavoritePokemon} getDataPokemon={getDataPokemon}/>
    )
    return { container }
  }

  beforeAll(() => {
    getListFavoritePokemon.mockResolvedValue([PokemonParams, PokemonParams])
  })

  it('should call GetListFavoritePokemon', async () => {
    makeSut()
    expect(getListFavoritePokemon).toHaveBeenCalled()
    expect(getListFavoritePokemon).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByRole('img'))
  })

  it('should call GetDataPokemon with correct value', async () => {
    makeSut()
    await waitFor(() => screen.getByRole('img'))
    expect(getDataPokemon).toHaveBeenCalled()
    expect(getDataPokemon).toHaveBeenCalledTimes(2)
  })
})
