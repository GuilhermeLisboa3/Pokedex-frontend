import './styles.scss'
import { EmptyCardPokemon, Footer, Header, CardPokemon, Error, ModalDataPokemon } from '@/application/components'
import { type ApiPokemon, type Pokemon } from '@/domain/models'
import { type GetDataPokemon, type ListPokemons } from '@/domain/use-cases/api-pokemon'
import { type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { PokemonProvider, AccountContext } from '@/application/contexts'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useContext, useEffect, useState } from 'react'

type Props = { listPokemons: ListPokemons, getDataPokemon: GetDataPokemon, getListFavoritePokemon: GetListFavoritePokemon }

export const Home: React.FC<Props> = ({ listPokemons, getDataPokemon, getListFavoritePokemon }: Props) => {
  const { getCurrentAccount } = useContext(AccountContext)
  const perPage = 25
  const [listPokemon, setListPokemon] = useState<ApiPokemon[]>([])
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])
  const [namePokemon, setNamePokemon] = useState<string | undefined>(undefined)
  const [pokemon, setPokemon] = useState<ApiPokemon>()
  const [pokemonDescription, setPokemonDescription] = useState('')

  const [isOpenModalDataPokemon, setIsOpenModalDataPokemon] = useState(false)

  const [page, setPage] = useState(0)
  const [count, setCount] = useState<number>(0)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const changeReload = (): void => { setReload(!reload) }

  useEffect(() => {
    if (getCurrentAccount()?.token) { getListFavoritePokemon().then(result => { setListFavoritePokemon(result) }) }
    setListPokemon([])
    listPokemons({ page: page * perPage, perPage }).then(result => {
      setListPokemon(result.pokemons)
      setCount(result.count)
    }).catch(error => { setError(error.message) })
  }, [reload, page])

  useEffect(() => { searchPokemon(namePokemon) }, [namePokemon])

  const getDataPokemonHandler = async (namePokemon: string): Promise<void> => {
    try {
      const { description, pokemon } = await getDataPokemon({ name: namePokemon })
      setPokemon(pokemon)
      setPokemonDescription(description)
      setIsOpenModalDataPokemon(true)
    } catch (error) {
    }
  }

  const searchPokemon = async (namePokemon?: string): Promise<void> => {
    if (namePokemon === undefined) return
    if (namePokemon.length === 0) {
      changeReload()
      return
    }
    try {
      const { pokemon } = await getDataPokemon({ name: namePokemon })
      setListPokemon([pokemon])
    } catch (error) {
      setListPokemon([])
    }
  }

  return (
    <>
      <PokemonProvider listFavoritePokemon={listFavoritePokemon}>
        <Container className='home-container'>
          <Header setNamePokemon={setNamePokemon}/>
          <main className='home-container-list-pokemon'>
            <Pagination count={count} page={page} setPage={setPage} perPage={25}/>
            { error
              ? <Error error={error} reload={changeReload}/>
              : <div className='home-list-pokemons'>
                  { listPokemon.length > 0
                    ? listPokemon.map(pokemon => (<div data-testid='card-pokemon' key={pokemon.id} onClick={() => { getDataPokemonHandler(pokemon.name) }}><CardPokemon pokemon={pokemon}/></div>))
                    : <EmptyCardPokemon/>
                  }
                </div>
            }
          </main>
          <Footer/>
          <ModalDataPokemon pokemon={pokemon!} pokemonDescription={pokemonDescription} isOpen={isOpenModalDataPokemon} setIsOpen={setIsOpenModalDataPokemon}/>
        </Container>
      </PokemonProvider>
    </>
  )
}
