import { mockOk, mockForbiddenError, mockUnexpectedError } from '../mocks/http-mocks'

import faker from 'faker'

describe('SignUp', () => {
  const name = faker.name.findName()
  const password = faker.internet.password()
  const invalidEmail = faker.random.word()
  const invalidPasswordConfirmation = faker.random.words(2)

  const mockError = (method: any): void => { method('POST', /register/) }
  const mockSuccess = (): void => { mockOk('POST', /register/, 'signup') }

  const populateFields = (email = faker.internet.email(), passwordConfirmation = password): void => {
    cy.getInputById('name').focus().type(name)
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
    cy.getInputById('passwordConfirmation').focus().type(passwordConfirmation)
  }

  const simulateSubmit = (): void => {
    populateFields()
    cy.get('button[type=submit]').click()
  }

  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.getLabelByFor('name').should('have.class', 'bg-danger')
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('password').should('have.class', 'bg-danger')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
  })

  it('should keep the button disabled if form is invalid', () => {
    populateFields(invalidEmail, invalidPasswordConfirmation)
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
    cy.get("[data-testid='toas']").should('not.exist')
  })

  it('should enable the button and add the class bg-success pro label', () => {
    populateFields()
    cy.getLabelByFor('name').should('have.class', 'bg-success')
    cy.getLabelByFor('email').should('have.class', 'bg-success')
    cy.getLabelByFor('password').should('have.class', 'bg-success')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-success')
    cy.get('button').should('not.have.attr', 'disabled')
  })

  it('should return FieldInUseErro on 403', () => {
    mockError(mockForbiddenError)

    simulateSubmit()

    cy.get("[data-testid='toas']").should('exist').should('have.text', 'O email já está em uso!')
  })

  it('should return UnexpectedError on 500', () => {
    mockError(mockUnexpectedError)

    simulateSubmit()

    cy.get("[data-testid='toas']").should('exist').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('should prevent multiple submits', () => {
    mockSuccess()

    simulateSubmit()
    cy.get('button[type=submit]').click()
    cy.wait('@request')

    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if form is invalid', () => {
    mockSuccess()
    const email = faker.internet.email()

    cy.getInputById('email').focus().type(email).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })

  it('should redirect to the login on success page', () => {
    mockSuccess()

    simulateSubmit()

    cy.testUrl('/login?registred=true')
  })
})
