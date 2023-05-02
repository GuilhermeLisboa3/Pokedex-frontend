import { Home } from '@/application/pages/home/home'

import React from 'react'
import { render } from '@testing-library/react'

describe('Home', () => {
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Home/>)
    return { container }
  }

  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.querySelectorAll('.emptyCardPokemon')).toHaveLength(8)
  })
})
