import './styles.scss'
import { EmptyCardPokemon, Footer, Header } from '@/application/components'
import { type ListPokemons } from '@/domain/use-cases/pokemon'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useEffect } from 'react'

type Props = { listPokemons: ListPokemons }

export const Home: React.FC<Props> = ({ listPokemons }: Props) => {
  useEffect(() => { listPokemons({ page: 0, perPage: 25 }) })
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
