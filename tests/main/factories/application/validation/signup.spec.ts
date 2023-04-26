import { EmailValidation, RequiredValidation, CompareValidation, ValidationComposite } from '@/application/validation'
import { makeSignUpValidation } from '@/main/factories/application/validation'

describe('makeSignUpValidation', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredValidation('name'),
      new RequiredValidation('email'),
      new EmailValidation('email'),
      new RequiredValidation('password'),
      new RequiredValidation('passwordConfirmation'),
      new CompareValidation('passwordConfirmation', 'password')
    ]))
  })
})
