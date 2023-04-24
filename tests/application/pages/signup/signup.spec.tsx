import { SignUp } from '@/application/pages/signup/signup'

import React from 'react'
import { render, screen } from '@testing-library/react'

type SutTypes = {
  container: HTMLElement
}

const makeSut = (): SutTypes => {
  const { container } = render(<SignUp/>)
  return {
    container
  }
}

describe('SignUp', () => {
  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(screen.getByText('ENTRAR')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
