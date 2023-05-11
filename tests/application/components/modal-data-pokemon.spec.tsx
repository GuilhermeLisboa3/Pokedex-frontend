import { ApiPokemonParams } from '@/tests/mocks'
import { ModalDataPokemon } from '@/application/components/modal-data-pokemon/modal-data-pokemon'
import { PokemonProvider } from '@/application/contexts'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'

describe('ModalDataPokemon', () => {
  const { name, id, types, abilities, height, weight, stats } = ApiPokemonParams
  const setIsOpenSpy = jest.fn()
  type SutTypes = { container: HTMLElement }
  const makeSut = (): SutTypes => {
    const { container } = render(
      <PokemonProvider listFavoritePokemon={[ApiPokemonParams]}>
        <ModalDataPokemon pokemon={ApiPokemonParams} pokemonDescription='any_description' isOpen={true} setIsOpen={setIsOpenSpy}/>
      </PokemonProvider>
    )
    return { container }
  }
  it('should render with correct values', () => {
    const type2 = faker.name.findName()
    makeSut()
    expect(screen.getByRole('img')).toHaveAttribute('src', ApiPokemonParams.sprites.front_default)
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

  it('should close modal on click', async () => {
    makeSut()
    fireEvent.click(screen.getByTestId('icon-close'))
    expect(setIsOpenSpy).toHaveBeenLastCalledWith(false)
  })
})
