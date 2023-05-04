import { mockUnexpectedError } from '../mocks/http-mocks'

describe('Home', () => {
  const mockError = (method: any): void => { method('GET', /pokemon/) }

  beforeEach(() => {
  })

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)

    cy.visit('')

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })
})
