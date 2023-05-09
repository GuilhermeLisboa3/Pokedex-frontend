import './styles.scss'
import { NoAuth, Auth } from './components'
import { AccountContext } from '@/application/contexts'

import { useContext, useEffect, useState } from 'react'
import { TbPokeball } from 'react-icons/tb'

type Props = {
  setNamePokemon: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const Header: React.FC<Props> = ({ setNamePokemon }: Props) => {
  const [token, setToken] = useState<string | undefined>()
  const { getCurrentAccount } = useContext(AccountContext)
  useEffect(() => { setToken(getCurrentAccount()?.token) }, [])

  return (
    <>
      <div className='header'>
        <div className='header-search'>
          <input data-testid='search-pokemon' className='header-input' type="search" placeholder="Buscar pokemon" onChange={e => { setNamePokemon(e.target.value) }}/>
          <button className='header-btn' type="button">
            <TbPokeball className='header-icon-pokemon' />
          </button>
        </div>
        <div className='header-navigate'>
          {
            token
              ? <Auth/>
              : <NoAuth/>
          }
        </div>
      </div>
    </>
  )
}
