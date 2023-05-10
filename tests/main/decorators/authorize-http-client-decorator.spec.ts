import { type GetStorage } from '@/domain/contracts/cache'
import { type HttpClient } from '@/domain/contracts/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('AuthorizeHttpClientDecorator', () => {
  const { body, method, url, headers } = httpClientParams
  let sut: AuthorizeHttpClientDecorator
  const getStorage = mock<GetStorage>()
  const httpClient = mock<HttpClient>()

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(getStorage, httpClient)
  })

  it('should call GetStorage with correct value', async () => {
    await sut.request({ body, method, url, headers })

    expect(getStorage.get).toHaveBeenCalledWith({ key: 'pokemon-token' })
  })

  it('should not add headers if GetStorage is invalid', async () => {
    getStorage.get.mockReturnValueOnce(null)

    await sut.request({ method, url })

    expect(httpClient.request).toHaveBeenCalledWith({ method, url })
  })
})
