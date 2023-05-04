import './styles.scss'
import { Button } from '@/application/components'

import { TbPokeball } from 'react-icons/tb'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <>
      <div className='header'>
        <div className='header-search'>
          <input className='header-input' type="search" placeholder="Buscar pokemon"/>
          <button className='header-btn' type="button">
            <TbPokeball className='header-icon-pokemon' />
          </button>
        </div>
        <div className='header-navigate'>
          <Link href={'/login'}> <Button text='Entrar' type='button'/> </Link>
          <Link href={'/signup'}> <Button text='Registrar' type='button'/> </Link>
        </div>
      </div>
    </>
  )
}
