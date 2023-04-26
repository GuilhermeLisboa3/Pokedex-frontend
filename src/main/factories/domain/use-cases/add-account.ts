import { makeHttpClient, makeApiUrl } from '@/main/factories/infra/http'
import { type AddAccount, AddAccountUseCase } from '@/domain/use-cases/account'

export const makeAddAccount = (): AddAccount =>
  AddAccountUseCase(makeApiUrl('/register'), makeHttpClient())
