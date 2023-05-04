import { mockOk, mockUnexpectedError } from '../mocks/http-mocks'

describe('Home', () => {
  const mockError = (method: any): void => { method('GET', /pokemon?/) }
  const mockListPokemonSuccess = (): void => { mockOk('GET', /pokemon?/, 'list-pokemon') }
  const mockSuccess = (): void => { mockOk('GET', /pokemon[/]/, 'pokemon') }

  beforeEach(() => {
    cy.visit('')
  })

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('should present pokemon list', () => {
    mockListPokemonSuccess()
    mockSuccess()

    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })

  it('should present pokemon list if click button', () => {
    mockListPokemonSuccess()
    mockSuccess()

    cy.get('.pagination-btn').eq(1).click()
    cy.get('.pagination-page').should('have.text', '2 de 48')
    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })

  it('should redirect to login if you click the Entrar button', () => {
    mockListPokemonSuccess()
    mockSuccess()

    cy.contains('Entrar').click()
    cy.wait('@request')

    cy.testUrl('/login')
  })

  it('should redirect to signup if you click the Registrar button', () => {
    mockListPokemonSuccess()
    mockSuccess()

    cy.contains('Registrar').click()
    cy.wait('@request')

    cy.testUrl('/signup')
  })
})
