import './styles.scss'
import { Footer, Header } from '@/application/components'

import { Container } from 'reactstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'

export const Home: React.FC = () => {
  return (
    <>
      <Container className='homeContainer'>
        <Header/>
        <main>
          <div className='containerPagination'>
            <h1>Pokedex</h1>
            <div className='pagination'>
              <button className='btnPagination'> <BsChevronLeft/> </button>
              <span className='page'>0 de 1</span>
              <button className='btnPagination'> <BsChevronRight /> </button>
            </div>
          </div>
          <div className='listPokemons'>
            <div className='cardPokemon'>
              <img className='imgPokemon' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' alt=''/>
              <button className='buttonFavorite'> <FaRegHeart/> </button>
              <p className='idPokemon'>N° 1</p>
              <p className='namePokemon'>Lucario</p>
              <p className='typesPokemon'>
                <span className='type fire'>fire</span>
                <span className='type water'>water</span>
              </p>
            </div>
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}
