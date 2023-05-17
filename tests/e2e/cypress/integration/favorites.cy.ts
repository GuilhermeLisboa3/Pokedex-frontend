import { mockUnexpectedError } from '../mocks/http-mocks'

describe('Favorites', () => {
  const mockError = (method: any): void => { method('GET', /pokemon?/) }

  beforeEach(() => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
  })

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)
    cy.visit('favorites')

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })
})
