import { PokemonParams } from '@/tests/mocks'
import { CardPokemon } from '@/application/components'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('CardPokemon', () => {
  it('should render with correct values', () => {
    const { container } = render(<CardPokemon pokemon={PokemonParams}/>)
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', PokemonParams.name)
    expect(container.querySelector('.namePokemon')).toHaveTextContent(PokemonParams.name)
    expect(container.querySelector('.idPokemon')).toHaveTextContent(PokemonParams.id)
    expect(container.querySelector('.typesPokemon')?.children).toHaveLength(1)
    expect(container.querySelector('.typesPokemon')?.children[0]).toHaveTextContent(PokemonParams.types[0].type.name)
    expect(container.querySelector('.typesPokemon')?.children[1]).toBeUndefined()
  })
})
