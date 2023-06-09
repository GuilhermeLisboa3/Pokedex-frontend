import './styles.scss'
import { CardPokemon, Footer, ModalDataPokemon, Error } from '@/application/components'
import { type DeletePokemon, type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { type GetDataPokemon } from '@/domain/use-cases/api-pokemon'
import { type ApiPokemon, type Pokemon } from '@/domain/models'
import { useError } from '@/application/hooks'
import { PokemonProvider } from '@/application/contexts'

import { Container } from 'reactstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  getListFavoritePokemon: GetListFavoritePokemon
  getDataPokemon: GetDataPokemon
  deletePokemon: DeletePokemon
}

export const Favorites: React.FC<Props> = ({ getListFavoritePokemon, getDataPokemon, deletePokemon }: Props) => {
  const handleError = useError(error => setError(error.message))
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])
  const [listPokemon, setListPokemon] = useState<ApiPokemon[]>([])
  const [pokemon, setPokemon] = useState<ApiPokemon>()
  const [error, setError] = useState<string | undefined>(undefined)
  const [pokemonDescription, setPokemonDescription] = useState('')

  const [isOpenModalDataPokemon, setIsOpenModalDataPokemon] = useState(false)
  const [reload, setReload] = useState(false)

  const changeReload = (): void => {
    setError(undefined)
    setReload(!reload)
  }

  useEffect(() => {
    getListFavoritePokemon().then(result => {
      listPokemonHandler(result)
    }).catch(error => handleError(error))
  }, [reload])

  const listPokemonHandler = async (favoritePokemon: Pokemon[]): Promise<void> => {
    const listPokemon = favoritePokemon.map(async (pokemon) => {
      const dataPokemon = await getDataPokemon({ name: pokemon.idPokemon })
      return dataPokemon.pokemon
    })
    const pokemons = await Promise.all(listPokemon)
    setListPokemon(pokemons)
    setListFavoritePokemon(favoritePokemon)
  }

  const deletePokemonHandler = async (pokemon: ApiPokemon): Promise<void> => {
    try {
      await deletePokemon({ idPokemon: pokemon.id.toString() })
      const favoritePokemon = listFavoritePokemon.filter(pokemonFavorite => pokemonFavorite.idPokemon !== pokemon.id.toString())
      setListFavoritePokemon(favoritePokemon)
      changeReload()
    } catch (error) {}
  }

  const getDataPokemonHandler = async (namePokemon: string): Promise<void> => {
    try {
      const { description, pokemon } = await getDataPokemon({ name: namePokemon })
      setPokemon(pokemon)
      setPokemonDescription(description)
      setIsOpenModalDataPokemon(true)
    } catch (error) {}
  }

  return (
    <>
      <PokemonProvider listFavoritePokemon={listFavoritePokemon} getDataPokemon={getDataPokemonHandler} deletePokemon={deletePokemonHandler}>
        <Container className='favorite-container'>
          <Link href={'/'} className='favorite-container-logo'>
            <img src="/pokedexLogo.png" alt="logo" />
          </Link>
          { error
            ? <Error error={error} reload={changeReload}/>
            : <div className='favorite-list-pokemons'>
              { listPokemon.length > 0
                ? listPokemon.map(pokemon => (<CardPokemon pokemon={pokemon} key={pokemon.id}/>))
                : <p className='favorite-text'>Você não tem pokemons favoritado.</p>
              }
            </div>
          }
          <ModalDataPokemon pokemon={pokemon!} pokemonDescription={pokemonDescription} isOpen={isOpenModalDataPokemon} setIsOpen={setIsOpenModalDataPokemon}/>
          <Footer/>
        </Container>
      </PokemonProvider>
    </>
  )
}
