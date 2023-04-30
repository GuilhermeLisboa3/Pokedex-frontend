import { AccountParams } from '@/tests/mocks'
import { LocalStorageAdapter } from '@/infra/cache'
import { setCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/cache/local-storage-adapter')
describe('currentAccount', () => {
  const { name, email, token } = AccountParams
  const setSpy: jest.Mock = jest.fn()

  jest.mocked(LocalStorageAdapter).mockImplementation(jest.fn().mockImplementation(() => ({ set: setSpy })))

  it('should call setCurrentAccountAdapter with correct values', () => {
    setCurrentAccountAdapter({ name, email, token })

    expect(setSpy).toHaveBeenCalledWith({ key: 'pokemon-token', value: { name, email, token } })
  })
})
