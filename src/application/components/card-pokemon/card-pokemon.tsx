import './styles.scss'

import { FaRegHeart } from 'react-icons/fa'

export const CardPokemon: React.FC = () => {
  return (
    <>
      <div className='cardPokemon'>
        <img className='imgPokemon' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' alt=''/>
        <button className='buttonFavorite'> <FaRegHeart className='favorite'/> </button>
        <p className='idPokemon'>N° 1</p>
        <p className='namePokemon'>Lucario</p>
        <p className='typesPokemon'>
          <span className='type fire'>fire</span>
          <span className='type water'>water</span>
        </p>
      </div>

      <div className='cardPokemon'>
      </div>
    </>
  )
}
