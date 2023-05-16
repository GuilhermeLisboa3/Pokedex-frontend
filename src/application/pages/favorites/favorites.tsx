import './styles.scss'
import { CardPokemon, Footer } from '@/application/components'
import { type DeletePokemon, type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { type GetDataPokemon } from '@/domain/use-cases/api-pokemon'
import { type ApiPokemon, type Pokemon } from '@/domain/models'

import { Container } from 'reactstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PokemonProvider } from '@/application/contexts'

type Props = {
  getListFavoritePokemon: GetListFavoritePokemon
  getDataPokemon: GetDataPokemon
  deletePokemon: DeletePokemon
}

export const Favorites: React.FC<Props> = ({ getListFavoritePokemon, getDataPokemon, deletePokemon }: Props) => {
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])
  const [listPokemon, setListPokemon] = useState<ApiPokemon[]>([])

  useEffect(() => {
    getListFavoritePokemon().then((result: Pokemon[]) => {
      setListFavoritePokemon(result)
      listPokemonHandler()
    })
  })

  const listPokemonHandler = async (): Promise<void> => {
    const listPokemon = listFavoritePokemon.map(async (pokemon) => {
      const dataPokemon = await getDataPokemon({ name: pokemon.idPokemon })
      return dataPokemon.pokemon
    })
    const pokemons = await Promise.all(listPokemon)
    setListPokemon(pokemons)
  }

  const deletePokemonHandler = async (pokemon: ApiPokemon): Promise<void> => {
    try {
      await deletePokemon({ idPokemon: pokemon.id.toString() })
    } catch (error) {}
  }

  const fakeFunction = async (): Promise<void> => {}

  return (
    <>
    <PokemonProvider listFavoritePokemon={listFavoritePokemon} getDataPokemon={fakeFunction} deletePokemon={deletePokemonHandler}>
      <Container className='favorite-container'>
        <Link href={'/'} className='favorite-container-logo'>
          <img src="/pokedexLogo.png" alt="logo" />
        </Link>
        <div className='favorite-list-pokemons'>
        { listPokemon.length > 0
          ? listPokemon.map(pokemon => (<CardPokemon pokemon={pokemon} key={pokemon.id}/>))
          : <p className='favorite-text'>Você não tem pokemons favoritado.</p>
        }
        </div>
        <Footer/>
      </Container>
    </PokemonProvider>
    </>
  )
}
