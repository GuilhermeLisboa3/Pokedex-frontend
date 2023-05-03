import './styles.scss'
import { EmptyCardPokemon, Footer, Header, CardPokemon } from '@/application/components'
import { type Pokemon } from '@/domain/models'
import { type ListPokemons } from '@/domain/use-cases/pokemon'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useEffect, useState } from 'react'

type Props = { listPokemons: ListPokemons }

export const Home: React.FC<Props> = ({ listPokemons }: Props) => {
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    listPokemons({ page: 0, perPage: 25 }).then(result => { setListPokemon(result.pokemons) })
  })
  return (
    <>
      <Container className='homeContainer'>
        <Header/>
        <main>
          <Pagination/>
          <div className='listPokemons'>
            { listPokemon.length > 0
              ? listPokemon.map(pokemon => (<CardPokemon key={pokemon.id} pokemon={pokemon}/>))
              : <EmptyCardPokemon/>
            }
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}
