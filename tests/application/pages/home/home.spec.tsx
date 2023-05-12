import { Home } from '@/application/pages/home/home'
import { ApiPokemonParams, populateField, PokemonParams, AccountParams } from '@/tests/mocks'
import { UnexpectedError } from '@/domain/errors'
import { AccountContext, PokemonProvider } from '@/application/contexts'

import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('Home', () => {
  const { name, email, token } = AccountParams
  const listPokemons: jest.Mock = jest.fn()
  const getDataPokemons: jest.Mock = jest.fn()
  const getListFavoritePokemon: jest.Mock = jest.fn()
  const addPokemon: jest.Mock = jest.fn()
  const getSpy: jest.Mock = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
    <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: getSpy }}>
      <PokemonProvider listFavoritePokemon={[PokemonParams]} getDataPokemon={jest.fn()} addPokemon={jest.fn()}>
        <Home listPokemons={listPokemons} getDataPokemon={getDataPokemons} getListFavoritePokemon={getListFavoritePokemon} addPokemon={addPokemon}/>
      </PokemonProvider>
    </AccountContext.Provider>
    )
    return { container }
  }

  beforeAll(() => {
    listPokemons.mockResolvedValue({ count: 1, pokemons: [ApiPokemonParams, { ...ApiPokemonParams, id: '1' }, { ...ApiPokemonParams, id: '2' }] })
    getDataPokemons.mockResolvedValue({ pokemon: ApiPokemonParams, description: 'any_description' })
    getListFavoritePokemon.mockResolvedValue([ApiPokemonParams])
  })

  it('should load with correct initial state', async () => {
    const { container } = makeSut()

    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(8)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should call ListPokemons', async () => {
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.home-list-pokemons'))

    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render CardPokemon on success', async () => {
    const { container } = makeSut()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))

    expect(container.querySelectorAll('.card-pokemon')).toHaveLength(3)
    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(0)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render Error if ListPokemons return error', async () => {
    listPokemons.mockRejectedValueOnce(new UnexpectedError())
    const { container } = makeSut()
    await waitFor(() => screen.queryByRole('main'))
    await waitFor(() => {
      expect(container.querySelector('.error')).toBeInTheDocument()
    })
  })

  it('should call ListPokemons on reload', async () => {
    listPokemons.mockRejectedValueOnce(new UnexpectedError())
    makeSut()
    fireEvent.click(await screen.findByRole('button', { name: /Tentar novamente/i }))

    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.queryByRole('main'))
  })

  it('should call ListPokemons on page', async () => {
    const { container } = makeSut()
    fireEvent.click(container.querySelectorAll('.pagination-btn')[1])

    expect(listPokemons).toHaveBeenCalledWith({ page: 25, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should call GetDataPokemon if click cardPokemon', async () => {
    makeSut()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
    fireEvent.click(screen.getAllByTestId('card-pokemon')[0])

    expect(getDataPokemons).toHaveBeenCalledWith({ name: ApiPokemonParams.name })
    expect(getDataPokemons).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render ModalDataPokemon on success', async () => {
    makeSut()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
    fireEvent.click(screen.getAllByTestId('card-pokemon')[0])
    await waitFor(() => {
      expect(screen.getByText(`#${ApiPokemonParams.id}`)).toBeInTheDocument()
    })
  })

  it('should call GetDataPokemon if the search has value', async () => {
    makeSut()
    populateField('search-pokemon', ApiPokemonParams.name.toLocaleUpperCase())
    act(() => { jest.advanceTimersByTime(1000) })
    expect(getDataPokemons).toHaveBeenCalledWith({ name: ApiPokemonParams.name.toLocaleLowerCase() })
    expect(getDataPokemons).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should call ListPokemon if search is empty', async () => {
    makeSut()
    populateField('search-pokemon', 'any_name')
    populateField('search-pokemon', '')
    act(() => { jest.advanceTimersByTime(1000) })
    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render DataPokemon if search finds pokemon', async () => {
    makeSut()
    populateField('search-pokemon', ApiPokemonParams.name)
    act(() => { jest.advanceTimersByTime(1000) })
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
    expect(screen.getAllByTestId('card-pokemon')).toHaveLength(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render EmptyListPokemon if search return error', async () => {
    getDataPokemons.mockRejectedValueOnce(new Error())
    const { container } = makeSut()
    populateField('search-pokemon', 'any_value')
    act(() => { jest.advanceTimersByTime(1000) })
    await waitFor(() => container.querySelectorAll('.home-list-pokemons'))
    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(8)
  })

  it('should not call GetListFavoritePokemon if it has no token', async () => {
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.home-list-pokemons'))

    expect(getListFavoritePokemon).not.toHaveBeenCalledWith()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should call GetListFavoritePokemon', async () => {
    getSpy.mockReturnValue({ name, email, token })
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.home-list-pokemons'))

    expect(getListFavoritePokemon).toHaveBeenCalledWith()
    expect(getListFavoritePokemon).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should call AddPokemon if click icon heart', async () => {
    const { container } = makeSut()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
    fireEvent.click(container.querySelectorAll('.card-pokemon-button-favorite')[0])

    expect(addPokemon).toHaveBeenCalledWith({ idPokemon: ApiPokemonParams.id })
    expect(addPokemon).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })
})
