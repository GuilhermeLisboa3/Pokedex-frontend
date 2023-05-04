import './styles.scss'
import { Button } from '@/application/components'

import { TbPokeball } from 'react-icons/tb'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <>
      <div className='header'>
        <div className='search'>
          <input className='input' type="search" placeholder="Buscar pokemon"/>
          <button className='btn' type="button">
            <TbPokeball className='iconPokemon' />
          </button>
        </div>
        <div className='navigate'>
          <Link href={'/login'}> <Button text='Entrar' type='button'/> </Link>
          <Link href={'/signup'}> <Button text='Registrar' type='button'/> </Link>
        </div>
      </div>
    </>
  )
}
