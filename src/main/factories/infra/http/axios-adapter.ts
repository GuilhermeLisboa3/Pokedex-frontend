import { AxiosAdapter } from '@/infra/http'
export const makeHttpClient = (): AxiosAdapter => {
  return new AxiosAdapter()
}
