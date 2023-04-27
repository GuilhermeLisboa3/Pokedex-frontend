import faker from 'faker'
describe('SignUp', () => {
  const name = faker.name.findName()
  const password = faker.internet.password()
  const invalidEmail = faker.random.word()
  const invalidPasswordConfirmation = faker.random.words(2)

  const populateField = (email = faker.internet.email(), passwordConfirmation = password): void => {
    cy.getInputById('name').type(name)
    cy.getInputById('email').type(email)
    cy.getInputById('password').type(password)
    cy.getInputById('passwordConfirmation').type(passwordConfirmation)
  }

  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.getLabelByFor('name').should('have.class', 'bg-danger')
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('password').should('have.class', 'bg-danger')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
  })

  it('should keep the button disabled if form is invalid', () => {
    populateField(invalidEmail, invalidPasswordConfirmation)
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
    cy.get("[data-testid='toas']").should('not.exist')
  })

  it('should enable the button and add the class bg-success pro label', () => {
    populateField()
    cy.getLabelByFor('name').should('have.class', 'bg-success')
    cy.getLabelByFor('email').should('have.class', 'bg-success')
    cy.getLabelByFor('password').should('have.class', 'bg-success')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-success')
    cy.get('button').should('not.have.attr', 'disabled')
  })
})
