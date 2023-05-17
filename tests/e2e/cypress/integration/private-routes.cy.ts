describe('Private Routes', () => {
  it('Should logout if profile has no accessToken', () => {
    cy.visit('favorites')

    cy.testUrl('/login')
  })
})
