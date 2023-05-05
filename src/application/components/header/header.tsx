import './styles.scss'
import { NoAuth, Auth } from './components'
import { AccountContext } from '@/application/contexts'

import { useContext } from 'react'
import { TbPokeball } from 'react-icons/tb'

export const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)
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
          {
            getCurrentAccount()?.token
              ? <Auth/>
              : <NoAuth/>
          }
        </div>
      </div>
    </>
  )
}
