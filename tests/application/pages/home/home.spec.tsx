import { Home } from '@/application/pages/home/home'
import { PokemonParams } from '@/tests/mocks'

import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { UnexpectedError } from '@/domain/errors'

describe('Home', () => {
  const listPokemons: jest.Mock = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Home listPokemons={listPokemons}/>)
    return { container }
  }

  beforeAll(() => {
    listPokemons.mockResolvedValue({ count: 1, pokemons: [PokemonParams, { ...PokemonParams, id: '1' }, { ...PokemonParams, id: '2' }] })
  })

  it('should load with correct initial state', async () => {
    const { container } = makeSut()

    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(8)
    await waitFor(() => container.querySelector('.listPokemons'))
  })

  it('should call ListPokemons', async () => {
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.listPokemons'))

    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(1)
  })

  it('should render CardPokemon on success', async () => {
    const { container } = makeSut()
    await waitFor(() => container.querySelector('.listPokemons'))

    expect(container.querySelectorAll('.cardPokemon')).toHaveLength(3)
    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(0)
  })

  it('should render Error if ListPokemons return error', async () => {
    listPokemons.mockRejectedValueOnce(new UnexpectedError())
    const { container } = makeSut()
    await waitFor(() => screen.queryByRole('main'))

    expect(container.querySelector('.error')).toBeInTheDocument()
  })

  it('should call ListPokemons on reload', async () => {
    listPokemons.mockRejectedValueOnce(new UnexpectedError())
    makeSut()
    fireEvent.click(await screen.findByRole('button', { name: /Tentar novamente/i }))

    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.queryByRole('main'))
  })
})
