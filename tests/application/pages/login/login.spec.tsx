import { Login } from '@/application/pages/login/login'
import { AccountParams, populateField } from '@/tests/mocks'
import { type Validator } from '@/application/validation'
import { InvalidCredentialsError } from '@/domain/errors'

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type MockProxy, mock } from 'jest-mock-extended'

describe('Login', () => {
  const { email, password } = AccountParams
  const validator: MockProxy<Validator> = mock()
  const authentication: jest.Mock = jest.fn()

  type SutTypes = { container: HTMLElement }

  const makeSut = (): SutTypes => {
    const { container } = render(<Login validator={validator} authentication={authentication}/>)
    return { container }
  }

  const populateFields = (): void => {
    populateField('email', email)
    populateField('password', password)
  }

  const simulateSubmit = (): void => {
    populateFields()
    fireEvent.click(screen.getByRole('button'))
  }

  beforeAll(() => {
    validator.validate.mockReturnValue(undefined)
  })

  it('should load with correct initial state', () => {
    validator.validate.mockReturnValueOnce('error').mockReturnValueOnce('error')
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

  it('should add class bg-danger if Validation fails', () => {
    const { container } = makeSut()
    validator.validate.mockReturnValueOnce('error').mockReturnValueOnce('error')

    populateFields()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-danger')
  })

  it('should add class bg-success if Validation on success', () => {
    const { container } = makeSut()

    populateFields()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-success')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-success')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()

    populateFields()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should call Authentication with correct input', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(authentication).toHaveBeenCalledWith({ email, password })
  })

  it('should call Authentication only once', async () => {
    makeSut()

    simulateSubmit()
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => screen.getByTestId('form'))

    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    makeSut()
    validator.validate.mockReturnValueOnce('error')

    populateFields()
    fireEvent.submit(screen.getByTestId('form'))

    expect(authentication).not.toHaveBeenCalledTimes(1)
  })

  it('should show alert error if Authentication fails', async () => {
    makeSut()
    authentication.mockRejectedValueOnce(new InvalidCredentialsError())

    simulateSubmit()

    expect(await screen.findByText(new InvalidCredentialsError().message)).toBeInTheDocument()
  })
})