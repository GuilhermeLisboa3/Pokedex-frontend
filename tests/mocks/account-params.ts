import faker from 'faker'

const password = faker.internet.password()

export const AccountParams = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password
}
