import { Button } from '@/application/components'

import Link from 'next/link'

export const NoAuth: React.FC = () => {
  return (
    <>
      <Link href={'/login'}> <Button text='Entrar' type='button'/> </Link>
      <Link href={'/signup'}> <Button text='Registrar' type='button'/> </Link>
    </>
  )
}
