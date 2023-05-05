import { PokemonParams } from '@/tests/mocks'
import { CardPokemon } from '@/application/components'

import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

describe('CardPokemon', () => {
  it('should render with correct values', () => {
    const { container } = render(<CardPokemon pokemon={{ ...PokemonParams, name: 'any_name' }}/>)
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'any_name')
    expect(container.querySelector('.card-pokemon-name-pokemon')).toHaveTextContent('any_name')
    expect(container.querySelector('.card-pokemon-id-pokemon')).toHaveTextContent(PokemonParams.id)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children).toHaveLength(1)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[0]).toHaveTextContent(PokemonParams.types[0].type.name)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[1]).toBeUndefined()
  })

  it('should render with correct values and two typesPokemon', () => {
    const type1 = faker.name.findName()
    const type2 = faker.name.findName()
    const { container } = render(<CardPokemon pokemon={{ ...PokemonParams, types: [{ type: { name: type1 } }, { type: { name: type2 } }], name: 'any_name' }}/>)
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'any_name')
    expect(container.querySelector('.card-pokemon-name-pokemon')).toHaveTextContent('any_name')
    expect(container.querySelector('.card-pokemon-id-pokemon')).toHaveTextContent(PokemonParams.id)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children).toHaveLength(2)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[0]).toHaveTextContent(type1)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[1]).toHaveTextContent(type2)
  })
})
