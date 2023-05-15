import { type HttpClient } from '@/domain/contracts/http'
import { AccessDeniedError } from '@/domain/errors'

type Setup = (url: string, httpClient: HttpClient) => DeleteAccount
export type DeleteAccount = () => Promise<void>

export const DeleteAccountUseCase: Setup = (url, httpClient) => async () => {
  const { statusCode } = await httpClient.request({ url, method: 'delete' })
  switch (statusCode) {
    case 403: throw new AccessDeniedError()
    default: return undefined
  }
}
