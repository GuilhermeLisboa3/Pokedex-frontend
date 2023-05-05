import { Header } from '@/application/components'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Header', () => {
  const makeSut = (): void => {
    render(<Header/>)
  }

  it('should load the NoAuth header if it has no token', () => {
    makeSut()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Registrar/i })).toBeInTheDocument()
  })
})
