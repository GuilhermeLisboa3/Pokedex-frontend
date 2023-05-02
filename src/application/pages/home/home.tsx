import './styles.scss'
import { EmptyCardPokemon, Footer, Header } from '@/application/components'

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
            <EmptyCardPokemon/>
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}
