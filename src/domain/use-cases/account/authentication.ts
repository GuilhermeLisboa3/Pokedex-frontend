import { type HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient<boolean>) => Authentication
type Input = { email: string, password: string }
export type Authentication = (input: Input) => Promise<void>

export const AuthenticationUseCase: Setup = (url, httpClient) => async ({ email, password }) => {
  await httpClient.request({ url, method: 'post', body: { email, password } })
}
