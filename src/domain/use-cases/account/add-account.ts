import { type HttpClient } from '@/domain/contracts/http'
import { FieldInUseError, UnexpectedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient<boolean>) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = boolean
export type AddAccount = (input: Input) => Promise<Output>

export const AddAccountUseCase: Setup = (url, httpClient) => async ({ email, name, password }) => {
  const { statusCode, data } = await httpClient.request({ url, method: 'post', body: { email, name, password } })

  switch (statusCode) {
    case 200: return data!
    case 403: throw new FieldInUseError('email')
    default: throw new UnexpectedError()
  }
}
