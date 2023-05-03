import { Error } from '@/application/components'

import React from 'react'
import { render, screen } from '@testing-library/react'
import faker from 'faker'

describe('Error', () => {
  it('should render with correct values', () => {
    const error = faker.random.words()
    render(<Error error={error} reload={jest.fn()}/>)
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'lucario.png')
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'machoke.png')
    expect(screen.queryByText(error)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Tentar novamente/i })).toBeInTheDocument()
  })
})
