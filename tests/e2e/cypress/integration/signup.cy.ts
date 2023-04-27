import faker from 'faker'
describe('SignUp', () => {
  const name = faker.name.findName()
  const password = faker.internet.password()
  const invalidEmail = faker.random.word()
  const invalidPasswordConfirmation = faker.random.words(2)

  const populateFields = (email = faker.internet.email(), passwordConfirmation = password): void => {
    cy.getInputById('name').focus().type(name)
    cy.getInputById('email').focus().type(email)
    cy.getInputById('password').focus().type(password)
    cy.getInputById('passwordConfirmation').focus().type(passwordConfirmation)
  }

  const simulateSubmit = (): void => {
    populateFields()
    cy.get('button[type=submit]').click()
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
    populateFields(invalidEmail, invalidPasswordConfirmation)
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
    cy.get("[data-testid='toas']").should('not.exist')
  })

  it('should enable the button and add the class bg-success pro label', () => {
    populateFields()
    cy.getLabelByFor('name').should('have.class', 'bg-success')
    cy.getLabelByFor('email').should('have.class', 'bg-success')
    cy.getLabelByFor('password').should('have.class', 'bg-success')
    cy.getLabelByFor('passwordConfirmation').should('have.class', 'bg-success')
    cy.get('button').should('not.have.attr', 'disabled')
  })

  it('should return FieldInUseErro on 403', () => {
    cy.intercept(
      { method: 'POST', url: /register/ },
      { delay: 50, statusCode: 403 }
    )

    simulateSubmit()

    cy.get("[data-testid='toas']").should('exist').should('have.text', 'O email já está em uso!')
  })

  it('should return UnexpectedError on 500', () => {
    cy.intercept(
      { method: 'POST', url: /register/ },
      { delay: 50, statusCode: faker.helpers.randomize([400, 404, 500]), body: { error: faker.random.words() } }
    )
    simulateSubmit()

    cy.get("[data-testid='toas']").should('exist').should('have.text', 'Algo deu errado. Tente novamente!')
  })

  it('should prevent multiple submits', () => {
    cy.intercept(
      { method: 'POST', url: /register/ },
      { delay: 50, statusCode: 200, body: true }
    ).as('signUpRequest')

    simulateSubmit()
    cy.get('button[type=submit]').click()
    cy.wait('@signUpRequest')

    cy.get('@signUpRequest.all').should('have.length', 1)
  })
})
