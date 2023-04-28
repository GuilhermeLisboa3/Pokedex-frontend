import { type SetStorage } from '@/domain/contracts/cache'

export class LocalStorageAdapter {
  async set ({ key, value }: SetStorage.Input): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
