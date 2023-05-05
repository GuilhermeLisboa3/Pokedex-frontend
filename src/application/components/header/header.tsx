import { NoAuth } from './components'
import './styles.scss'

import { TbPokeball } from 'react-icons/tb'

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
          <NoAuth/>
        </div>
      </div>
    </>
  )
}
