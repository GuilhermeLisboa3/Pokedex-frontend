import './styles.scss'
import { EmptyCardPokemon, Footer, Header, CardPokemon } from '@/application/components'
import { type Pokemon } from '@/domain/models'
import { type ListPokemons } from '@/domain/use-cases/pokemon'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useEffect, useState } from 'react'

type Props = { listPokemons: ListPokemons }

export const Home: React.FC<Props> = ({ listPokemons }: Props) => {
  const perPage = 25
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    listPokemons({ page: 0, perPage }).then(result => {
      setListPokemon(result.pokemons)
      setCount(result.count)
    })
  })

  return (
    <>
      <Container className='homeContainer'>
        <Header/>
        <main>
          <Pagination count={count} page={page} setPage={setPage} perPage={25}/>
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
