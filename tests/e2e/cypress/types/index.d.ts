declare namespace Cypress {
  export interface Chainable {
    getInputById: (id: string) => Chainable<Element>
    getLabelByFor: (id: string) => Chainable<Element>
    getByTestId: (id: string) => Chainable<Element>
    testLocalStorageItem: (item: string) => Chainable<Element>
    testUrl: (path: string) => Chainable<Element>
    setLocalStorageItem: (key: string, value: any) => Chainable<Element>
  }
}
