import { type HttpClient } from '@/domain/contracts/http'

type Setup = (url: string, httpClient: HttpClient) => DeleteAccount
export type DeleteAccount = () => Promise<void>

export const DeleteAccountUseCase: Setup = (url, httpClient) => async () => {
  await httpClient.request({ url, method: 'delete' })
}
