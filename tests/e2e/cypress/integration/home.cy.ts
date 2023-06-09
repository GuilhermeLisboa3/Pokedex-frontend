import { mockOk, mockUnexpectedError, mockNoContent } from '../mocks/http-mocks'

describe('Home', () => {
  const mockError = (method: any): void => { method('GET', /pokemon?/) }
  const mockListPokemonSuccess = (): void => { mockOk('GET', /pokemon?/, 'list-pokemon') }
  const mockPokemonDescription = (): void => { mockOk('GET', /pokemon-species/, 'pokemon-description') }
  const mockFavoritePokemon = (): void => { mockOk('GET', /pokemons/, 'favorite-pokemon') }
  const mockDataPokemon = (): void => { mockOk('GET', /pokemon[/]/, 'pokemon') }
  const mockAddPokemon = (): void => { mockOk('POST', /pokemon/, 'success') }
  const mockDeletePokemon = (): void => { mockNoContent('DELETE', /pokemon/) }

  it('should present error on UnexpectedError', () => {
    mockError(mockUnexpectedError)
    cy.visit('')

    cy.get('.error span').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('Should reload on button click', () => {
    mockError(mockUnexpectedError)

    cy.visit('')
    cy.contains('Tentar novamente').click()

    cy.get('.emptyCardPokemon').should('have.length', 8)
  })

  it('should present pokemon list', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    cy.visit('')

    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })

  it('should present pokemon list if click button', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    cy.visit('')

    cy.get('.pagination-btn').eq(1).click()
    cy.get('.pagination-page').should('have.text', '2 de 48')
    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
    cy.get('.type').should('have.text', 'water')
  })

  it('should redirect to login if you click the Entrar button', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    cy.visit('')

    cy.contains('Entrar').click()

    cy.testUrl('/login')
  })

  it('should redirect to signup if you click the Registrar button', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    cy.visit('')

    cy.contains('Registrar').click()

    cy.testUrl('/signup')
  })

  it('should load the correct header if it has token', () => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
    mockListPokemonSuccess()
    mockDataPokemon()
    mockFavoritePokemon()
    cy.visit('')
    cy.get('.auth-icon-navigate').should('exist')
  })

  it('should show modal on click button', () => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
    mockFavoritePokemon()
    mockListPokemonSuccess()
    mockDataPokemon()
    cy.visit('')
    cy.get('.auth-icon-navigate').eq(0).click()
    cy.get('.auth-link').should('exist')
  })

  it('should render ModalDataPokemon if click CardPokemon', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    mockPokemonDescription()
    cy.visit('')
    cy.getByTestId('card-pokemon').click()
    cy.wait('@request')
    cy.get('.card-data-pokemon-name-pokemon').should('have.text', 'blastoise')
  })

  it('should render DataPokemon if search finds pokemon', () => {
    mockListPokemonSuccess()
    mockDataPokemon()
    mockPokemonDescription()
    cy.visit('')
    cy.getByTestId('search-pokemon').focus().type('blastoise')
    cy.get('.card-pokemon-img-pokemon').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png')
    cy.get('.card-pokemon-id-pokemon').should('have.text', 'Nº9')
    cy.get('.card-pokemon-name-pokemon').should('have.text', 'blastoise')
  })

  it('should contain the red heart if it is a favorite pokemon ', () => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
    mockListPokemonSuccess()
    mockDataPokemon()
    mockFavoritePokemon()
    cy.visit('')
    cy.get('.icon-favorite-red').should('exist')
  })

  it('should favorite the pokemon if you click on the heart button', () => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
    mockListPokemonSuccess()
    mockDataPokemon()
    mockOk('GET', /pokemons/, 'array-empty')
    mockAddPokemon()
    cy.visit('')
    cy.get('.icon-favorite').should('exist')
    cy.get('.card-pokemon-button-favorite').click()
    cy.get('.icon-favorite-red').should('exist')
  })

  it('should remove favorite the pokemon if you click on the red heart button', () => {
    cy.fixture('login').then(account => cy.setLocalStorageItem('pokemon-token', account))
    mockListPokemonSuccess()
    mockDataPokemon()
    mockFavoritePokemon()
    mockDeletePokemon()
    cy.visit('')
    cy.get('.icon-favorite-red').should('exist')
    cy.get('.card-pokemon-button-favorite').click()
    cy.get('.icon-favorite').should('exist')
  })
})
