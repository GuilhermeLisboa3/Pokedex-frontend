import { type HttpRequest, type HttpClient } from '@/domain/contracts/http'
import { type GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator {
  constructor (private readonly getStorage: GetStorage, private readonly httpClient: HttpClient) {}

  async request (data: HttpRequest): Promise<void> {
    this.getStorage.get({ key: 'pokemon-token' })
    await this.httpClient.request(data)
  }
}
