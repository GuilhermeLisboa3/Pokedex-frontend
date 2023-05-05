import { Auth } from '@/application/components/header/components'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Auth', () => {
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Auth/>)
    return { container }
  }

  it('should load with correct initial state', () => {
    makeSut()
    expect(screen.getAllByRole('button')[0]).toHaveClass('auth-icon-navigate')
    expect(screen.getAllByRole('button')[1]).toHaveClass('auth-icon-navigate')
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })
})
