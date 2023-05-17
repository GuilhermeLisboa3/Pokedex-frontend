import { Favorites } from '@/application/pages/favorites/favorites'
import { ApiPokemonParams } from '@/tests/mocks'

import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { AccountContext, PokemonProvider } from '@/application/contexts'
import { AccessDeniedError } from '@/domain/errors'
import 'jest-location-mock'

jest.mock('next/router')

describe('Favorites', () => {
  const useRouter = jest.spyOn(require('next/navigation'), 'useRouter')
  const router = { push: jest.fn() }
  const getListFavoritePokemon = jest.fn()
  const getDataPokemon = jest.fn()
  const deletePokemon = jest.fn()
  const setSpy = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
      <AccountContext.Provider value={{ setCurrentAccount: setSpy, getCurrentAccount: jest.fn() }}>
        <PokemonProvider listFavoritePokemon={[{ idPokemon: '1' }]} addPokemon={jest.fn()} deletePokemon={jest.fn()} getDataPokemon={jest.fn()}>
          <Favorites getListFavoritePokemon={getListFavoritePokemon} getDataPokemon={getDataPokemon} deletePokemon={deletePokemon}/>
        </PokemonProvider>
      </AccountContext.Provider>
    )
    return { container }
  }

  beforeAll(() => {
    useRouter.mockReturnValue(router)
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
    await waitFor(() => screen.getByTestId('card-pokemon'))
    expect(getDataPokemon).toHaveBeenCalledWith({ name: '1' })
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

  it('should show DataPokemon if click CardPokemon', async () => {
    makeSut()
    await waitFor(() => screen.getByTestId('card-pokemon'))
    fireEvent.click(screen.getByTestId('card-pokemon'))
    await waitFor(() => screen.getByTestId('icon-close'))

    expect(screen.getByText('any_description')).toBeInTheDocument()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should show empty content if GetListFavoritePokemon returns AccessDeniedError', async () => {
    getListFavoritePokemon.mockRejectedValueOnce(new AccessDeniedError())
    makeSut()
    await waitFor(() => screen.getByText('Tentar novamente'))
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument()
    expect(location.reload).toHaveBeenCalled()
    expect(setSpy).toHaveBeenCalledWith(undefined)
  })

  it('should show empty content if GetListFavoritePokemon returns Error', async () => {
    getListFavoritePokemon.mockRejectedValueOnce(new Error('error'))
    makeSut()
    await waitFor(() => screen.getByText('Tentar novamente'))
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument()
    expect(location.reload).not.toHaveBeenCalled()
    expect(setSpy).not.toHaveBeenCalledWith(undefined)
  })

  it('should call GetListFavoritePokemon on reload', async () => {
    getListFavoritePokemon.mockRejectedValueOnce(new Error('error'))
    makeSut()
    fireEvent.click(await screen.findByRole('button', { name: /Tentar novamente/i }))

    expect(getListFavoritePokemon).toHaveBeenCalled()
    expect(getListFavoritePokemon).toHaveBeenCalledTimes(1)
  })
})
