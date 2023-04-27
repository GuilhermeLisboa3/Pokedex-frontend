describe('SignUp', () => {
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
})
