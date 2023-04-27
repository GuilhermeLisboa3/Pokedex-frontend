import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents (on, config) {
      return require('./tests/e2e/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'tests/e2e/cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  }
})
