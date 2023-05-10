import { type GetStorage } from '@/domain/contracts/cache'
import { type HttpClient } from '@/domain/contracts/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { httpClientParams, AccountParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('AuthorizeHttpClientDecorator', () => {
  const { body, method, url, headers } = httpClientParams
  const { name, email, token } = AccountParams
  let sut: AuthorizeHttpClientDecorator
  const getStorage = mock<GetStorage>()
  const httpClient = mock<HttpClient>()

  beforeAll(() => {
    getStorage.get.mockReturnValue({ name, email, token })
  })

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(getStorage, httpClient)
  })

  it('should call GetStorage with correct value', async () => {
    await sut.request({ body, method, url, headers })

    expect(getStorage.get).toHaveBeenCalledWith({ key: 'pokemon-token' })
  })

  it('should not add headers if GetStorage is invalid', async () => {
    getStorage.get.mockReturnValueOnce(null)

    await sut.request({ url, method })

    expect(httpClient.request).toHaveBeenCalledWith({ url, method })
  })

  it('should add headers to HttpClient', async () => {
    await sut.request({ method, url })

    expect(httpClient.request).toHaveBeenCalledWith({ method, url, headers: { authorization: `Bearer: ${token}` } })
  })
})
