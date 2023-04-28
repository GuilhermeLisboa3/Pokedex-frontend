import { type HttpClient } from '@/domain/contracts/http'
import { InvalidCredentialsError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<boolean>) => Authentication
type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>

export const AuthenticationUseCase: Setup = (url, httpClient) => async ({ email, password }) => {
  const { statusCode } = await httpClient.request({ url, method: 'post', body: { email, password } })
  switch (statusCode) {
    case 401: throw new InvalidCredentialsError()
    default: return undefined
  }
}
