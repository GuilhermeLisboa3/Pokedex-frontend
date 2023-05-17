import { useLogout } from '@/application/hooks'
import { AccessDeniedError } from '@/domain/errors'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useError = (callback: CallBackType): ResultType => {
  const logout = useLogout()
  return (error: Error): void => {
    callback(error)

    if (error instanceof AccessDeniedError) logout()
  }
}
