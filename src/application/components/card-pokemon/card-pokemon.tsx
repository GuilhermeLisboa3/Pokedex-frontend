import './styles.scss'
import { type Pokemon } from '@/domain/models'

import { FaRegHeart } from 'react-icons/fa'

type Props = { pokemon: Pokemon }

export const CardPokemon: React.FC<Props> = ({ pokemon }: Props) => {
  const typePokemon = (position: number): string => pokemon.types[position].type.name
  return (
    <>
      <div className='card-pokemon'>
        <img className='card-pokemon-img-pokemon' src={pokemon.sprites.front_default} alt={pokemon.name}/>
        <button className='card-pokemon-button-favorite'> <FaRegHeart className='favorite'/> </button>
        <p className='card-pokemon-id-pokemon'>Nº{pokemon.id}</p>
        <p className='card-pokemon-name-pokemon'>{pokemon.name.substr(0, 16)}</p>
        <p className='card-pokemon-types-pokemon'>
          <span className={`type ${typePokemon(0)}`}>{typePokemon(0)}</span>
          {pokemon.types.length > 1 ? <span className={`type ${typePokemon(1)}`}>{typePokemon(1)}</span> : ''}
        </p>
      </div>
    </>
  )
}
