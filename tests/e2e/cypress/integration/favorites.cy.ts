import { mockOk, mockUnexpectedError } from '../mocks/http-mocks'

describe('Favorites', () => {
  const mockError = (method: any): void => { method('GET', /pokemons?/) }
  const mockFavoritePokemon = (): void => { mockOk('GET', /pokemons/, 'favorite-pokemon') }
  const mockDataPokemon = (): void => { mockOk('GET', /pokemon[/]/, 'pokemon') }

  beforeEach(() => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
  })

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)
    cy.visit('favorites')

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('should present list of favorite pokemons', () => {
    mockFavoritePokemon()
    mockDataPokemon()
    cy.visit('favorites')

    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })
})
