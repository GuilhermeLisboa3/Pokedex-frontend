import { Header } from '@/application/components'
import { AccountContext } from '@/application/contexts'

import React from 'react'
import { render, screen } from '@testing-library/react'

jest.useFakeTimers()

describe('Header', () => {
  const getSpy = jest.fn()
  type SutTypes = { container: HTMLElement }
  const makeSut = (): SutTypes => {
    const { container } = render(
      <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: getSpy }}>
        <Header setNamePokemon={jest.fn()}/>
      </AccountContext.Provider>
    )
    return { container }
  }

  it('should load the NoAuth header if it has no token', () => {
    makeSut()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrar/i })).toBeInTheDocument()
  })

  it('should load the Auth header if it has token', async () => {
    getSpy.mockReturnValueOnce({ token: 'any_token', name: 'any_name', email: 'any_email' })
    makeSut()
    expect(await screen.findByTestId('auth-button')).toBeInTheDocument()
  })
})
