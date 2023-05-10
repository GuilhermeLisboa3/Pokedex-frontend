import { type GetStorage } from '@/domain/contracts/cache'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { httpClientParams } from '@/tests/mocks'

import { mock } from 'jest-mock-extended'

describe('AuthorizeHttpClientDecorator', () => {
  const { body, method, url, headers } = httpClientParams
  let sut: AuthorizeHttpClientDecorator
  const getStorage = mock<GetStorage>()

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(getStorage)
  })

  it('should call GetStorage with correct value', async () => {
    await sut.request({ body, method, url, headers })

    expect(getStorage.get).toHaveBeenCalledWith({ key: 'pokemon-token' })
  })
})
