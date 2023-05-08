import { PokemonParams } from '@/tests/mocks'
import { DataPokemon } from '@/application/components/modal-data-pokemon/components'

import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

describe('DataPokemon', () => {
  const { name, id, types, abilities, height, weight, stats } = PokemonParams
  it('should render with correct values', () => {
    const type2 = faker.name.findName()
    render(<DataPokemon pokemon={PokemonParams} pokemonDescription='any_description'/>)
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', name)
    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText(`#${id}`)).toBeInTheDocument()
    expect(screen.getByText(types[0].type.name)).toBeInTheDocument()
    expect(screen.getByText(types[0].type.name)).toHaveClass(`type ${types[0].type.name}`)
    expect(screen.queryByText(type2)).not.toBeInTheDocument()
    expect(screen.getByText('any_description')).toBeInTheDocument()
    expect(screen.getByText(abilities[0].ability.name)).toBeInTheDocument()
    expect(screen.getByText(abilities[0].ability.name)).toHaveClass(`br-${types[0].type.name}`)
    expect(screen.getByText(height)).toBeInTheDocument()
    expect(screen.getByText(`${weight}kg`)).toBeInTheDocument()
    expect(screen.getByText(stats[0].base_stat)).toBeInTheDocument()
  })
})
