import './styles.scss'
import { CardPokemon, Footer, Header } from '@/application/components'

import { Container } from 'reactstrap'
import { Pagination } from './components'

export const Home: React.FC = () => {
  return (
    <>
      <Container className='homeContainer'>
        <Header/>
        <main>
          <Pagination/>
          <div className='listPokemons'>
            <CardPokemon/>
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}
