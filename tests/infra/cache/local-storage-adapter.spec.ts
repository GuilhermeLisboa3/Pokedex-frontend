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

  it('should call LocalStorage.set with correct value', async () => {
    await sut.set({ key, value })

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})
