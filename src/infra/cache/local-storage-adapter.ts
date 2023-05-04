import { type SetStorage, type GetStorage } from '@/domain/contracts/cache'

export class LocalStorageAdapter {
  set ({ key, value }: SetStorage.Input): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get ({ key }: GetStorage.Input): any {
    const value = localStorage.getItem(key)
    return JSON.parse(value!)
  }
}
