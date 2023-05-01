describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getLabelByFor('email').should('have.class', 'bg-danger')
    cy.getLabelByFor('password').should('have.class', 'bg-danger')
    cy.get('button').should('have.attr', 'disabled')
  })
})
