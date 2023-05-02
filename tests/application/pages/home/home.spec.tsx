import { Home } from '@/application/pages/home/home'

import React from 'react'
import { render } from '@testing-library/react'

describe('Home', () => {
  const listPokemons: jest.Mock = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Home listPokemons={listPokemons}/>)
    return { container }
  }

  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(8)
  })

  it('should call ListPokemons', () => {
    makeSut()

    expect(listPokemons).toHaveBeenCalledWith({ page: 0, perPage: 25 })
    expect(listPokemons).toHaveBeenCalledTimes(1)
  })
})
