import './styles.scss'
import { EmptyCardPokemon, Footer, Header, CardPokemon, Error, ModalDataPokemon, Toas } from '@/application/components'
import { type ApiPokemon, type Pokemon } from '@/domain/models'
import { type GetDataPokemon, type ListPokemons } from '@/domain/use-cases/api-pokemon'
import { type DeletePokemon, type AddPokemon, type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { PokemonProvider, AccountContext } from '@/application/contexts'
import { type DeleteAccount } from '@/domain/use-cases/account'

import { Container } from 'reactstrap'
import { Pagination } from './components'
import { useContext, useEffect, useState } from 'react'

type Props = {
  listPokemons: ListPokemons
  getDataPokemon: GetDataPokemon
  getListFavoritePokemon: GetListFavoritePokemon
  addPokemon: AddPokemon
  deletePokemon: DeletePokemon
  deleteAccount: DeleteAccount
}

export const Home: React.FC<Props> = ({ listPokemons, getDataPokemon, getListFavoritePokemon, addPokemon, deletePokemon, deleteAccount }: Props) => {
  const { getCurrentAccount } = useContext(AccountContext)
  const perPage = 25
  const [listPokemon, setListPokemon] = useState<ApiPokemon[]>([])
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])
  const [namePokemon, setNamePokemon] = useState<string | undefined>(undefined)
  const [pokemon, setPokemon] = useState<ApiPokemon>()
  const [pokemonDescription, setPokemonDescription] = useState('')

  const [isOpenModalDataPokemon, setIsOpenModalDataPokemon] = useState(false)
  const [toastIsOpen, setToastIsOpen] = useState(false)

  const [page, setPage] = useState(0)
  const [count, setCount] = useState<number>(0)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(false)

  const changeReload = (): void => { setReload(!reload) }

  useEffect(() => {
    if (getCurrentAccount()?.token) { getListFavoritePokemon().then((result: Pokemon[]) => { setListFavoritePokemon(result) }) }
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
    } catch (error) {}
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

  const addPokemonHandler = async (pokemon: ApiPokemon): Promise<void> => {
    if (!getCurrentAccount()?.token) {
      setToastIsOpen(true)
      return
    }
    try {
      await addPokemon({ idPokemon: pokemon.id.toString() })
      setListFavoritePokemon([...listFavoritePokemon, { idPokemon: pokemon.id.toString() }])
    } catch (error) { }
  }

  const deletePokemonHandler = async (pokemon: ApiPokemon): Promise<void> => {
    try {
      await deletePokemon({ idPokemon: pokemon.id.toString() })
      const favoritePokemon = listFavoritePokemon.filter(pokemonFavorite => pokemonFavorite.idPokemon !== pokemon.id.toString())
      setListFavoritePokemon(favoritePokemon)
    } catch (error) {}
  }

  const deleteAccountHandler = async (): Promise<void> => {
    await deleteAccount()
  }

  return (
    <>
      <PokemonProvider listFavoritePokemon={listFavoritePokemon} getDataPokemon={getDataPokemonHandler} addPokemon={addPokemonHandler} deletePokemon={deletePokemonHandler}>
        <Container className='home-container'>
          <Header setNamePokemon={setNamePokemon} deleteAccount={ deleteAccountHandler}/>
          <main className='home-container-list-pokemon'>
            <Pagination count={count} page={page} setPage={setPage} perPage={25}/>
            { error
              ? <Error error={error} reload={changeReload}/>
              : <div className='home-list-pokemons'>
                  { listPokemon.length > 0
                    ? listPokemon.map(pokemon => (<CardPokemon pokemon={pokemon} key={pokemon.id}/>))
                    : <EmptyCardPokemon/>
                  }
                </div>
            }
          </main>
          <Footer/>
          <ModalDataPokemon pokemon={pokemon!} pokemonDescription={pokemonDescription} isOpen={isOpenModalDataPokemon} setIsOpen={setIsOpenModalDataPokemon}/>
        </Container>
      </PokemonProvider>
      <Toas color={'bg-danger'} isOpen={toastIsOpen} setIsOpen={setToastIsOpen} message={'Faça login para conseguir favoritar um pokemon'}/>
    </>
  )
}
