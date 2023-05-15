import { LocalStorageAdapter } from '@/infra/cache'

import faker from 'faker'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  let sut: LocalStorageAdapter
  const key: string = faker.database.column()
  const value: object = { any: faker.datatype.uuid() }

  beforeEach(() => {
    sut = new LocalStorageAdapter()
    localStorage.clear()
  })

  describe('set()', () => {
    it('should call LocalStorage.set with correct value', async () => {
      sut.set({ key, value })

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
    })

    it('Should call localStorage.removeItem if value is null', async () => {
      const key = faker.database.column()
      sut.set({ key, value: undefined as any })

      expect(localStorage.removeItem).toHaveBeenCalledWith(key)
    })
  })

  describe('get()', () => {
    it('should call LocalStorage.get with correct value', async () => {
      const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))

      const result = sut.get({ key })

      expect(getItemSpy).toHaveBeenCalledWith(key)
      expect(result).toEqual(value)
    })
  })
})
