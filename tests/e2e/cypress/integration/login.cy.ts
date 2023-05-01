import faker from 'faker'
import { mockUnauthorizedError, mockUnexpectedError, mockOk } from '../mocks/http-mocks'

describe('Login', () => {
  const invalidEmail = faker.random.word()

  const mockError = (method: any): void => { method('POST', /login/) }
  const mockSuccess = (): void => { mockOk('POST', /login/, 'login') }

  const populateFields = (email = faker.internet.email(), password = faker.internet.password()): void => {
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
  }

  const simulateSubmit = (): void => {
    populateFields()
    cy.get('button[type=submit]').click()
  }

  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('password').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
  })

  it('should show the toas if the user has registered a new account', () => {
    cy.visit('login?registred=true')
    cy.get("[data-testid='toas']").should('exist').should('have.text', 'Registrado com sucesso!')
  })

  it('should keep the button disabled if form is invalid', () => {
    populateFields(invalidEmail)
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
    cy.get("[data-testid='toas']").should('not.exist')
  })

  it('should enable the button and add the class bg-success pro label', () => {
    populateFields()
    cy.getLabelByFor('email').should('have.class', 'bg-success')
    cy.getLabelByFor('password').should('have.class', 'bg-success')
    cy.get('button').should('not.have.attr', 'disabled')
  })

  it('should return InvalidCredentialsError on 401', () => {
    mockError(mockUnauthorizedError)

    simulateSubmit()

    cy.get("[data-testid='toas']").should('exist').should('have.text', 'Credenciais inválidas')
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
})
