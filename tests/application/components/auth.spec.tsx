import { Auth } from '@/application/components/header/components'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Auth', () => {
  const makeSut = (): void => { render(<Auth/>) }

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
})
