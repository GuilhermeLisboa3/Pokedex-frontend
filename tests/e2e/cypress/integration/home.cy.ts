import { mockOk, mockUnexpectedError } from '../mocks/http-mocks'

describe('Home', () => {
  const mockError = (method: any): void => { method('GET', /pokemon?/) }
  const mockListPokemonSuccess = (): void => { mockOk('GET', /pokemon?/, 'list-pokemon') }
  const mockSuccess = (): void => { mockOk('GET', /pokemon[/]/, 'pokemon') }

  beforeEach(() => {
  })

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)

    cy.visit('')

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('should present pokemon list', () => {
    mockListPokemonSuccess()
    mockSuccess()

    cy.visit('')

    cy.get('.imgPokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.idPokemon').should('have.text', 'Nº9')
    cy.get('.namePokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })
})
