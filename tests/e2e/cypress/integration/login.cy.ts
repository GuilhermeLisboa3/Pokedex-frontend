describe('Login', () => {
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
})
