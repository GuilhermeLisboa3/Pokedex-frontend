import { Auth } from '@/application/components/header/components'
import { AccountContext } from '@/application/contexts'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-location-mock'

jest.mock('next/navigation')

describe('Auth', () => {
  const makeSut = (): void => {
    render(
      <AccountContext.Provider value={{ getCurrentAccount: jest.fn(), setCurrentAccount: jest.fn() }}>
        <Auth deleteAccount={jest.fn()}/>
      </AccountContext.Provider>
    )
  }

  it('should load with correct initial state', () => {
    makeSut()
    expect(screen.getAllByRole('button')[0]).toHaveClass('auth-icon-navigate')
    expect(screen.getAllByRole('button')[1]).toHaveClass('auth-icon-navigate')
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('should show modal if click button', async () => {
    makeSut()
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText('Deletar conta')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should call location.reload() if click text Sair', async () => {
    makeSut()
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByText('Sair'))
    expect(location.reload).toHaveBeenCalled()
  })
})
