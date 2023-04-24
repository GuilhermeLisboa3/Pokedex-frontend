import { SignUp } from '@/application/pages/signup/signup'

import React from 'react'
import { render, screen } from '@testing-library/react'

describe('SignUp', () => {
  it('should load with correct initial state', () => {
    const { container } = render(<SignUp/>)
    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(screen.getByText('ENTRAR')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
