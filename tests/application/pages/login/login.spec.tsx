import { Login } from '@/application/pages/login/login'
import { AccountParams, populateField } from '@/tests/mocks'
import { type Validator } from '@/application/validation'

import React from 'react'
import { render, screen } from '@testing-library/react'
import { type MockProxy, mock } from 'jest-mock-extended'

describe('Login', () => {
  const { email, password } = AccountParams
  const validator: MockProxy<Validator> = mock()

  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Login validator={validator}/>)
    return { container }
  }

  const populateFields = (): void => {
    populateField('email', email)
    populateField('password', password)
  }

  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-danger')
    expect(screen.getByText('ENTRAR')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should call Validator with correct input', () => {
    makeSut()

    populateFields()

    expect(validator.validate).toHaveBeenCalledWith('email', { email })
    expect(validator.validate).toHaveBeenCalledWith('password', { password })
  })
})
