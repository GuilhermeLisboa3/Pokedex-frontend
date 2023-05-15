import { makeApiUrl } from '@/main/factories/infra/http'
import { type DeleteAccount, DeleteAccountUseCase } from '@/domain/use-cases/account'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeDeleteAccount = (): DeleteAccount =>
  DeleteAccountUseCase(makeApiUrl('/user'), makeAuthorizeHttpClientDecorator())
