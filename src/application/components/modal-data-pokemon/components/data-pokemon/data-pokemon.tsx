import './styles.scss'
import { type ApiPokemon } from '@/domain/models'
import { PokemonContext } from '@/application/contexts'

import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useContext } from 'react'

type Props = {
  pokemon: ApiPokemon
  pokemonDescription: string
}

export const DataPokemon: React.FC<Props> = ({ pokemon, pokemonDescription }: Props) => {
  const { pokemonFavorite } = useContext(PokemonContext)
  const isFavorite = pokemonFavorite(pokemon.id)
  const typePokemon = (position: number): string => pokemon.types[position].type.name
  const abilityPokemon = (position: number): string => pokemon.abilities[position].ability.name
  return (
    <>
      <div className='card-data-pokemon'>

        <div className='card-data-pokemon-icons'>
          { isFavorite ? <FaHeart className='card-data-pokemon-icon-favorite-red'/> : <FaRegHeart className='card-data-pokemon-icon-favorite'/>}
        </div>

        <img src={pokemon.sprites.front_default} alt={pokemon.name} />

        <span className='card-data-pokemon-id-pokemon'>#{pokemon.id}</span>

        <h3 className='card-data-pokemon-name-pokemon'>{pokemon.name}</h3>

        <div className='card-data-pokemon-types-pokemon'>
          <span className={`type ${typePokemon(0)}`}>{typePokemon(0)}</span>
          {pokemon.types.length > 1 ? <span className={`type ${typePokemon(1)}`}>{typePokemon(1)}</span> : ''}
        </div>

        <div className='card-data-pokemon-description'>
          <h5>Descrição</h5>
          <p>{pokemonDescription}</p>
        </div>

        <div className='card-data-pokemon-ability'>
          <h5>Habilidades</h5>
          <div>
            <span className={`br-${typePokemon(0)}`}>{abilityPokemon(0)}</span>
            {pokemon.abilities.length > 1
              ? <span className={`br-${pokemon.types.length > 1 ? typePokemon(1) : typePokemon(0)}`}>{abilityPokemon(1)}</span>
              : ''
            }
          </div>
        </div>

        <div className='card-data-pokemon-body'>
          <div>
            <span className='card-data-pokemon-body-title'>Altura</span>
            <span className='card-data-pokemon-body-content'>{pokemon.height}</span>
          </div>
          <div>
            <span className='card-data-pokemon-body-title'>Peso</span>
            <span className='card-data-pokemon-body-content'>{pokemon.weight}kg</span>
          </div>
        </div>

        <div className='card-data-pokemon-exp'>
          <div>
            <span className='card-data-pokemon-exp-title'>Base Exp</span>
            <span className='card-data-pokemon-exp-content'>{pokemon.base_experience}</span>
          </div>
        </div>

        <div className='card-data-pokemon-stars'>
          <h5>Estatísticas</h5>
          <div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star hp'>HP</span>
              <span>{pokemon.stats[0].base_stat}</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star atk'>ATK</span>
              <span>{pokemon.stats[1].base_stat}</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star def'>DEF</span>
              <span>{pokemon.stats[2].base_stat}</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star spa'>SPA</span>
              <span>{pokemon.stats[3].base_stat}</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star spo'>SPO</span>
              <span>{pokemon.stats[4].base_stat}</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star spd'>SPD</span>
              <span>{pokemon.stats[5].base_stat}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
