import { type HttpClient } from '@/domain/contracts/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { type Account } from '@/domain/models'

type Setup = (url: string, httpClient: HttpClient<Account>) => Authentication
type Input = { email: string, password: string }
type Output = Account
export type Authentication = (input: Input) => Promise<Output>

export const AuthenticationUseCase: Setup = (url, httpClient) => async ({ email, password }) => {
  const { statusCode, data } = await httpClient.request({ url, method: 'post', body: { email, password } })
  switch (statusCode) {
    case 200: return data!
    case 401: throw new InvalidCredentialsError()
    default: throw new UnexpectedError()
  }
}
