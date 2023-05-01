import faker from 'faker'

describe('Login', () => {
  const invalidEmail = faker.random.word()

  const populateFields = (email = faker.internet.email(), password = faker.internet.password()): void => {
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
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
})
