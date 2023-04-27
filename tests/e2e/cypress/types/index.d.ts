declare namespace Cypress {
  export interface Chainable {
    getInputById: (id: string) => Chainable<Element>
    getLabelByFor: (id: string) => Chainable<Element>
    getByTestId: (id: string) => Chainable<Element>
  }
}
