import { SignUp } from '@/application/pages/signup/signup'
import { type Validator } from '@/application/validation'
import { AccountParams, populateField } from '@/tests/mocks'
import { FieldInUseError } from '@/domain/errors'

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { type MockProxy, mock } from 'jest-mock-extended'

jest.mock('next/navigation')

describe('SignUp', () => {
  const { email, name, password, passwordConfirmation } = AccountParams
  const validator: MockProxy<Validator> = mock()
  const addAccount: jest.Mock = jest.fn()

  type SutTypes = {
    container: HTMLElement
  }

  const makeSut = (): SutTypes => {
    const { container } = render(<SignUp validator={validator} addAccount={addAccount}/>)
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

  const simulateSubmit = (): void => {
    populateFields()
    fireEvent.click(screen.getByRole('button'))
  }

  beforeAll(() => {
    validator.validate.mockReturnValue(undefined)
    addAccount.mockReturnValue(true)
  })

  it('should load with correct initial state', () => {
    validator.validate.mockReturnValueOnce('error')

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

  it('should add class bg-danger if Validation fails', () => {
    const { container } = makeSut()
    validator.validate.mockReturnValueOnce('error').mockReturnValueOnce('error').mockReturnValueOnce('error').mockReturnValueOnce('error')

    populateFields()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[2].className).toBe('label bg-danger')
    expect(container.getElementsByTagName('label')[3].className).toBe('label bg-danger')
  })

  it('should add class bg-success if Validation on success', () => {
    const { container } = makeSut()

    populateFields()

    expect(container.getElementsByTagName('label')[0].className).toBe('label bg-success')
    expect(container.getElementsByTagName('label')[1].className).toBe('label bg-success')
    expect(container.getElementsByTagName('label')[2].className).toBe('label bg-success')
    expect(container.getElementsByTagName('label')[3].className).toBe('label bg-success')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()

    populateFields()

    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should call addAccount with correct input', async () => {
    makeSut()

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(addAccount).toHaveBeenCalledWith({ name, email, password })
  })

  it('should call addAccount only once', async () => {
    makeSut()

    simulateSubmit()
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => screen.getByTestId('form'))

    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('should not call AddAccount if form is invalid', async () => {
    makeSut()
    validator.validate.mockReturnValueOnce('error')

    populateFields()
    fireEvent.submit(screen.getByTestId('form'))

    expect(addAccount).not.toHaveBeenCalledTimes(1)
  })

  it('should show alert error if AddAccount fails', async () => {
    makeSut()
    addAccount.mockRejectedValueOnce(new FieldInUseError('email'))

    simulateSubmit()

    expect(await screen.findByText(new FieldInUseError('email').message)).toBeInTheDocument()
  })

  it('should call router.push if addAccount is successful', async () => {
    makeSut()
    const useRouter = jest.spyOn(require('next/navigation'), 'useRouter')
    const router = { push: jest.fn() }
    useRouter.mockReturnValue(router)

    simulateSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(router.push).toHaveBeenCalledWith('/login?registred=true')
  })
})
