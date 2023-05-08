import './styles.scss'
import { FaRegHeart } from 'react-icons/fa'

export const DataPokemon: React.FC = () => {
  return (
    <>
      <div className='card-data-pokemon'>

        <div className='card-data-pokemon-icons'>
          <FaRegHeart className='card-data-pokemon-heart-icon'/>
        </div>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" alt="" />

        <span className='card-data-pokemon-id-pokemon'>#2</span>

        <h3 className='card-data-pokemon-name-pokemon'>Bulbasaur</h3>

        <div className='card-data-pokemon-types-pokemon'>
          <span className='type grass'>grass</span>
          <span className='type grass'>grass</span>
        </div>

        <div className='card-data-pokemon-description'>
          <h5>Descrição</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ab. Lorem ipsum dolor sit amet.</p>
        </div>

        <div className='card-data-pokemon-ability'>
          <h5>Habilidades</h5>
          <div>
            <span className='br-dragon'>overgrow</span>
            <span className='br-rock'>chloropgyjkas</span>
          </div>
        </div>

        <div className='card-data-pokemon-body'>
          <div>
            <span className='card-data-pokemon-body-title'>Altura</span>
            <span className='card-data-pokemon-body-content'>10m</span>
          </div>
          <div>
            <span className='card-data-pokemon-body-title'>Peso</span>
            <span className='card-data-pokemon-body-content'>130kg</span>
          </div>
        </div>

        <div className='card-data-pokemon-exp'>
          <div>
            <span className='card-data-pokemon-exp-title'>Base Exp</span>
            <span className='card-data-pokemon-exp-content'>142</span>
          </div>
        </div>

        <div className='card-data-pokemon-stars'>
          <h5>Estatísticas</h5>
          <div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star hp'>HP</span>
              <span>60</span>
            </div>
            <div className='card-data-pokemon-star'>
              <span className='card-data-pokemon-star atk'>ATK</span>
              <span>62</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
