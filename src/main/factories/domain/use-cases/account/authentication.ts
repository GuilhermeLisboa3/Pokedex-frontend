import { makeHttpClient, makeApiUrl } from '@/main/factories/infra/http'
import { type Authentication, AuthenticationUseCase } from '@/domain/use-cases/account'

export const makeAuthentication = (): Authentication =>
  AuthenticationUseCase(makeApiUrl('/login'), makeHttpClient())
