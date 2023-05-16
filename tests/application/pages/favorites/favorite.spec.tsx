import { Favorites } from '@/application/pages/favorites/favorites'
import { ApiPokemonParams } from '@/tests/mocks'

import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { PokemonProvider } from '@/application/contexts'

describe('Favorites', () => {
  const getListFavoritePokemon = jest.fn()
  const getDataPokemon = jest.fn()
  const deletePokemon = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[{ idPokemon: '1' }]} addPokemon={jest.fn()} deletePokemon={jest.fn()} getDataPokemon={jest.fn()}>
        <Favorites getListFavoritePokemon={getListFavoritePokemon} getDataPokemon={getDataPokemon} deletePokemon={deletePokemon}/>
      </PokemonProvider>
    )
    return { container }
  }

  beforeAll(() => {
    getListFavoritePokemon.mockResolvedValue([{ idPokemon: '1' }])
    getDataPokemon.mockResolvedValue({ pokemon: { ...ApiPokemonParams, id: '1' }, description: 'any_description' })
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

  it('should call DeletePokemon if click icon heart red', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('card-pokemon'))
    fireEvent.click(screen.getByRole('button'))

    expect(deletePokemon).toHaveBeenCalledWith({ idPokemon: '1' })
    expect(deletePokemon).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should show text if GetListFavoritePokemon return array empty', async () => {
    getListFavoritePokemon.mockResolvedValueOnce([])
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.favorite-list-pokemons'))

    expect(screen.getByText('Você não tem pokemons favoritado.')).toBeInTheDocument()
  })
})
