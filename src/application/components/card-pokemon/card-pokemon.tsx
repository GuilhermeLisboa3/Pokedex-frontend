import './styles.scss'
import { type Pokemon } from '@/domain/models'

import { FaRegHeart } from 'react-icons/fa'

type Props = { pokemon: Pokemon }

export const CardPokemon: React.FC<Props> = ({ pokemon }: Props) => {
  const typePokemon = (position: number): string => pokemon.types[position].type.name
  return (
    <>
      <div className='cardPokemon'>
        <img className='imgPokemon' src={pokemon.sprites.front_default} alt={pokemon.name}/>
        <button className='buttonFavorite'> <FaRegHeart className='favorite'/> </button>
        <p className='idPokemon'>{pokemon.id}</p>
        <p className='namePokemon'>{pokemon.name}</p>
        <p className='typesPokemon'>
          <span className={`type ${typePokemon(0)}`}>{typePokemon(0)}</span>
          {pokemon.types.length > 1 ? <span className={`type ${typePokemon(1)}`}>{typePokemon(1)}</span> : ''}
        </p>
      </div>
    </>
  )
}
