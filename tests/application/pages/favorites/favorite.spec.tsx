import { Favorites } from '@/application/pages/favorites/favorites'

import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'

describe('Favorites', () => {
  const getListFavoritePokemon = jest.fn()
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(
      <Favorites getListFavoritePokemon={getListFavoritePokemon}/>
    )
    return { container }
  }

  it('should call GetListFavoritePokemon', async () => {
    makeSut()
    expect(getListFavoritePokemon).toHaveBeenCalled()
    expect(getListFavoritePokemon).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByRole('img'))
  })
})
