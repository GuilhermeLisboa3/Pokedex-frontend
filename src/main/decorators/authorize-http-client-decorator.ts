import { type HttpRequest } from '@/domain/contracts/http'
import { type GetStorage } from '@/domain/contracts/cache'

export class AuthorizeHttpClientDecorator {
  constructor (private readonly getStorage: GetStorage) {}

  async request (data: HttpRequest): Promise<void> {
    this.getStorage.get({ key: 'pokemon-token' })
  }
}
