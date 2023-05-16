import { Favorites } from '@/application/pages/favorites/favorites'
import { PokemonParams, ApiPokemonParams } from '@/tests/mocks'

import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { PokemonProvider } from '@/application/contexts'

describe('Favorites', () => {
  const getListFavoritePokemon = jest.fn()
  const getDataPokemon = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[{ ...PokemonParams, idPokemon: '1' }]} addPokemon={jest.fn()} deletePokemon={jest.fn()} getDataPokemon={jest.fn()}>
        <Favorites getListFavoritePokemon={getListFavoritePokemon} getDataPokemon={getDataPokemon}/>
      </PokemonProvider>
    )
    return { container }
  }

  beforeAll(() => {
    getListFavoritePokemon.mockResolvedValue([{ ...PokemonParams, idPokemon: '1' }])
    getDataPokemon.mockResolvedValue({ pokemon: ApiPokemonParams, description: 'any_description' })
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
    expect(getDataPokemon).toHaveBeenCalledTimes(1)
  })

  it('should render CardPokemon on success', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('card-pokemon'))

    expect(screen.getAllByTestId('card-pokemon')).toHaveLength(1)
  })
})
