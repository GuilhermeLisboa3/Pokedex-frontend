import './styles.scss'
import { EmptyCardPokemon, Footer, Header, CardPokemon, Error, ModalDataPokemon } from '@/application/components'
import { type Pokemon } from '@/domain/models'
import { type ListPokemons } from '@/domain/use-cases/api-pokemon'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useEffect, useState } from 'react'

type Props = { listPokemons: ListPokemons }

export const Home: React.FC<Props> = ({ listPokemons }: Props) => {
  const perPage = 25
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])
  const [page, setPage] = useState(0)
  const [count, setCount] = useState<number>(0)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const changeReload = (): void => { setReload(!reload) }

  useEffect(() => {
    setListPokemon([])
    listPokemons({ page: page * perPage, perPage }).then(result => {
      setListPokemon(result.pokemons)
      setCount(result.count)
    }).catch(error => { setError(error.message) })
  }, [reload, page])

  return (
    <>
      <Container className='home-container'>
        <Header/>
        <main className='home-container-list-pokemon'>
          <Pagination count={count} page={page} setPage={setPage} perPage={25}/>
          { error
            ? <Error error={error} reload={changeReload}/>
            : <div className='home-list-pokemons'>
                { listPokemon.length > 0
                  ? listPokemon.map(pokemon => (<CardPokemon key={pokemon.id} pokemon={pokemon}/>))
                  : <EmptyCardPokemon/>
                }
              </div>
          }
        </main>
        <Footer/>
        <ModalDataPokemon/>
      </Container>
    </>
  )
}
