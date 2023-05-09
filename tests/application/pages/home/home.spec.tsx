import { Home } from '@/application/pages/home/home'
import { PokemonParams } from '@/tests/mocks'
import { UnexpectedError } from '@/domain/errors'
import { AccountContext } from '@/application/contexts'

import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'

describe('Home', () => {
  const listPokemons: jest.Mock = jest.fn()
  const getDataPokemons: jest.Mock = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
    <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: jest.fn() }}>
      <Home listPokemons={listPokemons} getDataPokemon={getDataPokemons}/>
    </AccountContext.Provider>
    )
    return { container }
  }

  beforeAll(() => {
    listPokemons.mockResolvedValue({ count: 1, pokemons: [PokemonParams, { ...PokemonParams, id: '1' }, { ...PokemonParams, id: '2' }] })
    getDataPokemons.mockResolvedValue({ pokemon: PokemonParams, description: 'any_description' })
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
    await waitFor(() => container.querySelector('.home-list-pokemons'))

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
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.home-list-pokemons'))
    fireEvent.click(screen.getAllByTestId('card-pokemon')[0])

    expect(getDataPokemons).toHaveBeenCalledWith({ name: PokemonParams.name })
    expect(getDataPokemons).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
  })

  it('should render ModalDataPokemon on success', async () => {
    makeSut()
    await waitFor(() => screen.getAllByTestId('card-pokemon'))
    fireEvent.click(screen.getAllByTestId('card-pokemon')[0])
    await waitFor(() => {
      expect(screen.getByText(`#${PokemonParams.id}`)).toBeInTheDocument()
    })
  })
})
