import { type HttpRequest, type HttpClient } from '@/domain/contracts/http'
import { type GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator {
  constructor (private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request (data: HttpRequest): Promise<void> {
    const account = this.getStorage.get({ key: 'pokemon-token' })
    if (account?.token) {
      Object.assign(data, { headers: { ...data.headers, authorization: `Bearer: ${account.token as string}` } })
    }
    await this.httpClient.request(data)
  }
}
