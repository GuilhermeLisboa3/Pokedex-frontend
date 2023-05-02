import './styles.scss'
import { CardPokemon, Footer, Header } from '@/application/components'

import { Container } from 'reactstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

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
            <CardPokemon/>
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}
