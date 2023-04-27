import faker from 'faker'
describe('SignUp', () => {
  const email = faker.internet.email()
  const name = faker.name.findName()
  const password = faker.internet.password()
  const passwordConfirmation = password
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

  it('should enable the button and add the class bg-success pro label', () => {
    cy.get("input[id='email']").type(email)
    cy.get("input[id='name']").type(name)
    cy.get("input[id='password']").type(password)
    cy.get("input[id='passwordConfirmation']").type(passwordConfirmation)
    cy.get("label[for='name']").should('have.class', 'bg-success')
    cy.get("label[for='email']").should('have.class', 'bg-success')
    cy.get("label[for='password']").should('have.class', 'bg-success')
    cy.get("label[for='passwordConfirmation']").should('have.class', 'bg-success')
    cy.get('button').should('not.have.attr', 'disabled')
  })
})
