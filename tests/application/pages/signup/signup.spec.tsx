import { SignUp } from '@/application/pages/signup/signup'
import { type Validator } from '@/application/validation'
import { AccountParams, populateField } from '@/tests/mocks'

import React from 'react'
import { render, screen } from '@testing-library/react'
import { type MockProxy, mock } from 'jest-mock-extended'

describe('SignUp', () => {
  const { email, name, password, passwordConfirmation } = AccountParams
  let validator: MockProxy<Validator>

  type SutTypes = {
    container: HTMLElement
  }

  const makeSut = (): SutTypes => {
    const { container } = render(<SignUp validator={validator}/>)
    return {
      container
    }
  }

  const populateFields = (): void => {
    populateField('name', name)
    populateField('email', email)
    populateField('password', password)
    populateField('passwordConfirmation', passwordConfirmation)
  }

  beforeAll(() => {
    validator = mock()
  })

  it('should load with correct initial state', () => {
    const { container } = makeSut()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(screen.getByText('ENTRAR')).toBeTruthy()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should call Validator with correct input', () => {
    makeSut()

    populateFields()

    expect(validator.validate).toHaveBeenCalledWith('name', { name })
    expect(validator.validate).toHaveBeenCalledWith('email', { email })
    expect(validator.validate).toHaveBeenCalledWith('password', { password })
    expect(validator.validate).toHaveBeenCalledWith('passwordConfirmation', { password, passwordConfirmation })
  })
})
