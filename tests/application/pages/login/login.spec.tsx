import { Login } from '@/application/pages/login/login'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('Login', () => {
  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Login/>)
    return { container }
  }

  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-danger')
    expect(screen.getByText('ENTRAR')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
