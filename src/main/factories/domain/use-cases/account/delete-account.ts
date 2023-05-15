import { makeHttpClient, makeApiUrl } from '@/main/factories/infra/http'
import { type DeleteAccount, DeleteAccountUseCase } from '@/domain/use-cases/account'

export const makeDeleteAccount = (): DeleteAccount =>
  DeleteAccountUseCase(makeApiUrl('/user'), makeHttpClient())
