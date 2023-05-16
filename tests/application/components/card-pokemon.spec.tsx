import { ApiPokemonParams, PokemonParams } from '@/tests/mocks'
import { CardPokemon } from '@/application/components'
import { PokemonProvider } from '@/application/contexts'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'

describe('CardPokemon', () => {
  it('should render with correct values', () => {
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[PokemonParams]} addPokemon={jest.fn()} getDataPokemon={jest.fn()} deletePokemon={jest.fn()}>
        <CardPokemon pokemon={{ ...ApiPokemonParams, name: 'any_name' }}/>
      </PokemonProvider>
    )
    expect(screen.getByRole('img')).toHaveAttribute('src', ApiPokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'any_name')
    expect(container.querySelector('.card-pokemon-name-pokemon')).toHaveTextContent('any_name')
    expect(container.querySelector('.icon-favorite')).toBeInTheDocument()
    expect(container.querySelector('.card-pokemon-id-pokemon')).toHaveTextContent(ApiPokemonParams.id)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children).toHaveLength(1)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[0]).toHaveTextContent(ApiPokemonParams.types[0].type.name)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[1]).toBeUndefined()
  })

  it('should render with correct values and two typesPokemon', () => {
    const type1 = faker.name.findName()
    const type2 = faker.name.findName()
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[{ ...PokemonParams, idPokemon: ApiPokemonParams.id }]} addPokemon={jest.fn()} getDataPokemon={jest.fn()} deletePokemon={jest.fn()}>
        <CardPokemon pokemon={{ ...ApiPokemonParams, types: [{ type: { name: type1 } }, { type: { name: type2 } }], name: 'any_name' }}/>
      </PokemonProvider>
    )
    expect(screen.getByRole('img')).toHaveAttribute('src', ApiPokemonParams.sprites.front_default)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'any_name')
    expect(container.querySelector('.card-pokemon-name-pokemon')).toHaveTextContent('any_name')
    expect(container.querySelector('.card-pokemon-id-pokemon')).toHaveTextContent(ApiPokemonParams.id)
    expect(container.querySelector('.icon-favorite-red')).toBeInTheDocument()
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children).toHaveLength(2)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[0]).toHaveTextContent(type1)
    expect(container.querySelector('.card-pokemon-types-pokemon')?.children[1]).toHaveTextContent(type2)
  })

  it('should call addPokemon if exists', () => {
    const addPokemon = jest.fn()
    render(
      <PokemonProvider listFavoritePokemon={[PokemonParams]} addPokemon={addPokemon} getDataPokemon={jest.fn()} deletePokemon={jest.fn()}>
        <CardPokemon pokemon={{ ...ApiPokemonParams, name: 'any_name' }}/>
      </PokemonProvider>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(addPokemon).toHaveBeenCalled()
  })

  it('should call not addPokemon if exists', () => {
    const addPokemon = jest.fn()
    render(
      <PokemonProvider listFavoritePokemon={[PokemonParams]} getDataPokemon={jest.fn()} deletePokemon={jest.fn()}>
        <CardPokemon pokemon={{ ...ApiPokemonParams, name: 'any_name' }}/>
      </PokemonProvider>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(addPokemon).not.toHaveBeenCalled()
  })
})
