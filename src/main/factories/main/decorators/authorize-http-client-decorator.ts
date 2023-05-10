import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/infra/cache'
import { makeHttpClient } from '@/main/factories/infra/http'

export const makeAuthorizeHttpClientDecorator = (): AuthorizeHttpClientDecorator =>
  new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeHttpClient())
