import { PokemonParams } from '@/tests/mocks'
import { DataPokemon } from '@/application/components/modal-data-pokemon/components'
import { PokemonProvider } from '@/application/contexts'

import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

describe('DataPokemon', () => {
  const { id, types, abilities, height, weight, stats } = PokemonParams
  it('should render with correct values', () => {
    const type2 = faker.name.findName()
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[PokemonParams]}>
        <DataPokemon pokemon={{ ...PokemonParams, name: 'any_name' }} pokemonDescription='any_description'/>
      </PokemonProvider>
    )
    expect(container.querySelector('.card-data-pokemon-icon-favorite')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', PokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'any_name')
    expect(screen.getByText('any_name')).toBeInTheDocument()
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

  it('should render correct values if the array is larger than one', () => {
    const type1 = faker.name.findName()
    const type2 = faker.name.findName()
    const ability1 = faker.name.findName()
    const ability2 = faker.name.findName()
    const pokemonParams = {
      ...PokemonParams,
      types: [{ type: { name: type1 } }, { type: { name: type2 } }],
      abilities: [{ ability: { name: ability1 } }, { ability: { name: ability2 } }]
    }
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[pokemonParams]}>
        <DataPokemon pokemon={pokemonParams} pokemonDescription='any_description'/>
      </PokemonProvider>
    )
    expect(container.querySelector('.card-data-pokemon-icon-favorite-red')).toBeInTheDocument()
    expect(screen.getByText(type1)).toBeInTheDocument()
    expect(screen.getByText(type1)).toHaveClass(`type ${type1}`)
    expect(screen.getByText(type2)).toBeInTheDocument()
    expect(screen.getByText(type2)).toHaveClass(`type ${type2}`)
    expect(screen.getByText(ability1)).toBeInTheDocument()
    expect(screen.getByText(ability1)).toHaveClass(`br-${type1}`)
    expect(screen.getByText(ability2)).toBeInTheDocument()
    expect(screen.getByText(ability2)).toHaveClass(`br-${type2}`)
  })

  it('should contain the class of the first type if the second type does not exist', () => {
    const type1 = faker.name.findName()
    const ability1 = faker.name.findName()
    const ability2 = faker.name.findName()
    const pokemonParams = {
      ...PokemonParams,
      types: [{ type: { name: type1 } }],
      abilities: [{ ability: { name: ability1 } }, { ability: { name: ability2 } }]
    }
    render(
      <PokemonProvider listFavoritePokemon={[pokemonParams]}>
        <DataPokemon pokemon={pokemonParams} pokemonDescription='any_description'/>
      </PokemonProvider>
    )
    expect(screen.getByText(ability2)).toHaveClass(`br-${type1}`)
  })
})
