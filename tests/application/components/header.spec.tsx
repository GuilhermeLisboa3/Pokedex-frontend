import { Header } from '@/application/components'
import { AccountContext } from '@/application/contexts'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  const getSpy = jest.fn()
  type SutTypes = { container: HTMLElement }
  const makeSut = (): SutTypes => {
    const { container } = render(
      <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: getSpy }}>
        <Header/>
      </AccountContext.Provider>
    )
    return { container }
  }

  it('should load the NoAuth header if it has no token', () => {
    makeSut()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrar/i })).toBeInTheDocument()
  })

  it('should load the Auth header if it has token', () => {
    getSpy.mockReturnValueOnce({ token: 'any_token', name: 'any_name', email: 'any_email' })
    const { container } = makeSut()
    expect(screen.queryByRole('button', { name: /Entrar/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Registrar/i })).not.toBeInTheDocument()
    expect(container.querySelector('.auth-icon-navigate')).toBeInTheDocument()
  })
})
