Cypress.Commands.add('getLabelByFor', (id) => cy.get(`label[for=${id}]`))

Cypress.Commands.add('getInputById', (id) => cy.get(`input[id=${id}]`))

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))

Cypress.Commands.add('testUrl', (path) => cy.url().should('eq', `${Cypress.config().baseUrl}${path}`))

Cypress.Commands.add('testLocalStorageItem', (item) => cy.window().then(window => assert.isOk(window.localStorage.getItem(item))))

Cypress.Commands.add('setLocalStorageItem', (key, value) => localStorage.setItem(key, JSON.stringify(value)))
