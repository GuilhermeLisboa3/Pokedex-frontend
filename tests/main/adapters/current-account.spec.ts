import { AccountParams } from '@/tests/mocks'
import { LocalStorageAdapter } from '@/infra/cache'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/cache/local-storage-adapter')
describe('currentAccount', () => {
  const { name, email, token } = AccountParams
  const setSpy: jest.Mock = jest.fn()
  const getSpy: jest.Mock = jest.fn()

  jest.mocked(LocalStorageAdapter).mockImplementation(jest.fn().mockImplementation(() => ({ set: setSpy, get: getSpy })))

  describe('set()', () => {
    it('should call setCurrentAccountAdapter with correct values', () => {
      setCurrentAccountAdapter({ name, email, token })

      expect(setSpy).toHaveBeenCalledWith({ key: 'pokemon-token', value: { name, email, token } })
    })
  })

  describe('set()', () => {
    it('should call getCurrentAccountAdapter with correct values', () => {
      getSpy.mockReturnValueOnce({ name, email, token })

      const account = getCurrentAccountAdapter()

      expect(getSpy).toHaveBeenCalledWith({ key: 'pokemon-token' })
      expect(account).toEqual({ name, email, token })
    })
  })
})
