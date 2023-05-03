import { PokemonParams } from '@/tests/mocks'
import { CardPokemon } from '@/application/components'

import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

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

  it('should render with correct values and two typesPokemon', () => {
    const type1 = faker.name.findName()
    const type2 = faker.name.findName()
    const { container } = render(<CardPokemon pokemon={{ ...PokemonParams, types: [{ type: { name: type1 } }, { type: { name: type2 } }] }}/>)
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', PokemonParams.name)
    expect(container.querySelector('.namePokemon')).toHaveTextContent(PokemonParams.name)
    expect(container.querySelector('.idPokemon')).toHaveTextContent(PokemonParams.id)
    expect(container.querySelector('.typesPokemon')?.children).toHaveLength(2)
    expect(container.querySelector('.typesPokemon')?.children[0]).toHaveTextContent(type1)
    expect(container.querySelector('.typesPokemon')?.children[1]).toHaveTextContent(type2)
  })
})
