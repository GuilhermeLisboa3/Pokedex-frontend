import faker from 'faker'
describe('SignUp', () => {
  const invalidEmail = faker.random.word()
  const invalidPasswordConfirmation = faker.random.words(2)

  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.get("label[for='name']").should('have.class', 'bg-danger')
    cy.get("label[for='email']").should('have.class', 'bg-danger')
    cy.get("label[for='password']").should('have.class', 'bg-danger')
    cy.get("label[for='passwordConfirmation']").should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
  })

  it('should keep the button disabled if form is invalid', () => {
    cy.get("input[id='email']").type(invalidEmail)
    cy.get("label[for='email']").should('have.class', 'bg-danger')
    cy.get("input[id='passwordConfirmation']").type(invalidPasswordConfirmation)
    cy.get("label[for='passwordConfirmation']").should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
    cy.get("[data-testid='toas']").should('not.exist')
  })
})
