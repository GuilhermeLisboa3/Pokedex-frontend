import faker from 'faker'

export const mockOk = (method: string, url: RegExp, fixture: string | object, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 200, fixture }
  ).as(alias)
}

export const mockNoContent = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 204 }
  ).as(alias)
}

const body = { error: faker.random.words() }

export const mockUnauthorizedError = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 401, body }
  ).as(alias)
}

export const mockForbiddenError = (method: string, url: RegExp, alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: 403, body }
  ).as(alias)
}

export const mockUnexpectedError = (method: string, url: RegExp, error = [500, 404], alias: string = 'request'): void => {
  cy.intercept(
    { method, url },
    { delay: 50, statusCode: faker.helpers.randomize(error), body }
  ).as(alias)
}
